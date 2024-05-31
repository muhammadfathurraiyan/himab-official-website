"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

export default function Viewer({ content }: { content: string | null }) {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "editor",
      },
    },
    extensions: [
      StarterKit,
      Highlight,
      Image,
      TextAlign,
      Link.configure({
        openOnClick: true,
      }),
    ],
    content: content,
    editable: false,
  });

  if (!editor) return <></>;

  return (
    <article>
      <EditorContent editor={editor} readOnly={true} />
    </article>
  );
}
