"use client";

import React from "react";
import Image from "next/image";

interface CardProps {
  title: string;
  subtitle: string;
  iconSrc: string;
  bgColor: string;
  onClick: () => void;
}

export default function Card({
  title,
  subtitle,
  iconSrc,
  bgColor,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-5 w-full cursor-pointer rounded-[14px] min-h-[260px] ${bgColor}`}
    >
      <div className="h-full w-full flex flex-col justify-between">
        {/* Icon */}
        <div className="flex items-center justify-center w-[52px] h-[52px] rounded-[10px] bg-icons-box">
          <Image priority width={32} height={32} src={iconSrc} alt={title} />
        </div>
        {/* Text */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl md:text-xl xl:text-[18px] font-bold">{title}</h2>
          <span className="text-[18px]">{subtitle}</span>
        </div>
      </div>
    </div>
  );
}
