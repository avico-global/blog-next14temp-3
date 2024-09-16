import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = ({ logo, imagePath }) => {
  const [hostName, setHostName] = useState("");
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  ); // Default width

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostName(window.location.hostname);

      // Event listener to track window resizing
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      // Clean up the event listener
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  if (!logo || !logo.value) {
    return null;
  }

  const {
    logoType,
    logoText,
    logoHeight,
    logoWidth,
    fontSize,
    isBold,
    isItalic,
  } = logo.value;

  const imageSrc = `${imagePath}/${logo.file_name}`;

  const dynamicLogoSize = {
    height:
      windowWidth < 768 ? 50 : windowWidth < 1200 ? logoHeight / 2 : logoHeight,
    width:
      windowWidth < 768 ? 100 : windowWidth < 1200 ? logoWidth / 2 : logoWidth,
  };

  return (
    <Link
      title={`Logo - ${hostName}`}
      href="/"
      className="flex items-center justify-center mr-10"
    >
      {logoType === "image" ? (
        <Image
          height={dynamicLogoSize.height}
          width={dynamicLogoSize.width}
          src={imageSrc}
          title={`Logo - ${hostName}`}
          alt={`${logoText || "logo"} - ${hostName}`}
          sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 200px"
          style={{
            height: `${dynamicLogoSize.height}px`,
            width: `${dynamicLogoSize.width}px`,
          }}
        />
      ) : logoType === "text" ? (
        <h2
          className="text-4xl font-extrabold py-1 whitespace-nowrap"
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalic ? "italic" : "normal",
          }}
        >
          {logoText}
        </h2>
      ) : null}
    </Link>
  );
};

export default Logo;
