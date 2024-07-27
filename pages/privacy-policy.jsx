import React from "react";

// Components
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Navbar from "@/components/containers/Navbar";
import Footer from "@/components/containers/Footer";
import GoogleTagManager from "@/lib/GoogleTagManager";
import MarkdownIt from "markdown-it";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";

import Head from "next/head";

// Font
import { Raleway } from "next/font/google";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function PriavcyPolicy({
  domain,
  imagePath,
  project_id,
  logo,
  favicon,
  blog_list,
  categories,
  meta,
  copyright,
  about_me,
  contact_details,
  policy,
}) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(policy);

  return (
    <div className={`min-h-screen ${myFont.className}`}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`http://${domain}`} />
        <link rel="publisher" href={`http://${domain}`} />
        <link rel="canonical" href={`http://${domain}`} />
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
      <Navbar
        imagePath={imagePath}
        blog_list={blog_list}
        categories={categories}
        logo={logo}
        project_id={project_id}
        contact_details={contact_details}
      />

      <FullContainer>
        <Container>
          <div
            className="prose max-w-full w-full mt-16 mb-5"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Container>
      </FullContainer>

      <Footer
        blog_list={blog_list}
        categories={categories}
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo?.file_name}`}
        project_id={project_id}
        imagePath={imagePath}
        about_me={about_me}
        copyright={copyright}
        contact_details={contact_details}
      />
    </div>
  );
}

import fs from "fs";
import path from "path";
export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);

  const robotxt = await callBackendApi({ domain, query, type: "robotxt" });
  const filePath = path.join(process.cwd(), "public", "robots.txt");
  fs.writeFileSync(filePath, robotxt.data[0].value, "utf8");

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
  const policy = await callBackendApi({ domain, query, type: "policy" });

  let project_id = null;
  let imagePath = null;

  if (logo?.project_id) {
    project_id = logo.project_id;
  } else if (query.project_id) {
    project_id = query.project_id;
  }

  imagePath = await getImagePath(project_id);

  return {
    props: {
      domain,
      imagePath,
      project_id: query.project_id ? project_id : null,
      logo: logo?.data[0] || null,
      favicon: favicon?.data[0]?.file_name || null,
      blog_list: blog_list?.data[0]?.value || [],
      categories: categories?.data[0]?.value || null,
      meta: meta?.data[0]?.value || null,
      copyright: copyright?.data[0].value || null,
      about_me: about_me?.data[0] || null,
      contact_details: contact_details?.data[0]?.value,
      terms: terms?.data[0]?.value || "",
      policy: policy?.data[0]?.value || "",
    },
  };
}
