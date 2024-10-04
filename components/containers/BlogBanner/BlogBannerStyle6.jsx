import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

export default function BlogBannerStyle6({ myblog, imagePath }) {
  return (
    <>
      <div
        style={{
          backgroundColor: `rgba(0, 0, 0, ${data?.opacity || 0.85})`,
          color: data.textColor || "white",
        }}
      >
        <FullContainer className="min-h-[63vh] flex flex-col justify-center items-center p-10">
          {/* Text Column */}
          <div className="flex flex-col justify-center items-center lg:items-start space-y-5 lg:h-full">
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
          </div>
        </FullContainer>
      </div>
    </>
  );
}
