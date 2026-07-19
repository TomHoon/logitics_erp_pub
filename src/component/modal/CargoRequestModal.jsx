'use client';

import { useState } from 'react';
import {
	Box,
	CalendarDays,
	ChevronDown,
	Clock3,
	MapPin,
	Package,
	Phone,
	Plus,
	Save,
	Search,
	Trash2,
	Truck,
	UserRound,
	X,
	ArrowDown,
	Navigation,
	Info,
} from 'lucide-react';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PostCodeButton from '../common/PostCodeButton';

export default function CargoRequestModal({ open, setOpen }) {
	const [departureAddress, setDepartureAddress] = useState();
	const [arrivalAddress, setArrivalAddress] = useState();

	//배차요청 진행시 예시코드
	const goDispatchCargo = async () => {
		const param = {
			vehicleType: '1톤 트럭',
			dispatchDateTime: new Date().toISOString().slice(0, 19),

			dispatchManager: '홍길동',

			departureLocation: '서울특별시 강남구 테헤란로 123',
			departureLat: 37.5012,
			departureLng: 127.0396,
			departureArrivalTime: new Date().toISOString().slice(0, 19),
			departureMangerName: '김상차',
			departureMangerPhone: '010-1234-5678',

			arrivalLat: 35.1796,
			arrivalLng: 129.0756,
			arrivalTime: new Date().toISOString().slice(0, 19),
			arrivalMangerName: '이하차',
			arrivalMangerPhone: '010-5678-1234',

			cargoList: [
				{
					cargoName: '냉장 식품',
					quantity: '10',
					weight: '500',
					width: 100,
					depth: 80,
					height: '120',
				},
			],
		};

		const res = await baseApi.post('/api/v1/transport/dispatch-request', param);
	};

	const onCompletePostDepartureLatLngData = (lat, lng) => {
		console.log('lat >>', lat);
		console.log('lng >>', lng);
	};

	const onCompletePostArrivalLatLngData = (lat, lng) => {
		console.log('lat >>', lat);
		console.log('lng >>', lng);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				showCloseButton={false}
				className="
          max-h-[95vh]
          w-[770px]
          max-w-[770px]
          overflow-y-scroll
          border-0
          bg-white
          !p-0
        "
			>
				{/* Header */}
				<DialogHeader className="bg-[#2446b8] !px-8 !py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
								<Truck className="h-6 w-6 text-white" />
							</div>

							<div className="!ml-4">
								<DialogTitle className="text-[22px] font-bold text-white">
									배차 요청
								</DialogTitle>

								<p className="!mt-1 text-sm text-blue-100">
									운송 정보를 입력하고 배차를 요청하세요
								</p>
							</div>
						</div>

						<div className="flex items-center gap-3">
							<div className="rounded-xl bg-white/10 !px-4 !py-2 text-sm font-semibold text-white">
								# REQ-2025-0714
							</div>

							<Button
								type="button"
								size="icon"
								variant="ghost"
								onClick={() => setOpen(false)}
								className="bg-white/10 text-white hover:bg-white/20 hover:text-white"
							>
								<X className="h-5 w-5" />
							</Button>
						</div>
					</div>
				</DialogHeader>

				{/* Body */}
				<div className="overflow-y-auto !px-8 !py-7">
					{/* 요청 기본 정보 */}
					<SectionTitle color="bg-blue-500">요청 기본 정보</SectionTitle>

					<div className="grid grid-cols-3 gap-4 !mt-5">
						<Field label="요청자" required>
							<div className="relative">
								<UserRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

								<Input
									defaultValue="김담당자"
									className="h-[52px] !pl-11 !pr-20"
								/>

								<span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-blue-50 !px-2 !py-1 text-xs text-blue-500">
									물류팀
								</span>
							</div>
						</Field>

						<Field label="요청 일시" required>
							<div className="relative">
								<CalendarDays className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

								<Input
									defaultValue="2025.07.14 10:30"
									className="h-[52px] !pl-11 !pr-10"
								/>

								<ChevronDown className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
							</div>
						</Field>

						<Field label="차량 유형" required>
							<div className="relative">
								<Truck className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

								<Input
									defaultValue="1톤 트럭"
									className="h-[52px] !pl-11 !pr-10"
								/>

								<ChevronDown className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
							</div>
						</Field>
					</div>

					<Divider />

					{/* 상차지 */}
					<SectionTitle color="bg-emerald-500">
						<div className="flex items-center">
							상차지 (출발지)
							<span className="!ml-3 rounded-lg bg-emerald-50 !px-3 !py-1 text-xs font-semibold text-emerald-500">
								● 픽업 위치
							</span>
						</div>
					</SectionTitle>

					<AddressSearch
						color="emerald"
						address={departureAddress}
						setAddress={setDepartureAddress}
						onCompletePostLatLngData={onCompletePostDepartureLatLngData}
					/>

					<div className="grid grid-cols-3 gap-4 !mt-5">
						<div className="flex flex-col gap-[5px]">
							<Field label="상차 일자" required>
								<IconInput
									icon={Clock3}
									value="2025.07.15 09:00"
									dropdown
									type="date"
								/>
							</Field>

							<Field label="상차 일시" required>
								<IconInput
									icon={Clock3}
									value="2025.07.15 09:00"
									dropdown
									type="time"
								/>
							</Field>
						</div>

						<Field label="상차 담당자">
							<IconInput icon={UserRound} placeholder="담당자명 또는 연락처" />
						</Field>

						<Field label="연락처">
							<IconInput icon={Phone} placeholder="010-0000-0000" />
						</Field>
					</div>

					<div className="flex items-center !my-7">
						<div className="h-px flex-1 bg-slate-200" />

						<div className="!mx-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
							<ArrowDown className="h-5 w-5 text-blue-500" />
						</div>

						<div className="h-px flex-1 bg-slate-200" />
					</div>

					{/* 하차지 */}
					<SectionTitle color="bg-amber-500">
						<div className="flex items-center">
							하차지 (도착지)
							<span className="!ml-3 rounded-lg bg-amber-50 !px-3 !py-1 text-xs font-semibold text-amber-500">
								● 배송 위치
							</span>
						</div>
					</SectionTitle>

					<AddressSearch
						color="amber"
						address={arrivalAddress}
						setAddress={setArrivalAddress}
						onCompletePostLatLngData={onCompletePostArrivalLatLngData}
					/>

					<div className="grid grid-cols-3 gap-4 !mt-5">
						<div className="flex flex-col gap-[5px]">
							<Field label="하차 일시" required>
								<IconInput
									icon={Clock3}
									value="2025.07.15 14:00"
									dropdown
									type="date"
								/>
							</Field>

							<Field label="하차 일시" required>
								<IconInput
									icon={Clock3}
									value="2025.07.15 09:00"
									dropdown
									type="time"
								/>
							</Field>
						</div>

						<Field label="하차 담당자">
							<IconInput icon={UserRound} placeholder="담당자명 또는 연락처" />
						</Field>

						<Field label="연락처">
							<IconInput icon={Phone} placeholder="010-0000-0000" />
						</Field>
					</div>

					<Divider />

					{/* 물품 정보 */}
					<div className="flex items-center justify-between">
						<SectionTitle color="bg-violet-500">배송 물품 정보</SectionTitle>

						<Button
							variant="outline"
							className="border-blue-300 text-blue-500 hover:bg-blue-50"
						>
							<Plus className="!mr-1 h-4 w-4" />
							물품 추가
						</Button>
					</div>

					<div className="grid grid-cols-[2.2fr_0.9fr_1fr_2fr_44px] gap-2 !mt-5 text-xs font-medium text-slate-400">
						<div>물품명</div>
						<div>수량</div>
						<div>중량</div>
						<div>규격 (가로×세로×높이 cm)</div>
						<div />
					</div>

					<div className="space-y-2 !mt-2">
						<CargoRow
							name="전자부품 박스"
							count="12"
							weight="48"
							size="60 × 40 × 30"
						/>

						<CargoRow name="모니터" count="4" weight="24" size="80 × 50 × 20" />
					</div>

					<div className="flex items-center justify-between rounded-xl border border-violet-200 bg-violet-50 !mt-4 !px-5 !py-4">
						<div className="flex items-center">
							<SummaryItem label="총 수량" value="16개" />

							<div className="h-8 w-px bg-violet-200 !mx-5" />

							<SummaryItem label="총 중량" value="72 kg" />

							<div className="h-8 w-px bg-violet-200 !mx-5" />

							<SummaryItem label="물품 종류" value="2종" />
						</div>

						<div className="flex items-center rounded-lg bg-violet-100 !px-4 !py-2 text-sm font-semibold text-violet-600">
							<Box className="!mr-2 h-4 w-4" />
							일반 화물
						</div>
					</div>

					<div className="!mt-7">
						<div className="flex items-center justify-between">
							<SectionTitle color="bg-slate-500">
								특이사항 및 요청사항
							</SectionTitle>

							<span className="text-xs text-slate-400">선택 입력</span>
						</div>

						<Textarea
							placeholder="배송 시 주의사항, 특수 취급 여부, 기타 요청사항을 입력하세요"
							className="min-h-[96px] resize-none !mt-4 !px-4 !py-3"
						/>
					</div>
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between border-t bg-slate-50 !px-8 !py-4">
					<div className="flex items-center text-xs text-slate-400">
						<Info className="!mr-2 h-4 w-4" />
						요청 후 담당 배차팀에서 배차 확정
					</div>

					<div className="flex gap-3">
						<Button
							variant="outline"
							onClick={() => setOpen(false)}
							className="h-12 !px-7"
						>
							<X className="!mr-2 h-4 w-4" />
							취소
						</Button>

						<Button
							className="h-12 bg-blue-600 !px-8 hover:bg-blue-700"
							onClick={goDispatchCargo}
						>
							<Truck className="!mr-2 h-4 w-4" />
							배차 요청
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function SectionTitle({ children, color }) {
	return (
		<div className="flex items-center">
			<div className={`h-5 w-1 rounded-full ${color}`} />

			<h2 className="!ml-3 text-[17px] font-bold text-slate-800">{children}</h2>
		</div>
	);
}

function Field({ label, required, children }) {
	return (
		<div>
			<label className="text-sm font-semibold text-slate-700">
				{label}

				{required && <span className="!ml-1 text-red-500">*</span>}
			</label>

			<div className="!mt-2">{children}</div>
		</div>
	);
}

function IconInput({ icon: Icon, value, placeholder, dropdown, type }) {
	return (
		<div className="relative">
			<Icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

			<Input
				defaultValue={value}
				placeholder={placeholder}
				type={type}
				className="h-[52px] !pl-11 !pr-10"
			/>

			{dropdown && (
				<ChevronDown className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
			)}
		</div>
	);
}

function AddressSearch({
	color,
	address,
	setAddress,
	onCompletePostLatLngData,
}) {
	const isGreen = color === 'emerald';

	return (
		<>
			<div className="flex gap-3 !mt-5">
				<div className="relative flex-1">
					<MapPin
						className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${
							isGreen ? 'text-emerald-500' : 'text-amber-500'
						}`}
					/>

					<Input
						placeholder="주소 검색 또는 직접 입력"
						className="h-[52px] !pl-12"
					/>
				</div>

				<PostCodeButton
					onCompletePostData={(e) => {
						setAddress(e.address);
					}}
					onCompletePostLatLngData={onCompletePostLatLngData}
				/>
				{/* 
				<Button
					className={`h-[52px] !px-8 ${
						isGreen
							? 'bg-emerald-500 hover:bg-emerald-600'
							: 'bg-amber-500 hover:bg-amber-600'
					}`}
				> */}
				{/* <Search className="!mr-2 h-4 w-4" /> */}
				{/* 검색 */}
				{/* </Button> */}
			</div>

			<div className="flex h-[52px] items-center rounded-xl border bg-slate-50 !mt-3 !px-4 text-sm font-medium text-slate-700">
				<Navigation className="!mr-3 h-4 w-4 text-slate-400" />
				{address}
			</div>
		</>
	);
}

function CargoRow({ name, count, weight, size }) {
	return (
		<div className="grid grid-cols-[2.2fr_0.9fr_1fr_2fr_44px] gap-2 rounded-xl border bg-slate-50 !p-3">
			<Input defaultValue={name} className="bg-white" />

			<div className="relative">
				<Input defaultValue={count} className="bg-white !pr-8" />

				<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
					개
				</span>
			</div>

			<div className="relative">
				<Input defaultValue={weight} className="bg-white !pr-9" />

				<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
					kg
				</span>
			</div>

			<Input defaultValue={size} className="bg-white" />

			<Button
				size="icon"
				variant="ghost"
				className="bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600"
			>
				<Trash2 className="h-4 w-4" />
			</Button>
		</div>
	);
}

function SummaryItem({ label, value }) {
	return (
		<div>
			<div className="text-xs text-slate-500">{label}</div>

			<div className="!mt-1 text-[17px] font-bold text-slate-900">{value}</div>
		</div>
	);
}

function Divider() {
	return <div className="h-px bg-slate-200 !my-7" />;
}
