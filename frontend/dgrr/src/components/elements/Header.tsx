'use client';


import { IoTrophyOutline, IoPersonOutline, IoChevronBackOutline, IoCopyOutline, IoExitOutline, IoPencilSharp } from "react-icons/io5";

export type headerType = 'MAIN' | 'PROFILE' | 'WAITING' | 'GAME' | 'OTHER';

interface HeaderProps {
  headerType: headerType;
  children?: React.ReactNode;
}

const Header = ({headerType, children}: HeaderProps) => {
  return (
    <div>
      {headerType === 'MAIN' ? (
      <div className='w-[360px] h-[60px] top-0 right-0 flex justify-between items-center'>
      <div className='flex ms-4'>
        <IoTrophyOutline fontSize={'27px'} />
      </div>
      <div className='me-4'>
        <IoPersonOutline fontSize={'27px'} />
      </div>
    </div>
      ) : headerType === 'PROFILE' ? (
        <div className='w-[360px] h-[60px] top-0 right-0 flex justify-between items-center'>
      <div className='flex gap-2 ms-2'>
        <IoChevronBackOutline fontSize={'27px'} />
        <div className='inline-block text-lg font-semibold'>마이 프로필</div>
      </div>
      <div className='me-4'>
        <IoPencilSharp fontSize={'25px'} />
      </div>
    </div>
        ) : headerType === 'WAITING' ? (
            <div className='w-[360px] h-[60px] top-0 right-0 gap-2 pe-4 flex justify-end items-center'>
              <div className='cursor-pointer'>
                <IoCopyOutline fontSize={'27px'} />
              </div>
              <div className='cursor-pointer'>
                <IoExitOutline fontSize={'30px'} />
              </div>
        </div>
      ) : headerType === 'GAME' ? (
        <div className='bg-black w-[360px] h-[60px] top-0 right-0 gap-[107px] pe-4 flex justify-end items-center'>
          <div className='text-white text-3xl font-semibold'>
            0:11
          </div>
          <div className='cursor-pointer'>
            <IoExitOutline color={'#FFFFFF'} fontSize={'30px'} />
          </div>
    </div>
  ) : (
        <div className='w-[360px] h-[60px] top-0 right-0 flex items-center'>
        <div className='flex gap-2 ms-2'>
        <IoChevronBackOutline fontSize={'27px'} />
              <div className='inline-block text-lg font-semibold'>{children}</div>
      </div>
      </div>
      )}
    </div>
  )
}

export default Header;