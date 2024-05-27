"use client";
import CardInfo from "@/components/global/adminLayout/card/CardInfo";
import CustomEditor from "@/components/global/adminLayout/editor/CustomEditor";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import React, { useState } from "react";

export default function ContentSejarah() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("blabla");
  return (
    <div className="mt-4">
      <div
        className={`${!isOpen ? "" : "hidden"} grid lg:grid-cols-3 mt-4 gap-4`}
      >
        <CardInfo
          description="Jika anda ingin melakukan pengeditan halaman sejarah, klik tombol di bawah untuk melakukan pengeditan tentang sejarah."
          title="Sejarah"
          button={{
            title: "Edit Sejarah",
            onClick: () => setIsOpen(!isOpen),
          }}
        />
        <div className="lg:col-span-2"></div>
      </div>
      <div
        className={`${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        } transition-all space-y-4`}
      >
        <CustomEditor content={content} onChange={setContent} placeholder="Hello" />
        <Button className="float-right max-lg:w-full" onClick={() => setIsOpen(!isOpen)}><Save className="mr-2 size-5" /> Save</Button>
      </div>
    </div>
  );
}
