import React, { useEffect, useState } from "react";
import FullContainer from "../common/FullContainer";
import Image from "next/image";
import Container from "../common/Container";

export default function AboutBanner({ image }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <FullContainer className="h-80 overflow-hidden p-10 text-white text-center relative">
      <Image
        src={image}
        title="About Us"
        alt="About Us Banner Not Found"
        priority={true}
        fill={true}
        loading="eager"
        className="-z-10 w-full h-full object-cover absolute top-0"
      />
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />

      <Container className="gap-6 relative">
        <h1
          className={`font-extrabold text-6xl capitalize max-w-screen-md transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          About Us
        </h1>
      </Container>
    </FullContainer>
  );
}
