import Header from "@/components/elements/Header";
import Image from "next/image";
import ex from "@/../public/images/logo_character.png";
import doorImg from "@/../public/images/door.svg";
import keyImg from "@/../public/images/key.svg";
import welcomeImg from "@/../public/images/welcome.svg";

const ListPage = () => {
  const gameList = [
    { value: "방 만들기", imgLink: doorImg },
    { value: "방 찾기", imgLink: keyImg },
    { value: "랜덤 매칭", imgLink: welcomeImg },
  ];

  return (
    <div className="bg-main-blue w-screen h-screen max-w-[500px]">
      <Header headerType="MAIN" />
      <div className="space-y-6">
        {gameList.map((item, index) => (
          <div
            className="w-4/5 max-w-xs py-3 mx-auto bg-white rounded-lg border-2 border-black flex flex-col items-center"
            key={index}
          >
            <Image src={item.imgLink} alt="이미지예시" className="w-20 h-20" />
            <p className="font-bold text-base">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPage;
