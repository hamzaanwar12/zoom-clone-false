"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import Loader from "@/components/Loader";
import { useGetCallById } from "@/hooks/use-getCallById";

// export default function MeetingID({ params }: { params: { id: string } }) {
//   const { id } = params; // Assuming `params` is directly passed as an object
export default function MeetingID({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // searchParams.get('personal')=>personal=>!"personal"=>false=>!!"personal"=>true
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;
  // const { user, isLoaded } = useUser();
  const { isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);
  if (!isLoaded || isCallLoading) return <Loader />;

  console.log("Meeting Id : ", id);

  return (
    <main className="w-full h-screen">
      {/* <StreamCall> */}
      <StreamCall call={call}>
        <StreamTheme>
          {/* <div className="flex items-center justify-center h-full"> */}
          {isSetupComplete ? (
            <MeetingRoom />
          ) : (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          )}
          {/* </div> */}
        </StreamTheme>
      </StreamCall>
    </main>
  );
}
