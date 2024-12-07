import React from "react";
import Image from "next/image";
export default function Loader() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Image
        priority
        src={"/icons/loading-circle.svg"}
        alt={"Loading"}
        width={45}
        height={45}
      />
    </div>
  );
}
