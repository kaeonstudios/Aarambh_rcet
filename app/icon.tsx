import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 20,
          background: 'linear-gradient(to bottom right, #f59e0b, #d97706)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black',
          borderRadius: '50%',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
        }}
      >
        A
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
