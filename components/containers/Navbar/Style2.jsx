import { cn } from "@/lib/utils";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import Logo from "./Logo";
import { sanitizeUrl } from "@/lib/myFun";

export default function Style2({
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
    "font-semibold capitalize border-b-2 border-transparent hover:text-black hover:border-black transition-all p-3";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        if (openSearch) {
          handleSearchToggle();
        }
        if (searchQuery) {
          handleSearchChange({ target: { value: '' } });
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openSearch, searchQuery]);

  return (
    <>
      <div className="flex items-center justify-center shadow-sm border-b w-full text-gray-500 sticky top-0 z-20 bg-white">
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
        {categories?.map((item, index) => (
          <Link
            key={index}
            title={item?.title}
            href={`/${sanitizeUrl(item?.title)}`}
            className={cn(
              navLink,
              (category === item?.title || isActive(`/${item?.title}`)) &&
                "border-black text-black"
            )}
          >
            {item?.title}
          </Link>
        ))}
        <div
          className="flex items-center justify-end gap-3 relative"
          ref={searchContainerRef}
        >
          {openSearch ? (
            <>
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
                        handleSearchToggle();
                      }}
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
                autoFocus
              />
            </>
          ) : (
            <button
              className="flex items-center gap-1 hover:bg-black hover:text-white transition-all rounded-md font-semibold p-2"
              onClick={handleSearchToggle}
            >
              <Search className="w-5 h-5 text-gray-600 hover:text-black transition-colors cursor-pointer" />
              Search
            </button>
          )}
          <Menu
            onClick={toggleSidebar}
            className="w-6 h-6 ml-1 text-black lg:hidden"
          />
        </div>
      </div>
      <div className="p-10 border-b">
        <Logo logo={logo} imagePath={imagePath} />
      </div>
    </>
  );
}
