'use client';

import baseApi from '@/common/api/baseApi';
import LoadingSpinner from '@/common/LoadingSpinner';
import BreadCrumb from '@/component/common/BreadCrumb';
import CButton from '@/component/common/element/CButton';
import CSelect from '@/component/common/element/CSelect';
import MainTitleWrapper from '@/component/common/MainTitleWrapper';
import { parsingMonthKorean } from '@/common/utils/dateUtils';
import { toast } from 'sonner';
import {
	TrendingUp,
	TrendingDown,
	WalletCards,
	Clock,
	CalendarDays,
	ChevronLeft,
	ChevronRight,
	Search,
	RotateCcw,
	Table2,
	BadgeCheck,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Payroll() {
	const [rows, setRows] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentMonth, setCurrentMonth] = useState(() => {
		const now = new Date();
		return new Date(now.getFullYear(), now.getMonth(), 1);
	});
	const [searchName, setSearchName] = useState('');
	const [searchDept, setSearchDept] = useState('전체');
	const [departmentOptions, setDepartmentOptions] = useState(['전체']);
	const [selectedIds, setSelectedIds] = useState([]);

	const getApplyDateParam = (target = currentMonth) => {
		const year = target.getFullYear();
		const month = String(target.getMonth() + 1).padStart(2, '0');
		return `${year}-${month}-01`;
	};

	const getDepartmentOptions = async () => {
		try {
			const res = await baseApi.get('/api/v1/department');
			const list = res?.data?.data || res?.data || [];
			setDepartmentOptions(['전체', ...list.map((d) => d.departmentName)]);
		} catch (e) {
			console.error(e);
		}
	};

	const getPaymentList = async (overrides = {}) => {
		setIsLoading(true);
		try {
			const res = await baseApi.get('/api/v1/payroll/payment', {
				params: {
					keyword: overrides.keyword ?? searchName,
					departmentName: overrides.departmentName ?? searchDept,
					applyDate: overrides.applyDate ?? getApplyDateParam(),
				},
			});
			setRows(res?.data?.data || []);
			setSelectedIds([]);
		} catch (e) {
			setRows([]);
			toast(e?.response?.data?.message || '급여 지급 내역 조회 중 오류가 발생했습니다.');
		} finally {
			setIsLoading(false);
		}
	};

	const resetSearch = () => {
		setSearchName('');
		setSearchDept('전체');
		getPaymentList({ keyword: '', departmentName: '전체' });
	};

	const moveMonth = (diff) => {
		const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + diff, 1);
		setCurrentMonth(next);
		getPaymentList({ applyDate: getApplyDateParam(next) });
	};

	const confirmSelected = async () => {
		if (selectedIds.length === 0) {
			toast('확정할 항목을 선택해주세요.');
			return;
		}

		setIsLoading(true);
		try {
			const res = await baseApi.patch('/api/v1/payroll/confirm', {
				payrollIds: selectedIds,
			});

			const result = res?.data?.data || res?.data;
			const confirmedCount = result?.confirmedCount || 0;
			const failed = result?.failed || [];

			if (confirmedCount > 0) {
				toast(`${confirmedCount}건 급여확정 처리되었습니다.`);
			}
			if (failed.length > 0) {
				toast(`${failed.length}건은 확정하지 못했습니다: ${failed[0]?.reason || ''}`);
			}

			getPaymentList();
		} catch (e) {
			toast(e?.response?.data?.message || '급여확정 처리 중 오류가 발생했습니다.');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getPaymentList();
		getDepartmentOptions();
	}, []);

	const confirmableRows = rows.filter((r) => r.confirmable);
	const isAllSelected =
		confirmableRows.length > 0 && selectedIds.length === confirmableRows.length;

	const totalPay = rows.reduce((acc, r) => acc + Number(r.totalPayAmount || 0), 0);
	const totalDeduction = rows.reduce((acc, r) => acc + Number(r.totalDeductionAmount || 0), 0);
	const totalRealPay = rows.reduce((acc, r) => acc + Number(r.realPayAmount || 0), 0);
	const confirmedCount = rows.filter(
		(r) => r.payrollStatusCode === 'CONFIRMED' || r.payrollStatusCode === 'PAID'
	).length;
	const unconfirmedCount = rows.length - confirmedCount;

	return (
		<main className="w-[1190px] bg-[#F3F6FA] p-[10px] text-[#1F2937]">
			<BreadCrumb
				crumList={[
					{ type: 'icon', path: '/breadcrumb/breadcrumb-home.png', title: '' },
					{
						type: 'title',
						path: '/breadcrumb/breadcrumb-home.png',
						title: '급여관리',
					},
					{
						type: 'title',
						path: '/breadcrumb/breadcrumb-home.png',
						title: '급여지급',
					},
				]}
			/>
			<MainTitleWrapper
				buttonRender={() => {
					return (
						<CButton
							type="type2"
							buttonName={`급여확정 (${selectedIds.length}건 선택)`}
							beforeIcon={<BadgeCheck size={13} />}
							onClick={confirmSelected}
						/>
					);
				}}
				mainTitleData={{
					title: '급여지급',
					desc: '월별 직원 급여 지급 내역을 관리하고 확정합니다.',
				}}
			/>
			<div className="w-[1190px] grid grid-cols-4 gap-3 !mt-[10px]">
				<Summary
					dark
					icon={<TrendingUp size={14} />}
					title="지급합계"
					value={`${totalPay.toLocaleString()}원`}
					desc={`대상 ${rows.length}명`}
				/>
				<Summary
					icon={<TrendingDown size={14} />}
					title="공제합계"
					value={`${totalDeduction.toLocaleString()}원`}
					desc="4대보험·소득세 합계"
					red
				/>
				<Summary
					green
					icon={<WalletCards size={14} />}
					title="실지급합계"
					value={`${totalRealPay.toLocaleString()}원`}
					desc={`대상인원 ${rows.length}명`}
				/>
				<Summary
					yellow
					icon={<Clock size={14} />}
					title="지급상태"
					unconfirmedCount={unconfirmedCount}
					confirmedCount={confirmedCount}
					desc={`${parsingMonthKorean(currentMonth)}분`}
				/>
			</div>

			<section className="w-[1190px] !mt-4 flex h-[60px] items-center justify-between rounded-[7px] border border-[#E5E7EB] bg-white px-5">
				<div className="flex items-center gap-4">
					<div className="flex h-[34px] overflow-hidden rounded-[5px] border border-[#D1D5DB]">
						<button
							className="w-[34px] cursor-pointer bg-[#F8FAFC]"
							onClick={() => moveMonth(-1)}
						>
							<ChevronLeft size={16} className="mx-auto" />
						</button>
						<div className="flex w-[160px] items-center justify-center gap-2 border-x text-[14px] font-bold">
							<CalendarDays size={15} className="text-[#183A6B]" />
							{parsingMonthKorean(currentMonth)}
						</div>
						<button
							className="w-[34px] cursor-pointer bg-[#F8FAFC]"
							onClick={() => moveMonth(1)}
						>
							<ChevronRight size={16} className="mx-auto" />
						</button>
					</div>

					<div className="flex items-center gap-2">
						<span className="text-[14px] font-bold">부서</span>
						<CSelect
							width={150}
							optionList={departmentOptions}
							value={searchDept}
							onChange={(e) => setSearchDept(e.target.value)}
						/>
					</div>

					<div className="relative">
						<Search
							size={15}
							className="absolute left-3 top-1/2 -translate-y-1/2 text-[#CBD5E1]"
						/>
						<input
							placeholder="사원명 검색"
							value={searchName}
							onChange={(e) => setSearchName(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') getPaymentList();
							}}
							className="h-[34px] w-[130px] rounded-[5px] border border-[#D1D5DB] pl-9 text-[13px] outline-none"
						/>
					</div>

					<button
						onClick={() => getPaymentList()}
						className="flex h-[34px] w-[82px] cursor-pointer items-center justify-center gap-1 rounded-[5px] bg-[#183A6B] text-[13px] font-bold text-white"
					>
						<Search size={14} />
						조회
					</button>

					<button
						onClick={resetSearch}
						className="flex h-[34px] w-[82px] cursor-pointer items-center justify-center gap-1 rounded-[5px] border border-[#D1D5DB] bg-white text-[13px] font-bold text-[#6B7280]"
					>
						<RotateCcw size={14} />
						초기화
					</button>
				</div>

				<div className="flex items-center gap-3 text-[12px] text-[#94A3B8]">
					<Legend color="bg-[#DBEAFE]" text="지급항목" />
					<Legend color="bg-[#FEE2E2]" text="공제항목" />
					<Legend color="bg-[#DCFCE7]" text="실지급" />
				</div>
			</section>

			<section className="w-[1190px] !mt-4 overflow-hidden rounded-[7px] border border-[#E5E7EB] bg-white">
				<div className="flex h-[44px] items-center justify-between bg-[#F8FAFC] px-5">
					<div className="flex items-center gap-2 text-[15px] font-bold text-[#183A6B]">
						<Table2 size={16} />
						{parsingMonthKorean(currentMonth)} 급여 지급 내역
					</div>

					<div className="flex items-center gap-2">
						<span className="rounded-full bg-[#DBEAFE] px-3 py-1 text-[12px] font-bold text-[#2563EB]">
							총 {rows.length}명
						</span>
						<button
							className="h-[30px] cursor-pointer rounded-[5px] border border-[#D1D5DB] bg-white px-3 text-[12px] text-[#4B5563]"
							onClick={() => {
								if (isAllSelected) {
									setSelectedIds([]);
								} else {
									setSelectedIds(confirmableRows.map((r) => r.payrollId));
								}
							}}
						>
							{isAllSelected ? '☑' : '☐'} 확정가능 전체선택
						</button>
					</div>
				</div>

				<table className="w-full table-fixed border-collapse text-center text-[13px]">
					<thead>
						<tr className="h-[40px] bg-[#F1F5F9] text-[#64748B]">
							<th className="w-[36px] border border-[#E5E7EB]" />
							<Th w="80px">사원번호</Th>
							<Th w="70px">성명</Th>
							<Th w="80px">부서</Th>
							<Th w="70px">상태</Th>
							<Th blue w="90px">
								기본급
							</Th>
							<Th blue w="75px">
								식대
							</Th>
							<Th blue w="75px">
								교통비
							</Th>
							<Th blue w="80px">
								야근수당
							</Th>
							<Th blue w="90px">
								지급소계
							</Th>
							<Th red w="80px">
								국민연금
							</Th>
							<Th red w="80px">
								건강보험
							</Th>
							<Th red w="80px">
								고용보험
							</Th>
							<Th red w="80px">
								소득세
							</Th>
							<Th red w="85px">
								공제소계
							</Th>
							<Th green w="115px">
								실지급액
							</Th>
						</tr>
					</thead>

					<tbody>
						{rows.map((r) => (
							<tr key={r.payrollId} className="h-[42px] bg-white">
								<td
									className="border border-[#E5E7EB]"
									title={r.confirmable ? '' : r.notConfirmableReason}
								>
									<input
										type="checkbox"
										disabled={!r.confirmable}
										checked={selectedIds.includes(r.payrollId)}
										onChange={(e) => {
											setSelectedIds((prev) =>
												e.target.checked
													? [...prev, r.payrollId]
													: prev.filter((id) => id !== r.payrollId)
											);
										}}
									/>
								</td>
								<Td>{r.employeeNo}</Td>
								<Td bold>{r.employeeName}</Td>
								<Td>{r.departmentName}</Td>
								<Td>
									<StatusBadge code={r.payrollStatusCode} text={r.payrollStatusText} />
								</Td>
								<Td blue bold>
									{Number(r.basicSalaryAmount).toLocaleString()}
								</Td>
								<Td blue>{Number(r.mealAllowanceAmount).toLocaleString()}</Td>
								<Td blue>{Number(r.transportationAllowanceAmount).toLocaleString()}</Td>
								<Td blue>{Number(r.overtimeAllowanceAmount).toLocaleString()}</Td>
								<Td blue bold>
									{Number(r.totalPayAmount).toLocaleString()}
								</Td>
								<Td red>{Number(r.nationalPensionAmount).toLocaleString()}</Td>
								<Td red>{Number(r.healthInsuranceAmount).toLocaleString()}</Td>
								<Td red>{Number(r.employmentInsuranceAmount).toLocaleString()}</Td>
								<Td red>{Number(r.incomeTaxAmount).toLocaleString()}</Td>
								<Td red bold>
									{Number(r.totalDeductionAmount).toLocaleString()}
								</Td>
								<Td green bold large>
									{Number(r.realPayAmount).toLocaleString()}
								</Td>
							</tr>
						))}
						{rows.length === 0 && (
							<tr>
								<td colSpan={16} className="h-[80px] border border-[#E5E7EB] text-[#94A3B8]">
									조회된 급여 지급 내역이 없습니다.
								</td>
							</tr>
						)}
					</tbody>

					{rows.length > 0 && (
						<tfoot>
							<tr className="h-[46px] bg-[#EAF2FF] font-bold">
								<td
									colSpan={5}
									className="border border-[#BFDBFE] text-right pr-5 text-[#183A6B]"
								>
									Σ 합계 ({rows.length}명)
								</td>
								<td className="border border-[#BFDBFE] text-[#2563EB]">
									{rows.reduce((a, r) => a + Number(r.basicSalaryAmount || 0), 0).toLocaleString()}
								</td>
								<td className="border border-[#BFDBFE] text-[#2563EB]">
									{rows.reduce((a, r) => a + Number(r.mealAllowanceAmount || 0), 0).toLocaleString()}
								</td>
								<td className="border border-[#BFDBFE] text-[#2563EB]">
									{rows.reduce((a, r) => a + Number(r.transportationAllowanceAmount || 0), 0).toLocaleString()}
								</td>
								<td className="border border-[#BFDBFE] text-[#2563EB]">
									{rows.reduce((a, r) => a + Number(r.overtimeAllowanceAmount || 0), 0).toLocaleString()}
								</td>
								<td className="border border-[#BFDBFE] text-[#2563EB]">
									{totalPay.toLocaleString()}
								</td>
								<td className="border border-[#FECACA] text-[#991B1B]">
									{rows.reduce((a, r) => a + Number(r.nationalPensionAmount || 0), 0).toLocaleString()}
								</td>
								<td className="border border-[#FECACA] text-[#991B1B]">
									{rows.reduce((a, r) => a + Number(r.healthInsuranceAmount || 0), 0).toLocaleString()}
								</td>
								<td className="border border-[#FECACA] text-[#991B1B]">
									{rows.reduce((a, r) => a + Number(r.employmentInsuranceAmount || 0), 0).toLocaleString()}
								</td>
								<td className="border border-[#FECACA] text-[#991B1B]">
									{rows.reduce((a, r) => a + Number(r.incomeTaxAmount || 0), 0).toLocaleString()}
								</td>
								<td className="border border-[#FECACA] bg-[#FECACA] text-[#991B1B]">
									{totalDeduction.toLocaleString()}
								</td>
								<td className="border border-[#BBF7D0] bg-[#DCFCE7] text-[#15803D]">
									{totalRealPay.toLocaleString()}
								</td>
							</tr>
						</tfoot>
					)}
				</table>

				<div className="flex h-[44px] items-center justify-between px-5">
					<div className="flex items-center gap-3 text-[13px] text-[#64748B]">
						<span>
							총 {rows.length}명 · {parsingMonthKorean(currentMonth)}분 급여
						</span>
						<span className="rounded-full bg-[#FEF3C7] px-3 py-1 text-[12px] font-bold text-[#D97706]">
							ⓘ 미확정 {unconfirmedCount}건 — 지급일 5일 전부터 급여확정 가능
						</span>
					</div>
				</div>
			</section>

			<LoadingSpinner isLoading={isLoading} />
		</main>
	);
}

