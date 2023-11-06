'use client';

import { FuncButton } from '@/components/FuncButton';
import DataInput from '@/components/elements/DataInput';
import ImageInput from '@/components/elements/ImageInput';
import { ChangeEvent, useEffect, useState } from 'react';

const SignUp = () => {
  const [nickname, setNickName] = useState('');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState('/images/default_profile_image.png');
  const [nicknameExists, setNicknameExists] = useState(false)
  
  useEffect(() => {
    if (nickname === '농담곰의 농담') { 
      setNicknameExists(true)
    } else {
      setNicknameExists(false)
    }
  }, [nickname])


  // 닉네임 입력값 반영
  const handleAddNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value);
  };

  // 상태 메시지 입력값 반영
  const handleAddDescirpt = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  // 프로필 이미지 업로드해서 변경하는 코드
  const addProfileImage = (event: any) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      if (event && event.target && typeof event.target.result === 'string') {
        setProfileImage(event.target.result);
      }
    };

    if (event && event.target && event.target.files && event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSignUpButton = () => {
    console.log('Sign Up');
  };

  return (
    <div className='w-screen max-w-[500px]'>
      <div className='mt-12 ms-6 text-xl font-bold'>데구르르에 오신 것을 환영해요!</div>
      <div className='flex justify-center'>
        <ImageInput myProfileImage={profileImage} profileImageUpdate={addProfileImage} />
      </div>
      <div className='mt-1 mb-11'>
        <DataInput inputType='NICKNAME' pageType='SIGNUP' nicknameExists={nicknameExists} onChange={handleAddNickname} />
        <DataInput inputType='DESCRIPTION' pageType='SIGNUP' onChange={handleAddDescirpt} />
      </div>
      <div className='flex justify-center h-14'>
        <FuncButton isBlue clickEvent={handleSignUpButton} value='시작하기' />
      </div>
    </div>
  );
};

export default SignUp;
