import React, { useState } from "react";
import Head from "next/head";
import Footer from "@/components/containers/Footer";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";
import GoogleTagManager from "@/lib/GoogleTagManager";
import JsonLd from "@/components/json/JsonLd";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Navbar from "@/components/containers/Navbar";
import useBreadcrumbs from "@/lib/useBreadcrumbs";

// Font
import { Raleway } from "next/font/google";
import Rightbar from "@/components/containers/Rightbar";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function Categories({
  logo,
  blog_list,
  imagePath,
  meta,
  domain,
  categories,
  about_me,
  contact_details,
  copyright,
  favicon,
  layout,
  tag_list,
}) {
  const router = useRouter();
  const { category } = router.query;
  const breadcrumbs = useBreadcrumbs();

  const filteredBlogList = blog_list.filter((item) => {
    const searchContent = category?.replace("-", " ")?.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchContent) ||
      item.article_category.name.toLowerCase().includes(searchContent) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(searchContent)) ||
      item.articleContent.toLowerCase().includes(searchContent)
    );
  });

  const page = layout?.find((page) => page.page === "category");

  return (
    <div
      className={cn(
        myFont.className,
        "flex flex-col min-h-screen justify-between"
      )}
    >
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`http://${domain}`} />
        <link rel="publisher" href={`http://${domain}`} />
        <link rel="canonical" href={`http://${domain}`} />
        <meta name="robots" content="noindex" />
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
                    category={category}
                    imagePath={imagePath}
                    blog_list={blog_list}
                    categories={categories}
                    contact_details={contact_details}
                  />
                );
              case "breadcrumbs":
                return (
                  <FullContainer key={index}>
                    <Container>
                      <Breadcrumbs breadcrumbs={breadcrumbs} className="py-7" />
                    </Container>
                  </FullContainer>
                );
              case "search result":
                return (
                  <FullContainer key={index} className="mb-12">
                    <Container>
                      <div className="grid grid-cols-1 md:grid-cols-home gap-12 w-full">
                        <div>
                          <p className="text-2xl font-semibold border-l-4 border-primary capitalize px-4 py-1 mb-7 w-full">
                            Browsing: {category?.replace("-", " ")}
                          </p>
                          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredBlogList.map((item, index) => (
                              <div key={index}>
                                <Link
                                  href={`/${category}/${item?.title
                                    ?.replaceAll(" ", "-")
                                    ?.toLowerCase()}`}
                                >
                                  <div className="overflow-hidden relative min-h-40 rounded lg:min-h-52 w-full bg-black flex-1">
                                    <Image
                                      title={item.imageTitle}
                                      src={
                                        item.image
                                          ? `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${item.image}`
                                          : "/no-image.png"
                                      }
                                      fill={true}
                                      loading="lazy"
                                      alt="blog"
                                      className="w-full h-full object-cover absolute top-0 hover:scale-125 transition-all"
                                    />
                                  </div>
                                </Link>
                                <Link
                                  href={`/${category}/${item?.title
                                    ?.replaceAll(" ", "-")
                                    ?.toLowerCase()}`}
                                >
                                  <p className="mt-2 lg:mt-4 font-bold text-lg text-inherit leading-tight hover:underline">
                                    {item.title}
                                  </p>
                                </Link>
                                <div className="flex items-center gap-2 mt-2">
                                  <p className="text-sm font-semibold">
                                    <span className="text-gray-400 text-sm">
                                      By
                                    </span>
                                    : {item.author}
                                  </p>
                                  <span className="text-gray-400">--</span>
                                  <p className="text-sm text-gray-400 font-semibold">
                                    {dayjs(item?.published_at)?.format(
                                      "MMM D, YYYY"
                                    )}
                                  </p>
                                </div>
                                <p className="text-gray-500 mt-4">
                                  {item.tagline}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Rightbar
                          about_me={about_me}
                          imagePath={imagePath}
                          categories={categories}
                          contact_details={contact_details}
                          tag_list={tag_list}
                          page="category"
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
                    contact_details={contact_details}
                    copyright={copyright}
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
              "@id": `http://${domain}/${category}`,
              url: `http://${domain}/${category}`,
              name: meta?.title,
              isPartOf: {
                "@id": `http://${domain}`,
              },
              description: meta?.description,
              inLanguage: "en-US",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.label,
                item: `http://${domain}${breadcrumb.url}`,
              })),
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
                  url: `http://${domain}/${
                    blog?.article_category?.name
                  }/${blog?.title?.replaceAll(" ", "-")?.toLowerCase()}`,
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

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);

  const logo = await callBackendApi({
    domain,
    query,
    type: "logo",
  });
  const favicon = await callBackendApi({ domain, query, type: "favicon" });

  const banner = await callBackendApi({ domain, query, type: "banner" });
  const footer_text = await callBackendApi({
    domain,
    query,
    type: "footer_text",
  });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const copyright = await callBackendApi({
    domain,
    query,
    type: "copyright",
  });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const meta = await callBackendApi({ domain, query, type: "meta_home" });
  const about_me = await callBackendApi({ domain, query, type: "about_me" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = null;
  imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0],
      layout: layout?.data[0]?.value || null,
      banner: banner.data[0] || null,
      blog_list: blog_list.data[0].value,
      categories: categories?.data[0]?.value || null,
      footer_text: footer_text?.data[0]?.value || null,
      copyright: copyright?.data[0]?.value || null,
      domain: domain === "hellospace.us" ? req?.headers?.host : domain,
      about_me: about_me.data[0] || null,
      contact_details: contact_details.data[0].value,
      tag_list: tag_list?.data[0]?.value || null,
    },
  };
}
