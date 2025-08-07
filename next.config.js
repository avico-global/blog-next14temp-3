/** @type {import('next').NextConfig} */

// Function to fetch redirects data from API (exact same logic as callBackendApi)
const fetchRedirects = async () => {
  try {
    // Use the same default domain as in myFun.js
    const defaultDomain = "abc-arnes-inc.sitebuilderz.com";
    console.log('🔗 Fetching redirects for domain:', defaultDomain);
    
    // Use the exact same logic as callBackendApi function
    const isTemplateURL = defaultDomain && [
      "localhost",
      "vercel",
      "amplifyapp",
      "amplifytest",
      "abcUsama1122.usama",
    ].some((sub) => defaultDomain.includes(sub));
    
    const isProjectStagingURL = defaultDomain?.endsWith("sitebuilderz.com");
    const slug = isProjectStagingURL ? defaultDomain.split('.')[0] : null;

    let baseURL;
    if (isTemplateURL) {
      baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/industry_template_data/${process.env.NEXT_PUBLIC_INDUSTRY_ID}/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data`;
    } else if (isProjectStagingURL) {
      baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data_by_slug/${slug}/data`;
    } else {
      baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data_by_domain/${defaultDomain}/data`;
    }

    console.log('🔗 Using baseURL:', baseURL);
    
    const response = await fetch(`${baseURL}/redirects`);
    
    if (!response.ok) {
      console.warn('❌ Failed to fetch redirects:', response.status, response.statusText);
      const errorText = await response.text();
      console.warn('❌ Error response:', errorText);
      return [];
    }
    
    const redirectsData = await response.json();
    console.log('📦 Raw redirects data:', JSON.stringify(redirectsData, null, 2));
    
    // Use the same data structure pattern as in index page
    if (redirectsData?.data?.[0]?.value && Array.isArray(redirectsData.data[0].value)) {
      console.log('✅ Redirects data found:', redirectsData.data[0].value);
      return redirectsData.data[0].value;
    }
    
    console.log('⚠️ No redirects data found or invalid structure');
    return [];
  } catch (error) {
    console.warn('❌ Error fetching redirects:', error.message);
    return [];
  }
};

const nextConfig = {
  async redirects() {
    // Fetch redirects from API
    const redirectsData = await fetchRedirects();
    
    // Map the API data to Next.js redirect format (same as index page structure)
    const mappedRedirects = redirectsData.map(redirect => ({
      source: redirect.from,
      destination: redirect.to,
      permanent: redirect.id === "301", // 301 = permanent, 302 = temporary
    }));
    
    console.log('🔄 Final mapped redirects:', mappedRedirects);
    
    return mappedRedirects;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
