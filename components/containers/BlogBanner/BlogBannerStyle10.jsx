import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";

export default function BlogBannerStyle10({ myblog, imagePath }) {
  const bannerSrc = myblog?.value?.banner?.file_name
    ? `${imagePath}/${myblog?.value?.banner?.file_name}`
    : myblog?.file_name
    ? `${imagePath}/${myblog?.file_name}`
    : "/no-image.png";
  return (
    <FullContainer className="group min-h-[63vh] overflow-hidden p-0 grid grid-cols-1 lg:grid-cols-2 items-center gap-0 relative">
      <div className="relative w-full h-full overflow-hidden">
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
          className="-z-10 w-full h-full object-cover absolute top-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {/* Soft gradient overlay for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-black/15 to-transparent" />
      </div>

      {/* Text Column (Right) */}
      <div className="flex flex-col justify-center items-center lg:items-start space-y-6 lg:h-full p-12 bg-gray-100 text-center lg:text-left relative z-10">
        <div className="flex flex-col gap-5 w-full lg:max-w-[80%]">
          <div className="flex flex-col">
            <Badge className="w-fit rounded-full px-3 py-1 bg-gradient-to-r from-gray-200 to-gray-100 text-gray-800 ring-1 ring-gray-300 transition-transform duration-200 hover:scale-[1.02]">
              {myblog?.value?.article_category}
            </Badge>
            <h1
              style={{ fontSize: myblog?.value?.titleFontSize || 56 }}
              className="font-extrabold capitalize max-w-screen-md mt-5 tracking-tight"
            >
              {myblog?.value.title}
            </h1>
            <p
              style={{
                fontSize: myblog?.value?.taglineFontSize || 18,
              }}
              className="text-gray-600 mt-3 leading-relaxed"
            >
              {myblog?.value?.tagline}
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-3 text-gray-800 mt-6 text-sm">
              <span className="inline-flex items-center rounded-full px-3 py-1 bg-white ring-1 ring-gray-300 transition-transform duration-300 hover:scale-[1.03]">
                {myblog?.value.author}
              </span>
              <span className="text-gray-500">•</span>
              <span className="inline-flex items-center rounded-full px-3 py-1 bg-white ring-1 ring-gray-300 transition-transform duration-300 hover:scale-[1.03]">
                {myblog?.value.published_at}
              </span>
            </div>
          </div>
        </div>
      </div>
    </FullContainer>
  );
}
