import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

export default function BlogBannerStyle9({ myblog, imagePath }) {
  return (
    <>
      <div 
        style={{
          backgroundColor: `rgba(0, 0, 0, ${myblog?.opacity})`,
          color: myblog?.textColor || "white",
        }}
        className=" mx-auto max-w-[1550px]  border-b"
      >
        <FullContainer 
          className="group overflow-hidden p-6 items-center gap-6 lg:gap-10 relative"
          style={{
            color: myblog?.textColor || "white",
          }}
        >
          {/* Subtle radial glow for depth */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
          {/* Title Column */}
          <div className="flex flex-col justify-center items-center lg:items-start py-10 lg:py-16 lg:px-6 text-center lg:text-left relative z-10">
            <div className="flex flex-col gap-3 lg:max-w-4xl">
              <div className="inline-block rounded-xl bg-white/80 px-5 py-3 text-gray-900 backdrop-blur-[2px] transition-all duration-300 hover:shadow-md">
                <h1
                  style={{ fontSize: myblog?.titleFontSize || 52 }}
                  className="font-extrabold capitalize text-4xl lg:text-5xl tracking-tight"
                >
                  {myblog?.value.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Tagline Column */}

          {/* Button Row */}
          <div className="lg:col-span-3 flex flex-col items-center gap-4 relative z-10">
            <div className="inline-block rounded-lg bg-white/75 px-4 py-2 text-gray-800 backdrop-blur-[2px] transition-all duration-300 hover:shadow-sm">
              <p
                style={{
                  fontSize: myblog?.taglineFontSize || 18,
                }}
                className="leading-relaxed"
              >
                {myblog?.value.tagline}
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 text-sm text-gray-900">
              <span className="inline-flex items-center rounded-full px-3 py-1 bg-white/80 ring-1 ring-gray-300 transition-transform duration-300 hover:scale-[1.03]">
                {myblog?.value?.author}
              </span>
              <span className="text-white/80">•</span>
              <span className="inline-flex items-center rounded-full px-3 py-1 bg-white/80 ring-1 ring-gray-300 transition-transform duration-300 hover:scale-[1.03]">
                {myblog?.value.published_at}
              </span>
            </div>
            <div>
              <Badge className="rounded-full px-3 py-1 bg-white/80 text-gray-900 ring-1 ring-gray-300">
                {myblog?.value?.article_category}
              </Badge>
            </div>
          </div>
        </FullContainer>
      </div>
    </>
  );
}
