import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

export default function BlogBannerStyle7({ myblog, imagePath }) {
  return (
    <>
     <div className="gap-8 justify-center flex text-center items-center mt-4 ">
      <div>

          <Badge>{myblog?.value?.article_category}</Badge>
          <h1
            style={{ fontSize: myblog?.value?.titleFontSize || 48 }}
            className="font-bold capitalize max-w-screen-md text-center"
          >
            {myblog?.value.title}
          </h1>
          <p
            style={{
              fontSize: myblog?.value?.taglineFontSize || 18,
            }}
            className=""
          >
            {myblog?.value.tagline}
          </p>
          <div className="flex items-center justify-center gap-4">
            <p>{myblog?.value?.author}</p> - <p>{myblog?.value.published_at}</p>
          </div>
      </div>

        </div>
      <FullContainer
        className="min-h-[52vh] mx-auto max-w-[1200px] overflow-hidden p-10 text-center"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${myblog?.value?.opacity / 100})`,
          color: myblog.textColor || "white",
        }}
      >
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
       
      </FullContainer>
    </>
  );
}
