import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Banner from "@/components/containers/Banner";
import MostPopular from "@/components/containers/MostPopular";
import Navbar from "@/components/containers/Navbar";
import { Button } from "@/components/ui/button";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Footer from "@/components/containers/Footer";
import Rightbar from "@/components/containers/Rightbar";

const myFont = Montserrat({ subsets: ["cyrillic"] });

export default function Home({ logo, banner, most_popular }) {
  return (
    <div className={`min-h-screen ${myFont.className}`}>
      <Navbar
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/${logo.file_name}`}
      />
      <Banner
        badge={banner.value.badge}
        title={banner.value.title}
        tagline={banner.value.tagline}
        image={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/${banner?.file_name}`}
      />
      <MostPopular blogs={most_popular} />
      <FullContainer>
        <Container className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-home gap-12 w-full">
            {/* Left Column */}
            <div>
              <div className="flex flex-col items-center gap-3">
                <p className="italic text-xs w-fit text-center text-gray-400">
                  in
                  <span className="uppercase text-blue-700 font-medium ml-2 text-xs">
                    Lifestyle
                  </span>
                </p>
                <h2 className="text-center md:text-left font-extrabold text-3xl">
                  A Look Inside The Work Abode
                </h2>
                <p className="text-xs uppercase">
                  <span className="text-gray-400 text-xs">MAY 15, 2016</span> -
                  3 COMMENTS
                </p>
              </div>
              <div className="relative overflow-hidden w-full h-96 mt-8">
                <Image
                  src="https://cheerup2.theme-sphere.com/bold/wp-content/uploads/sites/8/2016/05/DSC2670-768x513.jpg"
                  alt="Background Image"
                  priority={true}
                  fill={true}
                  loading="eager"
                  className="-z-10 w-full h-full object-cover absolute top-0"
                />
              </div>
              <p className="mt-3">
                More off this less hello salamander lied porpoise much over
                tightly circa horse taped so innocuously outside crud mightily
                rigorous negative one inside gorilla and drew humbly shot
                tortoise inside opaquely. Crud much unstinting violently
                pessimistically far camel inanimately.
              </p>
              <p className="mt-3">
                Coquettish darn pernicious foresaw therefore much amongst
                lingeringly shed much due antagonistically alongside so then
                more and about turgid wrote so stunningly this that much slew.
              </p>
              <div className="flex justify-center">
                <Button className="mt-6 rounded-full">Read More</Button>
              </div>

              <div className="grid md:grid-cols-2 gap-10 mt-10">
                <div className="flex flex-col items-center text-center">
                  <div className="relative overflow-hidden w-full h-56 mt-8">
                    <Image
                      src="https://cheerup2.theme-sphere.com/bold/wp-content/uploads/sites/8/2016/05/shutterstock_604112207-1024x683.jpg"
                      alt="Background Image"
                      priority={true}
                      fill={true}
                      loading="eager"
                      className="-z-10 w-full h-full object-cover absolute top-0"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2 mt-5">
                    <p className="italic text-xs w-fit text-center text-gray-400">
                      in
                      <span className="uppercase text-blue-700 font-medium ml-2 text-xs">
                        Lifestyle
                      </span>
                    </p>
                    <h2 className="font-extrabold text-lg">
                      Newly Wed And Blissful Start of New Life
                    </h2>
                    <p className="text-xs">May 15, 2024</p>
                  </div>
                  <p className="my-6">
                    More off this less hello salamander lied porpoise much over
                    tightly circa horse taped so innocuously outside crud
                    mightily rigorous…
                  </p>
                  <Button className="rounded-full">Read More</Button>
                </div>
                <div>
                  <div className="flex flex-col items-center text-center">
                    <div className="relative overflow-hidden w-full h-96 mt-8">
                      <Image
                        src="https://cheerup2.theme-sphere.com/bold/wp-content/uploads/sites/8/2016/05/shutterstock_350435249-1024x1024.jpg"
                        alt="Background Image"
                        priority={true}
                        fill={true}
                        loading="eager"
                        className="-z-10 w-full h-full object-cover absolute top-0"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-2 mt-5">
                      <p className="italic text-xs w-fit text-center text-gray-400">
                        in
                        <span className="uppercase text-blue-700 font-medium ml-2 text-xs">
                          Travel
                        </span>
                      </p>
                      <h2 className="font-extrabold text-lg">
                        Latest Style Ideas For Men in Fashion
                      </h2>
                      <p className="text-xs">May 15, 2024</p>
                    </div>
                    <p className="my-6">
                      More off this less hello salamander lied porpoise much
                      over tightly circa horse taped so innocuously outside crud
                      mightily rigorous…
                    </p>
                    <Button className="rounded-full">Read More</Button>
                  </div>
                </div>
              </div>
            </div>

            <Rightbar />
          </div>
        </Container>
      </FullContainer>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const _logo = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_MANAGER
    }/api/public/industry_template_data/${
      process.env.NEXT_PUBLIC_INDUSTRY_ID
    }/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data/${"logo"}`
  );
  const logo = await _logo.json();

  const _banner = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_MANAGER
    }/api/public/industry_template_data/${
      process.env.NEXT_PUBLIC_INDUSTRY_ID
    }/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data/${"banner"}`
  );
  const banner = await _banner.json();

  const _blog_list = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_MANAGER
    }/api/public/industry_template_data/${
      process.env.NEXT_PUBLIC_INDUSTRY_ID
    }/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data/${"blog_list"}`
  );
  const blog_list = await _blog_list.json();

  const _most_popular = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_MANAGER
    }/api/public/industry_template_data/${
      process.env.NEXT_PUBLIC_INDUSTRY_ID
    }/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data/${"most_popular"}`
  );
  const most_popular = await _most_popular.json();

  return {
    props: {
      logo: logo.data[0],
      banner: banner.data[0],
      blog_list: blog_list.data[0].value,
      most_popular: most_popular.data[0].value,
    },
  };
}
