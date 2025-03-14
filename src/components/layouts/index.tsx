import { ReactNode } from "react";
import HeaderTop from "./header/HeaderTop";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center">
      <div className="flex md:flex-row flex-col relative max-w-[1920px] w-screen h-screen">
        {/* <div className="hidden md:flex">
          <HeaderSideBar/>
        </div> */}

        <main className="h-full w-full flex flex-col gap-6 pb-4">
          <HeaderTop />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
