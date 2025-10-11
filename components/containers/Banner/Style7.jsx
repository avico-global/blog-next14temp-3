import React from "react";
import Image from "next/image";
import Container from "../../common/Container";
import FullContainer from "../../common/FullContainer";

export default function Style1({ image, data }) {
  return (
    <FullContainer
      className="min-h-[44vh] mx-auto max-w-[1500px] overflow-hidden p-10 text-center"
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
        className="-z-10 w-full absolute top-0"
        style={{ objectFit: "cover" }}
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
      <Container className="gap-6">
        <div className="inline-block rounded-xl bg-white/80 md:bg-white/75 px-4 py-2 text-black backdrop-blur-[2px] ring-1 ring-gray-300">
          <h1
            style={{ fontSize: data.titleFontSize || 48 }}
            className="font-bold capitalize max-w-screen-md"
          >
            {data.title}
          </h1>
        </div>
        {data.tagline && (
          <div className="inline-block rounded-lg bg-white/70 md:bg-white/65 px-3 py-2 text-gray-800 backdrop-blur-[2px] ring-1 ring-gray-300">
            <p
              style={{ fontSize: data.taglineFontSize || 18 }}
              className="leading-snug"
            >
              {data.tagline}
            </p>
          </div>
        )}
      </Container>
    </FullContainer>
  );
}
