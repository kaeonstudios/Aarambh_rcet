import os
from PIL import Image, ImageDraw

def generate_favicon():
    dest_path = os.path.abspath("public/favicon.ico")
    print(f"Generating favicon at: {dest_path}")
    
    # Create a 32x32 transparent image
    img = Image.new("RGBA", (32, 32), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw a gold circle (matching tailwind gold color)
    draw.ellipse([2, 2, 29, 29], fill=(245, 158, 11, 255))
    
    # Draw letter 'A' using lines for pixel-perfect clarity without font file dependencies
    # Apex of 'A' at (16, 6)
    # Left leg down to (10, 24)
    # Right leg down to (22, 24)
    draw.line([(16, 6), (10, 24)], fill=(0, 0, 0, 255), width=2)
    draw.line([(16, 6), (22, 24)], fill=(0, 0, 0, 255), width=2)
    # Crossbar at y = 17
    draw.line([(12, 17), (20, 17)], fill=(0, 0, 0, 255), width=2)
    
    # Save as ICO format
    img.save(dest_path, format="ICO")
    print("Success: favicon.ico generated!")

if __name__ == "__main__":
    generate_favicon()
