import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const BlogCard = ({
  href = "#",
  image = "/default-image.jpg",
  title = "Untitled Article",
  tagline = "No content available.",
  altImage = "Article Thumbnail",
  className = "",
  imageTitle = "Article Image",
  imageHeight = "420",
  published_at = "Unknown Date",
}) => {
  return (
    <div
      className={cn("flex flex-col items-center text-center h-fit", className)}
    >
      <Link
        title={imageTitle}
        href={href}
        className={cn("relative overflow-hidden w-full", imageHeight)}
      >
        <Image
          src={image}
          width={331}
          loading="lazy"
          alt={altImage}
          priority={false}
          title={imageTitle}
          height={parseInt(imageHeight, 10) || 420}
          className="w-full h-full object-cover absolute top-0 hover:scale-125 transition-all"
        />
      </Link>
      <div className="flex flex-col items-center gap-2 mt-3">
        <Link
          className="font-extrabold md:text-lg leading-tight hover:underline"
          title={title}
          href={href || "#"}
        >
          {title}
        </Link>
        <p className="text-sm font-medium text-gray-700">{published_at}</p>
      </div>
      <p className="mt-3 text-xs md:hidden">{tagline.slice(0, 100)}</p>
      <p className="mt-3 text-sm hidden md:block">{tagline}</p>
      <Link href={href} className="mt-3">
        <Button className="rounded-full">Read Article</Button>
      </Link>
    </div>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  href: PropTypes.string,
  published_at: PropTypes.string,
  content: PropTypes.string,
  className: PropTypes.string,
  imageHeight: PropTypes.string,
  altImage: PropTypes.string,
  imageTitle: PropTypes.string,
};

export default BlogCard;
