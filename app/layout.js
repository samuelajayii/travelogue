import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import { Jost } from "next/font/google";

const jost = Jost ({
  subsets: ["english"],
  weight: ["400", "900"],
});


export const metadata = {
  title: "Travelogue",
  description: "Discover, Share, Explore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={jost.className}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
