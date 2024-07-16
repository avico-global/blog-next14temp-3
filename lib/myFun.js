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
  const defaultDomain = "abcUsama1122.usama";
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
      "amplifyapp.com",
      "amplifytest",
      "abcUsama1122.usama",
    ].some((sub) => domain.includes(sub));
  return isValidDomain;
};

export const callBackendApi = async ({ domain, query = null, type = "" }) => {
  const isTestLink = checkDomain(domain);
  const project_id = query.project_id;
  let baseURL = null;

  if (isTestLink) {
    if (project_id) {
      baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data/${project_id}/data`;
    } else {
      baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/industry_template_data/${process.env.NEXT_PUBLIC_INDUSTRY_ID}/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data`;
    }
  } else {
    baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data_by_domain/${domain}/data`;
  }
  const fileName = baseURL?.replace(
    `${process.env.NEXT_PUBLIC_SITE_MANAGER}/`,
    ""
  );
  const filePath = `${domain}/${fileName?.replaceAll(`/${domain}`,"")?.replaceAll("/", "_")}/${type}.json`;
  if (typeof window === "undefined") {
    const { checkAPIJson, saveJson } = require("./serverUtils");
    const data = await checkAPIJson({ filePath });
    if (data) {
      return data;
    }
  }
  // return
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
    if (typeof window === "undefined") {
      const { saveJson } = require("./serverUtils");
      await saveJson({ filePath, data:responseData })
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
