'use client';

import baseApi from '@/common/api/baseApi';
import LoadingSpinner from '@/common/LoadingSpinner';
import BreadCrumb from '@/component/common/BreadCrumb';
import CButton from '@/component/common/element/CButton';
import CSelect from '@/component/common/element/CSelect';
import MainTitleWrapper from '@/component/common/MainTitleWrapper';
import RegisterSalaryInfoModal from '@/component/modal/RegisterSalaryInfoModal';
import PayrollHistoryModal from '@/component/modal/PayrollHistoryModal';
import { toast } from 'sonner';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { getToday, parsingDate } from '@/common/utils/dateUtils';
import {
	Search,
	RotateCcw,
	CalendarDays,
	Table2,
	Pencil,
	Clock,
	Save,
	X,
	Plus,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SalaryBasic() {
	const [rows, setRows] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [statusInfo, setStatusInfo] = useState({});
	const [openRegisterModal, setOpenRegisterModal] = useState(false);
	const [searchName, setSearchName] = useState('');
	const [searchDept, setSearchDept] = useState('전체');
	const [searchPosition, setSearchPosition] = useState('전체');
	const [departmentOptions, setDepartmentOptions] = useState(['전체']);
	const [positionOptions, setPositionOptions] = useState(['전체']);
	const [applyDate, setApplyDate] = useState(getToday());
	const [openDatePopover, setOpenDatePopover] = useState(false);
	const [openHistoryModal, setOpenHistoryModal] = useState(false);
	const [historyTarget, setHistoryTarget] = useState(null);

	const getDepartmentOptions = async () => {
		try {
			const res = await baseApi.get('/api/v1/department');
			const list = res?.data?.data || res?.data || [];
			setDepartmentOptions(['전체', ...list.map((d) => d.departmentName)]);
		} catch (e) {
			console.error(e);
		}
	};

	const getPositionOptions = async () => {
		try {
			const res = await baseApi.get('/api/v1/position');
			const list = res?.data?.data || res?.data || [];
			setPositionOptions(['전체', ...list.map((p) => p.positionName)]);
		} catch (e) {
			console.error(e);
		}
	};

	const getSalaryList = async (overrides = {}) => {
		setIsLoading(true);
		try {
			const res = await baseApi.get('/api/v1/payroll', {
				params: {
					keyword: overrides.keyword ?? searchName,
					departmentName: overrides.departmentName ?? searchDept,
					positionName: overrides.positionName ?? searchPosition,
					applyDate: overrides.applyDate ?? applyDate,
				},
			});
			setRows(res?.data?.data || []);
		} catch (e) {
			setRows([]);
			toast(
				e?.response?.data?.message || '급여 목록 조회 중 오류가 발생했습니다.'
			);
		} finally {
			setIsLoading(false);
		}
	};

	const resetSearch = () => {
		setSearchName('');
		setSearchDept('전체');
		setSearchPosition('전체');
		setApplyDate(getToday());
		getSalaryList({
			keyword: '',
			departmentName: '전체',
			positionName: '전체',
			applyDate: getToday(),
		});
	};

	const getMonthlyStatus = async () => {
		try {
			setIsLoading(true);
			const res = await baseApi.get('/api/v1/payroll/status');
			setStatusInfo(res.data.data);
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		getSalaryList();
		getMonthlyStatus();
		getDepartmentOptions();
		getPositionOptions();
	}, []);

	return (
		<main className="w-[1190px] bg-[#F3F6FA]text-[#1F2937]">
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
						title: '급여기본정보관리',
					},
				]}
			/>
			<MainTitleWrapper
				buttonRender={() => {
					return (
						<>
							<CButton
								path="/download.png"
								type="type2"
								buttonName="급여정보등록"
								beforeIcon={<Plus size={13} />}
								onClick={() => {
									setOpenRegisterModal(true);
								}}
							/>
						</>
					);
				}}
				mainTitleData={{
					title: '급여기본정보관리',
					desc: '직원별 기본급여 및 수당 기준 정보를 등록하고 관리합니다.',
				}}
			/>

			{/* summary cards */}
			<div className="grid grid-cols-5 gap-3 !mt-[16px]">
				<SummaryCard
					dark
					title="평균 기본급"
					value={`${Number(statusInfo?.averageBasicSalary).toLocaleString()}원`}
					desc={`전월 대비 ${Number(statusInfo?.compareLastMonthAmount).toLocaleString()}원`}
				/>
				<SummaryCard
					title="최고 기본급"
					value={`${Number(statusInfo?.maxBasicSalary).toLocaleString()}원`}
					badge={`${statusInfo?.maxBasicSalaryEmployeeName} · ${statusInfo?.maxBasicSalaryEmployeePositionName}`}
				/>
				<SummaryCard
					blue
					title="월 총 인건비"
					value={`${Number(statusInfo?.totalBasicSalaryAmount).toLocaleString()}원`}
					desc="기본급 합계 기준"
				/>
				<SummaryCard
					orange
					title="월 총 수당"
					value={`${Number(statusInfo?.totalAllowanceAmount).toLocaleString()}원`}
					desc="수당 합계 기준"
				/>
				<SummaryCard
					green
					title="등록 인원"
					value={`${rows.length}명`}
					desc={`미등록 ${statusInfo.employeeCount - rows.length}명`}
				/>
			</div>

			{/* filter */}
			<section className="!mt-4 flex h-[60px] items-center gap-4 rounded-[7px] border border-[#E5E7EB] bg-white px-5">
				<div className="flex items-center gap-2">
					<span className="text-[14px] font-bold">부서</span>
					<CSelect
						width={140}
						padding="7px 22px 7px 12px"
						optionList={departmentOptions}
						value={searchDept}
						onChange={(e) => setSearchDept(e.target.value)}
					/>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-[14px] font-bold">직급</span>
					<CSelect
						width={140}
						padding="7px 22px 7px 12px"
						optionList={positionOptions}
						value={searchPosition}
						onChange={(e) => setSearchPosition(e.target.value)}
					/>
				</div>

				<div className="flex items-center gap-2">
					<span className="text-[14px] font-bold">적용기준일</span>
					<Popover open={openDatePopover} onOpenChange={setOpenDatePopover}>
						<PopoverTrigger asChild>
							<div
								className="relative cursor-pointer"
								onClick={() => setOpenDatePopover(true)}
							>
								<input
									value={applyDate}
									readOnly
									className="h-[34px] w-[135px] cursor-pointer rounded-[5px] border border-[#D1D5DB] pl-3 pr-8 text-[13px] font-bold text-[#6B7280]"
								/>
								<CalendarDays
									size={14}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
								/>
							</div>
						</PopoverTrigger>
						<PopoverContent>
							<Calendar
								mode="single"
								selected={applyDate}
								onSelect={(date) => {
									if (date) {
										const picked = parsingDate(date);
										setApplyDate(picked);
										getSalaryList({ applyDate: picked });
									}
									setOpenDatePopover(false);
								}}
							/>
						</PopoverContent>
					</Popover>
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
							if (e.key === 'Enter') getSalaryList();
						}}
						className="h-[34px] w-[130px] rounded-[5px] border border-[#D1D5DB] pl-9 text-[13px] outline-none"
					/>
				</div>

				<button
					onClick={() => getSalaryList()}
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
			</section>

			{/* table */}
			<section className="!mt-4 overflow-hidden rounded-[7px] border border-[#E5E7EB] bg-white">
				<div className="flex h-[44px] items-center justify-between bg-[#F8FAFC] px-5">
					<div className="flex items-center gap-2 text-[15px] font-bold text-[#183A6B]">
						<Table2 size={16} />
						직원별 급여 기본정보
					</div>

					<div className="flex items-center gap-3 text-[12px]">
						<span className="rounded-full bg-[#DBEAFE] !px-3 !py-1 font-bold text-[#2563EB]">
							총 {rows.length}명
						</span>
						<Legend color="bg-[#DBEAFE]" text="기본급" />
						<Legend color="bg-[#FEF9C3]" text="수당항목" />
						<Legend color="bg-[#DCFCE7]" text="계좌정보" />
					</div>
				</div>

				<table className="w-full table-fixed border-collapse text-center text-[13px]">
					<thead>
						<tr className="h-[40px] bg-[#F1F5F9] text-[#64748B]">
							<th className="w-[36px] border border-[#E5E7EB]">
								<input
									type="checkbox"
									onChange={(e) => {
										setRows((prev) =>
											prev.map((v) => ({ ...v, edit: e.target.checked }))
										);
									}}
								/>
							</th>
							<Th w="80px">사원번호</Th>
							<Th w="70px">성명</Th>
							<Th w="90px">부서</Th>
							<Th w="70px">직급</Th>
							<Th color="blue" w="100px">
								기본급
							</Th>
							<Th color="yellow" w="75px">
								식대
							</Th>
							<Th color="yellow" w="75px">
								교통비
							</Th>
							<Th color="yellow" w="80px">
								직급수당
							</Th>
							<Th color="yellow" w="80px">
								직책수당
							</Th>
							<Th color="yellow" w="90px">
								수당합계
							</Th>
							<Th color="green" w="80px">
								은행
							</Th>
							<Th color="green" w="120px">
								계좌번호
							</Th>
							{/* <Th w="95px">적용시작일</Th> */}
							<Th w="140px">관리</Th>
						</tr>
					</thead>

					<tbody>
						{rows.map((row) => (
							<tr
								key={row.payrollId}
								className={`h-[43px] border-t ${
									row.edit ? 'bg-[#EFF6FF]' : 'bg-white'
								}`}
							>
								<td className="border border-[#E5E7EB]">
									<input
										type="checkbox"
										checked={row.edit}
										onChange={(e) => {
											setRows((prev) => {
												return prev.map((v) =>
													v.payrollId !== row.payrollId
														? { ...v }
														: { ...v, edit: e.target.checked }
												);
											});
										}}
									/>
								</td>
								<Td>{row.employeeNo}</Td>
								<Td bold>{row.employeeName}</Td>
								<Td>{row.departmentName}</Td>
								<Td>
									<RankBadge text={row.positionName} color={row.rankColor} />
								</Td>
								<Td blue>
									{row.edit ? (
										<input
											value={row.tempBasic ?? row.basicSalaryAmount}
											type="number"
											step={10000}
											onChange={(e) => {
												setRows((prev) => {
													return prev.map((v) =>
														row.payrollId === v.payrollId
															? { ...v, tempBasic: Number(e.target.value) }
															: { ...v }
													);
												});
											}}
											className="h-[30px] w-[82px] rounded-[4px] border border-[#2563EB] bg-white text-center font-bold text-[#2563EB]"
										/>
									) : (
										Number(row.basicSalaryAmount).toLocaleString()
									)}
								</Td>
								<Td yellow>
									{Number(row.mealAllowanceAmount).toLocaleString()}
								</Td>
								<Td yellow>
									{Number(row.transportationAllowanceAmount).toLocaleString()}
								</Td>
								<Td yellow>
									{Number(row.positionAllowanceAmount).toLocaleString()}
								</Td>
								<Td yellow>
									{Number(row.responsibilityAllowanceAmount).toLocaleString()}
								</Td>
								<Td yellow strong>
									{Number(row.totalAllowanceAmount).toLocaleString()}
								</Td>
								<Td green>{row.bankName || '-'}</Td>
								<Td green>{row.accountNumber || '-'}</Td>
								<Td>{row.start}</Td>
								<td className="border border-[#E5E7EB]">
									{row.edit ? (
										<div className="flex justify-center gap-1">
											<button
												className="flex cursor-pointer items-center gap-1 rounded-[4px] bg-[#183A6B] !px-2 !py-1 text-[10px] font-bold text-white"
												onClick={async () => {
													const updateAmount = rows.find(
														(item) => item.payrollId === row.payrollId
													)?.tempBasic;

													try {
														await baseApi.patch(
															`/api/v1/payroll/${row.payrollId}/basic-salary`,
															{
																amount: updateAmount,
															}
														);

														setRows((prev) => {
															return prev.map((v) => {
																const { tempBasic, ...rest } = v;

																return v.payrollId === row.payrollId
																	? {
																			...rest,
																			basicSalaryAmount: updateAmount,
																			edit: false,
																		}
																	: { ...rest };
															});
														});
														toast('기본급이 수정되었습니다.');
													} catch (e) {
														toast(
															e?.response?.data?.message ||
																'기본급 수정 중 오류가 발생했습니다.'
														);
													}
												}}
											>
												<Save size={12} />
												저장
											</button>
											<button
												className="flex cursor-pointer items-center gap-1 rounded-[4px] bg-[#FEF2F2] !px-2 !py-1 text-[10px] font-bold text-[#EF4444]"
												onClick={() => {
													setRows((prev) => {
														return prev.map((v) => {
															const { tempBasic, ...rest } = v;
															return { ...rest, edit: false };
														});
													});
												}}
											>
												<X size={12} />
												취소
											</button>
										</div>
									) : (
										<div className="flex !px-[14px] !py-[11px] gap-[4px]">
											<button
												onClick={() => {
													setRows((prev) =>
														prev.map((v) =>
															v.payrollId === row.payrollId
																? { ...v, edit: true }
																: v
														)
													);
												}}
												className="flex cursor-pointer items-center gap-1 rounded-[4px] bg-[#EFF6FF] !px-2 !py-1 text-[10px] font-bold text-[#2563EB]"
											>
												<Pencil size={12} />
												수정
											</button>
											<button
												onClick={() => {
													setHistoryTarget({
														employeeNo: row.employeeNo,
														employeeName: row.employeeName,
													});
													setOpenHistoryModal(true);
												}}
												className="flex cursor-pointer items-center gap-1 rounded-[4px] bg-[#F8FAFC] !px-2 !py-1 text-[10px] font-bold text-[#64748B]"
											>
												<Clock size={12} />
												이력
											</button>
										</div>
									)}
								</td>
							</tr>
						))}
					</tbody>

					<tfoot>
						<tr className="h-[44px] bg-[#EAF2FF] font-bold text-[#183A6B]">
							<td
								colSpan={5}
								className="border border-[#BFDBFE] text-right pr-4"
							>
								Σ 합계 ({rows.length}명)
							</td>
							<td className="border border-[#BFDBFE] text-[#2563EB]">
								{Number(
									rows.reduce(
										(acc, cur) => acc + Number(cur.basicSalaryAmount),
										0
									) || 0
								).toLocaleString()}
							</td>
							<td className="border border-[#FEF3C7] text-[#B45309]">
								{Number(
									rows.reduce(
										(acc, cur) => acc + Number(cur.mealAllowanceAmount),
										0
									) || 0
								).toLocaleString()}
							</td>
							<td className="border border-[#FEF3C7] text-[#B45309]">
								{Number(
									rows.reduce(
										(acc, cur) =>
											acc + Number(cur.transportationAllowanceAmount),
										0
									) || 0
								).toLocaleString()}
							</td>
							<td className="border border-[#FEF3C7] text-[#B45309]">
								{Number(
									rows.reduce(
										(acc, cur) => acc + Number(cur.positionAllowanceAmount),
										0
									) || 0
								).toLocaleString()}
							</td>
							<td className="border border-[#FEF3C7] text-[#B45309]">
								{Number(
									rows.reduce(
										(acc, cur) =>
											acc + Number(cur.responsibilityAllowanceAmount),
										0
									) || 0
								).toLocaleString()}
							</td>
							<td className="border border-[#FEF3C7] text-[#B45309] text-[16px]">
								{Number(
									rows.reduce(
										(acc, cur) => acc + Number(cur.totalAllowanceAmount),
										0
									) || 0
								).toLocaleString()}
							</td>
							<td className="border border-[#BFDBFE] text-[#94A3B8]">-</td>
							<td className="border border-[#BFDBFE] text-[#94A3B8]">-</td>
							{/* <td className="border border-[#BFDBFE] text-[#94A3B8]">-</td> */}
							<td className="border border-[#BFDBFE] text-[#94A3B8]">-</td>
						</tr>
					</tfoot>
				</table>

				<div className="flex h-[44px] items-center justify-between px-5">
					<p className="text-[13px] text-[#64748B]">
						총 {rows.length}명 조회 ·{' '}
						{rows.reduce((acc, cur) => {
							return acc + (cur.edit ? 1 : 0);
						}, 0) || 0}
						명 수정 중
					</p>

					<div className="flex gap-1">
						{/* 						<PageBtn>
							<ChevronLeft size={14} />
						</PageBtn> */}
						<PageBtn active>1</PageBtn>
						{/* 						<PageBtn>2</PageBtn>
						<PageBtn>
							<ChevronRight size={14} />
						</PageBtn> */}
					</div>
				</div>
			</section>

			<LoadingSpinner isLoading={isLoading} />
			<RegisterSalaryInfoModal
				open={openRegisterModal}
				setOpen={setOpenRegisterModal}
				getSalaryList={getSalaryList}
			/>
			<PayrollHistoryModal
				open={openHistoryModal}
				setOpen={setOpenHistoryModal}
				employeeNo={historyTarget?.employeeNo}
				employeeName={historyTarget?.employeeName}
			/>
		</main>
	);
}

