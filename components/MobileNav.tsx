"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import sideBarItems from "@/app/constants";

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <section className="max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            priority
            height={50}
            width={50}
            src={"/icons/hamburger.svg"}
            alt={"Menu"}
          />
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="bg-dark-1 px-1 flex flex-1 flex-col w-fits py-6 gap-5 min-h-screen"
        >
          <SheetTitle>
            <Link href="/" className="flex items-center gap-1">
              <Image
                priority
                height={50}
                width={50}
                src={"/icons/logo.svg"}
                alt={"Recky Room"}
              />
              <h2 className="text-[26px] text-white font-bold">Recky Room</h2>
            </Link>
          </SheetTitle>

          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <section className="pt-14 flex flex-col h-full gap-5">
              {sideBarItems.map((item) => {
                const isActive = pathname === item.route;

                return (
                  <SheetClose asChild key={item.route}>
                    <Link
                      href={item.route}
                      className={`flex gap-4 items-center p-4 rounded-lg w-full max-w-60 hover:bg-blue-link ${
                        isActive ? "bg-blue-link" : "bg-black-1"
                      }`}
                    >
                      <Image
                        src={item.imgUrl}
                        alt={item.title}
                        width={25}
                        height={25}
                      />
                      <p className="font-semibold text-white">{item.title}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
