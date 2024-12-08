

"use client";

import React, { useEffect, useState } from "react";
import { useGetCalls } from "@/hooks/use-getCalls";
import { useRouter } from "next/navigation";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { useToast } from "@/hooks/use-toast";


export default function CallList({
  type,
}: {
  type: "upcoming" | "ended" | "recordings";
}) {
  const { endedCalls, upComingCalls, callRecordings, isLoading } =
    useGetCalls();

  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording>([]);

  const {toast} = useToast()

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "upcoming":
        return upComingCalls;
      case "recordings":
        return callRecordings;
      default:
        return [];
    }
  };

  const getNoCallsMessage = (): string => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "no Upcoming Calls";
      case "recordings":
        return "No Recordings";
      default:
        return "";
    }
  };

  console.log(type);

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings())
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
        //   setRecordings(callRecordings);
      } catch (error) {
        console.error("Error fetching recordings:", error);
      }
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  const calls = getCalls();

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            icon={"/I"}
            title={
              (meeting as Call).state.custom?.descriptin ||
              (meeting as CallRecording).filename.substring(0, 20) ||
              "No Description"
            }
            date={
              (meeting as Call).state.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time.toLocaleString()
            }
            isPreviousMeeting={type == "ended"}
            buttonIcon1={type === "recordings" ? "icons/play.svg" : undefined}
            buttonText={type === "recordings" ? "icons/play.svg" : ""}
            link={
              type === "recordings"
                ? meeting.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
            }
            handleClick={
              type === "recordings"
                ? () => router.push(`${meeting.url}`)
                : () => router.push(`${meeting.id}`)
            }
            key={(meeting as Call).id}
            meeting={meeting}
          />
        ))
      ) : (
        <p>{`${getNoCallsMessage}`}</p>
      )}
    </div>
  );
}
