import React, { useState, useRef, useEffect } from "react";
import FullContainer from "../common/FullContainer";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Search, Twitter } from "lucide-react";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

export default function Navbar({
  logo,
  project_id,
  blog_list,
  categories,
  category,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const searchContainerRef = useRef(null);
  const router = useRouter();
  const currentPath = router.asPath;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchToggle = () => {
    setOpenSearch((prev) => !prev);
    if (!openSearch) {
      setSearchQuery(""); // Reset search query when toggling off
    }
  };

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setOpenSearch(false);
      setSearchQuery(""); // Reset search query when clicking outside
    }
  };

  useEffect(() => {
    if (openSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSearch]);

  const filteredBlogs = blog_list?.filter((item) =>
    item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const isActive = (path) => currentPath === path;

  return (
    <FullContainer className="bg-white shadow py-3 sticky top-0 z-10">
      <div className="grid grid-cols-2 md:grid-cols-3 w-11/12 md:w-10/12 mx-auto">
        <div className="hidden md:flex items-center gap-5">
          <Link
            href={project_id ? `/?${project_id}` : "/"}
            className={cn(
              "font-semibold text-gray-700 capitalize",
              isActive("/") && "border-b-2 border-black"
            )}
          >
            Home
          </Link>
          {categories?.map((item, index) => (
            <Link
              key={index}
              href={project_id ? `/${item}?${project_id}` : `/${item}`}
              className={cn(
                "font-semibold text-gray-700 capitalize",
                (category === item || isActive(`/${item}`)) &&
                  "border-b-2 border-black"
              )}
            >
              {item}
            </Link>
          ))}
        </div>
        <Link href="/" className="flex items-center md:justify-center">
          <Image
            height={50}
            width={180}
            src={logo}
            alt="logo"
            className="h-8 md:h-10 w-auto"
          />
        </Link>
        <div
          className="flex items-center justify-end gap-3 text-gray-500 relative"
          ref={searchContainerRef}
        >
          <div className="hidden md:flex items-center gap-3">
            <Facebook className="w-4" />
            <Twitter className="w-4" />
            <Instagram className="w-4" />
            {"|"}
          </div>
          <Search
            className="w-4 text-black cursor-pointer"
            onClick={handleSearchToggle}
          />
          {openSearch && (
            <>
              {searchQuery && (
                <div className="absolute top-full p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 w-[calc(100vw-40px)] lg:w-[650px]">
                  {filteredBlogs?.map((item, index) => (
                    <Link
                      key={index}
                      href={
                        project_id
                          ? `/${item.article_category.name}/${item.key}?${project_id}`
                          : `/${item.article_category.name}/${item.key}`
                      }
                    >
                      <div className="p-2 hover:bg-gray-200 border-b text-gray-600">
                        {item.title}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-md p-1 transition-opacity duration-300 ease-in-out opacity-100"
                placeholder="Search..."
              />
            </>
          )}
        </div>
      </div>
    </FullContainer>
  );
}
