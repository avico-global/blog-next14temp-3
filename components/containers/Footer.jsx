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
  project_id,
  blog_list,
  imagePath,
  copyright,
  category,
}) {
  return (
    <FullContainer className="bg-black text-white py-16 mt-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-footer gap-10 w-full">
          <LatestPosts
            blog_list={blog_list}
            imagePath={imagePath}
            project_id={project_id}
          />
          <PopularPosts
            blog_list={blog_list}
            imagePath={imagePath}
            project_id={project_id}
          />
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col">
              <p className="font-bold mb-5">Categories</p>
              {categories?.map((item, index) => (
                <Link
                  key={index}
                  href={
                    project_id
                      ? `/${item}?project_id=${project_id}`
                      : `/${item}`
                  }
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
                href={project_id ? `/?project_id=${project_id}` : "/"}
                className="uppercase text-sm mb-2 hover:border-b w-fit transition-all"
              >
                Home
              </Link>
              <Link
                href={
                  project_id
                    ? `/${"about"}?project_id=${project_id}`
                    : `/${"about"}`
                }
                className="uppercase text-sm mb-2 hover:border-b w-fit transition-all"
              >
                About
              </Link>
              <Link
                href={
                  project_id
                    ? `/${"contact"}?project_id=${project_id}`
                    : `/${"contact"}`
                }
                className="uppercase text-sm mb-2 hover:border-b w-fit transition-all"
              >
                Contact
              </Link>
              <Link
                href={
                  project_id
                    ? `/${"terms-and-condtions"}?project_id=${project_id}`
                    : `/${"terms-and-condtions"}`
                }
                className="uppercase text-sm mb-2 hover:border-b w-fit transition-all"
              >
                Terms & Conditions
              </Link>
              <Link
                href={
                  project_id
                    ? `/${"privacy-policy"}?project_id=${project_id}`
                    : `/${"privacy-policy"}`
                }
                className="uppercase text-sm mb-2 hover:border-b w-fit transition-all"
              >
                Privacy Policy
              </Link>
              <Link
                href={
                  project_id
                    ? `/${"sitemap.xml"}?project_id=${project_id}`
                    : `/${"sitemap.xml"}`
                }
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
