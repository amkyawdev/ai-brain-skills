// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>404 - Page Not Found</h1>
      <Link href="/">Return home</Link>
    </div>
  );
}
