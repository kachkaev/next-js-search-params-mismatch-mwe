import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body className="p-10">{children}</body>
    </html>
  );
}
