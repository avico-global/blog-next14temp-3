import React from "react";
import FullContainer from "../../common/FullContainer";
import Container from "../../common/Container";
import PopularPosts from "../PopularPosts";
import LatestPosts from "../LatestPosts";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { sanitizeUrl } from "@/lib/myFun";

export default function FooterStyle1({
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
    <FullContainer className="bg-white text-black py-16 mt-12 border-t border-gray-200 ">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-footer gap-12 w-full">
          <LatestPosts blog_list={blog_list} imagePath={imagePath} />
          <PopularPosts blog_list={blog_list} imagePath={imagePath} />
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col">
              <p className="font-bold text-lg tracking-wide mb-4">Categories</p>
              {categories?.map((item, index) => (
                <Link
                  key={index}
                  title={item?.title || "Article Link"}
                  href={`/${sanitizeUrl(item.title)}`}
                  className={cn(
                    "uppercase text-sm mb-2 hover:underline w-fit transition-colors",
                    category === item.title && "border-b-2 border-purple-500"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-lg tracking-wide mb-4">Quick Links</p>
              <Link
                title="Home"
                href="/"
                className="uppercase text-sm mb-2 hover:underline w-fit transition-colors"
              >
                Home
              </Link>
              <Link
                title="About"
                href="/about"
                className="uppercase text-sm mb-2 hover:underline w-fit transition-colors"
              >
                About
              </Link>
              <Link
                title="Contact"
                href="/contact"
                className="uppercase text-sm mb-2 hover:underline w-fit transition-colors"
              >
                Contact
              </Link>
              <Link
                title="Terms & Conditions"
                href="/terms-and-conditions"
                className="uppercase text-sm mb-2 hover:underline w-fit transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                title="Privacy Policy"
                href="/privacy-policy"
                className="uppercase text-sm mb-2 hover:underline w-fit transition-colors"
              >
                Privacy Policy
              </Link>
              <Link title="Sitemap" href="/sitemap.xml" legacyBehavior>
                <a
                  title="Sitemap"
                  onClick={handleClick}
                  className="uppercase text-sm mb-2 hover:underline w-fit transition-colors"
                >
                  Sitemap
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Optional copyright bar */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-xs flex items-center justify-between">
          <p>© 2025 YourBrand — All Rights Reserved</p>
          <div className="flex items-center gap-3 opacity-70">
          
            
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
