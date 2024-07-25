import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function MostPopular({ blog_list, imagePath, project_id }) {
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
                  image={
                    item.image
                      ? `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${item.image}`
                      : "/no-image.png"
                  }
                  project_id={project_id}
                  href={
                    project_id
                      ? `/${item?.article_category?.name}/${item.key}?project_id=${project_id}`
                      : `/${item?.article_category?.name}/${item.key}`
                  }
                  category={item.article_category.name}
                />
              )
          )}
        </div>
      </Container>
    </FullContainer>
  );
}

function BlogCard({ title, image, href, category }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Link href={href || ""} className="relative overflow-hidden w-full h-52">
        <Image
          src={image}
          alt="Background Image"
          priority={true}
          fill={true}
          loading="eager"
          sizes="400px, 300px"
          className="-z-10 w-full h-full object-cover absolute top-0"
        />
      </Link>
      <Badge className="text-center whitespace-nowrap my-2">{category}</Badge>
      <p className="font-semibold leading-5 text-lg">{title}</p>
    </div>
  );
}
