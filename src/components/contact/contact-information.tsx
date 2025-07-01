'use client';

import Image from 'next/image';

export default function ContactInformation() {
  return (
    <div className="mx-auto flex h-[550px] flex-col items-center justify-center rounded-2xl bg-gray-600 lg:h-[946px] lg:w-[570px]">
      <div className="w-[80%] text-center">
        <h1 className="text-[40px] font-bold text-[#FFFFFF]">Contact Information</h1>
        <div className="mt-[32px] flex flex-col gap-4">
          <div className="flex items-center gap-[15px]">
            <Image src="/location.png" alt="Location" width={24} height={24} />
            <p className="text-left text-[18px] font-normal leading-[150%] text-white">
              334 Marshall Way STE A Layton UT 84041
            </p>
          </div>
          <div className="flex items-center gap-[15px]">
            <Image src="/mail-01.png" alt="Email" width={24} height={24} />
            <p className="text-left text-[18px] font-normal leading-[150%] text-white">E-mail: sales@drip-swag.com</p>
          </div>
          <div className="flex items-center gap-[15px]">
            <Image src="/phone-incoming-02.png" alt="Phone" width={24} height={24} />
            <p className="text-left text-[18px] font-normal leading-[150%] text-white">Phone: 385-316-7244</p>
          </div>
        </div>
        <div className="mt-14 flex h-[96px] items-center justify-center rounded-md bg-white px-11 py-6 lg:w-[420px]">
          <h4 className="text-xl font-semibold">Hours of operations Monday Through Friday 8:00 am to 5:00 pm</h4>
        </div>
      </div>
    </div>
  );
}
