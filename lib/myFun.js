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
  const defaultDomain = "picoriverafiredamagerestoration.us";
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
  return (
    domain &&
    !["localhost", "vercel", "amplifyapp.com", "amplifytest"].some((sub) =>
      domain.includes(sub)
    )
  );
};

export const getProjectId = (obj) => {
  if (!obj || (Object.keys(obj).length === 0 && obj.constructor === Object)) {
    return null;
  }
  return Object.keys(obj).find((key) => obj[key] === "") || null;
};

export const callBackendApi = async ({ domain, query = null, type = "" }) => {
  const isTestLink = checkDomain(domain);
  const project_id = getProjectId(query);
  let baseURL = null;

  if (isTestLink) {
    if (project_id) {
      baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data/${project_id}/data`;
    } else {
      baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/industry_template_data/${process.env.NEXT_PUBLIC_INDUSTRY_ID}/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data`;
    }
  } else if (!project_id) {
    baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data_by_domain/${domain}/data`;
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
    return await response.json();
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

export const getImagePath = ({ domain, query = null }) => {
  const isTestLink = checkDomain(domain);
  const project_id = getProjectId(query);
  let image_path = null;

  if (isTestLink) {
    if (project_id) {
      image_path = `project_images/${project_id}`;
    } else {
      image_path = `industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}`;
    }
  } else if (!project_id) {
    image_path = `project_images/${project_id}`;
  }

  return image_path;
};
