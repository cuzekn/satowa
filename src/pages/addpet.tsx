import { Divider, Select } from "@mantine/core";
import { FiImage } from "react-icons/fi";

import { Header } from "src/components/Layout/Header";

const addpet = () => {
  return (
    <Header title="ペット一覧">
      <main>
        <h1 className="p-4 text-center text-xl">ペット一覧</h1>
        <div className="w-40 rounded-lg bg-green-800 p-4 text-center shadow-xl">
          <div className="flex justify-center ">
            <img
              alt="ペットの画像"
              className="h-32 w-full rounded-full object-cover"
            />
          </div>
          <div className="py-2 text-white">name</div>
          <button className="text-primary-orange">編集</button>
        </div>
      </main>
      <div className="w-80 rounded-xl bg-white text-center">
        <h1 className="pt-4 text-xl">ペットの登録</h1>
        <Divider my="xs" className="mx-5" />
        <form action="">
          <label htmlFor="name" className="mt-2">
            名前
          </label>
          <br />
          <input
            id="name"
            type="text"
            placeholder="豆助"
            required
            // value={petName}
            // onChange={(e) => setPetName(e.target.value)}
            className="mt-2 h-10 w-64 rounded-md border-2 border-primary-orange px-2 hover:border-primary-thinOrange focus:outline-primary-brown"
          />
          <br />
          <label htmlFor="image">
            <p className="pt-2">画像</p>
            <div className="mx-auto mt-3 h-32 w-32 cursor-pointer rounded-full border-2 border-primary-orange">
              {/* {petImagePreview ? (
                <img
                  src={petImagePreview!}
                  className="h-32 w-full rounded-full object-cover"
                />
              ) : (
                <GiHollowCat size={64} className="m-auto h-32 text-center" />
              )} */}
              <FiImage
                size={64}
                width={1}
                className="mx-auto h-full text-primary-green line-through"
              />
            </div>
            <input
              id="image"
              type="file"
              accept=".jpg, .jpeg, .png"
              // onChange={onChangeImageHandler}
              className="hidden"
              required
            />
          </label>
          <label htmlFor="">
            <p className="pt-2">種類</p>
            <input
              placeholder="柴犬"
              type="text"
              className="mt-2 h-10 w-64 rounded-md border-2 border-primary-orange px-2 hover:border-primary-thinOrange focus:outline-primary-brown"
            />
          </label>
          <label htmlFor="">
            <p className="pt-2">性別</p>
            <Select
              data={["女の子", "男の子"]}
              placeholder="女の子 or 男の子"
              variant="unstyled"
              required
              className="mt-2 ml-8 h-10 w-64 rounded-md border-2 border-primary-orange px-2 hover:border-primary-thinOrange focus:outline-primary-brown"
            />
          </label>
          <label htmlFor="">
            <p className="pt-2">お迎えした日</p>
            <input
              placeholder="2020/01/01"
              type="text"
              className="mt-2 h-10 w-64 rounded-md border-2 border-primary-orange px-2 hover:border-primary-thinOrange focus:outline-primary-brown"
            />
          </label>
          <label htmlFor="">
            <p className="pt-2">誕生日</p>
            <input
              placeholder="2020/01/01"
              type="text"
              className="mt-2 h-10 w-64 rounded-md border-2 border-primary-orange px-2 hover:border-primary-thinOrange focus:outline-primary-brown"
            />
          </label>
          
          <button
            // onClick={addImage}
            // disabled={!petName || !petImage}
            className="mt-4 mb-8  h-12 w-72 rounded-3xl bg-primary-thinOrange text-2xl shadow-lg hover:bg-primary-orange hover:text-white disabled:bg-slate-300"
          >
            作成
          </button>
        </form>
      </div>
    </Header>
  );
};

export default addpet;
