'use client';
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ParticleNetwork } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
import { Session } from "next-auth";
import contractAbi from "./skyrise-abi.json" assert { type: "json" };

export default function Product({ session }: { session: Session }) {

    const [account, setAccount] = useState<string[]>([]);
    const [user, setUser] = useState();
    const [keylink, setKeyLink] = useState();
    const [checkoutStatus, setCheckoutStatus ] = useState(false);

    const checkout = () => {
        setCheckoutStatus(!checkoutStatus);
    }

    const loginWithParticleAuth = async () => {
        try {
            const particle = new ParticleNetwork({
                projectId: "248f2535-a866-43bc-b413-d625bab0cc23",
                clientKey: "cskYFQpjL93l7C04zyFamPJuvkG4hpneMeM7w9UR",
                appId: "5d9e9ee4-f7d3-4b1c-8299-9b20f53948e5",
                chainName: "arbitrum",
                chainId: 421613,
            });

            const userInfo = await particle.auth.login();
            // const tempProvider = new ethers.providers.Web3Provider(particleProvider, "any");
            // const address = await tempProvider.getSigner().getAddress();

            const particleProvider = new ParticleProvider(particle.auth);
            const ethersProvider = new ethers.providers.Web3Provider(particleProvider, "any");
            const accounts = await ethersProvider.listAccounts();
            setAccount(accounts);

            const userLoginAPI = await fetch("https://api.skyrise.vibesquad.co/user/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Request-Headers": "*",
                    "Access-Control-Request-Method": "*"
                },
                body: JSON.stringify({
                    "username": "sumitmukhi",
                    "account": accounts[0],
                    "social": {
                        "twitter": {
                            "username": "sumitmukhi"
                        }
                    }
                }),
            })

            const userData = await userLoginAPI.json();
            console.log(userData);
            setUser(userData);

            const res = await fetch("https://api.skyrise.vibesquad.co/keylink", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Request-Headers": "*",
                    "Access-Control-Request-Method": "*"
                },
                body: JSON.stringify({
                    "network": "base-sepolia",
                    "contract": accounts[0],
                    "user": accounts[0],
                    "redirect": "product-link"
                }),
            })

            const data = await res.json();
            console.log(data);
            setKeyLink(data);

            // const provider = new ethers.providers.Web3Provider(window.ethereum)
            // await ethersProvider.send("eth_requestAccounts", []);
            const signer = ethersProvider.getSigner()

            const contractAddress = "0x467C86b927F4a6Ac42BadB5f58027365f8716083";
            const walletClient = signer;

            const contractSigner = new ethers.Contract(
                contractAddress,
                contractAbi,
                walletClient
            );

            console.log(data.key);

            const tx = await contractSigner.participate(data.key);
            // Wait for Transaction Receipt
            const txData = await tx.wait();
            console.log('txData:', txData);


        } catch (e) {
            console.error(e);
        }

    };

    const createKeyLink = async (accounts: any[]) => {


    }

    return (
        <>
            <section className="z-10 w-4/4 flex justify-center">
                <div className="bg-white flex relative z-20 items-center overflow-hidden">
                    <div className="container mx-auto px-16 flex relative py-6">
                        <div className="w-72 h-40 mr-10 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/TheNorthFace_logo.svg/1200px-TheNorthFace_logo.svg.png"
                                alt="Product" className="h-40 w-72 object-cover rounded-xl" />
                        </div>
                        <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
                            <img src="https://m.media-amazon.com/images/I/714rtduhFQL._SL1500_.jpg" className="max-w-xs md:max-w-sm m-auto" />
                        </div>
                        <div className="sm:w-2/3 lg:w-3/5 flex flex-col relative z-20">
                            <span className="w-20 h-2 bg-gray-800 mb-12">
                            </span>
                            <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none text-gray-800">
                                Be on
                                <span className="text-5xl sm:text-7xl">
                                    Time
                                </span>
                            </h1>
                            <p className="text-sm sm:text-base text-gray-700">
                                Dimension of reality that makes change possible and understandable. An indefinite and homogeneous environment in which natural events and human existence take place.
                            </p>

                            <p className="mt-10 text-lg font-bold text-black cursor-auto my-3">$x per 1000 impressions</p>
                            {!keylink && <div className="flex mt-2">
                                <button onClick={loginWithParticleAuth} className="uppercase py-2 px-10 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400">
                                    Participate
                                </button>
                            </div>}
                        </div>
                        {checkoutStatus && <div className="ml-10 h-auto">
                            <img className="max-w-xs md:max-w-xs m-auto" src="./WF-Card.png" />
                        </div>}
                    </div>

                </div>
            </section>
            {keylink && !checkoutStatus && <section className="z-10 z-10 w-3/4 flex justify-left bg-white">
                 <div>
                    <table className="w-[800px] divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promotional Item</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Promo Fee</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">Summit Series Breithorn Jacket</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <span>$499</span>
                                    <p><span className="text-xs">VibeSquad Platform Fee (5%)</span> &ensp; $2.49</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">Total</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">$52.48</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap"></td>
                                <td className="px-6 py-4 whitespace-nowrap text-right"><button onClick={checkout} className="uppercase py-2 px-10 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md hover:bg-pink-400">
                                    Checkout
                                </button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>}
            {checkoutStatus && <><section className="z-10 w-3/4 flex justify-left bg-white pb-10">
                <div className="w-auto relative">
                    <h1 className="text-5xl">
                        Referral link generated for John
                    </h1>
                </div>
            </section>
            <section className="z-10 w-3/4 flex justify-left bg-white pb-10">
                <div className="max-w-2xl">
                    <div className="flex gap-3 bg-white border border-gray-300 rounded-t-xl overflow-hidden items-center justify-start">
                        <div className="flex flex-col gap-2 py-2">
                            <p className="text-xs font-bold p-4">
                                https://www.abcdefghijkl.com/refasdadasdmoiasdmvjoiasmcasdviomasdkvmadfoijnbmoiasim
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 bg-white border border-gray-300 rounded-b-xl overflow-hidden items-center justify-start">
                        <div className="flex flex-col gap-2 py-2">
                            <p className="text-sm text-gray-500 p-4">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="max-w-2xl ml-5">
                    <div className="flex bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start">
                        <div className="flex flex-col gap-2">
                            <a href="/endorsements" className="uppercase py-5 px-14 rounded-lg bg-white border-transparent text-pink text-md hover:bg-pink-400 hover:text-white">
                                Copy
                            </a>
                        </div>
                    </div>
                </div>
            </section></>}

        </>
    )
}