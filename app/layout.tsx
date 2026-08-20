import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kamu Sosyal Tesisleri | Tesisleri kolayca bul",
  description: "Öğretmenevi, polisevi, misafirhane ve orduevlerini şehir şehir keşfedin.",
  metadataBase: new URL("https://kamusosyaltesisleri.com"),
  openGraph: { title: "Kamu Sosyal Tesisleri", description: "Yakınındaki tesisi saniyeler içinde bul.", images: ["/og.png"], locale: "tr_TR", type: "website" },
  twitter: { card: "summary_large_image", title: "Kamu Sosyal Tesisleri", description: "Yakınındaki tesisi saniyeler içinde bul.", images: ["/og.png"] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
