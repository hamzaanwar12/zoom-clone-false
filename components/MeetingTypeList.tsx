"use client";

import React, { useState } from "react";
import MeetingBoxCard from "./MeetingBoxCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

export default function MeetingTypeList() {
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();

  const [meetingState, setMeetingState] = useState<
    "isJoiningMeeting" | "isInstantMeeting" | "isScheduleMeeting" | null
  >(null);
  const router = useRouter();
  if (router) {
    console.log("Ruter present");
  }

  const { user } = useUser();
  const client = useStreamVideoClient();
  const handleCreateMeeting = async () => {
    if (!client || !user) {
      console.log("Missing Fields");
      return;
    }

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) {
        console.log("not call happening");
        throw new Error("Failed ot create the call");
      }

      if (!values.dateTime) {
        toast({
          title: "Please select a date  Time",
          // description: "Friday, February 10, 2023 at 5:57 PM",
        });
        return;
      }

      const startAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      // const link = values.link
      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
        toast({
          title: "Meeting Created",
          // description: "Friday, February 10, 2023 at 5:57 PM",
        });

        // setTimeout(() => {
        //   router.push(`/meeting/${call.id}`);
        // }, 1000);
      }
    } catch (error) {
      console.log("error");
      console.log(error);
      toast({
        title: "Failed to create meeting",
        // description: "Friday, February 10, 2023 at 5:57 PM",
      });
    }
  };

  const cards = [
    {
      title: "New Meeting",
      subtitle: "Setup a new Meeting",
      iconSrc: "/icons/add-meeting.svg",
      bgColor: "bg-box-orange",
      onClick: () => setMeetingState("isJoiningMeeting"),
    },
    {
      title: "Join Meeting",
      subtitle: "Via invitation link",
      iconSrc: "/icons/join-meeting.svg",
      bgColor: "bg-box-blue",
      onClick: () => setMeetingState("isInstantMeeting"),
    },
    {
      title: "Schedule Meeting",
      subtitle: "Plan your meeting",
      iconSrc: "/icons/schedule.svg",
      bgColor: "bg-box-purple",
      onClick: () => setMeetingState("isScheduleMeeting"),
    },
    {
      title: "View Recordings",
      subtitle: "Setup a new recordings",
      iconSrc: "/icons/recordings.svg",
      bgColor: "bg-box-yellow",
      onClick: () => router.push("/recordings"),
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <MeetingBoxCard
          key={index}
          title={card.title}
          subtitle={card.subtitle}
          iconSrc={card.iconSrc}
          bgColor={card.bgColor}
          onClick={card.onClick}
        />
      ))}
      <MeetingModal
        isOpen={meetingState == "isInstantMeeting"}
        onClose={() => setMeetingState(null)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start a Meeting"
        handleClick={handleCreateMeeting}
      />
    </section>
  );
}
