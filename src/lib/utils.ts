import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string) {
  const timestamp = new Date();
  return (
    text
      .toLowerCase()
      .replace(/[^\w-]+/g, " ")
      .replace(/ /g, "-") +
    "-" +
    timestamp
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
      .toLowerCase()
      .replace(/[^\w-]+/g, " ")
      .replace(/ /g, "-")
  );
}
