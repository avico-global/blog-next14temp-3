import React from "react";
import FullContainer from "@/components/common/FullContainer";
import Rightbar from "@/components/containers/Rightbar";
import Container from "@/components/common/Container";
import Navbar from "@/components/containers/Navbar";
import { useRouter } from "next/router";
import MarkdownIt from "markdown-it";
import LatestBlogs from "@/components/containers/LatestBlogs";
import Footer from "@/components/containers/Footer";
import Head from "next/head";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  getProjectId,
} from "@/lib/myFun";
import JsonLd from "@/components/json/JsonLd";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import SocialShare from "@/components/common/SocialShare";

// Font
import { Raleway } from "next/font/google";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function Blog({
  logo,
  myblog,
  blog_list,
  project_id,
  imagePath,
  categories,
  domain,
  about_me,
  contact_details,
  copyright,
  tag_list,
}) {
  const router = useRouter();
  const { category } = router.query;
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(myblog?.value.articleContent);
  const breadcrumbs = useBreadcrumbs();
  const lastFiveBlogs = blog_list.slice(-5);

  return (
    <div className={myFont.className}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{myblog?.value?.meta_title}</title>
        <meta name="description" content={myblog?.value?.meta_description} />
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
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        />
      </Head>

      <Navbar
        blog_list={blog_list}
        category={category}
        categories={categories}
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo?.file_name}`}
        project_id={project_id}
        contact_details={contact_details}
      />
      <FullContainer className="h-[62vh] overflow-hidden p-10 bg-black/30 text-white text-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${myblog?.file_name}`}
          alt="Background Image"
          priority={true}
          fill={true}
          loading="eager"
          className="-z-10 w-full h-full object-cover absolute top-0"
        />
        <Container className="gap-8">
          <Badge>{myblog?.value?.article_category?.name}</Badge>
          <h1 className="font-bold text-6xl capitalize max-w-screen-md">
            {myblog?.value.title}
          </h1>
          <p>{myblog?.value.tagline}</p>
          <div className="flex items-center justify-center gap-4">
            <p>{myblog?.value.author}</p> -<p>{myblog?.value.published_at}</p>
          </div>
        </Container>
      </FullContainer>

      <FullContainer>
        <Container>
          <Breadcrumbs breadcrumbs={breadcrumbs} className="pt-7 pb-5" />
          <div className="grid grid-cols-1 md:grid-cols-home gap-14 w-full">
            <div>
              <article className="prose lg:prose-xl max-w-full">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </article>
              <div className="mt-12">
                <h3 className="text-lg font-semibold">Share this article:</h3>
                <SocialShare
                  url={`http://${domain}${myblog?.article_category?.name}/${myblog?.key}`}
                  title={myblog?.value.title}
                />
              </div>
            </div>
            <Rightbar
              lastFiveBlogs={lastFiveBlogs}
              imagePath={imagePath}
              project_id={project_id}
              tag_list={tag_list}
              about_me={about_me}
              categories={categories}
              category={category}
              contact_details={contact_details}
            />
          </div>
        </Container>
      </FullContainer>

      <LatestBlogs
        blogs={blog_list}
        imagePath={imagePath}
        project_id={project_id}
      />
      <Footer
        blog_list={blog_list}
        categories={categories}
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo?.file_name}`}
        project_id={project_id}
        imagePath={imagePath}
        about_me={about_me}
        contact_details={contact_details}
        copyright={copyright}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": myblog
                  ? `http://${domain}${myblog?.article_category?.name}/${myblog?.key}`
                  : "",
              },
              headline: myblog?.value.title,
              description: myblog?.value.articleContent,
              datePublished: myblog?.value.published_at,
              author: myblog?.value.author,
              image: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${myblog?.file_name}`,
              publisher: "Site Manager",
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
              "@type": "ItemList",
              url: `http://${domain}${myblog?.article_category?.name}/${myblog?.key}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `http://${domain}${blog?.article_category?.name}/${blog?.key}`,
                  name: blog.title,
                },
              })),
            },
            {
              "@type": "WebPage",
              "@id": `http://${domain}/${myblog?.key}`,
              url: `http://${domain}/${myblog?.article_category?.name}/${myblog?.key}`,
              name: myblog?.value?.meta_title,
              description: myblog?.value?.meta_description,
              publisher: {
                "@id": `http://${domain}`,
              },
              inLanguage: "en-US",
              isPartOf: { "@id": `http://${domain}` },
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${myblog?.file_name}`,
              },
              datePublished: myblog?.value.published_at,
              dateModified: myblog?.value.published_at,
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ params, req, query }) {
  const domain = getDomain(req?.headers?.host);
  const imagePath = await getImagePath({ domain, query });
  const project_id = getProjectId(query);
  const blog = await callBackendApi({
    domain,
    query,
    type: params.blog,
  });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });

  const isValidBlog = blog_list.data[0].value.some(
    (item) => item.key === params.blog
  );

  if (!isValidBlog) {
    return {
      notFound: true,
    };
  }

  const tag_list = await callBackendApi({ domain, query, type: "tag_list" });
  const logo = await callBackendApi({ domain, query, type: "logo" });
  const about_me = await callBackendApi({ domain, query, type: "about_me" });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const copyright = await callBackendApi({ domain, query, type: "copyright" });

  return {
    props: {
      domain,
      imagePath,
      project_id,
      logo: logo?.data[0] || null,
      myblog: blog?.data[0] || null,
      blog_list: blog_list.data[0]?.value || null,
      tag_list: tag_list?.data[0]?.value || null,
      categories: categories?.data[0]?.value || null,
      about_me: about_me.data[0] || null,
      contact_details: contact_details.data[0].value,
      copyright: copyright.data[0].value || null,
    },
  };
}
