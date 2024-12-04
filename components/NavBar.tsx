import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
export default function NavBar() {
  return (
    <nav className="flex justify bg-dark-1 px-6 py-6 w-full">
      <Link href="/" className="flex items-center">
        <Image
          priority
          height={50}
          width={50}
          src={"/icons/logo.svg"}
          alt={"Recky Room"}
        />
        <h2 className="max-sm:hidden ml-3 text-2xl text-white font-bold">
          Recky Room
        </h2>
      </Link>

      <div className="flex-between">
        {/* for clerk management */}
        <MobileNav />
      </div>
    </nav>
  );
}
