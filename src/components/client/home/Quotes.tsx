import { MessageSquareQuote, Quote } from "lucide-react";

export default function Quotes() {
  return (
    <section className="px-12 max-lg:px-4 min-h-screen flex flex-col justify-center">
      <Quote className="size-20 max-lg:size-14" />
      <h1 className="font-bold text-9xl max-lg:text-7xl max-lg:leading-tight">
        Putoh Ngon{" "}
        <span className="underline decoration-primary decoration-[14px] max-lg:decoration-[9px]">
          Meupakat
        </span>
        , Kuat Ngon{" "}
        <span className="underline decoration-primary decoration-[14px] max-lg:decoration-[9px]">
          Meuseuraya
        </span>
        .
      </h1>
    </section>
  );
}
