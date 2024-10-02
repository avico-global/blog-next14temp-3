import React from "react";
import FullContainer from "../../common/FullContainer";
import Image from "next/image";
import Link from "next/link";

export default function Style4({
  image,
  data,
  searchQuery,
  filteredBlogs,
  searchContainerRef,
}) {
  return (
    <div
      style={{
        backgroundColor: `rgba(100, 62, 43, ${data?.opacity})`,
        color: data.textColor || "white",
      }}
    >
      <FullContainer
        className="min-h-[63vh] overflow-hidden p-4 mx-auto max-w-[1700px] grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-20" // Adjusted gap for responsiveness
        style={{
          color: data.textColor || "white",
        }}
      >
        {/* Text Column */}
        <div className="flex flex-col justify-center items-center lg:items-start space-y-5 py-14 lg:py-28 lg:px-6 bg-banner lg:rounded-lg text-center lg:text-left"> 
          <div className="flex flex-col gap-4">
            <h1
              style={{ fontSize: data.titleFontSize || 48 }}
              className="font-bold capitalize text-amber-800 text-4xl lg:text-5xl" // Responsive text size
            >
              {data.title}
            </h1>
            {data.tagline && (
              <h2
                style={{ fontSize: data.taglineFontSize || 18 }}
                className="leading-tight text-amber-800 text-lg lg:text-xl" // Responsive tagline size
              >
                {data.tagline}
              </h2>
            )}
          </div>
          <Link
            href="/"
            className="inline-block text-white bg-amber-900 py-3 px-6 rounded-full text-lg lg:text-xl hover:bg-amber-800 transition-colors duration-300"
          >
            View Our Blogs
          </Link>
        </div>

        {/* Image Column */}
        <div className="w-full flex justify-center lg:justify-start lg:mr-20 p-4">
          <Image
            src= "/images/banner.webp"
            height={600} // Adjusted image size for better responsiveness
            width={600}
            alt="Image"
            className="rounded-lg shadow-lg object-cover" // Added styling for the image
          />
        </div>
      </FullContainer>
    </div>
  );
}
