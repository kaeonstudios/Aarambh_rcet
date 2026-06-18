import os
import sys
import subprocess
import glob

# Ensure dependencies are installed
def install_dependencies():
    required_packages = ["pillow", "pillow-avif-plugin", "static-ffmpeg"]
    for pkg in required_packages:
        try:
            __import__(pkg.replace("-", "_"))
        except ImportError:
            print(f"Installing missing dependency: {pkg}...")
            subprocess.check_call([sys.executable, "-m", "pip", "install", pkg])

install_dependencies()

from PIL import Image
import pillow_avif
from static_ffmpeg import add_paths

add_paths()

SRC_DIR = os.path.abspath("src/assets")
IMAGES_DIR = os.path.join(SRC_DIR, "images")
VIDEOS_DIR = os.path.join(SRC_DIR, "videos")

print(f"Source directory: {SRC_DIR}")

def optimize_images():
    print("\n--- Optimizing Images ---")
    if not os.path.exists(IMAGES_DIR):
        print(f"Images directory not found: {IMAGES_DIR}")
        return

    # Let's define the used images and their max widths
    # principal & ceo are large (2.1MB), we resize to 800px max width for portrait grid
    # posters can be 1000px max width
    image_specs = {
        "Principal.png": 800,
        "CEO.png": 800,
        "Mentor.jpg": 800,
        "Staff.jpg": 800,
        "coming_soon.jpg": 800,
        "keynote-poster.jpg": 1000,
        "panel-poster.jpg": 1000,
        "pitch-poster.jpg": 1000,
    }

    for filename, max_width in image_specs.items():
        src_path = os.path.join(IMAGES_DIR, filename)
        if not os.path.exists(src_path):
            print(f"Source image not found: {src_path}")
            continue

        base_name, _ = os.path.splitext(filename)
        webp_path = os.path.join(IMAGES_DIR, f"{base_name}.webp")
        avif_path = os.path.join(IMAGES_DIR, f"{base_name}.avif")

        print(f"Processing image: {filename} (max width: {max_width})")
        with Image.open(src_path) as img:
            # Convert to RGB mode if RGBA/P and saving as JPG/AVIF/WEBP
            if img.mode in ("RGBA", "LA", "P"):
                # If transparent, create white background
                bg = Image.new("RGB", img.size, (255, 255, 255))
                if img.mode == "RGBA":
                    bg.paste(img, mask=img.split()[3])
                else:
                    bg.paste(img)
                img = bg
            elif img.mode != "RGB":
                img = img.convert("RGB")

            # Resize if wider than max_width
            if img.width > max_width:
                aspect_ratio = img.height / img.width
                new_height = int(max_width * aspect_ratio)
                print(f"  Resizing from {img.width}x{img.height} to {max_width}x{new_height}")
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)

            # Save as WebP
            img.save(webp_path, "WEBP", quality=85)
            print(f"  Saved WebP: {webp_path}")

            # Save as AVIF
            img.save(avif_path, "AVIF", quality=70)
            print(f"  Saved AVIF: {avif_path}")

def transcode_videos():
    print("\n--- Transcoding Videos ---")
    if not os.path.exists(VIDEOS_DIR):
        print(f"Videos directory not found: {VIDEOS_DIR}")
        return

    # List of videos to process
    videos = [
        {"name": "hero-background.mp4", "has_audio": False},
        {"name": "conclave-highlights.mp4", "has_audio": True},
        {"name": "rcet-campus.mp4", "has_audio": False},
    ]

    resolutions = [
        {"name": "1080p", "height": 1080, "crf_mp4": 23, "crf_webm": 30, "bitrate_webm": "1.5M"},
        {"name": "720p", "height": 720, "crf_mp4": 23, "crf_webm": 32, "bitrate_webm": "1M"},
        {"name": "480p", "height": 480, "crf_mp4": 24, "crf_webm": 34, "bitrate_webm": "500k"},
    ]

    for video in videos:
        src_path = os.path.join(VIDEOS_DIR, video["name"])
        if not os.path.exists(src_path):
            print(f"Source video not found: {src_path}")
            continue

        base_name, _ = os.path.splitext(video["name"])
        
        # 1. Generate Poster image from first frame (stored in images folder)
        poster_filename = f"{base_name}-poster.jpg"
        poster_path = os.path.join(IMAGES_DIR, poster_filename)
        if not os.path.exists(poster_path):
            print(f"Generating poster for {video['name']}...")
            poster_cmd = [
                "ffmpeg", "-y",
                "-ss", "00:00:00.500",
                "-i", src_path,
                "-vframes", "1",
                "-f", "image2",
                poster_path
            ]
            subprocess.run(poster_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            # Optimize poster image using pillow
            if os.path.exists(poster_path):
                with Image.open(poster_path) as img:
                    img.save(os.path.join(IMAGES_DIR, f"{base_name}-poster.webp"), "WEBP", quality=85)
                    img.save(os.path.join(IMAGES_DIR, f"{base_name}-poster.avif"), "AVIF", quality=70)
                print(f"  Poster generated: {poster_path} (plus webp/avif versions)")

        # 2. Transcode to WebM and MP4 for each resolution
        for res in resolutions:
            height = res["height"]
            res_name = res["name"]
            
            # Target filenames
            mp4_out = os.path.join(VIDEOS_DIR, f"{base_name}-{res_name}.mp4")
            webm_out = os.path.join(VIDEOS_DIR, f"{base_name}-{res_name}.webm")

            # Check if output already exists to avoid re-rendering
            if not os.path.exists(mp4_out):
                print(f"Transcoding {video['name']} to MP4 @ {res_name}...")
                cmd_mp4 = [
                    "ffmpeg", "-y",
                    "-i", src_path,
                    "-vf", f"scale=-2:{height}",
                    "-c:v", "libx264",
                    "-crf", str(res["crf_mp4"]),
                    "-preset", "fast",
                ]
                if video["has_audio"]:
                    cmd_mp4.extend(["-c:a", "aac", "-b:a", "128k"])
                else:
                    cmd_mp4.extend(["-an"])
                cmd_mp4.append(mp4_out)
                subprocess.run(cmd_mp4, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                print(f"  Completed: {mp4_out}")

            if not os.path.exists(webm_out):
                print(f"Transcoding {video['name']} to WebM @ {res_name}...")
                cmd_webm = [
                    "ffmpeg", "-y",
                    "-i", src_path,
                    "-vf", f"scale=-2:{height}",
                    "-c:v", "libvpx",
                    "-crf", str(res["crf_webm"]),
                    "-b:v", res["bitrate_webm"],
                ]
                if video["has_audio"]:
                    cmd_webm.extend(["-c:a", "libvorbis", "-b:a", "96k"])
                else:
                    cmd_webm.extend(["-an"])
                cmd_webm.append(webm_out)
                subprocess.run(cmd_webm, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                print(f"  Completed: {webm_out}")

if __name__ == "__main__":
    optimize_images()
    transcode_videos()
    print("\nAll assets optimized successfully!")
