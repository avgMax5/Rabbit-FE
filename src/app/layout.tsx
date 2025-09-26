import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import StyledComponentsRegistry from "./registry";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const NanumSquare = localFont({
    src: [
        {
            path: "../../public/fonts/NanumSquare/NanumSquareNeo-aLt.ttf",
            weight: "300",
            style: "light",
        },
        {
            path: "../../public/fonts/NanumSquare/NanumSquareNeo-bRg.ttf",
            weight: "400",
            style: "regular",
        },
        {
            path: "../../public/fonts/NanumSquare/NanumSquareNeo-cBd.ttf",
            weight: "700",
            style: "bold",
        },
        {
            path: "../../public/fonts/NanumSquare/NanumSquareNeo-dEb.ttf",
            weight: "800",
            style: "extra-bold",
        },
        {
            path: "../../public/fonts/NanumSquare/NanumSquareNeo-eHv.ttf",
            weight: "900",
            style: "heavy",
        },
    ],
    display: "swap",
    variable: "--font-nanum-square",
});

const Rockstar = localFont({
    src: [
        {
            path: "../../public/fonts/Rockstar/Rockstar-ExtraBold.otf",
            weight: "800",
            style: "extra-bold",
        },
    ],
    display: "swap",
    variable: "--font-rockstar",
});

export const metadata: Metadata = {
    title: "Rabbit",
    description: "개발자의 가치, Rabbit과 같이",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${NanumSquare.variable} ${Rockstar.variable}`}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
