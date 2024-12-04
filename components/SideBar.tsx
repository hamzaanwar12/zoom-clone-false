"use client"
import { usePathname } from "next/navigation";
import React from "react";
import sideBarItems from "@/app/constants";
import SideBarItem from "./SideBarItem";
export default function SideBar() {
  
  const pathname = usePathname()

  return (
    <main className="sticky top-0 left-0 bg-dark-1 px-1 flex flex-1 flex-col w-fits max-sm:hidden py-6 gap-5 lg:max-w-[264px] min-h-screen">
      {sideBarItems.map((item) => {
        return (
          <SideBarItem
            key={item.route}
            title={item.title}
            route={item.route}
            image={item.imgUrl}
            // isActive={pathname == item.route || pathname.startsWith(item.route)}
            isActive={pathname == item.route }
          ></SideBarItem>
        );
      })}
      
    </main>
  );
}
