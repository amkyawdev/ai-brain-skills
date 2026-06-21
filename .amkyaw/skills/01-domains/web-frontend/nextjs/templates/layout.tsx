// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'App Title',
  description: 'App description',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
