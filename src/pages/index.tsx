import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { Header } from "src/components/Layout/Header";

const Home: NextPage = () => {
  return (
    <>
      <Header>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </Header>
      <main>
        <div>
          <Image
            src="/dog.jpg"
            alt="Picture of the author"
            width={1000}
            height={655}
          />
        </div>
        <div>
          <div className="flex justify-center pt-3 font-body text-3xl">
            New Family
          </div>
        </div>
        <div className="flex">
          <div className="p-4 mr-4 w-40 text-center bg-green-800 rounded shadow-xl">
            <div className="flex justify-center">
              <Image
                className="rounded-full"
                src="/dog.jpg"
                width={128}
                height={128}
                alt="pet"
              />
            </div>
            <div className="text-white">Name</div>
            <button className="text-orange-600">Tap</button>
          </div>
          <div className="p-4 w-40 text-center bg-green-800 rounded shadow-xl">
            <div className="flex justify-center">
              <Image
                className="rounded-full"
                src="/dog.jpg"
                width={128}
                height={128}
                alt="pet"
              />
            </div>
            <div className="text-white">Name</div>
            <button className="text-orange-600">Tap</button>
          </div>
        </div>

        <div className="flex justify-center pt-3 font-body text-3xl">
          New Album
        </div>
        <div className="flex">
          <div className="p-4 mr-4 w-40 text-center bg-green-800 rounded shadow-xl">
            <div className="flex justify-center">
              <Image
                className="rounded-full"
                src="/dog.jpg"
                width={128}
                height={128}
                alt="pet"
              />
            </div>
            <div className="text-white">Name</div>
            <button className="text-orange-500">Tap</button>
          </div>
          <div className="p-4 w-40 text-center bg-green-800 rounded shadow-xl">
            <div className="flex justify-center">
              <Image
                className="rounded-full"
                src="/dog.jpg"
                width={128}
                height={128}
                alt="pet"
              />
            </div>
            <div className="text-white">Name</div>
            <button className="text-orange-500">Tap</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
