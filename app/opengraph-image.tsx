import { ImageResponse } from 'next/og';
export const alt = 'Zafer Çağatay Umut — Full-Stack Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        background: '#0a0a0a',
        color: '#fafafa',
        padding: '64px',
      }}
    >
      <div style={{ display: 'flex', fontSize: 28 }}>Zafer Çağatay Umut</div>
      <div
        style={{
          display: 'flex',
          fontSize: 76,
          letterSpacing: -2,
          lineHeight: 1.1,
          maxWidth: 1000,
        }}
      >
        From complex systems to products people use.
      </div>
      <div
        style={{
          display: 'flex',
          borderTop: '1px solid #757575',
          paddingTop: 24,
          fontSize: 24,
          color: '#b3b3b3',
        }}
      >
        Full-Stack Software Engineer · SaaS / AI / Mobile
      </div>
    </div>,
    size,
  );
}
