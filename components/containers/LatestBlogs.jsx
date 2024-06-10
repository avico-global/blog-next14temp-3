import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Image from "next/image";
import Link from "next/link";
import MarkdownIt from "markdown-it";

const markdownIt = new MarkdownIt();

export default function LatestBlogs({ blogs, imagePath, project_id }) {
  return (
    <FullContainer className="py-16 text-center">
      <Container>
        <h2 className="font-bold text-3xl bg-white px-6">Lastest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8 w-full mt-11 mb-3">
          {blogs?.map((item, index) => (
            <BlogCard
              key={index}
              title={item.title}
              author={item.author}
              date={item.published_at}
              tagline={item.tagline}
              content={item.articleContent}
              image={
                item.image
                  ? `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${item.image}`
                  : "/no-image.png"
              }
              href={
                project_id
                  ? `/${item.article_category.name}/${item.key}?${project_id}`
                  : `/${item.article_category.name}/${item.key}`
              }
            />
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}

function BlogCard({ title, image, content, href }) {
  const convertMarkdown = (markdownText) => markdownIt?.render(markdownText);
  return (
    <Link href={href || ""}>
      <div className="relative overflow-hidden w-full h-80 hover:opacity-80 transition-all">
        <Image
          src={image}
          alt="Background Image"
          priority={true}
          fill={true}
          loading="eager"
          sizes="400px, 300px"
          className="-z-10 w-full h-full object-cover absolute top-0"
        />
      </div>
      <h3 className="font-semibold text-lg mt-4 leading-5">{title}</h3>
      <p className="text-gray-500 mt-2 text-sm">
        {convertMarkdown(content).slice(0, 170)}
      </p>
    </Link>
  );
}
