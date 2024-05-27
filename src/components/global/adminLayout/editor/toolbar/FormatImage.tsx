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
import { Image } from "lucide-react";

export default function FormatImage({ editor }: { editor: Editor }) {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  const handleImage = () => {
    editor.chain().focus().setImage({ src: url, alt: "ini gambar gaes" }).run();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size={"icon"} className="size-9">
          <Image className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambahkan gambar</DialogTitle>
          <DialogDescription>
            Tambahkan link gambar yang sesuai untuk menampilkan gambar.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Label htmlFor="link" className="text-right">
            Link
          </Label>
          <Input
            onChange={(e) => setUrl(e.target.value)}
            id="link"
            placeholder="https://sabirin.com"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleImage} type="button">
            Tambah
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
