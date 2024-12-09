import React from "react";
import Head from "next/head";
import JsonLd from "@/components/json/JsonLd";
import Container from "@/components/common/Container";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Footer from "@/components/containers/Footer";
import Navbar from "@/components/containers/Navbar";
import BlogCard from "@/components/common/BlogCard";
import Rightbar from "@/components/containers/Rightbar";
import Banner from "@/components/containers/Banner/Banner";
import MostPopular from "@/components/containers/MostPopular";
import FullContainer from "@/components/common/FullContainer";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
  sanitizeUrl,
} from "@/lib/myFun";

import { Raleway } from "next/font/google";
import MustRead from "@/components/containers/MustRead";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function Home({
  footer_type,
  categories,
  imagePath,
  about_me,
  banner,
  domain,
  logo,
  meta,
  page,
  favicon,
  tag_list,
  nav_type,
  blog_list,
  contact_details,
}) {
  const renderSections = () => {
    return page?.enable
      ? page.sections.map((item, index) => {
          if (!item.enable) return null;

          switch (item.section?.toLowerCase()) {
            case "navbar":
              return (
                <Navbar
                  key={index}
                  logo={logo}
                  imagePath={imagePath}
                  blog_list={blog_list}
                  categories={categories}
                  nav_type={nav_type}
                  contact_details={contact_details}
                />
              );
            case "banner":
              return (
                <Banner
                  key={index}
                  data={banner.value}
                  image={`${imagePath}/${banner?.file_name}`}
                  blog_list={blog_list}
                />
              );
            case "most popular":
              return (
                <MostPopular
                  key={index}
                  blog_list={blog_list}
                  imagePath={imagePath}
                />
              );
            case "articles":
              return (
                <FullContainer key={index} className="pt-5">
                  <Container>
                    <div className="grid grid-cols-1 md:grid-cols-home gap-12 w-full">
                      <div className="flex flex-col gap-10 w-full">
                        {blog_list?.map(
                          (item, index) =>
                            item.isFeatured && (
                              <div key={index}>
                                <div className="flex items-center justify-between gap-5 mb-6 -mt-3">
                                  <h2 className="font-bold text-xl">
                                    Featured Article
                                  </h2>
                                  <div className="flex-1 h-[1px] bg-gray-200"></div>
                                </div>
                                <BlogCard
                                  key={index}
                                  title={item.title}
                                  published_at={item.published_at}
                                  tagline={item.tagline}
                                  image={
                                    item.image
                                      ? `${imagePath}/${item.image}`
                                      : "/no-image.png"
                                  }
                                  href={`/${encodeURI(
                                    sanitizeUrl(item.article_category)
                                  )}/${encodeURI(sanitizeUrl(item.title))}`}
                                  imageHeight="h-72 md:h-[420px]"
                                  imageTitle={
                                    item.imageTitle ||
                                    item.title ||
                                    "Blog Image Title"
                                  }
                                  altImage={
                                    item.altImage ||
                                    item.tagline ||
                                    "Article Thumbnail"
                                  }
                                />
                              </div>
                            )
                        )}
                        {renderBlogList(blog_list)}
                      </div>
                      <Rightbar
                        widgets={page?.widgets}
                        about_me={about_me}
                        tag_list={tag_list}
                        blog_list={blog_list}
                        imagePath={imagePath}
                        categories={categories}
                      />
                    </div>
                  </Container>
                </FullContainer>
              );
            case "must read":
              return (
                <MustRead
                  key={index}
                  blog_list={blog_list}
                  imagePath={imagePath}
                />
              );
            case "footer":
              return (
                <Footer
                  key={index}
                  imagePath={imagePath}
                  blog_list={blog_list}
                  categories={categories}
                  footer_type={footer_type}
                />
              );
            default:
              return null;
          }
        })
      : "Page Disabled, under maintenance";
  };

  const renderBlogList = () => {
    return (
      <div className="grid grid-cols-2 gap-5 md:gap-10">
        <div className="flex flex-col gap-10">
          {blog_list
            ?.slice(0, blog_list?.length > 7 ? 4 : 2)
            .map((item, index) => (
              <BlogCard
                key={index}
                title={item.title}
                published_at={item.published_at}
                tagline={item.tagline}
                image={
                  item.image ? `${imagePath}/${item.image}` : "/no-image.png"
                }
                href={`/${encodeURI(
                  sanitizeUrl(item.article_category)
                )}/${encodeURI(sanitizeUrl(item.title))}`}
                imageHeight="h-72 md:h-[420px]"
                imageTitle={item.imageTitle || item.title || "Blog Image Title"}
                altImage={item.altImage || item.tagline || "Article Thumbnail"}
              />
            ))}
        </div>
        <div className="flex flex-col gap-10">
          {blog_list
            ?.slice(
              blog_list?.length > 7 ? 5 : 2,
              blog_list?.length > 7 ? 9 : 4
            )
            .map((item, index) => (
              <BlogCard
                key={index}
                title={item.title}
                published_at={item.published_at}
                tagline={item.tagline}
                image={
                  item.image ? `${imagePath}/${item.image}` : "/no-image.png"
                }
                href={`/${encodeURI(
                  sanitizeUrl(item.article_category)
                )}/${encodeURI(sanitizeUrl(item.title))}`}
                imageHeight={index === 0 ? "h-40" : "h-72 md:h-[410px]"}
                imageTitle={item.imageTitle || item.title || "Blog Image Title"}
                altImage={item.altImage || item.tagline || "Article Thumbnail"}
              />
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${myFont.className}`}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}`} />
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
        <meta
          name="google-site-verification"
          content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
      </Head>

      {renderSections()}

      <JsonLd
        data={{
          "@context": "https://www.schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `https://${domain}/`,
              url: `https://${domain}/`,
              name: meta?.title,
              isPartOf: {
                "@id": `https://${domain}`,
              },
              description: meta?.description,
              inLanguage: "en-US",
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${imagePath}/${banner?.file_name}`,
                width: 1920,
                height: 1080,
              },
            },
            {
              "@type": "Organization",
              "@id": `https://${domain}`,
              name: domain,
              url: `https://${domain}`,
              logo: {
                "@type": "ImageObject",
                url: `${imagePath}/${logo.file_name}`,
                width: logo.width,
                height: logo.height,
              },
              sameAs: [
                "https://www.facebook.com",
                "https://www.twitter.com",
                "https://instagram.com",
              ],
            },
            {
              "@type": "ItemList",
              url: `https://${domain}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `https://${domain}/${sanitizeUrl(
                    blog?.article_category
                  )}/${sanitizeUrl(blog?.title)}`,
                  name: blog?.title,
                },
              })),
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const meta = await callBackendApi({ domain, type: "meta_home" });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const categories = await callBackendApi({ domain, type: "categories" });
  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });
  const project_id = logo?.data[0]?.project_id || null;
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const banner = await callBackendApi({ domain, type: "banner" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });
  const all_data = await callBackendApi({ domain, type: "" });
  const imagePath = await getImagePath(project_id, domain);

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "home");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  robotsTxt({ domain });

  return {
    props: {
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0] || null,
      blog_list: blog_list?.data[0]?.value || [],
      categories: categories?.data[0]?.value || null,
      copyright: copyright?.data[0].value || null,
      about_me: about_me?.data[0] || null,
      banner: banner?.data[0],
      contact_details: contact_details?.data[0]?.value,
      nav_type: nav_type?.data[0]?.value || {},
      footer_type: footer_type?.data[0]?.value || {},
      tag_list: tag_list?.data[0]?.value || null,
      all_data,
      page,
    },
  };
}
