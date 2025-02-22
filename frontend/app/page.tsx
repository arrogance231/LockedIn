
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative">
      <nav className="mx-auto p-4 w-[200px] h-screen float-left bg-[#283061]">
        <div className="grid justify-items-center">
          <div className="pt-4">
            <div className="text-4xl font-bold pb-2 flex justify-center items-center">
              <p>Icon</p>
            </div>
            <div className="text-center">Dev Name</div>
          </div>
          <div className="xl:pt-28 grid gap-4">
            <div className="flex gap-2 items-center">
              <Image
                src="/home.svg"
                alt="bg"
                width={20}
                height={20}
                className="xl:w-[20px]"
              ></Image>
              <span>Home</span>
            </div>
            <div className="text-center">Hotdog</div>
            <div className="text-center">Hotdog</div>
            <div className="text-center">Hotdog</div>
            <div className="text-center">Hotdog</div>
          </div>
        </div>
      </nav>
      <section>
        <div className="flex w-auto justify-between h-[52px] p-4 bg-[#1F265A]">
          <div className=" flex justify-start">
            <Image
              src="/hamburger.svg"
              alt="sc"
              width={20}
              height={20}
              className=""
            ></Image>
          </div>
          <div className="justify-end">Hello</div>
        </div>
      </section>
      <section className="flex flex-col">
        <div className="w-full h-[250px] bg-gradient-to-r from-orange-700 to-yellow-500 p-4">
          <div className="p-4">
            <p className="text-4xl font-bold">Hello</p>
          </div>
        </div>
        <div className="m-4 p-4 flex flex-col gap-4">
          <div className="bg-blue-400 h-[200px] rounded-lg">
            <div className="m-4">Hello</div>
          </div>
          <div className="bg-red-400 h-[200px] rounded-lg">
            <div className="m-4">Hello</div>
          </div>
        </div>
      </section>
    </main>
  );
}
