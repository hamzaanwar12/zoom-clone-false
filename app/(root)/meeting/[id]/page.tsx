import React from "react";

export default async function MeetingID({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  console.log(id)
  return (
    <div>
      <h1>Meting Page</h1>
      <h2>Meeting Id : {id}</h2>
    </div>
  );
}
