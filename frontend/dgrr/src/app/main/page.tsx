"use client";
import character from "@/../public/images/logo_character.png";
import title from "@/../public/images/logo_title.png";
import Image from "next/image";
import { LinkButton } from "@/components/LinkButton";
import { FuncButton } from "@/components/FuncButton";
import Header from "@/components/elements/Header";
import { ExplainModal } from "@/components/elements/ExplainModal";
import { useState } from "react";

const MainPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const handleModal = () => {
    setOpenModal(!openModal)
  };
  return (
    <div className="flex flex-col items-center w-screen bg-main-blue">
      <Header headerType="MAIN" />
      {openModal && <ExplainModal onClose={handleModal} />}
      <Image alt="캐릭터" src={character} className="w-40 h-40" />
      <Image alt="타이틀" src={title} className="w-48" />
      <div className="flex flex-col w-full items-center space-y-6">
        <FuncButton value="게임 설명" clickEvent={handleModal} />
        <LinkButton moveLink="game/list" value="게임 시작" />
      </div>
    </div>
  );
};

export default MainPage;
