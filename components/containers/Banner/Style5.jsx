import React from "react";
import FullContainer from "../../common/FullContainer";
import Image from "next/image";
import Link from "next/link";
import { Divide, Search } from "lucide-react";

export default function Style5({
  image,
  data,
  searchQuery,
  filteredBlogs,
  searchContainerRef,
}) {
  return (
    <div
      style={{
        backgroundColor: `rgba(0, 0, 0, ${data?.opacity || 0.85})`, // Black background with optional opacity
        color: data.textColor || "white",
      }}
    >
      <FullContainer
        className="min-h-[63vh] overflow-hidden p-0  grid grid-cols-1 lg:grid-cols-2 items-center gap-0" // Removed padding from grid for flush layout
      >
        {/* Image Column (Left) */}
        <div className="relative w-full h-full">
          {" "}
          {/* Ensure the image takes full width and height */}
          <Image
            src={image || "/images/banner.webp"} // Fallback image
            title={data.imageTitle || data.title || "Banner"}
            alt={data.altImage || data.tagline || "No Banner Found"}
            priority={true}
            fill={true} // Fills the parent div
            loading="eager"
            className="   " // Use cover to maintain aspect ratio while filling the div
          />
        </div>

        {/* Text Column (Right) */}
        <div className="flex flex-col justify-center items-center lg:items-start space-y-5 lg:h-full py-14 lg:py-0 px-10 bg-black text-center lg:text-left text-white">
          <div className="flex flex-col gap-4 w-full lg:max-w-[80%]">
            <h1
              style={{ fontSize: data.titleFontSize || 48 }}
              className="font-bold capitalize text-4xl lg:text-5xl" // Responsive text size
            >
              {data.title}
            </h1>
            {data.tagline && (
              <h2
                style={{ fontSize: data.taglineFontSize || 18 }}
                className="leading-tight text-lg lg:text-xl" // Responsive tagline size
              >
                {data.tagline}
              </h2>
            )}
          </div>

          <div className="lg:ml-0 w-full lg:w-fit flex flex-col lg:items-start justify-start">
            {/* Wrapping input field and icon in a relative div */}
            <div className="relative w-5/6 lg:w-[650px] mx-auto">
              {/* Search Icon */}
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={searchQuery}
                className="lg:text-xl border border-gray-300 inputField rounded-full outline-none text-black bg-white shadow-xl p-4 pl-12 pr-5 transition-opacity duration-300 ease-in-out opacity-100 w-full focus:ring-2 focus:ring-yellow-500"
                placeholder="Search..."
                autoFocus
              />
            </div>

            {searchQuery && (
              <div className="lg:absolute top-full p-1 lg:p-3 right-0 bg-white shadow-2xl mt-1 z-10 mx-auto w-5/6 lg:w-[650px]">
                {filteredBlogs?.length > 0 ? (
                  filteredBlogs.map((item, index) => (
                    <Link
                      key={index}
                      title={item.title}
                      href={`/${item.article_category
                        ?.toLowerCase()
                        ?.replaceAll(" ", "-")}/${item?.title
                        ?.replaceAll(" ", "-")
                        ?.toLowerCase()}`}
                    >
                      <div className="p-2 hover:bg-gray-200 border-b text-gray-600">
                        {item.title}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-2 text-gray-600">No articles found.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </FullContainer>
    </div>
  );
}
