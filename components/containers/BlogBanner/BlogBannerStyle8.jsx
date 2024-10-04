import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

export default function BlogBannerStyle8({ myblog, imagePath }) {
  return (
    <>
      <div
        style={{
          backgroundColor: `rgba(0, 0, 0, ${data?.opacity})`,
          color: data.textColor || "white",
        }}
      >
        <FullContainer
          className="min-h-[60vh]    overflow-hidden p-4 mx-auto lg:max-w-[1550px] grid lg:grid-cols-3 items-center gap-6 lg:gap-20" // Updated to 3-column grid
          style={{
            color: data.textColor || "white",
          }}
        >
          {/* Title Column */}
          <div className="flex flex-col justify-center items-center lg:items-start space-y-5 py-14 lg:py-28 lg:px-6 lg:rounded-lg text-center lg:text-left">
            <div className="flex flex-col gap-4">
              <h1
                style={{ fontSize: data.titleFontSize || 48 }}
                className="font-bold capitalize text-white text-4xl lg:text-5xl" // Responsive text size
              >
                {data.title}
              </h1>
            </div>
          </div>

          {/* Image Column */}
          <div className="w-full flex justify-center lg:justify-center border-4 rounded-full ">
            <Image
              src={`${imagePath}/${myblog?.file_name}`}
              alt={
                myblog?.value.imageAltText ||
                myblog?.value?.tagline ||
                "No Banner Found"
              }
              title={myblog?.value.imageTitle || myblog?.value.title}
              priority={true}
              fill={true}
              loading="eager"
              className="-z-10 w-full h-full object-cover absolute top-0"
            />
          </div>

          {/* Tagline Column */}
          <div className="flex flex-col justify-center items-center lg:items-end space-y-5 py-14 lg:py-28 lg:px-6 lg:rounded-lg text-center lg:text-right">
            <Badge>{myblog?.value?.article_category}</Badge>
            <h1
              style={{ fontSize: myblog?.value?.titleFontSize || 48 }}
              className="font-bold capitalize max-w-screen-md"
            >
              {myblog?.value.title}
            </h1>
          </div>

          {/* Button Row */}
          <div className="lg:col-span-3 flex justify-center ">
            <p
              style={{
                fontSize: myblog?.value?.taglineFontSize || 18,
              }}
              className="bg-red-800 py-40"
            >
              {myblog?.value.tagline}
            </p>
            <div className="flex items-center justify-center gap-4">
              <p>{myblog?.value.author}</p> -{" "}
              <p>{myblog?.value.published_at}</p>
            </div>
          </div>
        </FullContainer>
      </div>
    </>
  );
}
