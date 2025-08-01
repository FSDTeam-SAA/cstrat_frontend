'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function ContactInformation() {
  return (
    <div className="mx-auto flex h-[550px] flex-col items-center justify-center rounded-2xl bg-[#323232] lg:h-[946px] lg:w-[570px]">
      <div className="w-[80%] text-center">
        <h1 className="text-[40px] font-bold text-[#FFFFFF]">Contact Information</h1>
        <div className="mt-[32px] flex flex-col gap-4">
          <div className="flex items-center gap-[15px]">
            <Image src="/location.png" alt="" width={24} height={24} />
            <p className="text-left text-[18px] font-normal leading-[150%] text-white">
              334 Masrshall way STE A, UT 84041
            </p>
          </div>
          <div className="flex items-center gap-[15px]">
            <Image src="/mail-01.png" alt="" width={24} height={24} />
            <p className="text-left text-[18px] font-normal leading-[150%] text-white">E-mail: sales@drip-swag.com</p>
          </div>
          <div className="flex items-center gap-[15px]">
            <Image src="/phone-incoming-02.png" alt="" width={24} height={24} />
            <p className="text-left text-[18px] font-normal leading-[150%] text-white">Phone: 385-316-7244</p>
          </div>
        </div>
        <div className="mt-14 flex h-[96px] items-center justify-center rounded-md bg-white px-11 py-6">
          <h4 className="text-xl font-semibold">
            Saturday to Thursday:
            <br />
            9:00 AM - 6 PM
          </h4>
        </div>
      </div>
      <div className="mt-8 w-[80%]">
        <Link href="https://forms.monday.com/forms/2bcd42c761aa6898d7cb39b2bcab53b7?r=use1" target="_blank">
          <Button className="w-full bg-cyan-400 text-black duration-500 hover:bg-slate-950 hover:text-white hover:underline">
            Drip Swag Intake Form <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
