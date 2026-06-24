import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SPARE — Everything has a spare',
  description: 'SPARE identifies, matches, repairs, sources, owns, verifies and keeps products alive.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
