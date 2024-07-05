import { Herosection } from "@/components/client/home/Herosection";
import Image from "next/image";
import React from "react";

export default async function page() {
  return (
    <main className="space-y-12">
      <Herosection />
    </main>
  );
}
