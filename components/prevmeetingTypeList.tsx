/* eslint-disable camelcase */

"use client";

import React, { useState } from "react";
import MeetingBoxCard from "./MeetingBoxCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Textarea } from "@/components/ui/textarea"
import ReactDatePicker from "react-datepicker"

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
      subtitle: "Start an Instant Meeting",
      iconSrc: "/icons/add-meeting.svg",
      bgColor: "bg-box-orange",
      onClick: () => setMeetingState("isInstantMeeting"),
    },
    {
      title: "Join Meeting",
      subtitle: "Via invitation link",
      iconSrc: "/icons/join-meeting.svg",
      bgColor: "bg-box-blue",
      onClick: () => setMeetingState("isJoiningMeeting"),
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
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState == "isScheduleMeeting"}
          onClose={() => setMeetingState(null)}
          title="Create Meeting"
          className="text-center"
          // buttonText="Start a Meeting"
          handleClick={handleCreateMeeting}
          >
            <div className="flex flex-col gap-2.5">
              <label htmlFor="" className="text-sky-1 text-base leading-[22px]">Add a Description</label>
              <Textarea className="border-none focus-visible:ring-0  bg-dark-3 focus-visible:ring-offset-0" placeholder="its my meeting" 
              onChange={e=>setValues({...values,description:e.target.value})}/>
            </div>
            
            <div className="flex w-full flex-col gap-2.5">
              <label htmlFor="" className="text-sky-1 text-base leading-[22px]">Add a Description</label>
              <ReactDatePicker
              showTimeSelect
              timeFormat="HH:mm" 
              selected={values.dateTime}
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className = {"w-full rounded p-2 bg-dark-3 focus:outline-none"}
              onChange={(date)=>setValues({...values,dateTime:date!})}
              />
            </div>
            
          </MeetingModal>
        ) : (
          <MeetingModal
          isOpen={meetingState == "isJoiningMeeting"}
          onClose={() => setMeetingState(null)}
          title="Meeting Created"
          className="text-center"
          handleClick={() => {
            // navigator.clipboard.writeText(meetingLink)
            // toast({
            //   title:"Link Copied",
            // })
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}
      <MeetingModal
        isOpen={meetingState == "isInstantMeeting"}
        onClose={() => setMeetingState(null)}
        title="Start instant meeting"
        className="text-center"
        buttonText="Start a Meeting"
        handleClick={handleCreateMeeting}
      />
    </section>
  );
}