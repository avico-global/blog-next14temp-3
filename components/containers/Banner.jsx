import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Image from "next/image";

export default function Banner({ image, data }) {
  return (
    <FullContainer
      className="min-h-[63vh] overflow-hidden p-10 text-center"
      style={{ backgroundColor: `rgba(0, 0, 0, ${data?.opacity / 100})` }}
    >
      <Image
        src={image}
        title={data.imageTitle}
        alt={data.altImage}
        priority={true}
        fill={true}
        loading="eager"
        className="-z-10 w-full h-full object-cover absolute top-0"
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
      <Container className="gap-8">
        <h1
          style={{ color: data.textColor }}
          className="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl capitalize max-w-screen-md"
        >
          {data.title}
        </h1>
        {data.tagline && (
          <p
            style={{ color: data.textColor }}
            className="leading-tight md:leading-none 2xl:text-xl"
          >
            {data.tagline}
          </p>
        )}
      </Container>
    </FullContainer>
  );
}
