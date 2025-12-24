export const metadata = {
  title: 'Campaign OS',
  description: 'WhatsApp Campaign Dashboard'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        padding: '16px',
        maxWidth: 960,
        margin: '0 auto',
        background: '#0b1021',
        color: '#e7ecf3'
      }}>
        {children}
      </body>
    </html>
  );
}