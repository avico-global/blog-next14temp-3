import React, { useEffect } from "react";
import FullContainer from "@/components/common/FullContainer";
import Rightbar from "@/components/containers/Rightbar";
import Container from "@/components/common/Container";
import Navbar from "@/components/containers/Navbar";
import { useRouter } from "next/router";
import MarkdownIt from "markdown-it";
import LatestBlogs from "@/components/containers/LatestBlogs";
import Footer from "@/components/containers/Footer";
import Head from "next/head";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";
import JsonLd from "@/components/json/JsonLd";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import SocialShare from "@/components/common/SocialShare";

// Font
import { Raleway } from "next/font/google";
import BlogBanner from "@/components/containers/BlogBanner";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

const sanitizeUrl = (text) => {
  return text?.replaceAll(/%20/g, "-").replaceAll(" ", "-");
};

export default function Blog({
  logo,
  myblog,
  blog_list,
  imagePath,
  categories,
  domain,
  about_me,
  contact_details,
  favicon,
  tag_list,
  layout,
  nav_type,
  project_id,
  blog_type,
}) {
  const router = useRouter();
  const { category, blog } = router.query;

  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(
    myblog?.value?.articleContent?.replaceAll(
      `https://api.sitebuilderz.com/images/project_images/${project_id}/`,
      imagePath
    ) || ""
  );

  const breadcrumbs = useBreadcrumbs();

  useEffect(() => {
    if (
      category.includes("%20") ||
      category.includes(" ") ||
      blog.includes("%20") ||
      blog.includes(" ", "-")
    ) {
      const newCategory = sanitizeUrl(category);
      const newBlog = sanitizeUrl(blog);
      router.replace(`/${newCategory}/${newBlog}`);
    }
  }, [category, router, blog]);

  const page = layout?.find((page) => page.page === "blog page");

  return (
    <div className={myFont.className}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{myblog?.value?.meta_title}</title>
        <meta name="description" content={myblog?.value?.meta_description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link
          rel="canonical"
          href={`https://www.${domain}/${category}/${blog}`}
        />
        <meta name="theme-color" content="#008DE5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
      </Head>

      {/* Conditional rendering based on page layout */}
      {page?.enable
        ? page?.sections?.map((item, index) => {
            if (!item.enable) return null;
            switch (item.section?.toLowerCase()) {
              case "navbar":
                return (
                  <Navbar
                    key={index}
                    blog_list={blog_list}
                    category={category}
                    categories={categories}
                    logo={logo}
                    imagePath={imagePath}
                    contact_details={contact_details}
                    nav_type={nav_type}
                  />
                );
              case "banner":
                return (
                  <BlogBanner
                    key={index}
                    myblog={myblog}
                    imagePath={imagePath}
                    blog_type={blog_type}
                  />
                );
              case "breadcrumbs":
                return (
                  <FullContainer key={index}>
                    <Container>
                      <Breadcrumbs
                        breadcrumbs={breadcrumbs}
                        className="pt-7 pb-5"
                      />
                    </Container>
                  </FullContainer>
                );
              case "blog text":
                return (
                  <FullContainer key={index}>
                    <Container>
                      <div className="grid grid-cols-1 md:grid-cols-home gap-14 w-full">
                        <div className="">
                          <article className="prose lg:prose-xl max-w-full">
                            <div
                              dangerouslySetInnerHTML={{ __html: content }}
                            />
                          </article>
                          <div className="mt-12">
                            <h3 className="text-lg font-semibold">
                              Share this article:
                            </h3>
                            <SocialShare
                              url={`http://${domain}${myblog?.article_category
                                ?.replaceAll(" ", "-")
                                ?.toLowerCase()}/${myblog?.title
                                ?.replaceAll(" ", "-")
                                ?.toLowerCase()}`}
                              title={myblog?.value.title}
                            />
                          </div>
                        </div>
                        <Rightbar
                          imagePath={imagePath}
                          tag_list={tag_list}
                          about_me={about_me}
                          categories={categories}
                          category={category}
                          contact_details={contact_details}
                          blog_list={blog_list}
                          widgets={page?.widgets}
                        />
                      </div>
                    </Container>
                  </FullContainer>
                );
              case "latest posts":
                return (
                  <LatestBlogs
                    key={index}
                    blogs={blog_list}
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
              "@type": "BlogPosting",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": myblog
                  ? `http://${domain}${sanitizeUrl(
                      myblog?.article_category
                        ?.replaceAll(" ", "-")
                        ?.toLowerCase()
                    )}/${sanitizeUrl(myblog?.value?.title)}`
                  : "",
              },
              headline: myblog?.value?.title,
              description: myblog?.value?.articleContent,
              datePublished: myblog?.value?.published_at,
              author: myblog?.value?.author,
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
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const { category, blog } = query;

  const categories = await callBackendApi({ domain, type: "categories" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });

  const isValidBlog = blog_list?.data[0]?.value?.find(
    (item) =>
      sanitizeUrl(item.title)?.toLowerCase()?.replaceAll(" ", "-") ===
      sanitizeUrl(blog)?.toLowerCase()?.replaceAll(" ", "-")
  );

  const categoryExists = categories?.data[0]?.value?.some(
    (cat) =>
      cat?.title?.toLowerCase()?.replaceAll(" ", "-") ===
      sanitizeUrl(category)?.toLowerCase()?.replaceAll(" ", "-")
  );

  if (!categoryExists || !isValidBlog) {
    return {
      notFound: true,
    };
  }

  const myblog = await callBackendApi({ domain, type: isValidBlog?.key });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });
  const layout = await callBackendApi({ domain, type: "layout" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const blog_type = await callBackendApi({ domain, type: "blog_type" });
  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      logo: logo?.data[0] || null,
      myblog: myblog?.data[0] || {},
      layout: layout?.data[0]?.value || null,
      blog_list: blog_list.data[0]?.value || null,
      tag_list: tag_list?.data[0]?.value || null,
      categories: categories?.data[0]?.value || null,
      about_me: about_me.data[0] || null,
      contact_details: contact_details.data[0].value,
      favicon: favicon?.data[0]?.file_name || null,
      nav_type: nav_type?.data[0]?.value || {},
      blog_type: blog_type?.data[0]?.value || {},
      project_id,
    },
  };
}
