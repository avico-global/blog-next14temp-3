import { Circle, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import MarkdownIt from "markdown-it";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";

const md = new MarkdownIt();

export default function Rightbar({
  lastFiveBlogs,
  imagePath,
  tag_list,
  page,
  about_me,
  categories,
  category,
  // contact_details,
}) {
  const content = md.render(about_me?.value || "");
  const router = useRouter();
  const currentPath = router.asPath;
  const isActive = (path) => currentPath === path;

  // const socialIcons = {
  //   Facebook: <Facebook className="w-5 h-5" />,
  //   Instagram: <Instagram className="w-5 h-5" />,
  //   Twitter: <Twitter className="w-5 h-5" />,
  // };ÍÍ

  return (
    <div className="h-fit sticky top-0">
      {lastFiveBlogs?.length > 0 && (
        <div className="border pt-5 px-4 flex flex-col items-center mb-14">
          <h2 className="bg-white px-5 font-bold text-lg -mt-9 text-center">
            Latest Posts
          </h2>
          <div className="flex flex-col my-3">
            {lastFiveBlogs?.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-widget gap-3 py-3 border-b last:border-none"
              >
                <Link
                  title={item.title}
                  href={`/${item.article_category.name}/${item?.title
                    ?.replaceAll(" ", "-")
                    ?.toLowerCase()}`}
                >
                  <div className="overflow-hidden relative min-h-20 w-full bg-black flex-1 rounded">
                    <Image
                      title={item?.imageTitle || "Article Thumbnail"}
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
                  <Link
                    title={item.title}
                    href={`/${item.article_category.name}/${item?.title
                      ?.replaceAll(" ", "-")
                      ?.toLowerCase()}`}
                  >
                    <p className="font-semibold leading-tight hover:underline">
                      {item?.title}
                    </p>
                  </Link>
                  <div className="flex items-center gap-2 mt-1 justify-between text-gray-400">
                    <p className="text-xs">{item?.author}</p>
                    <p className="text-xs whitespace-nowrap">
                      {item?.published_at}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!(page === "about" || page === "category") && (
        <Link
          title="About"
          href="/about"
          className="border p-5 flex flex-col items-center text-center"
        >
          <h2 className="bg-white px-5 font-bold text-lg -mt-9">About</h2>
          <div className="relative overflow-hidden w-full h-40 mt-8">
            <Image
              src={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${about_me?.file_name}`}
              title="About Thumbnail"
              alt="Thumbnail Not Found"
              priority={true}
              fill={true}
              loading="eager"
              className="-z-10 w-full h-full object-cover absolute top-0"
            />
          </div>
          <div
            className="mt-3"
            dangerouslySetInnerHTML={{
              __html: `${content.slice(0, 100)}...`,
            }}
          ></div>
          <p className="mt-3 underline text-sm font-bold">More about me?</p>
        </Link>
      )}

      {/* <div className="border p-5 mt-6 flex flex-col items-center text-center">
        <h2 className="bg-white px-5 text-lg font-bold -mt-9">
          Connect & Follow
        </h2>
        <div className="flex items-center justify-center gap-2 text-gray-400 mt-3">
          {contact_details?.socials?.map((item, index) => (
            <Link key={index} href={item.link} aria-label={item.name}>
              {socialIcons[item.name]}
            </Link>
          ))}
        </div>
      </div> */}

      {/* 
      <div className="bg-gray-50 p-6 mt-10 text-center flex flex-col items-center">
        <h2 className="font-bold text-lg">Newsletter</h2>
        <div className="border-2 w-14 my-3 border-black"></div>
        <p className="text-sm mt-1">
          Subscribe to our newsletter for exclusive content and all of the
          behind the scenes details.
        </p>
        <Input placeholder="Email" className="mt-5" />
        <Button className="w-full mt-2">Subscribe</Button>
      </div> */}

      {categories?.length > 0 && (
        <div className="border p-5 flex flex-col items-center text-center mt-14">
          <h2 className="bg-white px-5 font-bold text-lg -mt-9">Categories</h2>
          <div className="flex flex-col w-full text-left px-2 py-4">
            {categories?.map((item, index) => (
              <Link
                key={index}
                title={item}
                href={`/${item.toLowerCase().replaceAll(" ", "-")}`}
                className={cn(
                  "text-gray-500 capitalize w-full flex items-center gap-2 hover:text-black transition-all p-2 border-b-2 border-gray-100 hover:border-black",
                  (category === item || isActive(`/${item}`)) &&
                    "border-black text-black"
                )}
              >
                <Circle className="w-2 h-2 text-blue-800" />
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}

      {tag_list?.length > 0 && (
        <div className="border pt-5 px-4 flex flex-col items-center text-center mt-16">
          <h2 className="bg-white px-5 font-bold text-lg -mt-9">
            Article Tags
          </h2>
          <div className="flex items-center flex-wrap w-full text-left px-2 py-4 gap-2">
            {tag_list?.map((item, index) => (
              <Link
                key={index}
                title={item.tag}
                href={`/${item.tag?.replaceAll(" ", "-")?.toLowerCase()}`}
                className="bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer rounded py-1 text-sm px-2"
              >
                {item.tag}{" "}
                {item.article_ids?.length > 1 && (
                  <span
                    className={`bg-black text-white px-1 ml-1 text-sm rounded-full`}
                  >
                    {item.article_ids?.length}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
