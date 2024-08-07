import React from "react";

// Components
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Banner from "@/components/containers/Banner";
import MostPopular from "@/components/containers/MostPopular";
import Navbar from "@/components/containers/Navbar";
import Footer from "@/components/containers/Footer";
import Rightbar from "@/components/containers/Rightbar";
import BlogCard from "@/components/common/BlogCard";
import GoogleTagManager from "@/lib/GoogleTagManager";
import JsonLd from "@/components/json/JsonLd";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
} from "@/lib/myFun";

import Head from "next/head";

// Font
import { Raleway } from "next/font/google";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function Home({
  logo,
  blog_list,
  imagePath,
  categories,
  domain,
  meta,
  about_me,
  copyright,
  contact_details,
  banner,
  favicon,
  layout,
  tag_list,
}) {
  const page = layout?.find((page) => page.page === "home");

  return (
    <div className={`min-h-screen ${myFont.className}`}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`http://${domain}`} />
        <link rel="publisher" href={`http://${domain}`} />
        <link rel="canonical" href={`http://${domain}`} />
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

      {page?.enable
        ? page?.sections?.map((item, index) => {
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
                    contact_details={contact_details}
                  />
                );

              case "banner":
                return (
                  <Banner
                    key={index}
                    data={banner.value}
                    image={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${banner?.file_name}`}
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
                  <FullContainer key={index}>
                    <Container>
                      <div className="grid grid-cols-1 md:grid-cols-home gap-12 w-full">
                        <div>
                          {blog_list
                            ?.slice(-1)
                            .reverse()
                            .map((item, index) => (
                              <BlogCard
                                key={index}
                                index={index}
                                title={item.title}
                                author={item.author}
                                published_at={item.published_at}
                                tagline={item.tagline}
                                content={item.articleContent}
                                image={
                                  item.image
                                    ? `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${item.image}`
                                    : "/no-image.png"
                                }
                                href={`/${
                                  item?.article_category?.name
                                }/${item?.title
                                  ?.replaceAll(" ", "-")
                                  ?.toLowerCase()}`}
                                category={item?.article_category?.name}
                                imageHeight="h-96 lg:h-[420px]"
                              />
                            ))}

                          <div className="grid grid-cols-2 gap-5 md:gap-10 mt-12">
                            <div className="flex flex-col gap-10">
                              {blog_list?.slice(0, 4).map((item, index) => (
                                <BlogCard
                                  key={index}
                                  index={index}
                                  title={item.title}
                                  author={item.author}
                                  published_at={item.published_at}
                                  tagline={item.tagline}
                                  content={item.articleContent}
                                  image={
                                    item.image
                                      ? `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${item.image}`
                                      : "/no-image.png"
                                  }
                                  href={`/${
                                    item?.article_category?.name
                                  }/${item?.title
                                    ?.replaceAll(" ", "-")
                                    ?.toLowerCase()}`}
                                  category={item?.article_category?.name}
                                  imageHeight="h-72 md:h-[420px]"
                                />
                              ))}
                            </div>
                            <div className="flex flex-col gap-10">
                              {blog_list?.slice(5, 9).map((item, index) => (
                                <BlogCard
                                  key={index}
                                  index={index}
                                  title={item.title}
                                  author={item.author}
                                  published_at={item.published_at}
                                  tagline={item.tagline}
                                  content={item.articleContent}
                                  image={
                                    item.image
                                      ? `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${item.image}`
                                      : "/no-image.png"
                                  }
                                  href={`/${
                                    item?.article_category?.name
                                  }/${item?.title
                                    ?.replaceAll(" ", "-")
                                    ?.toLowerCase()}`}
                                  category={item?.article_category?.name}
                                  imageHeight={
                                    index === 0 ? "h-40" : "h-72 md:h-[410px]"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <Rightbar
                          about_me={about_me}
                          imagePath={imagePath}
                          categories={categories}
                          contact_details={contact_details}
                          tag_list={tag_list}
                        />
                      </div>
                    </Container>
                  </FullContainer>
                );

              case "footer":
                return (
                  <Footer
                    key={index}
                    blog_list={blog_list}
                    categories={categories}
                    logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo?.file_name}`}
                    imagePath={imagePath}
                    about_me={about_me}
                    copyright={copyright}
                    contact_details={contact_details}
                  />
                );
              default:
                return null;
            }
          })
        : "Page Disabled, under maintenance"}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `http://${domain}/`,
              url: `http://${domain}/`,
              name: meta?.title,
              isPartOf: {
                "@id": `http://${domain}`,
              },
              description: meta?.description,
              inLanguage: "en-US",
            },
            {
              "@type": "Organization",
              "@id": `http://${domain}`,
              name: domain,
              url: `http://${domain}/`,
              logo: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`,
              },
              sameAs: [
                "http://www.facebook.com",
                "http://www.twitter.com",
                "http://instagram.com",
              ],
            },
            {
              "@type": "ItemList",
              url: `http://${domain}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `http://${domain}/${blog?.article_category?.name}/${blog.key}`,
                  name: blog.title,
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

  const meta = await callBackendApi({ domain, type: "meta_home" });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const categories = await callBackendApi({ domain, type: "categories" });
  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const banner = await callBackendApi({ domain, type: "banner" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = null;
  imagePath = await getImagePath(project_id, domain);

  const robotxt = await robotsTxt({ domain });

  return {
    props: {
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0] || null,
      layout: layout?.data[0]?.value || null,
      blog_list: blog_list?.data[0]?.value || [],
      categories: categories?.data[0]?.value || null,
      copyright: copyright?.data[0].value || null,
      about_me: about_me?.data[0] || null,
      banner: banner?.data[0],
      contact_details: contact_details?.data[0]?.value,
      tag_list: tag_list?.data[0]?.value || null,
    },
  };
}
