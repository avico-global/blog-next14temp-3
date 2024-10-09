import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

export default function BlogBannerStyle2({ myblog, imagePath }) {
  return (
    <>
      <div
        className=" flex items-center justify-center text-center gap-8 py-24"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${myblog?.opacity / 100})`,
          color: myblog?.textColor || "white",
        }}
      >
        <div>
          <Badge>{myblog?.value?.article_category}</Badge>
          <h1
            style={{ fontSize: myblog?.value?.titleFontSize || 48 }}
            className="font-bold text-black capitalize max-w-screen-md "
          >
            {myblog?.value.title}
          </h1>

          <div className="flex text-black items-center justify-center gap-4">
            <p>{myblog?.value.author}</p> - <p>{myblog?.value.published_at}</p>
          </div>
        </div>
      </div>
      <FullContainer
        style={{
          backgroundColor: `rgba(0, 0, 0, ${myblog?.opacity / 50})`,
          color: myblog?.textColor || "black",
        }}
        className=" min-h-[58vh]  mx-auto max-w-[1000px]  overflow-hidden p-10  text-left "
      >
        <Image
          src={`${imagePath}/${myblog?.file_name}`}
          alt={
            myblog?.value.imageAltText ||
            myblog?.value?.tagline ||
            "No Banner Found"
          }
          title={myblog?.value.imageTitle || myblog?.value?.title}
          priority={true}
          fill={true}
          loading="eager"
          className="-z-10 w-full h-full object-cover absolute top-0 "
        />
      </FullContainer>
    </>
  );
}
