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
  // const defaultDomain = "abcUsama1122.usama";
  const defaultDomain = "custom-wheels-car-rims.sitebuilderz.com";
  // const defaultDomain = "blog-next14temp-3.amplifytest1.top";
  // const defaultDomain = "usama.com";

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
  const isProject = domain.endsWith("sitebuilderz.com");
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

export const robotsTxt = async () => {
  const isTestLink = checkDomain(domain);
  const isProject = domain.endsWith("sitebuilderz.com");

  let baseURL;
  if (!isTestLink && !isProject) {
    baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data_by_domain/${domain}/data`;
  }

  const robotxt = await callBackendApi({ domain, type: "robotxt" });
  const filePath = path.join(process.cwd(), "public", "robots.txt");
  fs.writeFileSync(filePath, robotxt?.data[0]?.value, "utf8");
};

// Get the image path based on project ID and domain type
export const getImagePath = (project_id) => {
  return project_id
    ? `project_images/${project_id}`
    : `industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}`;
};

// Concatenate base URL and relative URL ensuring proper formatting
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

// Generate sitemaps based on domain and query
export async function getSitemaps({ domain }) {
  try {
    const data = await callBackendApi({ domain });
    if (!data?.status) return [];

    const blog_list = data?.data?.find(({ key }) => key === "blog_list")?.value;
    const categories = [
      "",
      "about",
      "contact",
      ...data?.data?.find(({ key }) => key === "categories")?.value,
    ];
    const currentDate = new Date().toISOString();
    const [datePart, timePart] = currentDate.split("T");
    const formattedDate = `${datePart}T${timePart.split(".")[0]}+00:00`;

    const urls = [
      ...categories.map((item) => ({
        loc: withBaseUrl(domain, `/${item}`),
        lastmod: formattedDate,
      })),
      ...blog_list.map((item) => ({
        loc: withBaseUrl(domain, `/${item.article_category.name}/${item.key}`),
        lastmod: formattedDate,
      })),
    ];

    const sitemaps = [];
    while (urls.length) {
      sitemaps.push(urls.splice(0, 200));
    }
    return sitemaps;
  } catch (err) {
    console.log("👊 ~ getSitemaps ~ err:", err);
    return [];
  }
}
