import React from "react";
import FullContainer from "../../common/FullContainer";
import Container from "../../common/Container";
import PopularPosts from "../PopularPosts";
import LatestPosts from "../LatestPosts";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function FooterStyle2({
  categories,
  blog_list,
  imagePath,
  category,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "/sitemap.xml";
  };

  return (
    <FullContainer className="bg-black text-white py-16 mt-12 border-t ">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-footerstyle2 gap-10 ">
          <LatestPosts blog_list={blog_list} imagePath={imagePath} />
          <PopularPosts blog_list={blog_list} imagePath={imagePath} />
        </div>
        <div className="grid mt-8 ">
          <div className=" text-center ">
            <p className="font-bold mb-5 text-center">Categories</p>
            <div className=" flex items-center justify-center  space-x-5  ">
              {categories?.map((item, index) => (
                <Link
                  key={index}
                  title={item?.title || "Article Link"}
                  href={`/${item?.title.toLowerCase()?.replaceAll(" ", "-")}`}
                  className={cn(
                    "uppercase text-sm mb-2 hover:border-b w-fit transition-all",
                    category === item.title && "border-b-2 border-purple-500"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-bold mb-5 text-center ">Quick Links</p>
            <div className=" flex  lg:gap-8 ">
              <Link
                title="Home"
                href="/"
                className="uppercase text-sm mb-2 hover:border-b w-fit transition-all"
              >
                Home
              </Link>
              <Link
                title="About"
                href="/about"
                className="uppercase text-sm mb-2 hover:border-b w-fit transition-all"
              >
                About
              </Link>
              <Link
                title="Contact"
                href="/contact"
                className="uppercase text-sm mb-2 hover:border-b w-fit transition-all"
              >
                Contact
              </Link>
              <Link
                title="Terms & Conditions"
                href="/terms-and-conditions"
                className="uppercase text-sm mb-2 hover:border-b w-fit transition-all"
              >
                Terms & Conditions
              </Link>
              <Link
                title="Privacy Policy"
                href="/privacy-policy"
                className="uppercase text-sm mb-2 hover:border-b w-fit transition-all"
              >
                Privacy Policy
              </Link>
              <Link title="Sitemap" href="/sitemap.xml" legacyBehavior>
                <a
                  title="Sitemap"
                  onClick={handleClick}
                  className="uppercase text-sm mb-2 hover:border-b w-fit transition-all"
                >
                  Sitemap
                </a>
              </Link>
            </div>
          </div>
        </div>
        {/* <p className="mt-8 text-white/70 text-xs">{copyright}</p> */}
      </Container>
    </FullContainer>
  );
}
