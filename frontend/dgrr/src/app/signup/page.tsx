'use client';

import { FuncButton } from '@/components/FuncButton';
import DataInput from '@/components/elements/DataInput';
import ImageInput from '@/components/elements/ImageInput';

const SignUp = () => {
  const handleSignUp = () => {
    console.log('Sign Up');
  };

  return (
    <div className='w-screen max-w-[500px]'>
      <div className='mt-12 ms-6 text-xl font-bold'>데구르르에 오신 것을 환영해요!</div>
      <div className='flex justify-center'>
        <ImageInput myProfileImage='/images/default_profile_image.png' />
      </div>
      <div className='mt-1 mb-11'>
        <DataInput inputType='NICKNAME' pageType='SIGNUP' />
        <DataInput inputType='DESCRIPTION' pageType='SIGNUP' />
      </div>
      <div className='flex justify-center h-14'>
        <FuncButton isBlue clickEvent={handleSignUp} value='시작하기' />
      </div>
    </div>
  );
};

export default SignUp;
