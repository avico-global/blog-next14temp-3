import React from "react";
import FullContainer from "../../common/FullContainer";
import Container from "../../common/Container";
import Image from "next/image";
import Style1 from "./Style1";
import Style2 from "./Style2";
import Style3 from "./Style3";
import Style4 from "./Style4";
import Style5 from "./Style5";
import Style6 from "./Style6";
import Style7 from "./Style7";
import Style8 from "./Style8";
import Style9 from "./Style9";
export default function Banner({ image, data }) {
  const renderActiveStyle = () => {
    const props = {
      image,
      data,
    };

    switch (data?.active) {
      case "style_1":
        return <Style1 {...props} />;
      case "style_2":
        return <Style2 {...props} />;
      case "style_3":
        return <Style3 {...props} />;
      case "style_4":
        return <Style4 {...props} />;
      case "style_5":
        return <Style5 {...props} />;
      case "style_6":
        return <Style6 {...props} />;
      case "style_7":
        return <Style7 {...props} />;
      case "style_8":
        return <Style8 {...props} />;
      case "style_9":
        return <Style9 {...props} />;
      default:
        return null;
    }
  };

  console.log("👊 ~ Banner ~ image:", image);
  return (
    <>
      {renderActiveStyle()}
      {/* 
      <FullContainer
        className="min-h-[63vh] overflow-hidden p-10 text-center"
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
            style={{ fontSize: data.titleFontSize || 48 }}
            className="font-bold capitalize max-w-screen-md"
          >
            {data.title}
          </h1>
          {data.tagline && (
            <p
              style={{ fontSize: data.taglineFontSize || 18 }}
              className="leading-tight md:leading-none"
            >
              {data.tagline}
            </p>
          )}
        </Container>
      </FullContainer> */}
    </>
  );
}
