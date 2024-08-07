import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Footer from "@/components/containers/Footer";
import Navbar from "@/components/containers/Navbar";
import Head from "next/head";
import React from "react";
import Map from "@/components/containers/Map";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";

// Font
import { Raleway } from "next/font/google";
import GoogleTagManager from "@/lib/GoogleTagManager";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function Contact({
  logo,
  imagePath,
  blog_list,
  about_me,
  categories,
  copyright,
  contact_details,
  meta,
  domain,
  layout,
  favicon,
}) {
  const page = layout?.find((item) => item.page === "contact");

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
            switch (item.section) {
              case "navbar":
                return (
                  <Navbar
                    blog_list={blog_list}
                    categories={categories}
                    logo={logo}
                    imagePath={imagePath}
                    contact_details={contact_details}
                  />
                );
              case "map":
                return (
                  <FullContainer>
                    <Container className="mt-16">
                      <Map location="united states" />
                    </Container>
                  </FullContainer>
                );
              case "contact info":
                return (
                  <FullContainer>
                    <Container className="mt-10 text-center text-gray-500 text-xs gap-3">
                      <p className="text-xl mt-3 font-bold text-black">
                        {contact_details?.name}
                      </p>
                      <p>{contact_details?.email}</p>
                      <p>{contact_details?.address}</p>
                      <p>{contact_details?.phone}</p>
                    </Container>
                  </FullContainer>
                );
              case "footer":
                return (
                  <Footer
                    blog_list={blog_list}
                    categories={categories}
                    logo={logo}
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
  const logo = await callBackendApi({ domain, query, type: "logo" });
  const favicon = await callBackendApi({ domain, query, type: "favicon" });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const about_me = await callBackendApi({ domain, query, type: "about_me" });
  const copyright = await callBackendApi({ domain, query, type: "copyright" });
  const meta = await callBackendApi({ domain, query, type: "meta_home" });
  const layout = await callBackendApi({ domain, type: "layout" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = null;
  imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      logo: logo?.data[0],
      blog_list: blog_list.data[0].value,
      layout: layout?.data[0]?.value || null,
      contact_details: contact_details.data[0].value,
      categories: categories?.data[0]?.value || null,
      about_me: about_me.data[0] || null,
      copyright: copyright.data[0].value || null,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
    },
  };
}
