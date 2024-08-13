import React from "react";

// Components
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Navbar from "@/components/containers/Navbar";
import Footer from "@/components/containers/Footer";
import GoogleTagManager from "@/lib/GoogleTagManager";
import MarkdownIt from "markdown-it";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";

import Head from "next/head";

// Font
import { Raleway } from "next/font/google";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function Terms({
  domain,
  imagePath,
  logo,
  favicon,
  blog_list,
  categories,
  meta,
  copyright,
  about_me,
  contact_details,
  terms,
  layout,
  nav_type,
}) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt?.render(terms || "");
  const breadcrumbs = useBreadcrumbs();

  const page = layout?.find((page) => page.page === "terms");

  return (
    <div
      className={`min-h-screen flex flex-col justify-between ${myFont.className}`}
    >
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://${domain}`} />
        <link rel="publisher" href={`https://${domain}`} />
        <link rel="canonical" href={`https://${domain}/terms-and-conditions`} />
        {/* <meta name="robots" content="noindex" /> */}
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
                    nav_type={nav_type}
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

              case "text":
                return (
                  <FullContainer key={index}>
                    <Container>
                      <div
                        className="prose max-w-full w-full mb-5"
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
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
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);

  const meta = await callBackendApi({ domain, query, type: "meta_home" });
  const logo = await callBackendApi({ domain, query, type: "logo" });
  const favicon = await callBackendApi({ domain, query, type: "favicon" });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const about_me = await callBackendApi({ domain, query, type: "about_me" });
  const copyright = await callBackendApi({ domain, query, type: "copyright" });
  const terms = await callBackendApi({ domain, query, type: "terms" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = null;
  imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      logo: logo?.data[0] || null,
      favicon: favicon?.data[0]?.file_name || null,
      layout: layout?.data[0]?.value || null,
      blog_list: blog_list?.data[0]?.value || [],
      categories: categories?.data[0]?.value || null,
      meta: meta?.data[0]?.value || null,
      copyright: copyright?.data[0].value || null,
      about_me: about_me?.data[0] || null,
      contact_details: contact_details?.data[0]?.value || null,
      terms: terms?.data[0]?.value || "",
      nav_type: nav_type?.data[0]?.value || {},
    },
  };
}
