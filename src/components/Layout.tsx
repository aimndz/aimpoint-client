import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-primary-900 text-primary-100 font-montserrat h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mx-3">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
