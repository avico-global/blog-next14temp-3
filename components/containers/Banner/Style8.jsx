import React from "react";
import FullContainer from "../../common/FullContainer";
import Image from "next/image";
import Link from "next/link";

export default function Style8({
  image,
  data,
  searchQuery,
  filteredBlogs,
  searchContainerRef,
}) {
  return (
    <div
      style={{
        backgroundColor: `rgba(0, 0, 0, ${data?.opacity || 1})`,
        color: data.textColor || "white",
      }}
    >
      <FullContainer
        className="min-h-[60vh] overflow-hidden py-10 px-6 mx-auto lg:max-w-[1550px] grid grid-cols-1 lg:grid-cols-3 items-center gap-8 lg:gap-16"
        style={{
          color: data.textColor || "white",
        }}
      >
        {/* Title Column */}
        <div className="flex flex-col justify-center items-start space-y-5 py-8 lg:py-12 lg:px-4 text-left">
          <div className="flex flex-col gap-4">
            <h1
              style={{ fontSize: data.titleFontSize || 48 }}
              className="font-bold capitalize text-white text-4xl lg:text-5xl"
            >
              {data.title}
            </h1>
          </div>
        </div>

        {/* Image Column */}
        <div className="w-full flex justify-center">
          <Image
            src={image}
            height={640}
            width={640}
            alt="Image"
            className="rounded-full object-cover shadow-xl ring-2 ring-white/20"
          />
        </div>

        {/* Tagline Column */}
        <div className="flex flex-col justify-center items-end space-y-5 py-8 lg:py-12 lg:px-4 text-right">
          {data.tagline && (
            <h2
              style={{ fontSize: data.taglineFontSize || 18 }}
              className="leading-relaxed text-white/90 text-lg lg:text-xl"
            >
              {data.tagline}
            </h2>
          )}
        </div>

        {/* Button Row */}
        <div className="lg:col-span-3 flex justify-center mt-6 lg:mt-10">
          <Link
            href="/"
            className="inline-block text-black bg-white py-3 px-6 rounded-full text-lg lg:text-xl hover:text-white hover:bg-black transition-colors duration-300"
          >
            View Our Blogs
          </Link>
        </div>
      </FullContainer>
    </div>
  );
}
