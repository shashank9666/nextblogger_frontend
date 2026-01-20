import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Nextblogger",
  description: "Made With Nextjs, Express and MongoDB Atlas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
