export const metadata = {
  title: "ABBA MAS Swarm",
  description: "ABBA MAS swarm layer for Continuum, HAPI Root, Index, Curation, ATLAS, and Actual."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
