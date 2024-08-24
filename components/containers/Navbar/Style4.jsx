import { cn } from "@/lib/utils";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import Logo from "./Logo";

export default function Style4({
  staticPages,
  filteredBlogs,
  logo,
  categories,
  isActive,
  searchContainerRef,
  imagePath,
  handleSearchToggle,
  handleSearchChange,
  toggleSidebar,
  openSearch,
  category,
  searchQuery,
}) {
  const navLink =
    "font-semibold capitalize hover:text-white hover:bg-gray-200 border-transparent hover:text-black hover:border-black transition-all px-3 py-2 rounded-md";

  const searchInputRef = useRef(null); // Create a ref for the input

  useEffect(() => {
    if (openSearch && searchInputRef.current) {
      searchInputRef.current.focus(); // Focus the input when openSearch is true
    }
  }, [openSearch]);

  return (
    <div className="border-b text-gray-500 sticky top-0 z-20 bg-white py-6">
      <div className="w-10/12 max-w-screen-lg flex items-center justify-between mx-auto">
        <div className="flex items-center">
          <Logo logo={logo} imagePath={imagePath} />
          {staticPages.map((item, index) => (
            <Link
              key={index}
              title={item.page}
              href={item.href}
              className={cn(
                navLink,
                isActive(item.href) && "bg-black text-white"
              )}
            >
              {item.page}
            </Link>
          ))}
          {categories?.map((item, index) => (
            <Link
              title={item}
              key={index}
              href={`/${item?.toLowerCase()?.replaceAll(" ", "-")}`}
              className={cn(
                navLink,
                (category === item || isActive(`/${item}`)) &&
                  "bg-black text-white"
              )}
            >
              {item}
            </Link>
          ))}
        </div>

        <div
          className="flex items-center justify-end gap-3 text-gray-500 relative"
          ref={searchContainerRef}
        >
          <Search
            className="w-6 md:w-5 text-black cursor-pointer"
            onClick={handleSearchToggle}
          />
          <Menu
            onClick={toggleSidebar}
            className="w-6 h-6 ml-1 text-black lg:hidden"
          />
          {openSearch && (
            <>
              {searchQuery && (
                <div className="absolute top-full p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 w-[calc(100vw-40px)] lg:w-[650px]">
                  {filteredBlogs?.map((item, index) => (
                    <Link
                      title={item.title}
                      key={index}
                      href={`/${item.article_category.name
                        ?.toLowerCase()
                        ?.replaceAll(" ", "-")}/${item?.title
                        ?.replaceAll(" ", "-")
                        ?.toLowerCase()}`}
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
                ref={searchInputRef}
                value={searchQuery}
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-md p-1 transition-opacity duration-300 ease-in-out opacity-100"
                placeholder="Search..."
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
