import Card from "@/components/home/card";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";

export default async function Home() {

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-5xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Elevate Your Influence.
        </h1>
      </div>
      <section id="Projects"
        className="z-10 w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">

        <div className="w-72 h-60 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="/product">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/TheNorthFace_logo.svg/1200px-TheNorthFace_logo.svg.png"
              alt="Product" className="h-60 w-72 object-cover rounded-xl" />
          </a>
        </div>

        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="/product">
            <img src="https://cdn-images.farfetch-contents.com/18/89/99/65/18899965_41104914_600.jpg"
              alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
            <div className="px-4 py-3 w-72 text-center">
              <p className="text-lg font-bold text-black truncate block capitalize">Summer Series</p>
              <p className="text-sm font-semibold text-black cursor-auto my-3">$x per 1000 impressions</p>
              <button
                className="rounded-md border border-[#D0D0D0] bg-white p-1.5 px-8 text-sm text-while transition-all hover:text-white hover:bg-[#E05F6A]">
                Participate
              </button>
            </div>
          </a>
        </div>

        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="/product">
            <img src="https://cdn-images.farfetch-contents.com/17/57/82/35/17578235_36757512_600.jpg"
              alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
            <div className="px-4 py-3 w-72 text-center">
              <p className="text-lg font-bold text-black truncate block capitalize">Summer Series</p>
              <p className="text-sm font-semibold text-black cursor-auto my-3">$x per 1000 impressions</p>
              <button
                className="rounded-md border border-[#D0D0D0] bg-white p-1.5 px-8 text-sm text-while transition-all hover:text-white hover:bg-[#E05F6A]">
                Participate
              </button>
            </div>
          </a>
        </div>

        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="/product">
            <img src="https://cdn-images.farfetch-contents.com/17/62/17/92/17621792_36776691_600.jpg"
              alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
            <div className="px-4 py-3 w-72 text-center">
              <p className="text-lg font-bold text-black truncate block capitalize">Summer Series</p>
              <p className="text-sm font-semibold text-black cursor-auto my-3">$x per 1000 impressions</p>
              <button
                className="rounded-md border border-[#D0D0D0] bg-white p-1.5 px-8 text-sm text-while transition-all hover:text-white hover:bg-[#E05F6A]">
                Participate
              </button>
            </div>
          </a>
        </div>

        <div className="w-72 h-60 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="/product">
            <img src="https://devinfo.in/wp-content/uploads/job-manager-uploads/company_logo/2024/01/nike.jpg"
              alt="Product" className="h-60 w-72 object-cover rounded-xl" />
          </a>
        </div>

        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="/product">
            <img src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5e7687f1-c13e-4bac-8ffa-a6f863ae9157/dunk-high-retro-shoe-DdRmMZ.png"
              alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
            <div className="px-4 py-3 w-72 text-center">
              <p className="text-lg font-bold text-black truncate block capitalize">Summer Series</p>
              <p className="text-sm font-semibold text-black cursor-auto my-3">$x per 1000 impressions</p>
              <button
                className="rounded-md border border-[#D0D0D0] bg-white p-1.5 px-8 text-sm text-while transition-all hover:text-white hover:bg-[#E05F6A]">
                Participate
              </button>
            </div>
          </a>
        </div>

        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="/product">
            <img src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/61efd032-678a-42ec-9289-e1fd76a8240e/air-max-90-shoes-bl0tpg.png"
              alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
            <div className="px-4 py-3 w-72 text-center">
              <p className="text-lg font-bold text-black truncate block capitalize">Summer Series</p>
              <p className="text-sm font-semibold text-black cursor-auto my-3">$x per 1000 impressions</p>
              <button
                className="rounded-md border border-[#D0D0D0] bg-white p-1.5 px-8 text-sm text-while transition-all hover:text-white hover:bg-[#E05F6A]">
                Participate
              </button>
            </div>
          </a>
        </div>

        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="/product">
            <img src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/dec25f7f-1f38-44af-83e7-c8f83974ac16/blazer-mid-pro-club-shoes-xCk8SQ.png"
              alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
            <div className="px-4 py-3 w-72 text-center">
              <p className="text-lg font-bold text-black truncate block capitalize">Summer Series</p>
              <p className="text-sm font-semibold text-black cursor-auto my-3">$x per 1000 impressions</p>
              <button
                className="rounded-md border border-[#D0D0D0] bg-white p-1.5 px-8 text-sm text-while transition-all hover:text-white hover:bg-[#E05F6A]">
                Participate
              </button>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
