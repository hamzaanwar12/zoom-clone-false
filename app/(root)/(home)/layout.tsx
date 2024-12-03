import React, { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SideBar from "@/components/SideBar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <main className="relative text-white">
      <NavBar></NavBar>
      <SideBar></SideBar>
      <section>{children}</section>
      <Footer></Footer>
    </main>
  );
}
