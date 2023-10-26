import Header from "@/components/elements/Header";
import Image from "next/image";
import ex from "@/../public/images/logo_character.png";

const ListPage = () => {
  return (
    <div className="bg-main-blue">
      <Header headerType="MAIN" />
      <div className="w-4/5 max-w-xs bg-white rounded-lg border-2 border-black flex flex-col items-center">
        <Image src={ex} alt="이미지예시" className="w-20 h-20" />
        <p className="font-bold text-base">방 만들기</p>
      </div>
    </div>
  );
};

export default ListPage;
