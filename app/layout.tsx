import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { AuthProvider } from "@app/auth/ui";
// import { Clock, CornerMiniModal } from "@app/ui";
import { NavBar } from "@app/ui/nav";
import { FullScreenButton } from "@app/ui/buttons";
import "./globals.css";
import ThemeToggle from "./ui/ThemeToggle";
import LocalUserId from "./ui/LocalUserId";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Odin AI",
  description: "An AI Model trained on your own data!",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en" className="h-screen text-white transition-all duration-1000 bg-black ease">
      <body className={inter.className + " flex flex-col h-screen text-inherit"}>
        <Analytics />
        {/* <CornerMiniModal>
          <a href="https://odin-elbasel-prev.vercel.app">
            Check the preview version of this site
          </a>
        </CornerMiniModal> */}
        {/* <div className="fixed right-0 z-50 flex items-center gap-2 mt-2 mr-4"> */}
        {/* <FullScreenButton /> */}
        {/* <Clock /> */}
        {/* <ThemeToggle /> */}
        {/* </div> */}
        <AuthProvider>
          {/* !! overflow-x-hidden */}
          <main className="flex flex-col flex-1 max-h-full overflow-hidden">
            {children}
          </main>
          <LocalUserId />
          <NavBar />
        </AuthProvider>
        <Toaster
          toastOptions={{
            error: {
              iconTheme: {
                primary: "#f00",
                secondary: "#fff",
              },
              style: {
                background: "#000",
                color: "#fff",
                border: "1px solid white",
                borderRadius: "24px",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
