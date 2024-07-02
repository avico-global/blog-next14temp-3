import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Image from "next/image";

export default function Banner({ title, image, tagline, imageTitle }) {
  return (
    <FullContainer className="min-h-[63vh] overflow-hidden p-10 bg-black/30 text-white text-center">
      <Image
        src={image}
        title={imageTitle}
        alt="Banner"
        priority={true}
        fill={true}
        loading="eager"
        className="-z-10 w-full h-full object-cover absolute top-0"
      />
      <Container className="gap-8">
        <h1 className="font-bold text-3xl md:text-6xl capitalize max-w-screen-md">
          {title}
        </h1>
        {tagline && <p className="leading-tight md:leading-none">{tagline}</p>}
      </Container>
    </FullContainer>
  );
}
