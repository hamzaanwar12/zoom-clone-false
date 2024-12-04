import React from "react";
import Image from 'next/image';
import Link from "next/link";
export default function MobileBarItem({
  image,
  title,
  route,
  isActive,
}: {
  title: string;
  image: string;
  route: string;
  isActive: boolean;
}) {
  return (
    <Link href={route}
      className={`hover:bg-blue-link px-5 py-4 flex text-white items-center justify-start rounded-lg transition-colors ${
        isActive ? 'bg-blue-link ' : 'bg-dark-1'
      }`}
      aria-label={title} // Accessibility improvement
    >
      <Image
        priority
        height={32}
        width={32}
        src={image}
        alt={title}
      />
      <h1 className="text-2xl ml-3" >{title}</h1>
    </Link>
  );
}
