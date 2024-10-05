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
      >
        <FullContainer
          className="    overflow-hidden p-4 mx-auto lg:max-w-[1550px] items-center gap-6 lg:gap-20" // Updated to 3-column grid
          style={{
            color: myblog?.textColor || "white",
          }}
        >
          {/* Title Column */}
          <div className="flex flex-col justify-center items-center lg:items-start space-y-5 py-14 lg:py-28 lg:px-6 lg:rounded-lg text-center lg:text-left">
            <div className="flex flex-col gap-4">
              <h1
                style={{ fontSize: myblog?.titleFontSize || 48 }}
                className="font-bold  text-center  capitalize text-black text-4xl lg:text-5xl" // Responsive text size
              >
                {myblog?.value.title}
              </h1>
            </div>
          </div>

          {/* Tagline Column */}
          <Badge>{myblog?.value?.article_category}</Badge>

          {/* Button Row */}
          <div className="lg:col-span-3 flex justify-center ">
            <p
              style={{
                fontSize: myblog?.taglineFontSize || 18,
              }}
              className=" text-black"
            >
              {myblog?.value.tagline}
            </p>
            <div className="flex items-center justify-center gap-4">
              <p>{myblog?.value?.author}</p> -{" "}
              <p>{myblog?.value.published_at}</p>
            </div>
          </div>
        </FullContainer>
      </div>
    </>
  );
}
