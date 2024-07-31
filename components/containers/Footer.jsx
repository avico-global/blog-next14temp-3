import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import PopularPosts from "./PopularPosts";
import LatestPosts from "./LatestPosts";
import MarkdownIt from "markdown-it";
import Link from "next/link";
import { cn } from "@/lib/utils";

const md = new MarkdownIt();

export default function Footer({
  categories,
  blog_list,
  imagePath,
  copyright,
  category,
}) {
  return (
    <FullContainer className="bg-black text-white py-16 mt-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-footer gap-10 w-full">
          <LatestPosts blog_list={blog_list} imagePath={imagePath} />
          <PopularPosts blog_list={blog_list} imagePath={imagePath} />
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col">
              <p className="font-bold mb-5">Categories</p>
              {categories?.map((item, index) => (
                <Link
                  key={index}
                  href={`/${item}`}
                  className={cn(
                    "uppercase text-sm mb-2 hover:border-b w-fit transition-all",
                    category === item && "border-b-2 border-purple-500"
                  )}
                >
                  {item}
                </Link>
              ))}
            </div>
            <div className="flex flex-col">
              <p className="font-bold mb-5">Quick Links</p>
              <Link
                href="/"
                className="uppercase text-sm mb-2 hover:border-b w-fit transition-all"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="uppercase text-sm mb-2 hover:border-b w-fit transition-all"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="uppercase text-sm mb-2 hover:border-b w-fit transition-all"
              >
                Contact
              </Link>
              <Link
                href="/terms-and-conditions"
                className="uppercase text-sm mb-2 hover:border-b w-fit transition-all"
              >
                Terms & Conditions
              </Link>
              <Link
                href="privacy-policy"
                className="uppercase text-sm mb-2 hover:border-b w-fit transition-all"
              >
                Privacy Policy
              </Link>
              <Link
                href="/sitemap.xml"
                className="uppercase text-sm mb-2 hover:border-b w-fit transition-all"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>

        {/* <p className="mt-8 text-white/70 text-xs">{copyright}</p> */}
      </Container>
    </FullContainer>
  );
}
