'use client';

import Image from 'next/image';

export default function ContactInformation() {
  return (
    <div className="bg-[#323232] rounded-2xl lg:w-[570px] lg:h-[946px] h-[550px] flex flex-col justify-center items-center mx-auto">
    <div className="w-[80%] text-center">
      <h1 className="text-[40px] font-bold text-[#FFFFFF]">Contact Information</h1>
      <div className="mt-[32px] flex flex-col gap-4 ">
        <div className="flex gap-[15px] items-center">
          <Image src="/location.png" alt="" width={24} height={24} />
          <p className="text-[18px] text-white font-normal leading-[150%] text-left">
           334 Masrshall way STE A, UT 84041
          </p>
        </div>
        <div className="flex gap-[15px] items-center">
          <Image src="/mail-01.png" alt="" width={24} height={24} />
          <p className="text-[18px] text-white font-normal leading-[150%] text-left">
            E-mail: sales@drip-swag.com
          </p>
        </div>
        <div className="flex gap-[15px] items-center">
          <Image src="/phone-incoming-02.png" alt="" width={24} height={24} />
          <p className="text-[18px] text-white font-normal leading-[150%] text-left">
            Phone: 385-316-7244
          </p>
        </div>
      </div>
      <div className="bg-white lg:w-[420px] h-[96px] px-11 py-6 rounded-md mt-14 flex justify-center items-center">
        <h4 className="font-semibold text-xl">
          Saturday to Thursday:<br />9:00 AM - 6 PM
        </h4>
      </div>
    </div>
  </div>
  

  );
}
