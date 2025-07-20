import InputPost from "../dialog/InputPost";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-2 p-3">
        <div className="mt-5">
          <h1 className="text-4xl text-white">Home</h1>
        </div>
        <div className="flex mt-5 bg-zinc-900 border-b-1 border-white">
          <InputPost />
        </div>
      </div>
    </>
  );
}
