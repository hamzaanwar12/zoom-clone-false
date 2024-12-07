"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
export default function EndCallButton() {
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticpant = useLocalParticipant();
  const router = useRouter();
  const isMeetingOwner =
    localParticpant &&
    call?.state.createdBy &&
    localParticpant.userId == call.state.createdBy.id;

  const handleClick = async () => {
    await call.endCall();
    router.push("/");
  };

  if (!isMeetingOwner) return null;

  return (
    <Button className="bg-red-500" onClick={handleClick}>
      End Call
    </Button>
  );
}
