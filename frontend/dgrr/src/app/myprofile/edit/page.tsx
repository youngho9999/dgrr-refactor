'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import Header from '@/components/elements/Header';
import ImageInput from '@/components/elements/ImageInput';
import DataInput from '@/components/elements/DataInput';
import Swal from 'sweetalert2';
import { UpdateMyInfoProps, getMyInfoApi, updateMyInfoApi } from '@/apis/myProfileApi';

const Edit = () => {
  const [nowNickname, setNowNickName] = useState('');
  const [nowDescription, setNowDescription] = useState('');
  const [nowProfileImage, setNowProfileImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyInfoApi();
        console.log('데이터 가져오기 성공:', response);
        setNowNickName(response.member.nickname);
        setNowDescription(response.member.description);
        setNowProfileImage(response.member.profileImage);

        // response의 PromiseResult를 추출
        const { gameHistoryList, member, ranking } = response;
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    fetchData();
  }, []);

  // 닉네임 입력값 반영
  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNowNickName(event.target.value);
    console.log(nowProfileImage);
  };

  // 상태 메시지 입력값 반영
  const handleDescirptChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNowDescription(event.target.value);
  };

  // 프로필 이미지 업로드해서 변경하는 코드
  const changeProfileImage = (event: any) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      if (event && event.target && typeof event.target.result === 'string') {
        setNowProfileImage(event.target.result);
      }
    };

    if (event && event.target && event.target.files && event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const requestNewNicknameModal = () => {
    Swal.fire({
      width: 400,
      title: `닉네임이 중복되거나
      입력되지 않았어요😥`,
      icon: 'error',
      confirmButtonColor: '#469FF6',
      confirmButtonText: '확인',
      customClass: {
        confirmButton: 'custom-confirm-button',
      },
    });
  };

  // 저장 버튼
  // 닉네임이 입력되지 않았거나 중복되면 경고 모달창이 뜸
  const handleSaveButton = async () => {
    console.log('Save');
    console.log(nowNickname, nowDescription);
    const data: UpdateMyInfoProps = {
      nickname: nowNickname,
      profileImage: nowProfileImage,
      description: nowDescription,
    };

    try {
      await updateMyInfoApi(data);
      // 여기서 정상적인 처리를 수행
      const newPathname = '/myprofile';
      window.location.href = newPathname;
    } catch (error) {
      // 에러가 발생한 경우
      requestNewNicknameModal();
    }
  };

  const openWithdrawModal = () => {
    Swal.fire({
      width: 400,
      title: `데구르르에서
      탈퇴하시겠습니까?`,
      text: '기록과 사진이 모두 삭제됩니다😥',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#469FF6',
      cancelButtonColor: '#E83F57',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancle-button',
      },
    }).then((result) => {
      // 나중에 token 삭제하는 API 넣어야 함
      // 확인 버튼 누르면 회원 탈퇴되고, 로그인 전 화면으로 이동함
      if (result.isConfirmed) {
        console.log('Withdraw DGRR');
        const newPathname = '/';
        window.location.href = newPathname;
      }
    });
  };
  return (
    <div className='w-screen max-w-[500px]'>
      <Header headerType='OTHER'>프로필 수정</Header>
      <div>
        <ImageInput myProfileImage={nowProfileImage} profileImageUpdate={changeProfileImage} />
        <DataInput
          inputType='NICKNAME'
          pageType='PROFILE_EDIT'
          onChange={handleNicknameChange}
          value={nowNickname}
        />
        <DataInput
          inputType='DESCRIPTION'
          pageType='PROFILE_EDIT'
          onChange={handleDescirptChange}
          value={nowDescription}
        />
      </div>
      <div className='px-6'>
        <div
          onClick={handleSaveButton}
          className='bg-main-blue rounded-lg w-full max-w-[500px] p-4 hover:brightness-110'
        >
          <div className='text-white text-center text-base font-bold cursor-pointer uppercase leading-none'>
            저장
          </div>
        </div>
      </div>
      <div
        onClick={openWithdrawModal}
        className='flex justify-center mt-40 mb-3 text-xs font-semibold cursor-pointer hover:text-[#E83F57]'
      >
        회원 탈퇴
      </div>
    </div>
  );
};

export default Edit;
