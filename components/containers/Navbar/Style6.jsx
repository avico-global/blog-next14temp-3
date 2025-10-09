import { cn } from "@/lib/utils";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { sanitizeUrl } from "@/lib/myFun";

export default function Style6({
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
  myblog,
  domain,
}) {
  const navLink =
    "font-semibold capitalize border-b-2 border-transparent hover:text-gray-400 hover:border-black transition-all p-3";

  return (
    <>
      <div className="bg-white lg:bg-black sticky top-0 z-20">
        <div className="flex justify-between items-center mx-auto max-w-[1700px] shadow-sm w-full py-3 text-white">
          {/* Left: Logo */}
          <div className="hidden lg:flex items-center ml-6">
            <Logo logo={logo} imagePath={imagePath} className="text-white" forceWhite />
          </div>

          {/* Center/Left: Navigation shifted slightly right */}
          <div className="hidden lg:flex ml-6 gap-2">
            {staticPages.map((item, index) => (
              <Link
                key={index}
                title={item.page}
                href={item.href}
                className={cn(
                  navLink,
                  isActive(item.href) && "border-white text-white"
                )}
              >
                {item.page}
              </Link>
            ))}

            {categories?.map((item, index) => (
              <Link
                key={index}
                title={item?.title}
                href={`/${sanitizeUrl(item?.title)}`}
                className={cn(
                  navLink,
                  (category === item.title || isActive(`/${item.title}`)) &&
                    "border-white text-white"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div
            className="flex items-center justify-end gap-3 relative mr-4"
            ref={searchContainerRef}
          >
            {searchQuery && (
              <div className="absolute top-full p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 w-[calc(100vw-40px)] lg:w-[650px]">
                {filteredBlogs?.map((item, index) => (
                  <Link
                    key={index}
                    title={item.title}
                    href={`/${sanitizeUrl(
                      item.article_category
                    )}/${sanitizeUrl(item?.title)}`}
                    onClick={() => {
                      handleSearchChange({ target: { value: '' } });
                    }}
                  >
                    <div className="p-2 hover:bg-gray-200 border-b text-gray-600">
                      {item.title}
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <div className="relative">
              <button
                type="button"
                aria-label="Search"
                onClick={() => {
                  const input = document.getElementById('style6-search-input');
                  if (input) input.focus();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-white transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
              <input
                id="style6-search-input"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-md p-1 pl-8 transition-opacity duration-300 ease-in-out opacity-100 focus:ring-2 focus:ring-yellow-500 bg-white text-black"
                placeholder="Search..."
              />
            </div>
            <Menu
              onClick={toggleSidebar}
              className="w-6 h-6 ml-1 text-black lg:hidden"
            />
          </div>
        </div>
      </div>
    </>
  );
}
