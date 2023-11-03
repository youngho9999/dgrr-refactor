'use client';

import Header from '@/components/elements/Header';
import { useState } from 'react';

const Ranking = () => {
  return (
    <div className="w-screen max-w-[500px]">
      <Header headerType="OTHER">랭킹 조회</Header>
      <div className="flex justify-center mt-3 mb-8">
        <div className="w-11/12">
          <div className="h-10 flex">
            <div className="flex items-center justify-center w-1/2 h-full bg-[#EAEEFF] rounded-t-lg text-sm font-bold">
              현 시즌 랭킹
            </div>
            <div className="flex items-center justify-center w-1/2 h-full bg-main-blue rounded-t-lg text-sm font-bold">
              전 시즌 랭킹
            </div>
          </div>
          <div className="h-[110px] bg-[#EAEEFF]">내 랭킹</div>
          <div className="h-[1070px] bg-[#DADADA] rounded-b-lg">모든 랭킹</div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
