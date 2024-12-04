"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.SECRET_STREAM_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User is not Logged in");
  if (!apiKey) throw new Error("No Stream Api Key");
  if (!apiSecret) throw new Error("No Secret Key");

  const streamClient = new StreamClient(apiKey, apiSecret);

  const validity = 60 * 60;
  const token = streamClient.generateUserToken({
    user_id: user.id,
    validity_in_seconds: validity,
  });

  return token;
};
