import InputPost from "./InputPost";
import PostCard from "./PostCard";
import avatar from "@/assets/user.png";
import booksImage from "@/assets/handphone.jpg";

export default function Home() {
  const posts = [
    {
      username: "QCompounding",
      handle: "QCompounding",
      time: "Jul 25",
      avatar,
      content: "52 Books you should know:",
      likes: 500,
      comments: 125,
      image: booksImage,
    },
    {
      username: "tuantigabelas",
      handle: "tuantigabelas",
      time: "10h",
      avatar,
      content:
        "Dibanding rekan2 media menginterview saya terkait issue yg lg ramai, ada baiknya mending interview instansi yg ngasih izin, BKSDA dll. manfaatkan moment untuk mendorong regulasi nya jadi lebih ketat.\nKetua mpr kita pak Bamsut juga pelihara singa, ga mau push berita ini aja?",
      likes: 293,
      comments: 381,
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-2 p-3">
        <div className="mt-5">
          <h1 className="text-4xl text-white">Home</h1>
        </div>
        <div className="flex mt-5 bg-zinc-900 border-b-1 border-white">
          <InputPost />
        </div>
        <div className="w-full mx-auto px-4 mt-6">
          {posts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
      </div>
    </>
  );
}
