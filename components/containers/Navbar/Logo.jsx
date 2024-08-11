import Link from "next/link";
import Image from "next/image";

const Logo = ({ logo, imagePath }) => {
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

  const imageSrc = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`;

  return (
    <Link href="/" className="flex items-center justify-center mr-10">
      {logoType === "image" ? (
        <Image
          height={logoHeight}
          width={logoWidth}
          src={imageSrc}
          alt={logoText || "logo"}
          className="h-8 md:h-10"
          style={{ height: `${logoHeight}px`, width: `${logoWidth}px` }}
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
