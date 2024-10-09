import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

export default function BlogBannerStyle7({ myblog, imagePath }) {
  return (
    <>
      <FullContainer
        className="min-h-[52vh] mx-auto max-w-[1200px] overflow-hidden p-10 text-center mt-4 bg-black/40"
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
        <div className=" absolute bottom-0 left-0  p-4 " >
          <Badge className={`flex text-start w-28 rounded-none`} >{myblog?.value?.article_category}</Badge>
          <h1
            style={{ fontSize: myblog?.value?.titleFontSize || 34 }}
            className="font-bold   text-start"
          >
            {myblog?.value.title}
          </h1>
          <div className="flex  gap-4">
            <p>{myblog?.value?.author}</p> - <p>{myblog?.value.published_at}</p>
          </div>
        </div>
      </FullContainer>
    </>
  );
}
