import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Banner({
  title,
  image,
  badge,
  tagline,
  author,
  published_at,
  href,
}) {
  return (
    <Link href={href || ""}>
      <FullContainer className="min-h-[63vh] overflow-hidden p-10 bg-black/30 text-white text-center">
        <Image
          src={image}
          alt="Background Image"
          priority={true}
          fill={true}
          loading="eager"
          className="-z-10 w-full h-full object-cover absolute top-0"
        />
        <Container className="gap-6">
          {badge && <Badge>{badge}</Badge>}
          <h1 className="font-bold text-3xl md:text-6xl capitalize max-w-screen-md">
            {title}
          </h1>
          {tagline && (
            <p className="leading-tight md:leading-none md:text-xl">
              {tagline}
            </p>
          )}
          {author && (
            <div className="flex items-center justify-center gap-4">
              <p>{author}</p> -<p>{published_at}</p>
            </div>
          )}
        </Container>
      </FullContainer>
    </Link>
  );
}
