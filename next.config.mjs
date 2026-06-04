import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    // Custom loader for videos to avoid memory overhead of bundling huge binaries
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/i,
      use: [
        {
          loader: path.resolve('./scripts/video-loader.js'),
        },
      ],
    });

    // Asset/resource for audio and other media
    config.module.rules.push({
      test: /\.(mp3|wav|flac|aac)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });

    return config;
  },
};

export default nextConfig;
