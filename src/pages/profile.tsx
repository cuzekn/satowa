import React from "react";
import { Image, Tabs } from "@mantine/core";

import { Header } from "src/components/Layout/Header";

const profile = () => {
  return (
    <>
      <Header title="Profile">
        <div className="flex fixed top-0 right-0 justify-center items-center p-3 m-8 w-6 h-6 font-mono text-xs text-white bg-gray-700 rounded-full sm:bg-pink-500 lg:bg-green-500 xl:bg-blue-500">
          <div className="block sm:hidden md:hidden lg:hidden xl:hidden">
            al
          </div>
          <div className="hidden sm:block md:hidden lg:hidden xl:hidden">
            sm
          </div>
          <div className="hidden sm:hidden md:block lg:hidden xl:hidden">
            md
          </div>
          <div className="hidden sm:hidden md:hidden lg:block xl:hidden">
            lg
          </div>
          <div className="hidden sm:hidden md:hidden lg:hidden xl:block">
            xl
          </div>
        </div>
        <header className="mx-2 w-full h-96 bg-slate-300 xl:max-w-6xl">
          <Image src="/images/sou-h.jpg" alt="sou header image" height={384} />
        </header>
        <div className="w-full h-48 bg-white flex">
          <div className="">
            <Image
              src="/images/sou.jpg"
              alt="sou icon image"
              height={100}
              width={100}
              radius={100}
              m={24}
            />
          </div>
          <div className="my-2">
            <p className="text-4xl text-primary-brown py-2">そう</p>
            <p className="text-xl text-primary-brown py-2">ニックネーム：そうちゃん</p>
            <button className="bg-primary-orange text-white p-3 rounded-lg text-xl active:bg-primary-thinOrange">お気に入り</button>
          </div>
        </div>
        <div className="my-12 w-11/12 h-96 text-lg">
          <Tabs
            color="orange"
            tabPadding="xl"
            className="lg:max-w-4xl bg-white"
          >
            <Tabs.Tab
              label="Profile"
              variant="outline"
              className="focus:text-white focus:bg-green-700"
            >
              <ul>
                <li className="px-5 py-2">種類：ミックス</li>
                <li className="px-5 py-2">性別：おとこのこ</li>
                <li className="px-5 py-2">誕生日：</li>
                <li className="px-5 py-2">年齢：6歳</li>
                <li className="px-5 py-2">お迎えした日：</li>
                <li className="px-5 py-2">家族：まろ(姉)・むぎ(実妹)</li>
              </ul>
            </Tabs.Tab>
            <Tabs.Tab
              label="family"
              variant="outline"
              className="focus:text-white focus:bg-green-700"
            >
              family
            </Tabs.Tab>
            <Tabs.Tab
              label="follow"
              variant="outline"
              className="focus:text-white focus:bg-green-700"
            >
              follow
            </Tabs.Tab>
          </Tabs>
        </div>
      </Header>
    </>
  );
};

export default profile;
