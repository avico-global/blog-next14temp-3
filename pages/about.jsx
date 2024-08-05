import React from "react";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import AboutBanner from "@/components/containers/AboutBanner";
import Footer from "@/components/containers/Footer";
import Navbar from "@/components/containers/Navbar";
import Rightbar from "@/components/containers/Rightbar";
import Head from "next/head";
import MarkdownIt from "markdown-it";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";

import GoogleTagManager from "@/lib/GoogleTagManager";
import JsonLd from "@/components/json/JsonLd";

// Font
import { Raleway } from "next/font/google";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function About({
  logo,
  about_me,
  imagePath,
  categories,
  blog_list,
  domain,
  meta,
  contact_details,
  copyright,
  favicon,
  layout,
}) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt?.render(about_me?.value);

  const page = layout?.find((page) => page.page === "about");
  console.log("page", page);

  return (
    <div className={myFont.className}>
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
                    blog_list={blog_list}
                    categories={categories}
                    logo={logo}
                    imagePath={imagePath}
                    contact_details={contact_details}
                  />
                );
              case "banner":
                return (
                  <AboutBanner
                    image={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${about_me.file_name}`}
                  />
                );
              case "text":
                return (
                  <FullContainer>
                    <Container className="py-16">
                      <div className="grid grid-cols-about gap-16 w-full">
                        <div
                          className="markdown-content about_me prose max-w-full"
                          dangerouslySetInnerHTML={{ __html: content }}
                        />
                        <Rightbar
                          page="about"
                          contact_details={contact_details}
                        />
                      </div>
                    </Container>
                  </FullContainer>
                );

              case "footer":
                return (
                  <Footer
                    blog_list={blog_list}
                    categories={categories}
                    logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo?.file_name}`}
                    imagePath={imagePath}
                    contact_details={contact_details}
                    copyright={copyright}
                    about_me={about_me}
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
                  url: `http://${domain}/${
                    blog?.article_category?.name
                  }/${blog.title?.replaceAll(" ", "-")?.toLowerCase()}`,
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
  const logo = await callBackendApi({ domain, query, type: "logo" });
  const favicon = await callBackendApi({ domain, query, type: "favicon" });
  const about_me = await callBackendApi({ domain, query, type: "about_me" });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const meta = await callBackendApi({ domain, query, type: "meta_home" });
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
  const layout = await callBackendApi({ domain, type: "layout" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = null;
  imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo.data[0] || null,
      layout: layout?.data[0]?.value || null,
      about_me: about_me.data[0] || null,
      blog_list: blog_list.data[0].value,
      categories: categories?.data[0]?.value || null,
      contact_details: contact_details.data[0].value,
      copyright: copyright?.data[0]?.value || null,
    },
  };
}
