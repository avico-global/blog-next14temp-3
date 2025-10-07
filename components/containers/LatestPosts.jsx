import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";

export default function LatestPosts({ blog_list, imagePath }) {
  return (
    <div className="flex flex-col">
      <p className="font-bold text-lg tracking-wide mb-4">Latest Posts</p>
      {blog_list
        ?.slice(-3)
        .reverse()
        .map((item, index) => (
          <Blog
            key={index}
            title={item.title}
            href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
              item?.title
            )}`}
            image={item.image ? `${imagePath}/${item.image}` : "/no-image.png"}
            author={item.author}
            date={item.published_at}
            imageTitle={item.imageTitle}
            altImage={item.altImage}
            tagline={item.tagline}
          />
        ))}
    </div>
  );
}

function Blog({
  image,
  title,
  href,
  author,
  date,
  altImage,
  imageTitle,
  tagline,
}) {
  return (
    <div className="flex items-center gap-4 mt-4 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
      <Link
        title={title || "Article Thumbnail"}
        href={href || "#"}
        className="relative overflow-hidden w-2/6 h-20 rounded-md ring-1 ring-gray-100"
      >
        <Image
          src={image}
          fill={true}
          loading="eager"
          priority={true}
          sizes="200px, 150px"
          title={imageTitle || title || "Article"}
          alt={altImage || tagline || "No Thumbnail Found"}
          className="w-full h-full object-cover absolute top-0 rounded-md hover:scale-110 transition-transform duration-300"
        />
      </Link>
      <div className="flex-1">
        <Link title={title || "Article Link"} href={href || "#"}>
          <p className="font-semibold text-sm leading-snug hover:underline">{title}</p>
        </Link>
        <div className="flex items-center gap-2 mt-1 text-gray-400 text-xs">
          <p className="truncate">{author}</p>
          <span>·</span>
          <p className="whitespace-nowrap">{date}</p>
        </div>
      </div>
    </div>
  );
}
