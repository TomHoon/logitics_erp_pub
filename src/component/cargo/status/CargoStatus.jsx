'use client';

import {
	Bell,
	Box,
	CalendarDays,
	ChevronDown,
	CircleAlert,
	Clock3,
	Filter,
	Map,
	MapPin,
	Menu,
	MessageCircle,
	Package,
	Phone,
	Route,
	Search,
	Truck,
	UserRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useEffect, useRef } from 'react';
import Script from 'next/script';
import baseApi from '@/common/api/baseApi';
import CargoRequestModal from '@/component/modal/CargoRequestModal';

const testRoute = [
	{ lat: 37.5665, lng: 126.978 },
	{ lat: 37.5655, lng: 126.982 },
	{ lat: 37.564, lng: 126.986 },
	{ lat: 37.562, lng: 126.99 },
	{ lat: 37.56, lng: 126.995 },
];

const transports = [
	{
		no: 'TRK-2025-0483',
		status: '운송중',
		route: '서울 강남구 → 부산 해운대구',
		driver: '김철수 기사',
		eta: '14:32',
		progress: 87,
		active: true,
	},
	{
		no: 'TRK-2025-0482',
		status: '지연',
		route: '인천 → 대구 달서구',
		driver: '이미준 기사',
	},
	{
		no: 'TRK-2025-0481',
		status: '배달완료',
		route: '수원 → 광주 서구',
		driver: '박지훈 기사',
	},
	{
		no: 'TRK-2025-0480',
		status: '운송중',
		route: '대전 → 울산 남구',
		driver: '최동현 기사',
	},
	{
		no: 'TRK-2025-0479',
		status: '지연',
		route: '부산 → 서울 마포구',
		driver: '정수빈 기사',
	},
	{
		no: 'TRK-2025-0478',
		status: '운송중',
		route: '춘천 → 여수 돌산도',
		driver: '한예슬 기사',
	},
];

const summary = [
	{ label: '전체 운송', value: '248건', icon: Box },
	{ label: '운송중', value: '87건', icon: Truck },
	{ label: '배달완료', value: '142건', icon: Package },
	{ label: '지연', value: '19건', icon: Clock3 },
	{ label: '운행 기사', value: '63명', icon: UserRound },
	{ label: '총 운행거리', value: '14,280km', icon: Route },
];

function StatusBadge({ status }) {
	const className =
		status === '운송중'
			? 'bg-amber-500/15 text-amber-400'
			: status === '지연'
				? 'bg-red-500/15 text-red-400'
				: 'bg-emerald-500/15 text-emerald-400';

	return (
		<Badge className={`!px-2 !py-0.5 border-0 text-[10px] ${className}`}>
			{status}
		</Badge>
	);
}

