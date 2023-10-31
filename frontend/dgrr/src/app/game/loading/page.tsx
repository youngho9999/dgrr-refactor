"use client";
import character from "@/../../public/images/logo_character.png";
import Image from "next/image";
import { FuncButton } from "@/components/FuncButton";
import { useState } from "react";
import { ExplainModal } from "@/components/elements/ExplainModal";

const GameLoading = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <div className="grid place-items-center bg-main-blue w-screen h-screen max-w-[500px]">
      {openModal && <ExplainModal onClose={handleModal} />}
      <Image alt="캐릭터" src={character} className="w-40 h-40" />
      <h1>게임 찾는 중...</h1>
      <FuncButton value="게임 설명" clickEvent={handleModal} small={true} />
    </div>
  );
};

export default GameLoading;
