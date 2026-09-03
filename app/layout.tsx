import type { ReactNode } from "react";
import { GtagScript } from "../components/analytics/GtagScript";
import "../styles/globals.css";

export const metadata = {
  title: "Northwind Retail Portal",
  description: "Customer storefront and order portal for Northwind Retail"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GtagScript />
        {children}
      </body>
    </html>
  );
}
