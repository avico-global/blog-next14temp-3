import fs from "fs";
import path from "path";

// Utility function to clean domain names
export const cleanDomain = (domain) => {
  if (!domain) return domain;
  return domain
    .replace(/\s+/g, "")
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "");
};

// Get the domain name or return the default if the host matches certain criteria
export const getDomain = (host) => {
  const defaultDomain = "abcUsama1122.usama";
  // const defaultDomain = "custom-wheels-car-rims.sitebuilderz.com";
  // const defaultDomain = "blog-next14temp-3.amplifytest1.top";
  // const defaultDomain = "custom-wheels-car-rims.com";

  if (
    host &&
    !["localhost", "vercel", "amplifyapp.com", "amplifytest"].some((sub) =>
      host.includes(sub)
    )
  ) {
    return cleanDomain(host);
  }
  return defaultDomain;
};

// Check if the domain matches specific test or local domains
const checkDomain = (domain) => {
  return (
    domain &&
    [
      "localhost",
      "vercel",
      "amplifyapp",
      "amplifytest",
      "abcUsama1122.usama",
    ].some((sub) => domain.includes(sub))
  );
};

// Extract subdomain from a full domain
const getSubdomain = (domain) => {
  const parts = domain.replace(/(^\w+:|^)\/\//, "").split(".");
  return parts[0];
};

// Call backend API based on the domain and type of request
export const callBackendApi = async ({ domain, type = "" }) => {
  const isTestLink = checkDomain(domain);
  const isProject = domain?.endsWith("sitebuilderz.com");
  const slug = isProject ? getSubdomain(domain) : null;

  let baseURL;
  if (isTestLink) {
    baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/industry_template_data/${process.env.NEXT_PUBLIC_INDUSTRY_ID}/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data`;
  } else if (isProject) {
    baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data_by_slug/${slug}/data`;
  } else {
    baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data_by_domain/${domain}/data`;
  }

  const fileName = baseURL.replace(
    `${process.env.NEXT_PUBLIC_SITE_MANAGER}/`,
    ""
  );
  const filePath = `${domain}/${fileName
    .replaceAll(`/${domain}`, "")
    .replaceAll("/", "_")}/${type}.json`;

  if (typeof window === "undefined") {
    const { checkAPIJson } = require("./serverUtils");
    const data = await checkAPIJson({ filePath });
    if (data) return data;
  }

  try {
    const response = await fetch(`${baseURL}/${type}`);
    if (!response.ok) {
      const error = new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
      error.status = response.status;
      error.statusText = response.statusText;
      error.requestedURL = response.url;
      error.responseBody = await response.text();
      if (
        response.status === 400 &&
        response.statusText === "Bad Request" &&
        error.responseBody.includes("check your parameter")
      ) {
        return {
          error: {
            status: response.status,
            statusText: response.statusText,
            responseBody: error.responseBody,
          },
        };
      }
      throw error;
    }
    const responseData = await response.json();
    if (typeof window === "undefined" && !isTestLink && !isProject) {
      const { saveJson } = require("./serverUtils");
      await saveJson({ filePath, data: responseData });
    }
    return responseData;
  } catch (err) {
    console.error("🚀 ~ callBackendApi ~ error:", err);
    return {
      error: {
        status: err.status,
        statusText: err.statusText,
        responseBody: err.responseBody,
      },
    };
  }
};

export const robotsTxt = async ({ domain }) => {
  const isTestLink = checkDomain(domain);
  const isProject = domain.endsWith("sitebuilderz.com");

  if (!isTestLink && !isProject) {
    const robotxt = await callBackendApi({ domain, type: "robotxt" });
    const filePath = path.join(
      process.cwd(),
      "public",
      `json/${domain}/robots.txt`
    );
    if (robotxt?.data?.[0]?.value) {
      fs.writeFileSync(filePath, robotxt.data[0].value, "utf8");
    } else {
      console.error("Failed to fetch robots.txt content");
    }
  }
};

export const getImagePath = (project_id) => {
  return project_id
    ? `project_images/${project_id}`
    : `industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}`;
};

const withBaseUrl = (baseUrl, relativeUrl) =>
  `${!baseUrl.startsWith("https://") ? "https://" : ""}${
    !baseUrl.startsWith("www.") ? "www." : ""
  }${baseUrl}${
    relativeUrl
      ? relativeUrl.startsWith("/")
        ? relativeUrl
        : `/${relativeUrl}`
      : ""
  }`;

export async function getSitemaps({ domain }) {
  try {
    const data = await callBackendApi({ domain });
    if (!data?.status) return [];

    const tag_list = data?.data?.find(({ key }) => key === "tag_list")?.value;
    const blog_list = data?.data?.find(({ key }) => key === "blog_list")?.value;
    const categories = [
      "",
      "about",
      "contact",
      "privacy policy",
      "terms and conditions",
      ...data?.data?.find(({ key }) => key === "categories")?.value,
    ];
    const currentDate = new Date().toISOString();
    const [datePart, timePart] = currentDate.split("T");
    const formattedDate = `${datePart}T${timePart.split(".")[0]}+00:00`;

    const urls = [
      ...tag_list.map((item) => ({
        loc: withBaseUrl(
          domain,
          `/${item.tag?.replaceAll(" ", "-")?.toLowerCase()}`
        ),
        lastmod: formattedDate,
      })),
      ...categories.map((item) => ({
        loc: withBaseUrl(
          domain,
          `/${item?.toLowerCase()?.replaceAll(" ", "-")}`
        ),
        lastmod: formattedDate,
      })),
      ...blog_list.map((item) => ({
        loc: withBaseUrl(
          domain,
          `/${item.article_category.name
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}/${item.title
            ?.replaceAll(" ", "-")
            ?.toLowerCase()}`
        ),
        lastmod: formattedDate,
      })),
    ];

    const sitemaps = [];
    while (urls.length) {
      sitemaps.push(urls.splice(0, 200));
    }
    return sitemaps;
  } catch (err) {
    console.error("👊 ~ getSitemaps ~ err:", err);
    return [];
  }
}

export const downloadImagesIfNeeded = async (imageUrls, project_id) => {
  const imagesDirectory = path.join(process.cwd(), "public", "images");
  const mappingsFilePath = path.join(imagesDirectory, "imageMappings.js");
  console.log("👊 ~ downloadImagesIfNeeded ~ mappingsFilePath:", mappingsFilePath)

  // Ensure the images directory exists
  if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory, { recursive: true });
  }

  const downloadedImages = [];

  const imagePath = getImagePath(project_id);

  for (const fileName of imageUrls) {
    const filePath = path.join(imagesDirectory, fileName);

    if (fs.existsSync(filePath)) {
      console.log(`Image already exists: ${fileName}, skipping download.`);
    } else {
      try {
        const imageUrl = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${fileName}`;
        const response = await fetch(imageUrl);
        console.log("👊 ~ downloadImagesIfNeeded ~ imageUrl:", imageUrl)

        if (!response.ok) {
          console.error(`Failed to fetch image: ${imageUrl}`);
          continue;
        }

        const buffer = await response.arrayBuffer();
        fs.writeFileSync(filePath, Buffer.from(buffer));
        console.log(`Image downloaded and saved: ${fileName}`);
      } catch (err) {
        console.error(`Error saving image ${fileName}:`, err);
        continue;
      }
    }

    const relativeImagePath = `/images/${fileName}`;

    downloadedImages.push({ image: relativeImagePath });
  }

  const jsContent = `export const data = ${JSON.stringify(
    downloadedImages,
    null,
    2
  )};`;

  try {
    fs.writeFileSync(mappingsFilePath, jsContent, "utf8");
    console.log(`Image mappings saved to ${mappingsFilePath}`);
  } catch (err) {
    console.error(`Error writing image mappings to file: ${err}`);
  }
};
