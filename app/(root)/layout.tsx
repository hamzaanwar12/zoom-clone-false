import React, { ReactNode } from "react";
import {StreamVideoProvider} from "@/app/providers/streamClientProvider";
export default function layout({ children }: { children: ReactNode }) {
  return(
    <main>
    <StreamVideoProvider>{children}</StreamVideoProvider>
  </main>
  )
  
}
