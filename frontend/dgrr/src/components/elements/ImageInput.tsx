'use client';

import { useEffect, useRef, useState } from 'react';
import { IoCamera } from 'react-icons/io5';

interface ImageInputProps {
  myProfileImage: string;
}

const ImageInput = ({ myProfileImage }: ImageInputProps) => {
  const [nowProfileImage, setNowProfileImage] = useState(myProfileImage);
  const changeProfileImage = (event: any) => {
    const file = event.target.files
    console.log(file)
    setNowProfileImage(file)
  }

  return (
    <div className='px-6 py-8'>
      <div className='w-[121px] relative'>
        <img
          className='w-[121px] aspect-square rounded-full'
          src={nowProfileImage}
          alt='기본 사진'
        />
        <label
          htmlFor='fileInput'
          className='absolute bottom-0 right-0 bg-[#E0E0E0] w-[25px] aspect-square rounded-full flex justify-center items-center cursor-pointer hover:text-main-blue'
        >
          <IoCamera fontSize={'17px'} />
        </label>
        <input type='file' id='fileInput' style={{ display: 'none' }} accept='img/*' onChange={changeProfileImage} />
      </div>
    </div>
  );
};

export default ImageInput;
