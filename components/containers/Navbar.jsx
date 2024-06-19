import React, { useState, useRef, useEffect } from "react";
import FullContainer from "../common/FullContainer";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Menu, Search, Twitter } from "lucide-react";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

export default function Navbar({
  logo,
  project_id,
  blog_list,
  categories,
  category,
  contact_details,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const searchContainerRef = useRef(null);
  const router = useRouter();
  const currentPath = router.asPath;
  const isActive = (path) => currentPath === path;

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

  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };
  const addFromRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addFromRef.current && !addFromRef.current.contains(event.target)) {
        if (sidebar) toggleSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebar, toggleSidebar]);

  const socialIcons = {
    Facebook: <Facebook className="w-5 h-5" />,
    Instagram: <Instagram className="w-5 h-5" />,
    Twitter: <Twitter className="w-5 h-5" />,
  };

  return (
    <FullContainer className="bg-white shadow sticky top-0 z-10 py-4 md:py-0">
      <div className="grid grid-cols-2 md:grid-cols-3 w-11/12 md:w-10/12 mx-auto">
        <div className="hidden md:flex items-center">
          <Link
            href={project_id ? `/?${project_id}` : "/"}
            className={cn(
              "font-semibold text-gray-500 capitalize border-b-2 border-transparent hover:text-black hover:border-black transition-all px-2 py-4",
              isActive("/") && "border-black text-black"
            )}
          >
            Home
          </Link>
          {categories?.map((item, index) => (
            <Link
              key={index}
              href={project_id ? `/${item}?${project_id}` : `/${item}`}
              className={cn(
                "font-semibold text-gray-500 capitalize hover:text-black border-transparent transition-all py-4 px-2 border-b-2 hover:border-black",
                (category === item || isActive(`/${item}`)) &&
                  "border-black text-black"
              )}
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="flex items-center md:justify-center">
          <Link href="/">
            <Image
              height={50}
              width={180}
              src={logo}
              alt="logo"
              className="h-8 md:h-10 w-auto"
            />
          </Link>
        </div>
        <div
          className="flex items-center justify-end gap-3 text-gray-500 relative"
          ref={searchContainerRef}
        >
          <div className="hidden md:flex items-center gap-3">
            {contact_details?.socials?.map((item, index) => (
              <Link key={index} href={item.link} aria-label={item.name}>
                {socialIcons[item.name]}
              </Link>
            ))}
            {"|"}
          </div>
          <Search
            className="w-5 md:w-4 text-black cursor-pointer"
            onClick={handleSearchToggle}
          />
          <Menu
            onClick={toggleSidebar}
            className="w-6 h-6 md:hidden ml-1 text-black"
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

      <div
        ref={addFromRef}
        className={`h-screen w-7/12 transition-all z-50 fixed right-0 top-0 px-4 bg-white dark:bg-gray-800 capitalize ${
          sidebar && "shadow-xl"
        }`}
        style={{ transform: sidebar ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex items-center justify-end gap-3 h-[52px]">
          <Search
            className="w-5 md:w-4 text-black cursor-pointer"
            onClick={() => {
              toggleSidebar();
              handleSearchToggle();
            }}
          />
          <Menu onClick={toggleSidebar} className="w-6 h-6 md:hidden ml-1" />
        </div>
        <div className="flex flex-col mt-5">
          <Link
            href={project_id ? `/?${project_id}` : "/"}
            className={cn(
              "font-semibold text-gray-500 capitalize border-b hover:text-black hover:border-black transition-all px-2 py-3",
              isActive("/") && "border-black text-black"
            )}
          >
            Home
          </Link>
          {categories?.map((item, index) => (
            <Link
              key={index}
              href={project_id ? `/${item}?${project_id}` : `/${item}`}
              className={cn(
                "font-semibold text-gray-500 capitalize hover:text-black transition-all py-3 px-2 border-b hover:border-black",
                (category === item || isActive(`/${item}`)) &&
                  "border-black text-black"
              )}
            >
              {item}
            </Link>
          ))}
          <Link
            href={project_id ? `/?${project_id}` : "/"}
            className={cn(
              "font-semibold text-gray-500 capitalize border-b hover:text-black hover:border-black transition-all px-2 py-3",
              isActive("/about") && "border-black text-black"
            )}
          >
            About
          </Link>
          <Link
            href={project_id ? `/?${project_id}` : "/"}
            className={cn(
              "font-semibold text-gray-500 capitalize border-b hover:text-black hover:border-black transition-all px-2 py-3",
              isActive("/contact") && "border-black text-black"
            )}
          >
            Contact
          </Link>
        </div>
      </div>
    </FullContainer>
  );
}
