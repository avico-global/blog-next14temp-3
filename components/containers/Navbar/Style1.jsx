import FullContainer from "@/components/common/FullContainer";
import { cn } from "@/lib/utils";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";
import Logo from "./Logo";
import { sanitizeUrl } from "@/lib/myFun";

export default function Style1({
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
  const searchInputRef = useRef(null);
  const searchDropdownRef = useRef(null);

  const handleSearchInputClick = (e) => {
    e.stopPropagation();
    if (!openSearch) {
      handleSearchToggle();
    }
  };

  return (
    <FullContainer className="sticky top-0 z-20 bg-white shadow py-2 lg:py-0">
      <div className="flex justify-between lg:grid grid-cols-nav w-11/12 md:w-10/12 mx-auto items-center">
        <div className="hidden lg:flex items-center">
          {staticPages.map((item, index) => (
            <Link
              key={index}
              title={item.page}
              href={item.href}
              className={cn(
                "font-semibold text-gray-500 capitalize border-b-2 border-transparent hover:text-black hover:border-black transition-all px-2 py-4",
                isActive(item.href) && "border-black text-black"
              )}
            >
              {item.page}
            </Link>
          ))}
        </div>
        <Logo logo={logo} imagePath={imagePath} />
        <div
          ref={searchContainerRef}
          className="flex items-center justify-end gap-3 text-gray-500 relative"
        >
          <div className="hidden lg:flex items-center justify-end">
            {categories?.map((item, index) => (
              <Link
                key={index}
                title={item?.title}
                href={`/${sanitizeUrl(item?.title)}`}
                className={cn(
                  "font-semibold text-gray-500 capitalize hover:text-black border-transparent transition-all py-4 px-2 border-b-2 hover:border-black w-fit",
                  (category === item?.title || isActive(`/${item.title}`)) &&
                    "border-black text-black"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-end gap-3 relative" ref={searchDropdownRef}>
            {searchQuery && (
              <div className="absolute top-full p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 w-[calc(100vw-40px)] lg:w-[650px]">
                {filteredBlogs?.length > 0 ? (
                  filteredBlogs.map((item, index) => (
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
                  ))
                ) : (
                  <div className="p-2 text-gray-600">
                    No articles found.
                  </div>
                )}
              </div>
            )}
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md p-1 transition-opacity duration-300 ease-in-out opacity-100"
              placeholder="Search..."
            />
            <Menu
              onClick={toggleSidebar}
              className="w-6 h-6 ml-1 text-black lg:hidden"
            />
          </div>
        </div>
      </div>
    </FullContainer>
  );
}