function SummaryCard({ title, value, desc, badge, dark, blue, orange, green }) {
	let cls = 'bg-white border-[#E5E7EB] text-[#111827]';
	let valueCls = 'text-[#111827]';
	let titleCls = 'text-[#94A3B8]';

	if (dark) {
		cls = 'bg-[#183A6B] border-[#183A6B] text-white shadow-md';
		valueCls = 'text-white';
		titleCls = 'text-[#A9C4E8]';
	} else if (blue) {
		cls = 'bg-[#EFF6FF] border-[#BFDBFE]';
		valueCls = 'text-[#2563EB]';
		titleCls = 'text-[#2563EB]';
	} else if (orange) {
		cls = 'bg-[#FFFBEB] border-[#FACC15]';
		valueCls = 'text-[#B45309]';
		titleCls = 'text-[#D97706]';
	} else if (green) {
		cls = 'bg-[#F0FDF4] border-[#BBF7D0]';
		valueCls = 'text-[#16A34A]';
		titleCls = 'text-[#16A34A]';
	}

	return (
		<div
			className={`flex h-[74px] flex-col items-center justify-center rounded-[7px] border ${cls} !py-[44px] !mb-[16px]`}
		>
			<p className={`text-[13px] font-bold ${titleCls}`}>{title}</p>
			<p className={`!mt-1 text-[22px] font-extrabold ${valueCls}`}>{value}</p>
			{desc && (
				<p
					className={`text-[12px] font-bold ${dark ? 'text-[#7EA6D8]' : titleCls}`}
				>
					{desc}
				</p>
			)}
			{badge && (
				<span className="!mt-1 rounded-full bg-[#E9D5FF] !px-3 !py-[2px] text-[12px] font-bold text-[#7C3AED]">
					{badge}
				</span>
			)}
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

function Th({ children, color, w }) {
	const map = {
		blue: 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]',
		yellow: 'bg-[#FFFBEB] text-[#D97706] border-[#FEF3C7]',
		green: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
	};

	return (
		<th
			style={{ width: w }}
			className={`border font-bold ${map[color] || 'border-[#E5E7EB]'}`}
		>
			{children}
		</th>
	);
}

function Td({ children, bold, blue, yellow, green, strong }) {
	return (
		<td
			className={`border border-[#E5E7EB] ${
				bold ? 'font-bold text-[#111827]' : 'text-[#4B5563]'
			} ${blue ? 'bg-[#EFF6FF] font-bold text-[#2563EB]' : ''} ${
				yellow ? 'bg-[#FFFBEB]' : ''
			} ${green ? 'bg-[#ECFDF5]' : ''} ${
				strong ? 'font-bold text-[#B45309]' : ''
			}`}
		>
			{children}
		</td>
	);
}

function RankBadge({ text, color }) {
	const map = {
		purple: 'bg-[#F3E8FF] text-[#8B5CF6]',
		blue: 'bg-[#DBEAFE] text-[#2563EB]',
		sky: 'bg-[#E0F2FE] text-[#0284C7]',
		green: 'bg-[#DCFCE7] text-[#16A34A]',
	};

	return (
		<span
			className={`rounded-full !px-3 !py-1 text-[12px] font-bold ${map[color]}`}
		>
			{text}
		</span>
	);
}

function PageBtn({ children, active }) {
	return (
		<button
			className={`flex h-[30px] w-[30px] items-center justify-center rounded-[5px] border text-[13px] font-bold ${
				active
					? 'border-[#183A6B] bg-[#183A6B] text-white'
					: 'border-[#E5E7EB] bg-white text-[#64748B]'
			}`}
		>
			{children}
		</button>
	);
}
