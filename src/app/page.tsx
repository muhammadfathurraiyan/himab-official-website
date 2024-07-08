import { Herosection } from "@/components/client/home/Herosection";
import LatestNews from "@/components/client/home/LatestNews";
import Profile from "@/components/client/home/Profile";
import Quotes from "@/components/client/home/Quotes";
import Image from "next/image";
import React from "react";

export default async function page() {
  return (
    <main className="space-y-12">
      <Herosection />
      <LatestNews />
      <Quotes />
      <Profile />
    </main>
  );
}
