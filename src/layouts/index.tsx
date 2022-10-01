import Footer from "./Footer";
import { Outlet } from "react-router";

interface LayoutDefaultProps {
  children?: React.ReactElement;
}

export default function DefaultLayout({ children }: LayoutDefaultProps) {
  return (
    <div>
      <main>{children || <Outlet />}</main>
      <Footer />
    </div>
  );
}
