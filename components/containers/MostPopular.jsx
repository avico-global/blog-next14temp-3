import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Image from "next/image";

export default function MostPopular({ blogs }) {
  return (
    <FullContainer className="py-16 text-center">
      <Container className="border p-7">
        <h2 className="font-bold text-3xl -mt-11 bg-white px-6">
          Most Popular
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-11 mb-3">
          {blogs?.slice(0, 3)?.map((item, index) => (
            <BlogCard
              key={index}
              title={item.title}
              image={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/${item.image}`}
            />
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}

function BlogCard({ title, image }) {
  return (
    <div>
      <div className="relative overflow-hidden w-full h-52">
        <Image
          src={image}
          alt="Background Image"
          priority={true}
          fill={true}
          loading="eager"
          className="-z-10 w-full h-full object-cover absolute top-0"
        />
      </div>
      <h3 className="font-bold mt-3 leading-5">{title}</h3>
    </div>
  );
}
