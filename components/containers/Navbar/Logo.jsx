import Link from "next/link";
import Image from "next/image";

const Logo = ({ logo, imagePath }) => {
  if (!logo || !logo.value) {
    return null;
  }

  const { logoType, logoText } = logo.value;

  const imageSrc = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`;
  const imageHeight = 50;
  const imageWidth = 180;

  return (
    <Link href="/" className="flex items-center justify-center mr-10">
      {logoType === "image" ? (
        <Image
          height={imageHeight}
          width={imageWidth}
          src={imageSrc}
          alt={logoText || "logo"}
          className="h-8 md:h-10 w-auto"
        />
      ) : logoType === "text" ? (
        <h2 className="text-4xl font-extrabold py-1 whitespace-nowrap">
          {logoText}
        </h2>
      ) : null}
    </Link>
  );
};

export default Logo;
