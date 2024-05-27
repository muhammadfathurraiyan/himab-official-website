import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";

import { Toggle } from "@/components/ui/toggle";
import FormatType from "./FormatType";
import FormatLink from "./FormatLink";
import FormatImage from "./FormatImage";

export default function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div className="flex items-center justify-between p-1 bg-muted/40 rounded-t overflow-auto">
      <div className="flex items-center gap-2">
        <FormatType editor={editor} />
        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          pressed={editor.isActive("bold")}
        >
          <Bold className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          pressed={editor.isActive("italic")}
          value="italic"
        >
          <Italic className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          pressed={editor.isActive("strike")}
        >
          <Strikethrough className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          pressed={editor.isActive("blockquote")}
        >
          <Quote className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
          pressed={editor.isActive("highlight")}
        >
          <Highlighter className="size-4" />
        </Toggle>
        <FormatLink editor={editor} />
        <FormatImage editor={editor} />
        <Toggle
          size="sm"
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          pressed={editor.isActive("bulletList")}
        >
          <List className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          pressed={editor.isActive("orderedList")}
        >
          <ListOrdered className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
          pressed={editor.isActive({ textAlign: "left" })}
        >
          <AlignLeft className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
          pressed={editor.isActive({ textAlign: "center" })}
        >
          <AlignCenter className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("right").run()
          }
          pressed={editor.isActive({ textAlign: "right" })}
        >
          <AlignRight className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("justify").run()
          }
          pressed={editor.isActive({ textAlign: "justify" })}
        >
          <AlignJustify className="size-4" />
        </Toggle>
      </div>
      <div className="flex items-center gap-2">
        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo className="size-4" />
        </Toggle>
      </div>
    </div>
  );
}
