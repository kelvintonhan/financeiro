
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Navigation";
import FinanceContextProvider from "@/lib/store/finance-context";
import AuthContextProvider from "@/lib/store/auth-context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Controle Financeiro",
  description: "Controle seus gastos financeiros",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
        <FinanceContextProvider>
          <ToastContainer />
          <Nav />
          {children}
        </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
