import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function MostPopular({ blog_list, imagePath }) {
  return (
    <FullContainer className="py-16 text-center">
      <Container className="border border-gray-100 px-3 py-9 md:px-9">
        <h2 className="font-bold text-3xl -mt-14 bg-white px-6">
          Most Popular
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-11 mb-3">
          {blog_list.map(
            (item, index) =>
              item.isPopular && (
                <BlogCard
                  key={index}
                  title={item.title}
                  author={item.author}
                  date={item.published_at}
                  tagline={item.tagline}
                  description={item.articleContent}
                  image={item.image ? `/images/${item.image}` : "/no-image.png"}
                  href={`/${item?.article_category?.name}/${item?.title
                    ?.replaceAll(" ", "-")
                    ?.toLowerCase()}`}
                  category={item.article_category.name}
                  imageTitle={item.imageTitle}
                  altImage={item.altImage}
                />
              )
          )}
        </div>
      </Container>
    </FullContainer>
  );
}

function BlogCard({ title, image, href, category, imageTitle, altImage }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Link
        title={imageTitle || "Article Thumbnail"}
        href={href || ""}
        className="relative overflow-hidden w-full h-[195px]"
      >
        <Image
          src={image}
          title={imageTitle || "Article Thumbnail"}
          alt={altImage || "No Thumbnail Found"}
          priority={false}
          width={298}
          height={195}
          layout="responsive"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw, 33vw" // Updated sizes attribute
          className="w-full h-full object-cover hover:scale-110 transition-all"
        />
      </Link>
      <Link href={`/${category?.toLowerCase().replaceAll(" ", "-")}`}>
        <Badge className="text-center whitespace-nowrap my-2">{category}</Badge>
      </Link>
      <Link href={href || ""}>
        <p className="font-semibold leading-5 text-lg hover:underline">
          {title}
        </p>
      </Link>
    </div>
  );
}
