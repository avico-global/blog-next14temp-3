import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import React from "react";
import Link from "next/link";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

export default function Rightbar({
  project_id,
  lastFiveBlogs,
  imagePath,
  tags,
  page,
  about_me,
}) {
  const content = md.render(about_me?.value || "");

  return (
    <div className="h-fit sticky top-0">
      <div className="flex flex-col">
        {lastFiveBlogs?.length > 0 && (
          <div className="mb-7">
            <div className="bg-black text-white py-2 px-4 font-semibold capitalize">
              Latest Posts
            </div>
            {lastFiveBlogs?.reverse().map((item, index) => (
              <div key={index} className="grid grid-cols-widget gap-3 py-3">
                <Link
                  href={
                    project_id
                      ? `/${item.article_category.name}/${item.key}?${project_id}`
                      : `/${item.article_category.name}/${item.key}`
                  }
                >
                  <div className="overflow-hidden relative min-h-20 w-full bg-black flex-1">
                    <Image
                      title={item?.imageTitle}
                      src={
                        item?.image
                          ? `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${item.image}`
                          : "/no-image.png"
                      }
                      fill={true}
                      loading="lazy"
                      alt="blog"
                      className="w-full h-full object-cover absolute top-0 hover:scale-125 transition-all"
                    />
                  </div>
                </Link>
                <div>
                  <p className="font-bold leading-tight">{item?.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs">
                      <span className="text-gray-400 text-xs">By</span>:{" "}
                      {item?.author}
                    </p>
                    <span className="text-gray-400">-</span>
                    <p className="text-xs text-gray-400 font-semibold">
                      {item?.published_at}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tags?.length > 0 && (
          <>
            <div className="bg-black text-white py-2 px-4 font-semibold capitalize mb-14">
              Tags
            </div>
            <div className="flex items-center gap-1 flex-wrap mt-3">
              {tags?.map((item, index) => (
                <p
                  key={index}
                  className="bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer rounded py-1 text-xs px-3"
                >
                  {item}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
      {page !== "about" && (
        <div className="border p-5 flex flex-col items-center text-center mb-10">
          <h2 className="bg-white px-5 font-bold text-lg -mt-9">About</h2>
          <div className="relative overflow-hidden w-full h-40 mt-8">
            <Image
              src={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${about_me.file_name}`}
              alt="Background Image"
              priority={true}
              fill={true}
              loading="eager"
              className="-z-10 w-full h-full object-cover absolute top-0"
            />
          </div>
          <div
            className="mt-3"
            dangerouslySetInnerHTML={{ __html: `${content.slice(0, 100)}...` }}
          ></div>
          <p className="mt-3 underline text-sm font-bold">Read More</p>
        </div>
      )}

      <div className="border p-5 mt-6 flex flex-col items-center text-center">
        <h2 className="bg-white px-5 text-lg font-bold -mt-9">
          Connect & Follow
        </h2>
        <div className="flex items-center justify-center gap-2 text-gray-400 mt-3">
          <Facebook className="w-5" />
          <Twitter className="w-5" />
          <Instagram className="w-5" />
        </div>
      </div>

      <div className="bg-gray-50 p-6 mt-10 text-center flex flex-col items-center">
        <h2 className="font-bold text-lg">Newsletter</h2>
        <div className="border-2 w-14 my-3 border-black"></div>
        <p className="text-sm mt-1">
          Subscribe to our newsletter for exclusive content and all of the
          behind the scenes details.
        </p>
        <Input placeholder="Email" className="mt-5" />
        <Button className="w-full mt-2">Subscribe</Button>
      </div>
    </div>
  );
}
