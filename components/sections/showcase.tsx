import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Marquee } from "../magicui/marquee";

export interface ShowcaseCardProps {
  title: string;
  image: string;
  href: string;
  affiliation?: string;
}

export function ShowcaseCard({
  title,
  image,
  href,
  affiliation,
}: ShowcaseCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex cursor-pointer flex-col gap-2 overflow-hidden"
    >
      <img
        src={image}
        alt={title}
        width={500}
        height={300}
        className="size-full max-h-[300px] rounded-xl object-cover"
      />

      <div className="flex flex-col">
        <div className="group inline-flex cursor-pointer items-center justify-start gap-1 text-xl font-semibold text-neutral-700 duration-200 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-200">
          {title}
          <ChevronRightIcon className="size-4 translate-x-0 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
        </div>
        <p className="text-sm text-neutral-400">{affiliation}</p>
      </div>
    </Link>
  );
}

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Netflix",
  "YouTube",
  "Instagram",
  "Uber",
  "Spotify",
];

export async function Showcase() {
  return (
    <section id="showcase">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h4 className="text-xl font-bold tracking-tight text-black dark:text-white">
              Trusted by developers worldwide
            </h4>

            <div className="relative mt-6">
              <Marquee className="max-w-screen [--duration:40s]">
                {companies.map((logo, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center px-4 py-2 text-lg font-medium text-muted-foreground"
                  >
                    {logo}
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
