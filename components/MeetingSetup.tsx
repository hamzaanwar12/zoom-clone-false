import React, { useState, useEffect } from "react";
import {
  VideoPreview,
  DeviceSettings,
  useCall,
} from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function MeetingSetup({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) {
  const [isMicCamToggledOn, setMicCamToggledOn] = useState(false);

  const call = useCall();
  if (!call) throw new Error("Call must be in teh Stream Call Component");

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <main className="flex flex-col gap-3 w-full h-screen items-center justify-center">
      <h1>Meeting Setup</h1>
      <VideoPreview />
      <div className="flex flex-wrap gap-3 items-center justify-center">
        <label className="flex items-center justify-center gap-2" htmlFor="">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setMicCamToggledOn(e.target.checked)}
          />
          Join with Mic and Camera off
        </label>
        <DeviceSettings />
        <Button
          className={cn(
            "border-none rounded-md text-white bg-green-500 px-4 py-2.5"
          )}
          onClick={() => {
            call.join();
            setIsSetupComplete(true);
          }}
        >
          Join Meeting
        </Button>
      </div>
    </main>
  );
}
