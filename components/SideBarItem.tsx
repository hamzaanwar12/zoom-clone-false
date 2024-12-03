import React from "react";
import Image from 'next/image';
import { Button } from "./ui/button";
import { useRouter } from 'next/router';

export default function SideBarItem({
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
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(route)}
      className={`flex items-center justify-start rounded-lg transition-colors ${
        isActive ? 'bg-blue-700 text-white' : 'bg-dark-1 text-gray-300'
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
      <h2 className="ml-3 text-lg">{title}</h2>
    </Button>
  );
}
