import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

export default function BlogBannerStyle4({ myblog, imagePath }) {
  return (
    <>
      <FullContainer>
        <Container>
          <div className="grid grid-cols-2 gap-10 w-full py-10">
            <div className="flex flex-col gap-4 py-28">
              <Badge>{myblog?.value?.article_category}</Badge>
              <h1
                style={{ fontSize: myblog?.value?.titleFontSize || 48 }}
                className="font-bold capitalize max-w-screen-md"
              >
                {myblog?.value.title}
              </h1>
              <p
                style={{
                  fontSize: myblog?.value?.taglineFontSize || 18,
                }}
                className="bg-red-800 py-40"
              >
                {myblog?.value.tagline}
              </p>
              <div className="flex items-center justify-center gap-4">
                <p>{myblog?.value.author}</p> -{" "}
                <p>{myblog?.value.published_at}</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden">
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
            </div>
          </div>
        </Container>
      </FullContainer>
    </>
  );
}
