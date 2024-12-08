import React, { ReactNode } from "react";
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Dialog, DialogContent} from "@/components/ui/dialog";
import Image from "next/image";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
  children?: ReactNode;
}

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
export default function MeetingModal({
  isOpen,
  onClose,
  title,
  className,
  handleClick,
  buttonText,
  image,
  buttonIcon,
  children,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger>Open</DialogTrigger> */}

      <DialogContent className="flex flex-col gap-5 bg-dark-1  rounded-[14px] border-none text-white max-w-[512px] items-center ">
        <div className="flex flex-col gap-5">
          {/* <DialogTitle> */}
          {image && (
            <div className="flex justify-center">
              <Image priority src={image} alt={title} width={24} height={24} />
            </div>
          )}
          <h2 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
          </h2>
          {children}
          <Button
            onClick={handleClick}
            className="flex items-center bg-blue-link focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            {buttonIcon && (
              <Image
                priority
                src={buttonIcon}
                alt={buttonText || title}
                width={13}
                height={13}
              />
            )}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
          {/* </DialogTitle> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
