import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, Search } from "lucide-react";
import SocialShare from "@/components/common/SocialShare";
import { sanitizeUrl } from "@/lib/myFun";

export default function Style8({
  staticPages,
  filteredBlogs,
  logo,
  categories,
  isActive,
  imagePath,
  handleSearchChange,
  toggleSidebar,
  openSearch,
  searchQuery,
  category,
  domain,
  myblog,
}) {
  const [hoveredCategory, setHoveredCategory] = useState(false);
  const navLink =
    "font-semibold capitalize border-b-2 border-transparent hover:text-black hover:border-black transition-all p-2 whitespace-nowrap";

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (openSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [openSearch]);

  return (
    <div>
      {/* <div className=" bg-black ">
        <div className=" flex items-center justify-between mx-auto text-white max-w-[1300px] pb-1  ">
          <p className="text-xs lg:text-lg py-3">
            {" "}
            Latest Posts: Latest New Ideas For Mens fashion
          </p>
        </div>
      </div> */}
      <div className="border-b text-gray-500 sticky top-0 z-20 bg-white py-6">
        <div className=" flex items-center justify-between mx-auto max-w-[1300px] ">
          <div className="flex ml-6">
            <div className="flex items-center">
              <Logo logo={logo} imagePath={imagePath} />
            </div>

            <div className="hidden lg:flex items-center justify-end">
              {/* Static pages */}
              {[{page:'Home',href:'/'},{page:'About Us',href:'/about'},{page:'Contact Us',href:'/contact'}].map((item, index) => (
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

              {/* Categories dropdown with fixed list */}
              <div className="group relative">
                <button
                  type="button"
                  className={cn(
                    "font-semibold text-gray-500 capitalize border-b-2 border-transparent hover:text-black hover:border-black transition-all px-2 py-4 flex items-center gap-1"
                  )}
                  aria-haspopup="menu"
                  aria-expanded="false"
                >
                  Categories
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div className="absolute top-full right-0 bg-white shadow-2xl rounded-md mt-1 z-10 w-56 p-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity">
                  {["diy","fashion","lifestyle","travel"].map((title, index) => (
                    <Link
                      key={index}
                      title={title}
                      href={`/${sanitizeUrl(title)}`}
                      className="block px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded capitalize"
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 relative">
            {searchQuery && (
              <div className="absolute top-full p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 w-[calc(100vw-40px)] lg:w-[650px]">
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
            <div className="hidden lg:flex items-center border border-gray-300 rounded-md px-2 gap-1">
              <Search className="w-5 h-5 text-gray-600 hover:text-black transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-1 transition-opacity duration-300 ease-in-out opacity-100 flex-1 outline-none"
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
    </div>
  );
}
