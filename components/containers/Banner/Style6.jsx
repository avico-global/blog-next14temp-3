import React from "react";
import FullContainer from "../../common/FullContainer";
import Link from "next/link";
import { Search } from "lucide-react";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";

export default function Style6({
  data,
  searchQuery,
  filteredBlogs,
  image,
  handleSearchChange,
  searchContainerRef,
}) {
  return (
    <FullContainer>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[60vh] lg:min-h-[50vh] py-10">
        {/* Text Content - Left Side */}
        <div
          style={{
            color: data.textColor || "black",
          }}
          className="flex flex-col justify-center p-8 lg:p-12 text-center lg:text-left order-2 lg:order-1 space-y-6"
        >
          <h1
            style={{ fontSize: data.titleFontSize || 48 }}
            className="font-bold capitalize text-4xl lg:text-5xl"
          >
            {data.title}
          </h1>
          {data.tagline && (
            <h2
              style={{ fontSize: data.taglineFontSize || 18 }}
              className="leading-tight text-lg lg:text-xl"
            >
              {data.tagline}
            </h2>
          )}

          {/* Custom Heading and Subheading */}
          <div className="w-full lg:w-4/5 space-y-4">
            <h2 className="font-extrabold text-4xl lg:text-5xl leading-tight tracking-tight text-black">
              Empowering Digital Growth
            </h2>
            <p className="text-base lg:text-lg leading-relaxed text-gray-700">
              Discover insights, trends, and stories that help your brand thrive in the modern digital world.
            </p>
          </div>
        </div>

        {/* Image Content - Right Side */}
        <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden order-1 lg:order-2">
          <Image
            src={image}
            title={data.imageTitle || data.title || "Banner"}
            alt={data.altImage || data.tagline || "No Banner Found"}
            priority={true}
            fill={true}
            loading="eager"
            className="object-cover"
            sizes="(max-width: 320px) 320px,
               (max-width: 480px) 480px,
               (max-width: 768px) 768px,
               (max-width: 1024px) 1024px,
               (max-width: 1280px) 1280px,
               (max-width: 1600px) 1600px,
               (max-width: 1920px) 1920px,
               (max-width: 2560px) 2560px,
               (max-width: 3840px) 3840px,
               100vw"
          />
        </div>
      </div>
    </FullContainer>
  );
}
