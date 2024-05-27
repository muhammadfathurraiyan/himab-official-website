import { Editor } from "@tiptap/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "lucide-react";

export default function FormatLink({ editor }: { editor: Editor }) {
  const [link, setLink] = useState(editor.getAttributes("link").href);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size={"icon"}
          className={`size-9 ${editor.isActive("link") && "bg-accent"}`}
        >
          <Link className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambahkan link</DialogTitle>
          <DialogDescription>
            Tambahkan link yang sesuai untuk membuat link.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Label htmlFor="link" className="text-right">
            Link
          </Label>
          <Input
            defaultValue={link}
            onChange={(e) => setLink(e.target.value)}
            id="link"
            placeholder="https://sabirin.com"
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
              setOpen(false);
            }}
            type="button"
            variant={"destructive"}
          >
            Reset
          </Button>
          <Button
            onClick={() => {
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: link, target: "_blank" })
                .run();
              setOpen(false);
            }}
            type="button"
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
