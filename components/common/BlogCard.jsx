import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const BlogCard = ({
  title,
  image,
  href,
  category,
  published_at,
  content,
  className,
  imageHeight,
}) => {
  return (
    <div
      className={cn("flex flex-col items-center text-center h-fit", className)}
    >
      <Link
        href={href || ""}
        className={cn("relative overflow-hidden w-full", imageHeight)}
      >
        <Image
          src={image}
          alt="Background Image"
          priority={true}
          fill={true}
          loading="eager"
          className="-z-10 w-full h-full object-cover absolute top-0 hover:scale-125 transition-all"
        />
      </Link>
      <div className="flex flex-col items-center gap-2 mt-3">
        <p className="italic text-xs w-fit text-center text-gray-400">
          in
          <span className="uppercase text-blue-700 font-medium ml-2 text-xs">
            {category}
          </span>
        </p>
        <h2 className="font-extrabold md:text-lg leading-tight">{title}</h2>
        <p className="text-xs font-medium text-gray-400">{published_at}</p>
      </div>
      <p className="mt-3 text-xs md:hidden">{content.slice(0, 100)}</p>
      <p className="mt-3 text-sm hidden md:block">{content}</p>
      <Link href={href || ""} className="mt-3">
        <Button className="rounded-full">Read More</Button>
      </Link>
    </div>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  published_at: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
  imageHeight: PropTypes.string,
};

export default BlogCard;
