import React, { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SideBar from "@/components/SideBar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <main className="relative text-white">
      <NavBar></NavBar>
      <div className="flex">
        <SideBar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-14 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
      <Footer></Footer>
    </main>
  );
}
