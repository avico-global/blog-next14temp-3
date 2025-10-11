import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

export default function BlogBannerStyle5({ myblog, imagePath }) {
  const bannerSrc = myblog?.value?.banner?.file_name
    ? `${imagePath}/${myblog?.value?.banner?.file_name}`
    : myblog?.file_name
    ? `${imagePath}/${myblog?.file_name}`
    : "/no-image.png";
  return (
    <>
      <div
        style={{
          backgroundColor: `rgba(17, 24, 39, ${myblog?.opacity || 0.8})`, // Dark gray background with opacity
          color: myblog?.textColor || "white",
        }}
      >
        <FullContainer
          className="min-h-[63vh] overflow-hidden p-0  grid grid-cols-1 lg:grid-cols-2 items-center gap-0" // Removed padding from grid for flush layout
        >
          {/* Image Column (Left) */}
          <div className="relative w-full h-full group overflow-hidden">
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
              className="-z-10 w-full h-full object-cover absolute top-0 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Soft dark gradient overlay for better contrast */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
          </div>

          {/* Text Column (Right) */}
          <div className="flex flex-col justify-center items-center lg:items-start space-y-6 lg:h-full py-14 lg:py-0 px-10 bg-gray-800 text-center lg:text-left text-white">
            <div className="flex flex-col gap-5 w-full lg:max-w-[80%]">
              <div className="flex flex-col gap-5 py-20">
                {/* Category pill */}
                <span className="self-center lg:self-start inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-gradient-to-r from-white/20 to-white/10 text-white ring-1 ring-white/20 transition-transform duration-300 hover:scale-105">
                  {myblog?.value?.article_category}
                </span>
                <h1
                  style={{ fontSize: myblog?.value?.titleFontSize || 56 }}
                  className="font-extrabold capitalize max-w-screen-md text-white drop-shadow-lg tracking-tight lg:tracking-[0.01em] leading-tight"
                >
                  {myblog?.value.title}
                </h1>
                <p
                  style={{
                    fontSize: myblog?.value?.taglineFontSize || 18,
                  }}
                  className="text-gray-300 leading-relaxed"
                >
                  {myblog?.value?.tagline}
                </p>
                {/* Author and date pills with bullet separator */}
                <div className="flex items-center justify-center lg:justify-start gap-3 text-sm">
                  <span className="inline-flex items-center rounded-full px-3 py-1 bg-white/10 ring-1 ring-white/20 transition-transform duration-300 hover:scale-105">
                    {myblog?.value.author}
                  </span>
                  <span className="text-white/60">•</span>
                  <span className="inline-flex items-center rounded-full px-3 py-1 bg-white/10 ring-1 ring-white/20 transition-transform duration-300 hover:scale-105">
                    {myblog?.value.published_at}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FullContainer>
      </div>
    </>
  );
}
