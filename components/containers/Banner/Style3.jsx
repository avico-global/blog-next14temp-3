import React from "react";
import FullContainer from "../../common/FullContainer";
import Container from "../../common/Container";
import Image from "next/image";
import { Search } from "lucide-react"; 

export default function Style3({
  image,
  data,
  searchQuery,
  filteredBlogs,
  searchContainerRef,
}) {
  return (
    <FullContainer
      className="min-h-[63vh] overflow-hidden p-10 flex flex-col items-start"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${data?.opacity / 100})`,
        color: data.textColor || "white",
      }}
    >
      <Image
        src={image}
        title={data.imageTitle || data.title || "Banner"}
        alt={data.altImage || data.tagline || "No Banner Found"}
        priority={true}
        fill={true}
        loading="eager"
        className="-z-10 w-full object-cover absolute top-0"
        objectFit="cover"
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
      <Container className="gap-4 flex flex-col items-center lg:items-start lg:ml-40 ">
        <h1
          style={{ fontSize: data.titleFontSize || 48 }}
          className="font-bold capitalize ml-5"
        >
          {data.title}
        </h1>
        {data.tagline && (
          <h2
            style={{ fontSize: data.taglineFontSize || 18 }}
            className="leading-tight md:leading-none ml-5 "
          >
            {data.tagline}
          </h2>
        )}

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
      </Container>
    </FullContainer>
  );
}
