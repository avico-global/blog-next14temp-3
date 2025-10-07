import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const BlogCard = ({
  href,
  image,
  title,
  tagline,
  altImage,
  className,
  imageTitle,
  imageHeight,
  published_at,
}) => {
  const encodedHref = href ? encodeURI(href) : "#";

  return (
    <div
      className={cn(
        "flex flex-col items-center text-center h-fit card card-hover p-4 md:p-5",
        className
      )}
    >
      <Link
        title={imageTitle}
        href={encodedHref}
        className={cn("relative overflow-hidden w-full rounded-lg", imageHeight)}
      >
        <Image
          src={image}
          width={331}
          height={parseInt(imageHeight, 10) || 420}
          loading="eager"
          alt={altImage}
          priority={true}
          title={imageTitle}
          className="w-full h-full absolute top-0 transition-transform duration-500 ease-out hover:scale-110"
          style={{ objectFit: "cover" }}
        />
      </Link>

      <div className="flex flex-col items-center gap-2 mt-4">
        <Link
          className="font-extrabold md:text-lg leading-tight hover:underline heading"
          title={title}
          href={encodedHref}
        >
          {title}
        </Link>
        <p className="text-sm font-medium subtle">{published_at}</p>
      </div>
      <p className="mt-3 text-xs md:hidden subtle">{tagline.slice(0, 100)}</p>
      <p className="mt-3 text-sm hidden md:block subtle">{tagline}</p>
      <Link href={encodedHref} className="mt-4">
        <Button className="rounded-full shadow-sm hover:shadow-md transition-base">Read Article</Button>
      </Link>
    </div>
  );
};

export default BlogCard;
