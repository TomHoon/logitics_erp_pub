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
	User,
	Hash,
	Lock,
	EyeOff,
	Info,
	Check,
	ChevronRight,
	CircleCheck,
	ShieldCheck,
} from 'lucide-react';

export default function KakoAddInfoModal({ open, onOpenChange }) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				showCloseButton={false}
				className="
          w-[440px] max-w-[440px] overflow-hidden rounded-[18px]
          border-0 bg-white p-0 shadow-2xl
        "
			>
				<DialogHeader className="relative bg-[#FEE500] px-7 pb-7 pt-7">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 rounded-full bg-[#EBD300] px-4 py-2 text-[13px] font-bold text-black">
							<MessageCircle size={14} />
							카카오 로그인 완료
						</div>

						<button
							type="button"
							onClick={() => onOpenChange(false)}
							className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EBD300]"
						>
							<X size={18} />
						</button>
					</div>

					<div className="mt-8 flex flex-col items-center text-center">
						<div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white">
							<User size={28} className="text-[#F6D600]" />
						</div>

						<DialogTitle className="mt-6 text-[22px] font-extrabold text-black">
							카카오 연동이 완료되었습니다 🎉
						</DialogTitle>

						<p className="mt-2 text-[13px] text-black">
							서비스 이용을 위해 추가 정보를 입력해 주세요
						</p>
					</div>
				</DialogHeader>

				<div className="px-7 py-6">
					<div className="space-y-4">
						<FormField
							label="사번"
							required
							icon={<Hash size={18} />}
							placeholder="사번을 입력하세요 (예: EMP-2025-001)"
						/>

						<FormField
							label="비밀번호"
							required
							icon={<Lock size={17} />}
							rightIcon={<EyeOff size={18} />}
							placeholder="비밀번호를 입력하세요"
							type="password"
							helper="영문, 숫자, 특수문자 포함 8자 이상"
						/>

						<FormField
							label="비밀번호 확인"
							required
							icon={<Lock size={17} />}
							rightIcon={<EyeOff size={18} />}
							placeholder="비밀번호를 다시 입력하세요"
							type="password"
						/>
					</div>

					<div className="my-5 h-px bg-gray-100" />

					<div>
						<p className="mb-3 text-[14px] font-bold text-gray-900">
							약관 동의
						</p>

						<button
							type="button"
							className="
                flex w-full items-center justify-between rounded-[10px]
                border border-[#F6D600] bg-[#FFFBEA] px-4 py-4
              "
						>
							<div className="flex items-center gap-3">
								<span className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-[#FEE500]">
									<Check size={15} />
								</span>

								<div className="text-left">
									<p className="text-[14px] font-bold text-black">
										서비스 이용약관 전체 동의
									</p>
									<p className="mt-1 text-[11px] text-gray-400">
										아래 필수 약관에 모두 동의합니다
									</p>
								</div>
							</div>

							<ChevronRight size={18} className="text-gray-400" />
						</button>
					</div>

					<button
						type="button"
						className="
              mt-5 flex h-[48px] w-full items-center justify-center gap-2
              rounded-[10px] bg-[#FEE500] text-[16px] font-extrabold text-black
            "
					>
						<CircleCheck size={18} />
						정보 입력 완료
					</button>
				</div>

				<div className="flex h-[48px] items-center justify-center gap-2 bg-gray-50 text-[11px] text-gray-400">
					<ShieldCheck size={14} />
					입력하신 정보는 안전하게 암호화되어 저장됩니다
				</div>
			</DialogContent>
		</Dialog>
	);
}

function FormField({
	label,
	required,
	icon,
	rightIcon,
	placeholder,
	type = 'text',
	helper,
}) {
	return (
		<div>
			<label className="mb-2 block text-[13px] font-bold text-gray-900">
				{label} {required && <span className="text-red-500">*</span>}
			</label>

			<div
				className="
          flex h-[46px] items-center gap-3 rounded-[10px]
          border border-gray-200 bg-gray-50 px-3
        "
			>
				<span className="text-gray-400">{icon}</span>

				<input
					type={type}
					placeholder={placeholder}
					className="
            h-full flex-1 bg-transparent text-[13px] outline-none
            placeholder:text-gray-400
          "
				/>

				{rightIcon && <span className="text-gray-400">{rightIcon}</span>}
			</div>

			{helper && (
				<p className="mt-2 flex items-center gap-1 text-[11px] text-gray-400">
					<Info size={12} />
					{helper}
				</p>
			)}
		</div>
	);
}
