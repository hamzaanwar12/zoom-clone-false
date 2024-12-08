import React, { useState } from "react";
import {
  CallControls,
  CallStatsButton,
  // StreamCall,
  // StreamTheme,
  // StreamVideo,
  CallParticipantsList,
  SpeakerLayout,
  PaginatedGridLayout,
  useCallStateHooks,
  CallingState,
} from "@stream-io/video-react-sdk";
import { cn } from "@/lib/utils";
import Loader from "@/components/Loader";
import { LayoutList } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  //   DropdownMenuLabel,
  //   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Button } from "./ui/button";
import { Users } from "lucide-react";
import { useRouter} from "next/navigation";
// import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

export default function MeetingRoom() {
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(true);
  // const searchParams = useSearchParams();
  // const isPersonalRoom = !!searchParams.get("personal");

  const router = useRouter();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState != CallingState.JOINED) {
    console.log("Loader ....");
    return <Loader />;
  }

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
        break;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="left" />;

      default:
        return <SpeakerLayout participantsBarPosition="right" />;
        break;
    }
  };

  return (
    <section className="h-screen w-full overflow-hidden text-white pt-4">
      <div className="relative flex  size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px]">
          <CallLayout />
        </div>

        {showParticipants && (
          <div
            className={cn("h-[calc(100vh-86px)] ml-2", {
              // "show-block": showParticipants,
            })}
          >
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          </div>
        )}

        <div
          className={
            "fixed bottom-0 flex flex-wrap w-full items-center justify-center gap-5"
          }
        >
          <CallControls onLeave={() => router.push("/")} />
          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger>
                <LayoutList
                  className="cursor-pointer rounded-2xl p-2 bg-[#19232d] hover:bg-[#4c535b] text-white"
                  size={35}
                />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="text-white border-dark-1 bg-dark-1">
              {["Grid", "Speaker-left", "Speaker-right"].map((item, index) => {
                return (
                  <div key={index}>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() =>
                        setLayout(item.toLowerCase() as CallLayoutType)
                      }
                    >
                      {item}
                    </DropdownMenuItem>
                  </div>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton />
          <button
            onClick={() => {
              console.log("clicked");
              setShowParticipants((prev) => !prev);
            }}
          >
            <div className="cursor-pointer rounded-2xl p-2 bg-[#19232d] hover:bg-[#4c535b] text-white">
              <Users size={20} className="text-white"></Users>
            </div>
          </button>
          {/* {isPersonalRoom && <EndCallButton/>} */}
          <EndCallButton />
        </div>
      </div>
    </section>
  );
}
