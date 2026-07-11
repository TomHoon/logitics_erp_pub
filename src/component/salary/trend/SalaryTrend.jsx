'use client';

import baseApi from '@/common/api/baseApi';
import LoadingSpinner from '@/common/LoadingSpinner';
import SalaryStatementModal from '@/component/modal/SalaryStatementModal';
import { toast } from 'sonner';
import {
	BarChart3,
	CalendarDays,
	ChevronLeft,
	ChevronRight,
	FileText,
	Lock,
	Table2,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SalaryTrend() {
	const [year, setYear] = useState(() => new Date().getFullYear());
	const [isLoading, setIsLoading] = useState(false);
	const [trend, setTrend] = useState(null);
	const [openStatement, setOpenStatement] = useState(false);
	const [statementData, setStatementData] = useState(null);

	const currentMonth = new Date().getMonth() + 1;
	const isCurrentYear = year === new Date().getFullYear();

	const getTrend = async (targetYear = year) => {
		setIsLoading(true);
		try {
			const res = await baseApi.get('/api/v1/payroll/trend', {
				params: { year: targetYear },
			});
			setTrend(res?.data?.data || res?.data || null);
		} catch (e) {
			setTrend(null);
			toast(e?.response?.data?.message || '급여조회 중 오류가 발생했습니다.');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getTrend();
	}, []);

	const monthlyList = trend?.monthlyList || [];
	const paidMonths = monthlyList.filter((m) => m.hasData);
	const totalRealPay = paidMonths.reduce((acc, m) => acc + Number(m.realPayAmount || 0), 0);
	const bestMonth = paidMonths.reduce(
		(best, m) => (!best || m.realPayAmount > best.realPayAmount ? m : best),
		null
	);
	const avgRealPay = paidMonths.length > 0 ? Math.round(totalRealPay / paidMonths.length) : 0;

	const formatDate = (d) => (d ? d.replaceAll('-', '.') : '-');

	const moveYear = (diff) => {
		const next = year + diff;
		setYear(next);
		getTrend(next);
	};

	return (
		<main className="w-[1190px] bg-[#F3F6FA] p-[10px] text-[#1F2937]">
			<section className="overflow-hidden rounded-[7px] border bg-white">
				<div className="flex h-[44px] items-center justify-between border-b bg-[#F8FAFC] px-5">
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-2 text-[15px] font-bold text-[#183A6B]">
							<BarChart3 size={16} />
							{year}년 월별 실지급액 추이
						</div>
						<span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-[12px] font-bold text-[#2563EB]">
							{year}년
						</span>
					</div>

					<div className="flex gap-4 text-[12px] font-bold text-[#9CA3AF]">
						<span className="flex items-center gap-1">
							<b className="h-3 w-3 rounded-[3px] bg-[#183A6B]" /> 실지급액
						</span>
						<span className="flex items-center gap-1">
							<b className="h-3 w-3 rounded-[3px] bg-[#3B82F6]" /> 이번달 ({currentMonth}월)
						</span>
						<span className="flex items-center gap-1">
							<b className="h-3 w-3 rounded-[3px] bg-[#E2E8F0]" /> 미지급
						</span>
					</div>
				</div>

				<div className="grid grid-cols-[1fr_160px] gap-6 px-8 py-5">
					<Chart monthlyList={monthlyList} isCurrentYear={isCurrentYear} currentMonth={currentMonth} />

					<div className="flex flex-col justify-center gap-4">
						<SideStat blue title={`${year}년 누적`} value={totalRealPay.toLocaleString()} unit="원" />
						<SideStat
							green
							title="최고 지급월"
							value={bestMonth ? `${bestMonth.month}월` : '-'}
							unit={bestMonth ? `${Number(bestMonth.realPayAmount).toLocaleString()}원` : '-'}
						/>
						<SideStat title="월 평균" value={avgRealPay.toLocaleString()} unit="원" />
					</div>
				</div>
			</section>

			<section className="mt-4 flex h-[60px] items-center justify-between rounded-[7px] border bg-white px-5">
				<div className="flex items-center gap-4">
					<span className="text-[14px] font-bold">조회년도</span>
					<div className="flex h-[34px] overflow-hidden rounded-[5px] border">
						<button
							className="w-[34px] cursor-pointer bg-[#F8FAFC]"
							onClick={() => moveYear(-1)}
						>
							<ChevronLeft size={15} className="mx-auto" />
						</button>
						<div className="flex w-[110px] items-center justify-center gap-2 border-x text-[14px] font-bold">
							<CalendarDays size={15} className="text-[#183A6B]" />
							{year}년
						</div>
						<button
							className="w-[34px] cursor-pointer bg-[#F8FAFC]"
							onClick={() => moveYear(1)}
						>
							<ChevronRight size={15} className="mx-auto" />
						</button>
					</div>

					<span className="text-[14px] font-bold">조회대상</span>
					<div className="flex h-[34px] w-[180px] items-center justify-between rounded-[5px] border px-3 text-[13px] font-bold">
						<span>
							<b className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#DBEAFE] text-[11px] text-[#2563EB]">
								{(trend?.employeeName || '').slice(0, 1)}
							</b>
							{trend?.employeeName || '-'} (본인)
						</span>
						<Lock size={13} className="text-[#CBD5E1]" />
					</div>

					<span className="rounded-full bg-[#EFF6FF] px-4 py-2 text-[13px] font-bold text-[#2563EB]">
						{trend?.departmentName || '-'} · {trend?.positionName || '-'}
					</span>
				</div>

				<div className="flex h-[34px] overflow-hidden rounded-[5px] border">
					{[year - 2, year - 1, year].map((y) => (
						<button
							key={y}
							onClick={() => {
								setYear(y);
								getTrend(y);
							}}
							className={`w-[54px] cursor-pointer text-[13px] font-bold ${
								y === year
									? 'bg-[#183A6B] text-white'
									: 'bg-white text-[#CBD5E1]'
							}`}
						>
							{y}
						</button>
					))}
				</div>
			</section>

			<section className="mt-4 overflow-hidden rounded-[7px] border bg-white">
				<div className="flex h-[44px] items-center justify-between bg-[#F8FAFC] px-5">
					<div className="flex items-center gap-2 text-[15px] font-bold text-[#183A6B]">
						<Table2 size={16} />
						{year}년 월별 급여 내역
					</div>

					<div className="flex items-center gap-3 text-[12px]">
						<span className="rounded-full bg-[#EFF6FF] px-3 py-1 font-bold text-[#2563EB]">
							{paidMonths.length}개월 조회
						</span>
						<Legend color="bg-[#DBEAFE]" text="지급" />
						<Legend color="bg-[#FEE2E2]" text="공제" />
						<Legend color="bg-[#DCFCE7]" text="실지급" />
					</div>
				</div>

				<table className="w-full table-fixed border-collapse text-center text-[13px]">
					<thead>
						<tr className="h-[40px] bg-[#F1F5F9] text-[#64748B]">
							<Th w="110px">지급연월</Th>
							<Th blue>기본급</Th>
							<Th blue>수당합계</Th>
							<Th blue>지급소계</Th>
							<Th red>공제합계</Th>
							<Th green>실지급액</Th>
							<Th w="100px">지급일</Th>
							<Th w="80px">상태</Th>
							<Th w="330px">명세서</Th>
						</tr>
					</thead>

					<tbody>
						{paidMonths.map((m) => (
							<tr
								key={m.month}
								className={`h-[44px] ${m.month === currentMonth && isCurrentYear ? 'bg-[#EFF6FF]' : 'bg-white'}`}
							>
								<Td first current={m.month === currentMonth && isCurrentYear}>
									{m.month === currentMonth && isCurrentYear && <div>이번달</div>}
									<div>
										{year}년 {m.month}월
									</div>
								</Td>
								<Td blue bold>
									{Number(m.basicSalaryAmount).toLocaleString()}
								</Td>
								<Td blue>{Number(m.totalAllowanceAmount).toLocaleString()}</Td>
								<Td blue bold>
									{Number(m.totalPayAmount).toLocaleString()}
								</Td>
								<Td red bold>
									{Number(m.totalDeductionAmount).toLocaleString()}
								</Td>
								<Td green bold large>
									{Number(m.realPayAmount).toLocaleString()}
								</Td>
								<Td>{formatDate(m.paymentDate)}</Td>
								<td className="border border-[#E5E7EB]">
									<StatusBadge status={m.payrollStatusText} code={m.payrollStatusCode} />
								</td>
								<td className="border border-[#E5E7EB]">
									<button
										onClick={() => {
											setStatementData({
												...m,
												year,
												employeeName: trend?.employeeName,
												employeeNo: trend?.employeeNo,
												departmentName: trend?.departmentName,
												positionName: trend?.positionName,
											});
											setOpenStatement(true);
										}}
										className={`cursor-pointer rounded-[5px] px-4 py-1 text-[13px] font-bold ${
											m.month === currentMonth && isCurrentYear
												? 'border border-[#BFDBFE] bg-white text-[#2563EB]'
												: 'bg-[#EFF6FF] text-[#2563EB]'
										}`}
									>
										<FileText size={13} className="mr-1 inline" />
										명세서
									</button>
								</td>
							</tr>
						))}
						{paidMonths.length === 0 && (
							<tr>
								<td colSpan={9} className="h-[80px] border border-[#E5E7EB] text-[#94A3B8]">
									{year}년에 등록된 급여 내역이 없습니다.
								</td>
							</tr>
						)}
					</tbody>

					{paidMonths.length > 0 && (
						<tfoot>
							<tr className="h-[44px] bg-[#EAF2FF] font-bold">
								<td className="border border-[#BFDBFE] text-[#183A6B]">
									Σ {paidMonths.length}개월 합계
								</td>
								<td className="border border-[#BFDBFE] text-[#2563EB]">
									{paidMonths.reduce((a, m) => a + Number(m.basicSalaryAmount || 0), 0).toLocaleString()}
								</td>
								<td className="border border-[#BFDBFE] text-[#2563EB]">
									{paidMonths.reduce((a, m) => a + Number(m.totalAllowanceAmount || 0), 0).toLocaleString()}
								</td>
								<td className="border border-[#BFDBFE] text-[#2563EB]">
									{paidMonths.reduce((a, m) => a + Number(m.totalPayAmount || 0), 0).toLocaleString()}
								</td>
								<td className="border border-[#FECACA] text-[#991B1B]">
									{paidMonths.reduce((a, m) => a + Number(m.totalDeductionAmount || 0), 0).toLocaleString()}
								</td>
								<td className="border border-[#BBF7D0] text-[#15803D]">
									{totalRealPay.toLocaleString()}
								</td>
								<td className="border border-[#BFDBFE] text-[#94A3B8]">-</td>
								<td className="border border-[#BFDBFE] text-[#94A3B8]">-</td>
								<td className="border border-[#BFDBFE] text-[#94A3B8]">-</td>
							</tr>
						</tfoot>
					)}
				</table>

				<div className="flex h-[44px] items-center justify-between px-5">
					<div className="flex items-center gap-3 text-[13px] text-[#64748B]">
						<span>
							{year}년 {paidMonths.length}개월 표시 · {12 - paidMonths.length}개월 미지급
						</span>
						<span className="rounded-full bg-[#EFF6FF] px-4 py-1 text-[12px] font-bold text-[#2563EB]">
							↗ 월평균 실지급 {avgRealPay.toLocaleString()}원
						</span>
					</div>
				</div>
			</section>

			<SalaryStatementModal
				open={openStatement}
				setOpen={setOpenStatement}
				data={statementData}
			/>
			<LoadingSpinner isLoading={isLoading} />
		</main>
	);
}

function Chart({ monthlyList, isCurrentYear, currentMonth }) {
	const maxValue = Math.max(1, ...monthlyList.map((m) => Number(m.realPayAmount || 0)));

	return (
		<div className="relative h-[270px] px-8 pt-8">
			<div className="absolute left-0 top-8 h-[170px] w-full">
				{[0, 1, 2, 3].map((i) => (
					<div
						key={i}
						className="absolute left-0 w-full border-t border-[#E5E7EB]"
						style={{ top: `${i * 56}px` }}
					/>
				))}
			</div>

			<div className="relative z-10 flex h-[210px] items-end gap-6">
				{monthlyList.map((m) => {
					const isActiveMonth = isCurrentYear && m.month === currentMonth;
					const value = Number(m.realPayAmount || 0);

					return (
						<div key={m.month} className="flex w-[45px] flex-col items-center">
							<div className="mb-1 text-[11px] font-bold text-[#94A3B8]">
								{m.hasData ? value.toLocaleString() : ''}
							</div>
							{isActiveMonth && (
								<span className="mb-1 rounded-[4px] bg-[#2563EB] px-3 py-1 text-[11px] font-bold text-white">
									이번달
								</span>
							)}
							<div
								className={`w-[34px] rounded-t-[5px] ${
									isActiveMonth
										? 'bg-[#2563EB]'
										: !m.hasData
											? 'bg-[#E2E8F0]'
											: 'bg-[#526B8F]'
								}`}
								style={{ height: `${m.hasData ? Math.max(4, (value / maxValue) * 170) : 20}px` }}
							/>
							<span
								className={`mt-2 text-[12px] font-bold ${
									isActiveMonth ? 'text-[#183A6B]' : 'text-[#CBD5E1]'
								}`}
							>
								{m.month}월
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function SideStat({ title, value, unit, blue, green }) {
	return (
		<div
			className={`flex h-[80px] flex-col items-center justify-center rounded-[7px] border ${
				blue
					? 'border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]'
					: green
						? 'border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]'
						: 'border-[#E5E7EB] bg-white text-[#374151]'
			}`}
		>
			<p className="text-[12px] font-bold">{title}</p>
			<p className="mt-1 text-[20px] font-extrabold">{value}</p>
			<p className="text-[12px] font-bold">{unit}</p>
		</div>
	);
}

function Legend({ color, text }) {
	return (
		<span className="flex items-center gap-1 text-[#94A3B8]">
			<b className={`h-2 w-2 rounded-full ${color}`} />
			{text}
		</span>
	);
}

function Th({ children, blue, red, green, w }) {
	return (
		<th
			style={{ width: w }}
			className={`border font-bold ${
				blue
					? 'border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]'
					: red
						? 'border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]'
						: green
							? 'border-[#BBF7D0] bg-[#DCFCE7] text-[#15803D]'
							: 'border-[#E5E7EB]'
			}`}
		>
			{children}
		</th>
	);
}

function Td({ children, blue, red, green, bold, large, first, current }) {
	return (
		<td
			className={`border border-[#E5E7EB] ${
				bold ? 'font-bold text-[#111827]' : 'text-[#4B5563]'
			} ${blue ? 'bg-[#EFF6FF] text-[#2563EB]' : ''} ${
				red ? 'bg-[#FEF2F2] text-[#EF4444]' : ''
			} ${green ? 'bg-[#DCFCE7] text-[#15803D]' : ''} ${
				first ? 'font-bold text-[#64748B]' : ''
			} ${current ? 'text-[#2563EB]' : ''} ${large ? 'text-[15px]' : ''}`}
		>
			{children}
		</td>
	);
}

function StatusBadge({ status, code }) {
	const isConfirmed = code === 'CONFIRMED' || code === 'PAID';
	return (
		<span
			className={`rounded-full px-3 py-1 text-[12px] font-bold ${
				isConfirmed ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEF3C7] text-[#CA8A04]'
			}`}
		>
			● {status || '미확정'}
		</span>
	);
}
