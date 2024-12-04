"use client";

import React, { useState } from "react";
import MeetingBoxCard from "./MeetingBoxCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";

export default function MeetingTypeList() {
  const [meetingState, setMeetingState] = useState<
    "isJoiningMeeting" | "isInstantMeeting" | "isScheduleMeeting" | null
  >(null);
  const router = useRouter();
  if (router) {
    console.log("Ruter present");
  }

  const handleCreateMeeting=()=>
  {
    
  }


  
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
