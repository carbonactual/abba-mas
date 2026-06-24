import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BUNK — Property, properly connected',
  description: 'BUNK is the Carbon Actual property operating system and marketplace.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
