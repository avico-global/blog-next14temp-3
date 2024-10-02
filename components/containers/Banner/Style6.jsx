import React from "react";
import FullContainer from "../../common/FullContainer";
import Link from "next/link";
import { Search } from "lucide-react";

export default function Style6({
  data,
  searchQuery,
  filteredBlogs,
}) {
  return (
    <div
      style={{
        backgroundColor: `rgba(0, 0, 0, ${data?.opacity || 0.85})`,
        color: data.textColor || "white",
      }}
    >
      <FullContainer className="min-h-[63vh] flex flex-col justify-center items-center p-10">
        {/* Text Column */}
        <div className="flex flex-col justify-center items-center lg:items-start space-y-5 lg:h-full">
          <h1
            style={{ fontSize: data.titleFontSize || 48 }}
            className="font-bold capitalize text-4xl lg:text-5xl text-center lg:text-left"
          >
            {data.title}
          </h1>
          {data.tagline && (
            <h2
              style={{ fontSize: data.taglineFontSize || 18 }}
              className="leading-tight text-lg lg:text-xl text-center lg:text-left"
            >
              {data.tagline}
            </h2>
          )}

          {/* Search Bar */}
          <div className="relative w-full lg:w-[650px] mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              className="lg:text-xl border border-gray-300 inputField rounded-full outline-none text-black bg-white shadow-xl p-4 pl-12 pr-5 transition-opacity duration-300 ease-in-out w-full focus:ring-2 focus:ring-yellow-500"
              placeholder="Search..."
              autoFocus
            />
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="absolute top-full p-3 right-0 bg-white shadow-2xl mt-1 z-10 mx-auto w-5/6 lg:w-[650px]">
              {filteredBlogs?.length > 0 ? (
                filteredBlogs.map((item, index) => (
                  <Link
                    key={index}
                    title={item.title}
                    href={`/${item.article_category.name
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
      </FullContainer>
    </div>
  );
}
