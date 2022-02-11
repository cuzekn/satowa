import Head from "next/head";
import Link from "next/link";
import { VFC } from "react";

type Props = {
  children: any;
  title?: string;
}

export const Header: VFC<Props> = ({ children, title = "HP by Nextjs" }) => {
  return (
    <div className="flex items-center flex-col text-green-900 text-sm font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav className="bg-green-900 w-screen">
          <div className="flex items-center pl-8 h-14">
            <div className="flex space-x-4">
              <Link href="/">
                <a className="text-orange-400 hover:bg-green-800 px-3 py-2 rounded">
                  satoWa
                </a>
              </Link>
              <Link href="/about">
                <a className="text-orange-400 hover:bg-green-800 px-3 py-2 rounded">
                  About
                </a>
              </Link>
              <Link href="/profile">
                <a className="text-orange-400 hover:bg-green-800 px-3 py-2 rounded">
                  Profile
                </a>
              </Link>
              <Link href="/album">
                <a className="text-orange-400 hover:bg-green-800 px-3 py-2 rounded">
                  Album
                </a>
              </Link>
              <Link href="/login">
                <a className="text-orange-400 hover:bg-green-800 px-3 py-2 rounded">
                  Login
                </a>
              </Link>
              <Link href="/signup">
                <a className="text-orange-400 hover:bg-green-800 px-3 py-2 rounded">
                  Signup
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      {/* <main className="flex flex-1 justify-center items-center flex-col w-screen bg-orange-100">
        {children}
      </main> */}
    </div>
  );
}