function Summary({ icon, title, value, desc, dark, red, green, yellow, unconfirmedCount, confirmedCount }) {
	let box = 'bg-white border-[#E5E7EB]';
	let titleCls = 'text-[#94A3B8]';
	let valueCls = 'text-[#111827]';
	let descCls = 'text-[#94A3B8]';

	if (dark) {
		box = 'bg-gradient-to-tr from-[#1B3A6B] to-[#2D5F9E] shadow';
		titleCls = 'text-[#A9C4E8]';
		valueCls = 'text-white';
		descCls = 'text-[#93C5FD]';
	} else if (red) {
		valueCls = 'text-[#111827]';
		titleCls = 'text-[#E11D48]';
		descCls = 'text-[#E11D48]';
	} else if (green) {
		box = 'bg-[#F0FDF4] border-[#BBF7D0]';
		titleCls = 'text-[#16A34A]';
		valueCls = 'text-[#15803D]';
		descCls = 'text-[#16A34A]';
	} else if (yellow) {
		box = 'bg-[#FFFBEB] border-[#FACC15]';
		titleCls = 'text-[#D97706]';
		valueCls = 'text-[#D97706]';
		descCls = 'text-[#94A3B8]';
	}

	return (
		<div
			className={`flex h-[82px] flex-col items-center justify-center rounded-[7px] border ${box} !py-[12.5px] `}
		>
			<div
				className={`flex items-center gap-1 text-[13px] font-bold ${titleCls}`}
			>
				{icon}
				{title}
			</div>

			{yellow ? (
				<div className="!mt-2 flex gap-2 text-[12px] font-bold">
					<span className="rounded-full bg-[#FEF3C7] px-3 py-1 text-[#D97706]">
						미확정 {unconfirmedCount}건
					</span>
					<span className="rounded-full bg-[#DCFCE7] px-3 py-1 text-[#16A34A]">
						확정 {confirmedCount}건
					</span>
				</div>
			) : (
				<p className={`!mt-1 text-[22px] font-extrabold ${valueCls}`}>{value}</p>
			)}

			<p className={`!mt-1 text-[12px] font-bold ${descCls}`}>{desc}</p>
		</div>
	);
}

