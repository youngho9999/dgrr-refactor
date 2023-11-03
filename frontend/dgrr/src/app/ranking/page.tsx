'use client';

import Header from '@/components/elements/Header';
import RankingMedal from '@/components/elements/RankingMedal';
import { useEffect, useState } from 'react';

const Ranking = () => {
  const [currentSeason, setCurrentSeason] = useState(true);
  const [rankingData, setRankingData] = useState({
    memberRank: {
      nickname: '',
      profileImage: '',
      rankingId: 0,
      memberId: 0,
      season: 0,
      score: 0,
    },
    rankings: [
      {
        nickname: '',
        profileImage: '',
        rankingId: 0,
        memberId: 0,
        season: 0,
        score: 0,
      },
    ],
  });

  const clickCurrent = () => {
    setCurrentSeason(true);
  };

  const clickPast = () => {
    setCurrentSeason(false);
  };

  useEffect(() => {
    setRankingData(
      {
        memberRank: {
          nickname: 'myNickname',
          profileImage: '/images/nongdam.jpg',
          rankingId: 1,
          memberId: 1,
          season: 1,
          score: 1900,
        },
        rankings: [
          {
            nickname: 'myNickname',
            profileImage: '/images/nongdam.jpg',
            rankingId: 1,
            memberId: 1,
            season: 1,
            score: 1900,
          },
          {
            nickname: '영호 키는 2미터',
            profileImage: '/images/sample_image1.png',
            rankingId: 2,
            memberId: 2,
            season: 1,
            score: 1800,
          },
          {
            nickname: '오늘 밤 주인공은 현아',
            profileImage: '/images/sample_image2.png',
            rankingId: 3,
            memberId: 3,
            season: 1,
            score: 1800,
          },
          {
            nickname: '긍정왕 미정킹',
            profileImage: '/images/sample_image3.png',
            rankingId: 4,
            memberId: 4,
            season: 1,
            score: 1800,
          },
          {
            nickname: '뉴비 민영',
            profileImage: '',
            rankingId: 5,
            memberId: 5,
            season: 1,
            score: 1400,
          },
          {
            nickname: '잼민킹 수연',
            profileImage: '/images/sample_image4.png',
            rankingId: 6,
            memberId: 6,
            season: 1,
            score: 1800,
          },
          {
            nickname: '승규는 예비군',
            profileImage: '/images/sample_image1.png',
            rankingId: 7,
            memberId: 7,
            season: 1,
            score: 1800,
          },
          {
            nickname: '가나다라마바사아자차카타',
            profileImage: '',
            rankingId: 8,
            memberId: 8,
            season: 1,
            score: 1700,
          },
          {
            nickname: '가나다라마바사아자차카타',
            profileImage: '',
            rankingId: 9,
            memberId: 9,
            season: 1,
            score: 1500,
          },
          {
            nickname: '가나다라마바사아자차카타',
            profileImage: '',
            rankingId: 10,
            memberId: 10,
            season: 1,
            score: 1600,
          },
        ],
      }
    )
  })

  const ranking = 5

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
          <div className="h-[110px] bg-[#EAEEFF]">
            
          </div>
          <div className="h-[1070px] bg-[#DADADA] rounded-b-lg">모든 랭킹</div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
