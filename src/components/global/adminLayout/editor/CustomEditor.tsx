import { EditorContent, mergeAttributes, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Toolbar from "./toolbar/Toolbar";

type TEditorProps = {
  content: string | null;
  placeholder?: string;
  onChange?: (value: string) => void;
};

export default function CustomEditor({
  content,
  placeholder,
  onChange,
}: TEditorProps) {
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
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  if (!editor) return <></>;

  return (
    <div className="border rounded-md flex flex-col flex-1 w-full overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} placeholder={placeholder} />
    </div>
  );
}