function Legend({ color, text }) {
	return (
		<span className="flex items-center gap-1">
			<b className={`h-2 w-2 rounded-full ${color}`} />
			{text}
		</span>
	);
}

function Th({ children, w, blue, red, green }) {
	return (
		<th
			style={{ width: w }}
			className={`border font-bold ${blue
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

function Td({ children, bold, blue, red, green, large }) {
	return (
		<td
			className={`border border-[#E5E7EB] ${bold ? 'font-bold text-[#111827]' : 'text-[#4B5563]'
				} ${blue ? 'bg-[#EFF6FF] text-[#2563EB]' : ''} ${red ? 'bg-[#FEF2F2] text-[#EF4444]' : ''
				} ${green ? 'bg-[#DCFCE7] text-[#15803D]' : ''} ${large ? 'text-[15px]' : ''
				}`}
		>
			{children}
		</td>
	);
}

function StatusBadge({ code, text }) {
	const map = {
		DRAFT: 'bg-[#F1F5F9] text-[#64748B]',
		CALCULATED: 'bg-[#DBEAFE] text-[#2563EB]',
		CONFIRMED: 'bg-[#DCFCE7] text-[#16A34A]',
		PAID: 'bg-[#E0E7FF] text-[#4F46E5]',
		CANCELED: 'bg-[#FEE2E2] text-[#DC2626]',
	};

	return (
		<span
			className={`rounded-full px-2 py-[2px] text-[11px] font-bold ${map[code] || 'bg-[#F1F5F9] text-[#64748B]'}`}
		>
			{text || '-'}
		</span>
	);
}
