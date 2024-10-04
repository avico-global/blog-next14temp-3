import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Badge } from "lucide-react";
import Image from "next/image";
import BlogBannerStyle2 from "./BlogBannerStyle2";
import BlogBannerStyle3 from "./BlogBannerStyle3";
import BlogBannerStyle4 from "./BlogBannerStyle4";
import BlogBannerStyle6 from "./BlogBannerStyle6";
import BlogBannerStyle5 from "./BlogBannerStyle5";
import BlogBannerStyle7 from "./BlogBannerStyle7";
import BlogBannerStyle8 from "./BlogBannerStyle8";
import BlogBannerStyle1 from "./BlogBannerStyle1";
import BlogBannerStyle9 from "./BlogBannerStyle9";

export default function BlogBanner({ myblog, imagePath, blog_type }) {
  const renderActiveStyle = () => {
    const props = {
      myblog,
      imagePath,
    };

    switch (blog_type?.active) {
      case "style_1":
        return <BlogBannerStyle1 {...props} />;
      case "style_2":
        return <BlogBannerStyle2 {...props} />;
      case "style_3":
        return <BlogBannerStyle3 {...props} />;
      case "style_4":
        return <BlogBannerStyle4 {...props} />;
      case "style_5":
        return <BlogBannerStyle5 {...props} />;
      case "style_6":
        return <BlogBannerStyle6 {...props} />;
      case "style_7":
        return <BlogBannerStyle7 {...props} />;
      case "style_8":
        return <BlogBannerStyle8 {...props} />;
      case "style_9":
        return <BlogBannerStyle9 {...props} />;
      default:
        return null;
    }
  };

  return (
    <>
      {renderActiveStyle()}

      {/* <FullContainer
        className="min-h-[62vh] overflow-hidden p-10 text-center"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${myblog?.value?.opacity / 100})`,
          color: myblog?.value?.textColor || "white",
        }}
      >
        <Image
          src={`${imagePath}/${myblog?.file_name}`}
          alt={
            myblog?.value?.imageAltText ||
            myblog?.value?.tagline ||
            "No Banner Found"
          }
          title={myblog?.value?.imageTitle || myblog?.value.title}
          priority={true}
          fill={true}
          loading="eager"
          className="-z-10 w-full h-full object-cover absolute top-0"
        />
        <Container className="gap-8">
          <Badge>{myblog?.value?.article_category}</Badge>
          <h1
            style={{ fontSize: myblog?.value?.titleFontSize || 48 }}
            className="font-bold capitalize max-w-screen-md"
          >
            {myblog?.value?.title}
          </h1>
          <p
            style={{
              fontSize: myblog?.value?.taglineFontSize || 18,
            }}
          >
            {myblog?.value?.tagline}
          </p>
          <div className="flex items-center justify-center gap-4">
            <p>{myblog?.value?.author}</p> -{" "}
            <p>{myblog?.value?.published_at}</p>
          </div>
        </Container>
      </FullContainer> */}
    </>
  );
}
