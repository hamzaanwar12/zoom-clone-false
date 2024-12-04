import React from "react";
import MeetingTypeList from "@/components/MeetingTypeList";
export default function home() {
  const today = new Date();
  // Custom Time Formatting
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const isAM = hours < 12;

  // Convert to 12-hour format and add custom AM/PM
  // const formattedTime = `${hours % 12 || 12}:${minutes
  //   .toString()
  //   .padStart(2, "0")} ${isAM ? "AM" : "PM"}`;
  // Formatting date as "Friday, 29 March 2024"

  const formattedTime = `${hours % 12 || 12}:${minutes
    .toString()
    .padStart(2, "0")}`;
  const amPm = isAM ? "AM" : "PM";

  const dateFormatter = new Intl.DateTimeFormat("en-UK", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedDate = dateFormatter.format(today);

  return (
    <section className="flex size-full  flex-col gap-5">
      <div className="h-[303px] w-full bg-cover bg-hero rounded-hero">
        <div className="h-full w-full px-5 py-6  flex flex-col justify-between">
          {/* <h2 className="text-normal py-2  rounded-[4px] w-[273px] bg-[#1F2339] ">Upocoming Meeting at 12:30 pm </h2> */}
          <h2 className="text-normal px-2 py-2 rounded-[4px] min-h-[27px] w-[273px] bg-[#545458eb] backdrop-blur-[52px] text-white">
            Upcoming Meeting at 12:30 pm
          </h2>

          <div className="flex flex-col">
            {/* 12:04 pm */}
            {/* <h1 className="text-2xl font-bold">{formattedTime}</h1> */}
            <h1 className="text-3xl font-bold">
              {formattedTime}
              <span className="text-xl align-bottom ml-1">{amPm}</span>
            </h1>
            <span className="">{formattedDate}</span>
            {/* friday, 29 March 2024 */}
          </div>
        </div>
      </div>

      {/* Meeting Sections */}
      <MeetingTypeList />
    </section>
  );
}
