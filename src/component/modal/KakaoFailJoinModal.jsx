'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  MessageCircle,
  X,
  CircleAlert,
  Clock3,
  Home,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { useEffect } from 'react';

export default function KakaoFailJoinModal({ open, onOpenChange }) {

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onOpenChange(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="
          w-[560px] max-w-[560px] overflow-hidden rounded-[22px]
          border-0 bg-white !p-0 shadow-2xl
        "
      >
        <DialogHeader className="relative bg-[#FEE500] !px-9 !pt-8 !pb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full bg-[#EBD300] !px-4 !py-2 text-[14px] font-bold text-black">
              <MessageCircle size={15} />
              회원가입 실패
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5D800]"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          <div className="!mt-8 flex flex-col items-center text-center">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#F6D000]">
              <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#FF3B3B]">
                <X size={34} className="text-white" strokeWidth={3} />
              </div>
            </div>

            <DialogTitle className="!mt-6 text-[24px] font-extrabold text-black">
              회원가입에 실패했습니다
            </DialogTitle>

            <p className="!mt-2 text-[15px] text-black">
              사원 등록이 완료되지 않았습니다
            </p>
          </div>
        </DialogHeader>

        <div className="!px-9 !py-9">
          <div className="rounded-[16px] border border-red-200 bg-red-50 !px-6 !py-7 text-center">
            <div className="flex items-center justify-center gap-2 text-[18px] font-extrabold text-red-600">
              <CircleAlert size={22} />
              등록 실패 안내
            </div>

            <p className="!mt-5 text-[16px] leading-[1.8] text-red-800">
              <span className='text-red-600 font-bold'>
                사원 등록이 되지 않아 &nbsp;
              </span>
              회원가입을 실패했습니다.

              <br />
              관리자에게 문의하거나 잠시 후 다시 시도해 주세요.
            </p>
          </div>

          <div className="!mt-6 rounded-[14px] border border-gray-200 bg-gray-50 !px-5 !py-5 text-center">
            <div className="flex items-center justify-center gap-2 text-[16px] font-semibold text-gray-700">
              <Clock3 size={20} />
              잠시 후 메인 페이지로 이동합니다
            </div>

            <div className="!mt-4 h-[8px] overflow-hidden rounded-full bg-gray-200">
              <div className="h-full rounded-full bg-[#FEE500] animate-progress" />
            </div>

            <p className="!mt-4 text-[14px] text-gray-400">
              3초 후 자동으로 이동됩니다
            </p>
          </div>

          <button
            type="button"
            className="
              !mt-7 flex h-[64px] w-full items-center justify-center gap-3
              rounded-[14px] bg-[#FEE500] text-[20px] font-extrabold text-black
            "
          >
            <Home size={24} />
            메인 페이지로 이동
          </button>
          {/* 
          <button
            type="button"
            className="
              !mt-4 flex h-[58px] w-full items-center justify-center gap-3
              rounded-[14px] border border-gray-200 bg-gray-50
              text-[18px] font-bold text-gray-700
            "
          >
            <RotateCcw size={22} />
            다시 시도하기
          </button> */}
        </div>

        <div className="flex h-[54px] items-center justify-center gap-2 bg-gray-50 text-[14px] text-gray-400">
          <ShieldCheck size={16} />
          문제가 지속되면 관리자(admin@company.com)에게 문의해 주세요
        </div>
      </DialogContent>
    </Dialog>
  );
}