export default function CargoStatus() {
	const mapRef = useRef(null);

	useEffect(() => {}, []);

	const initMap = () => {
		console.log('window.kakao', window.kakao);
		if (!mapRef.current) return;
		if (!window.kakao?.maps) return;

		window.kakao.maps.load(async () => {
			console.log(window.kakao?.maps);
			console.log(window.kakao?.maps?.LatLng);

			const center = new window.kakao.maps.LatLng(37.402, 127.108);
			const map = new window.kakao.maps.Map(mapRef.current, {
				center,
				level: 5,
			});
			new window.kakao.maps.Marker({
				map,
				position: center,
			});

			// 마커무빙예제
			const response = await baseApi.get('/api/v1/transport/test/routes');
			const routePoints = getRoutePoints(response);

			const marker = new window.kakao.maps.Marker({
				map,
				position: new window.kakao.maps.LatLng(
					routePoints[0].lat,
					routePoints[0].lng
				),
			});

			let index = 0;

			const interval = setInterval(() => {
				index++;

				if (index >= routePoints.length) {
					clearInterval(interval);
					return;
				}

				const point = routePoints[index];

				marker.setPosition(new window.kakao.maps.LatLng(point.lat, point.lng));
			}, 1000);
		});
	};

	const getRoutePoints = (response) => {
		const roads = response.data.data.routes[0].sections[0].roads;

		return roads.flatMap((road) => {
			const points = [];

			for (let i = 0; i < road.vertexes.length; i += 2) {
				points.push({
					lng: road.vertexes[i],
					lat: road.vertexes[i + 1],
				});
			}

			return points;
		});
	};

	return (
		<div className="h-screen min-w-[1280px] overflow-hidden bg-[#0d1930] text-white">
			<Script
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${'f780fa1d148f8bc9b54d5a931f4cf301'}&autoload=false&libraries=services`}
				type="text/javascript"
				strategy="afterInteractive"
				onLoad={initMap}
			/>

			{/* Header */}
			<header className="flex h-[64px] items-center border-b border-white/10 bg-[#152646]">
				<div className="flex w-[230px] items-center !px-6">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
						<Truck className="h-4 w-4" />
					</div>

					<strong className="!ml-3 text-[17px]">CargoTrack</strong>

					<Badge className="!ml-3 !px-2 !py-0.5 bg-blue-500/15 text-[10px] text-blue-400">
						LIVE
					</Badge>
				</div>

				<nav className="flex h-full flex-1">
					{[
						['실시간 현황', Map],
						['운송 관리', Box],
						['차량 관리', Truck],
						['배차 관리', CalendarDays],
						['통계/분석', Route],
					].map(([label, Icon], index) => (
						<button
							key={label}
							className={`flex h-full items-center !px-6 text-sm ${
								index === 0
									? 'border-b-2 border-blue-400 bg-white/5 text-white'
									: 'text-slate-400'
							}`}
						>
							<Icon className="!mr-2 h-4 w-4" />
							{label}
						</button>
					))}
				</nav>

				<div className="flex items-center !pr-6">
					<Button variant="ghost" size="icon">
						<Bell className="h-4 w-4" />
					</Button>

					<span className="!ml-2 text-xs text-slate-400">🔴 알림 3건</span>

					<div className="!ml-5 flex items-center">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold">
							관
						</div>
						<span className="!ml-2 text-sm">관리자</span>
						<ChevronDown className="!ml-1 h-4 w-4 text-slate-400" />
					</div>
				</div>
			</header>

			{/* Summary */}
			<section className="grid h-[64px] grid-cols-6 border-b border-white/10 bg-[#111f39]">
				{summary.map(({ label, value, icon: Icon }) => (
					<div
						key={label}
						className="flex items-center justify-center border-r border-white/10"
					>
						<div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/5">
							<Icon className="h-4 w-4 text-blue-400" />
						</div>

						<div className="!ml-3">
							<div className="text-[11px] text-slate-500">{label}</div>
							<div className="text-[18px] font-bold">{value}</div>
						</div>
					</div>
				))}
			</section>

			<main className="flex h-[calc(100vh-128px)]">
				{/* Left */}
				<aside className="w-[300px] shrink-0 border-r border-white/10 bg-[#111d34]">
					<div className="flex h-[52px] items-center justify-between border-b border-white/10 !px-4">
						<div className="flex items-center text-sm font-semibold">
							<Menu className="!mr-2 h-4 w-4" />
							운송 목록
							<Badge className="!ml-2 bg-blue-500/15 text-blue-400">87</Badge>
						</div>

						<Button
							variant="ghost"
							size="icon"
							className="bg-white/5 text-slate-400"
						>
							<Filter className="h-4 w-4" />
						</Button>
					</div>

					<div className="border-b border-white/10 !p-3">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
							<Input
								placeholder="운송번호, 기사명, 출발지 검색"
								className="h-9 border-white/10 bg-[#0e192d] !pl-9 text-xs"
							/>
						</div>

						<div className="flex !mt-3 gap-5 text-xs">
							<button className="border-b-2 border-blue-400 !pb-2 text-blue-400">
								전체
							</button>
							<button className="text-slate-500">운송중</button>
							<button className="text-slate-500">배달완료</button>
							<button className="text-red-400">지연</button>
						</div>
					</div>

					<div className="overflow-y-auto">
						{transports.map((item) => (
							<button
								key={item.no}
								className={`w-full border-b border-white/10 !p-4 text-left ${
									item.active
										? 'border-l-2 border-l-blue-400 bg-blue-500/10'
										: ''
								}`}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<span className="text-sm font-semibold">{item.no}</span>
										<div className="!ml-2">
											<StatusBadge status={item.status} />
										</div>
									</div>

									{item.eta && (
										<span className="text-xs text-blue-400">
											ETA {item.eta}
										</span>
									)}
								</div>

								<div className="!mt-2 flex items-center text-[11px] text-slate-500">
									<MapPin className="!mr-1 h-3 w-3" />
									{item.route}
								</div>

								<div className="!mt-1 flex items-center text-[11px] text-slate-500">
									<UserRound className="!mr-1 h-3 w-3" />
									{item.driver}
								</div>

								{item.progress && (
									<div className="!mt-2 text-right text-sm font-bold text-amber-400">
										{item.progress}%
									</div>
								)}
							</button>
						))}
					</div>
				</aside>

				{/* Map */}
				<section
					className="relative flex-1 overflow-hidden bg-[#dce5de]"
					ref={mapRef}
				>
					<div className="absolute inset-0 bg-[linear-gradient(135deg,#dbe7dd_25%,#edf0e5_25%,#edf0e5_50%,#dbe7dd_50%,#dbe7dd_75%,#edf0e5_75%)] bg-[length:48px_48px] opacity-80" />

					<div className="absolute left-4 top-4 z-10">
						<Badge className="!px-3 !py-1.5 bg-red-500 text-white">
							● LIVE
						</Badge>

						<div className="!mt-2 flex rounded-md bg-[#1a2d4f] !p-1 text-xs">
							<button className="rounded bg-blue-500 !px-3 !py-1.5">
								지도
							</button>
							<button className="!px-3 !py-1.5 text-slate-400">위성</button>
							<button className="!px-3 !py-1.5 text-slate-400">
								하이브리드
							</button>
						</div>
					</div>

					{/* route sample */}
					{/* <div className="absolute left-[42%] top-[45%] z-20 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-red-500 shadow-xl">
						<Truck className="h-5 w-5" />
					</div> */}

					{/* <div className="absolute left-[47%] top-[53%] z-20 rounded-lg bg-[#152646] !px-4 !py-3 shadow-xl"> */}
					{/* <div className="text-sm font-bold text-amber-400">
							TRK-2025-0483
						</div>
						<div className="!mt-1 text-[10px] text-slate-300">
							김철수 · 전자제품 2.4t
						</div>
						<div className="text-[10px] text-slate-300">
							ETA 14:32 · 87% 진행중
						</div> */}
					{/* </div> */}

					<div className="absolute bottom-4 left-4 z-20 w-[220px] rounded-lg bg-[#152646] !p-4 text-xs shadow-xl">
						<div className="!mb-2 text-slate-400">범례</div>
						<div className="flex gap-3">
							<span>🟡 운송중</span>
							<span>🔴 지연</span>
							<span>🟢 완료</span>
						</div>
					</div>

					<div className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col rounded-md bg-[#152646] shadow-xl">
						<Button variant="ghost" size="icon">
							+
						</Button>
						<Button variant="ghost" size="icon">
							−
						</Button>
					</div>
				</section>

				{/* Right */}
				<aside className="w-[300px] shrink-0 border-l border-white/10 bg-[#111d34]">
					<div className="flex h-[52px] items-center border-b border-white/10 !px-4">
						<Box className="!mr-2 h-4 w-4 text-slate-400" />
						<span className="font-semibold">운송 상세정보</span>
					</div>

					<div className="!p-4">
						<div className="rounded-xl border border-blue-400/20 bg-[#172846] !p-4">
							<div className="flex items-center justify-between">
								<strong>TRK-2025-0483</strong>
								<StatusBadge status="운송중" />
							</div>

							<div className="!mt-1 text-[11px] text-slate-500">
								서울 강남구 → 부산 해운대구
							</div>

							<div className="!mt-4 h-2 overflow-hidden rounded-full bg-white/10">
								<div className="h-full w-[87%] rounded-full bg-amber-400" />
							</div>

							<div className="!mt-2 text-right text-sm font-bold text-amber-400">
								87%
							</div>

							<div className="!mt-4 flex justify-between text-xs">
								<div>
									<div className="text-slate-500">출발</div>
									<strong>08:15</strong>
								</div>
								<div className="text-right">
									<div className="text-slate-500">도착예정</div>
									<strong className="text-blue-400">14:32</strong>
								</div>
							</div>
						</div>

						<div className="!mt-4 rounded-xl bg-[#172846] !p-4">
							<div className="text-xs text-slate-500">기사 정보</div>

							<div className="!mt-3 flex items-center">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold">
									김
								</div>

								<div className="!ml-3 flex-1">
									<div className="font-semibold">김철수 기사</div>
									<div className="text-xs text-amber-400">★ 4.8 (284건)</div>
								</div>

								<Button size="icon" variant="ghost">
									<Phone className="h-4 w-4 text-emerald-400" />
								</Button>

								<Button size="icon" variant="ghost">
									<MessageCircle className="h-4 w-4 text-blue-400" />
								</Button>
							</div>

							<div className="!mt-4 rounded-lg bg-black/10 !p-3 text-xs">
								🚚 11가 1234 · 5톤 냉장탑차
							</div>
						</div>

						<div className="!mt-4 rounded-xl bg-[#172846] !p-4">
							<div className="text-xs text-slate-500">화물 정보</div>

							<div className="!mt-3 flex items-center">
								<Package className="h-5 w-5 text-blue-400" />

								<div className="!ml-3">
									<div className="font-semibold">전자제품 (정밀기기)</div>
									<div className="text-xs text-slate-500">
										2.4t · 파렛트 4개
									</div>
								</div>
							</div>

							<div className="!mt-4 flex items-center justify-between border-t border-white/10 !pt-3 text-xs">
								<span className="text-amber-400">온도 관리 필요</span>
								<strong className="text-amber-300">15°C ~ 25°C</strong>
							</div>
						</div>

						<div className="!mt-4 rounded-xl bg-[#172846] !p-4">
							<div className="!mb-4 text-xs text-slate-500">운송 경로</div>

							{[
								['서울 강남구 출발', '08:15 · 완료'],
								['대전 IC 통과', '11:40 · 완료'],
								['대구 JC 경유중', '현재 위치 · 이동중'],
								['부산 해운대구 도착 예정', '14:32 예정'],
							].map(([title, time], index) => (
								<div key={title} className="flex !pb-5 last:!pb-0">
									<div className="!mr-3 flex flex-col items-center">
										<div
											className={`h-3 w-3 rounded-full ${
												index < 2
													? 'bg-emerald-400'
													: index === 2
														? 'bg-amber-400'
														: 'bg-slate-600'
											}`}
										/>
										{index < 3 && (
											<div className="!mt-1 h-8 w-px bg-white/10" />
										)}
									</div>

									<div>
										<div className="text-sm">{title}</div>
										<div className="!mt-1 text-[11px] text-slate-500">
											{time}
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="flex !mt-4 gap-2">
							<Button
								variant="outline"
								className="flex-1 border-white/10 bg-white/5"
							>
								<Route className="!mr-2 h-4 w-4" />
								경로 변경
							</Button>

							<Button className="flex-1">
								<Phone className="!mr-2 h-4 w-4" />
								기사 연락
							</Button>
						</div>
					</div>
				</aside>
			</main>
			<CargoRequestModal open={true} />
		</div>
	);
}
