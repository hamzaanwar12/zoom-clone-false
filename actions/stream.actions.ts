"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.SECRET_STREAM_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User is not logged in");
  if (!apiKey) throw new Error("No Stream API Key");
  if (!apiSecret) throw new Error("No Secret Key");

  const streamClient = new StreamClient(apiKey, apiSecret);

  try {
    const validity = 60 * 60; // 1 hour
    const token = streamClient.generateUserToken({
      user_id: user.id,
      validity_in_seconds: validity,
    });

    console.log("Generated Token:", token);
    return token;
  } catch (error) {
    console.error("Error generating Stream token:", error);
    throw error;
  }
};
