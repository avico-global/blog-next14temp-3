import React from "react";
import FullContainer from "../../common/FullContainer";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { sanitizeUrl } from "@/lib/myFun";

export default function Style5({
  image,
  data,
  searchQuery,
  filteredBlogs,
  searchContainerRef,
  handleSearchChange,
}) {
  return (
    <FullContainer>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[60vh] lg:min-h-[50vh]">
        {/* Text Content - Left Side */}
        <div
          style={{
            backgroundColor: "#000000", // solid black background
            color: data.textColor || "white",
          }}
          className="flex flex-col justify-center p-8 lg:p-12 text-center lg:text-left order-2 lg:order-1 rounded-xl transition-all duration-300"
        >
          <div className="space-y-6">
            <h1
              style={{ fontSize: data.titleFontSize || 48 }}
              className="font-bold capitalize text-4xl lg:text-5xl leading-tight"
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

            {/* Search Bar */}
            <div
              ref={searchContainerRef}
              className="relative w-full lg:w-4/5 flex items-center gap-3 py-3 px-5 bg-white rounded-full mt-6 shadow-md"
            >
              <Search className="text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="flex-1 bg-transparent outline-none py-2 text-black"
                placeholder="Search..."
                autoFocus
              />
              {searchQuery && (
                <div className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-md mt-1 z-10">
                  {filteredBlogs?.length > 0 ? (
                    filteredBlogs.map((item, index) => (
                      <Link
                        key={index}
                        title={item.title}
                        href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                          item?.title
                        )}`}
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
        </div>

        {/* Image Content - Right Side */}
        <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden order-1 lg:order-2">
          <Image
            src={image}
            title={data.imageTitle || data.title || "Banner"}
            alt={data.altImage || data.tagline || "No Banner Found"}
            priority
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </FullContainer>
  );
}
