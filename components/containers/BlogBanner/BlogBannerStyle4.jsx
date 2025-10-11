import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";

export default function BlogBannerStyle4({ myblog, imagePath }) {
  const bannerSrc = myblog?.value?.banner?.file_name
    ? `${imagePath}/${myblog?.value?.banner?.file_name}`
    : myblog?.file_name
    ? `${imagePath}/${myblog?.file_name}`
    : "/no-image.png";
  return (
    <FullContainer>
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 w-full py-10">
          <div className="flex flex-col gap-5 py-12">
            <Badge className="w-fit rounded-full px-3 py-1 bg-gray-100 text-gray-800 ring-1 ring-gray-300">
              {myblog?.value?.article_category}
            </Badge>
            <h1
              style={{ fontSize: myblog?.value?.titleFontSize || 52 }}
              className="font-extrabold capitalize tracking-tight max-w-3xl"
            >
              {myblog?.value.title}
            </h1>
            <p
              style={{
                fontSize: myblog?.value?.taglineFontSize || 18,
              }}
              className="text-gray-700 leading-relaxed max-w-3xl"
            >
              {myblog?.value.tagline}
            </p>
            <div className="flex items-center gap-3 mt-2 text-sm">
              <span className="inline-flex items-center rounded-full px-3 py-1 bg-gray-100 text-gray-800 ring-1 ring-gray-300">
                {myblog?.value.author}
              </span>
              <span className="text-gray-500">•</span>
              <span className="inline-flex items-center rounded-full px-3 py-1 bg-gray-100 text-gray-800 ring-1 ring-gray-300">
                {myblog?.value.published_at}
              </span>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-black/10 group">
            <Image
              src={bannerSrc}
              alt={
                myblog?.value.imageAltText ||
                myblog?.value?.tagline ||
                "No Banner Found"
              }
              title={myblog?.value.imageTitle || myblog?.value.title}
              priority={true}
              fill={true}
              loading="eager"
              className="-z-10 w-full object-cover top-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-black/10 to-transparent" />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
