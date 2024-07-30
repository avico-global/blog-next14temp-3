export const cleanDomain = (domain) => {
  if (!domain) {
    return domain;
  }
  return domain
    .replace(/\s+/g, "")
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "");
};

export const getDomain = (host) => {
  // const defaultDomain = "custom-wheels-car-rims.com";
  // const defaultDomain = "abcUsama1122.usama";
  const defaultDomain = "test-project.sitebuilderz.com";

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

const checkDomain = (domain) => {
  const isValidDomain =
    domain &&
    [
      "localhost",
      "vercel",
      "amplifyapp",
      "amplifytest",
      "abcUsama1122.usama",
      "sitebuilderz.com",
    ].some((sub) => domain.includes(sub));
  return isValidDomain;
};

// Define the getSubdomain function
const getSubdomain = (domain) => {
  domain = domain.replace(/(^\w+:|^)\/\//, "");
  let parts = domain.split(".");
  let subdomain = parts[0];
  return subdomain;
};

// Define the callBackendApi function
export const callBackendApi = async ({ domain, query = null, type = "" }) => {
  const isTestLink = checkDomain(domain);
  const project_id = query?.project_id;
  const isProject = domain.endsWith("sitebuilderz.com");
  let slug;
  if (isProject) {
    slug = getSubdomain(domain);
  }

  console.log("domain", domain);
  let baseURL = null;

  baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data_by_slug/${slug}/data`;
  console.log("slug 🚀🚀", baseURL);

  if (isTestLink) {
    baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/industry_template_data/${process.env.NEXT_PUBLIC_INDUSTRY_ID}/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data`;
  } else if (isProject) {
    baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data_by_slug/${slug}/data`;
  } else {
    baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data_by_domain/${domain}/data`;
  }

  const fileName = baseURL?.replace(
    `${process.env.NEXT_PUBLIC_SITE_MANAGER}/`,
    ""
  );
  const filePath = `${domain}/${fileName
    ?.replaceAll(`/${domain}`, "")
    ?.replaceAll("/", "_")}/${type}.json`;
  if (typeof window === "undefined") {
    const { checkAPIJson, saveJson } = require("./serverUtils");
    const data = await checkAPIJson({ filePath });
    if (data) {
      return data;
    }
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
    if (typeof window === "undefined" && !isTestLink) {
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

export const getImagePath = (project_id) => {
  let image_path = null;

  if (project_id) {
    image_path = `project_images/${project_id}`;
  } else {
    image_path = `industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}`;
  }

  return image_path;
};

const withBaseUrl = (baseUrl, relativeUrl) =>
  `${!baseUrl.startsWith("https://") ? "https://" : ""}${
    !baseUrl.startsWith("www.") ? "www." : ""
  }${baseUrl}${
    !!relativeUrl
      ? relativeUrl.startsWith("/")
        ? relativeUrl
        : `/${relativeUrl}`
      : ""
  }`;

export async function getSitemaps({ domain, query }) {
  try {
    const project_id = query?.project_id;
    const data = await callBackendApi({ domain, query });
    if (data?.status) {
      const blog_list = data?.data?.find(
        ({ key }) => key === "blog_list"
      )?.value;
      const categories = [
        "",
        "about",
        "contact",
        ...data?.data?.find(({ key }) => key === "categories")?.value,
      ];
      const currentDate = new Date();
      const isoDate = currentDate?.toISOString();
      const isoDateParts = isoDate?.split("T");
      const datePart = isoDateParts[0];
      const timePart = isoDateParts[1]?.split(".")[0];
      const formattedDate = `${datePart}T${timePart}+00:00`;
      let urls = [
        ...categories?.map((item) => ({
          loc: withBaseUrl(
            domain,
            project_id ? `/${item}?project_id=${project_id}` : `/${item}`
          ),
          lastmod: formattedDate,
        })),
        ...blog_list?.map((item) => ({
          loc: withBaseUrl(
            domain,
            project_id
              ? `/${item?.article_category?.name}/${item.key}?project_id=${project_id}`
              : `/${item?.article_category?.name}/${item.key}`
          ),
          lastmod: formattedDate,
        })),
      ];
      const sitemaps = [];
      while (urls.length) {
        sitemaps.push(urls.splice(0, 200));
      }
      return sitemaps;
    } else {
      return [];
    }
  } catch (err) {
    console.log("👊 ~ getSitemaps ~ err:", err);
    return [];
  }
}
