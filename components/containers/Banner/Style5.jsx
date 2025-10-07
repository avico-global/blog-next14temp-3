import React from "react";
import FullContainer from "../../common/FullContainer";
import Image from "next/image";
import Link from "next/link";
import { Divide, Search } from "lucide-react";
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
            backgroundColor: `rgba(0, 0, 0, ${data?.opacity / 100})`,
            color: data.textColor || "white",
          }}
          className="flex flex-col justify-center p-8 lg:p-12 text-center lg:text-left order-2 lg:order-1"
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

            <div
              ref={searchContainerRef}
              className="relative w-full lg:w-4/5 flex items-center gap-3 py-3 px-5 bg-white rounded-full mt-6"
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
                <div className="absolute top-full p-1 text-start lg:p-3 left-0 bg-white shadow-2xl rounded-md mt-1 z-10 mx-auto w-11/12 lg:w-[500px]">
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
