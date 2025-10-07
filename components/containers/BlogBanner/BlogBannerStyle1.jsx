import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Playfair_Display } from "next/font/google";

// Elegant serif for banner title, matches premium editorial style
const bannerTitleFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export default function BlogBannerStyle1({ myblog, imagePath }) {
  return (
    <FullContainer
      className="min-h-[60vh] mx-auto max-w[1200px] overflow-hidden p-10 text-center"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${myblog?.value?.opacity / 100})`,
        color: myblog?.value?.textColor || "white",
      }}
    >
      <Image
        src={`${imagePath}/${myblog?.file_name}`}
        alt={
          myblog?.value?.imageAltText ||
          myblog?.value?.tagline ||
          "No Banner Found"
        }
        title={myblog?.value?.imageTitle || myblog?.value.title}
        priority={true}
        fill={true}
        loading="eager"
        className="-z-10 w-full h-full object-cover absolute top-0 scale-105 blur-[1px] md:blur-[1px] transform-gpu"
      />
      {/* Subtle bottom gradient overlay to improve subtitle readability */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/35 via-black/15 to-transparent" />
      <Container className="gap-8">
        <Badge>{myblog?.value?.article_category}</Badge>
        <div className="inline-block rounded-xl bg-black/50 md:bg-black/40 px-4 py-2 backdrop-blur-[2px]">
          <h1
            style={{ fontSize: myblog?.value?.titleFontSize || 48 }}
            className={`${bannerTitleFont.className} font-semibold tracking-tight max-w-screen-md`}
          >
            {myblog?.value?.title}
          </h1>
        </div>
        <div className="inline-block rounded-lg bg-black/50 md:bg-black/40 px-3 py-2 backdrop-blur-[2px]">
          <p
            style={{
              fontSize: myblog?.value?.taglineFontSize || 18,
            }}
            className={`${bannerTitleFont.className} leading-snug`}
          >
            {myblog?.value?.tagline}
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 text-white/90 md:text-white/80 font-medium">
          <p className="tracking-wide">{myblog?.value?.author}</p> -
          <p className="whitespace-nowrap">{myblog?.value?.published_at}</p>
        </div>
      </Container>
    </FullContainer>
  );
}
