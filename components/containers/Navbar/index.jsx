import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import Style1 from "./Style1";
import Style2 from "./Style2";
import Style3 from "./Style3";
import Style4 from "./Style4";

const Navbar = ({
  logo,
  blog_list,
  categories,
  category,
  imagePath,
  nav_type,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const searchContainerRef = useRef(null);
  const addFromRef = useRef();
  const router = useRouter();
  const currentPath = router.asPath;
  const isActive = (path) => currentPath === path;

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const handleSearchToggle = () => {
    setOpenSearch((prev) => !prev);
    if (!openSearch) setSearchQuery("");
  };

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setOpenSearch(false);
      setSearchQuery("");
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

  const toggleSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const handleClickOutsideSidebar = (event) => {
      if (addFromRef.current && !addFromRef.current.contains(event.target)) {
        if (sidebar) toggleSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutsideSidebar);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSidebar);
    };
  }, [sidebar]);

  const filteredBlogs = blog_list?.filter((item) =>
    item?.title?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  const staticPages = [
    { page: "Home", href: "/" },
    { page: "About Us", href: "/about" },
    { page: "Contact Us", href: "/contact" },
  ];

  console.log("nav type", nav_type);

  const renderActiveStyle = () => {
    switch (nav_type?.active) {
      case "style_1":
        return (
          <Style1
            logo={logo}
            category={category}
            staticPages={staticPages}
            toggleSidebar={toggleSidebar}
            isActive={isActive}
            imagePath={imagePath}
            openSearch={openSearch}
            searchContainerRef={searchContainerRef}
            handleSearchChange={handleSearchChange}
            handleSearchToggle={handleSearchToggle}
            filteredBlogs={filteredBlogs}
            categories={categories}
          />
        );
      case "style_2":
        return (
          <Style2
            logo={logo}
            category={category}
            staticPages={staticPages}
            toggleSidebar={toggleSidebar}
            isActive={isActive}
            imagePath={imagePath}
            openSearch={openSearch}
            searchQuery={searchQuery}
            searchContainerRef={searchContainerRef}
            handleSearchChange={handleSearchChange}
            handleSearchToggle={handleSearchToggle}
            filteredBlogs={filteredBlogs}
            categories={categories}
          />
        );
      case "style_3":
        return (
          <Style3
            logo={logo}
            category={category}
            staticPages={staticPages}
            toggleSidebar={toggleSidebar}
            isActive={isActive}
            imagePath={imagePath}
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            filteredBlogs={filteredBlogs}
            categories={categories}
          />
        );
      case "style_4":
        return (
          <Style4
            logo={logo}
            category={category}
            staticPages={staticPages}
            toggleSidebar={toggleSidebar}
            isActive={isActive}
            imagePath={imagePath}
            openSearch={openSearch}
            searchQuery={searchQuery}
            searchContainerRef={searchContainerRef}
            handleSearchChange={handleSearchChange}
            handleSearchToggle={handleSearchToggle}
            filteredBlogs={filteredBlogs}
            categories={categories}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderActiveStyle()}
      <div
        ref={addFromRef}
        className={`h-screen w-7/12 transition-all overflow-y-scroll z-50 fixed right-0 top-0 px-4 bg-white dark:bg-gray-800 capitalize ${
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
            href="/"
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
              href={`/${item}`}
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
            href="/about"
            className={cn(
              "font-semibold text-gray-500 capitalize border-b hover:text-black hover:border-black transition-all px-2 py-3",
              isActive("/about") && "border-black text-black"
            )}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={cn(
              "font-semibold text-gray-500 capitalize border-b hover:text-black hover:border-black transition-all px-2 py-3",
              isActive("/contact") && "border-black text-black"
            )}
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
