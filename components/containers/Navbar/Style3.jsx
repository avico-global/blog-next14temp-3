import { cn } from "@/lib/utils";
import { Menu, Search, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import Logo from "./Logo";
import { sanitizeUrl } from "@/lib/myFun";

export default function Style3({
  staticPages,
  filteredBlogs,
  logo,
  categories,
  isActive,
  imagePath,
  handleSearchChange,
  toggleSidebar,
  category,
  searchQuery,
}) {
  const navLink =
    "font-semibold capitalize border-t-2 border-transparent hover:text-black hover:border-black transition-all p-3";
  
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        handleSearchChange({ target: { value: '' } });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="p-10 flex justify-between w-full border-b">
        <div className="w-11/12 max-w-screen-xl mx-auto flex justify-between items-center ">
          <Logo logo={logo} imagePath={imagePath} />
          <div>
            {staticPages.map((item, index) => (
              <Link
                key={index}
                title={item.page}
                href={item.href}
                className={cn(
                  navLink,
                  isActive(item.href) && "border-black text-black"
                )}
              >
                {item.page}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3 relative" ref={searchRef}>
            {searchQuery && (
              <div className="absolute top-full p-3 right-0 z-50 bg-white shadow-2xl rounded-md mt-1 w-[calc(100vw-40px)] lg:w-[650px]">
                {filteredBlogs?.map((item, index) => (
                  <Link
                    key={index}
                    title={item.title}
                    href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                      item?.title
                    )}`}
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
                  const input = document.getElementById('style3-search-input');
                  if (input) input.focus();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-black transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
              <input
                id="style3-search-input"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-md p-1 pl-8 transition-opacity duration-300 ease-in-out opacity-100 focus:ring-2 focus:ring-yellow-500"
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
      <div className="border-b text-gray-500 sticky top-0 z-20 bg-white">
        <div className=" w-11/12 mx-auto">
          <div className="flex items-center justify-center text-center">
            {/* Categories dropdown (dynamic, replaces individual links) */}
            <div className="group relative">
              <button
                type="button"
                className={cn(
                  navLink,
                  "flex items-center gap-1"
                )}
                aria-haspopup="menu"
                aria-expanded="false"
              >
                Categories <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-2xl rounded-md mt-1 z-10 w-56 p-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity">
                {categories?.length > 0 ? (
                  categories.map((item, index) => (
                    <Link
                      key={index}
                      title={item?.title}
                      href={`/${sanitizeUrl(item?.title)}`}
                      className="block px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded capitalize"
                    >
                      {item?.title}
                    </Link>
                  ))
                ) : (
                  <div className="px-3 py-2 text-gray-500">No categories</div>
                )}
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </>
  );
}
