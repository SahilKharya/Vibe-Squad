"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-[#E05F6A] backdrop-blur-xl"
            : "bg-[#E05F6A]"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Precedent logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>VibeSquad</p>
          </Link>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <>
              <button
                className="rounded-md border border-white bg-transparent p-1.5 px-8 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowSignInModal(true)}
              >
                Log In
              </button> &ensp;
              <button
              className="rounded-md border border-white bg-white p-1.5 px-8 text-sm text-black transition-all hover:bg-white hover:text-black">
              Sign Up
            </button>
            </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
