'use client';

import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import {
	Calculator,
	Check,
	ChevronRight,
	Info,
	RotateCw,
	Search,
	UserRoundPlus,
	UsersRound,
	XIcon,
	Zap,
} from 'lucide-react';
import CSelect from '../common/element/CSelect';
import CInput from '../common/element/CInput';
import CButton from '../common/element/CButton';

export default function RegisterSalaryInfoModal({ open, setOpen }) {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="flex flex-col w-[680px]">
				<DialogHeader className="bg-[#1B3A6B] px-[24px] py-[12px] rounded-tl-[8px] rounded-tr-[8px]">
					<div className="flex justify-between items-center">
						<div className="flex  gap-[12px]">
							<div className="bg-[#fff]/[0.1255] p-[9px] w-fit rounded-[8px]">
								<UserRoundPlus size={18} color="#fff" />
							</div>
							<div className="flex flex-col">
								<span className="text-[16px] text-[#fff] font-[700]">
									급여정보 등록
								</span>
								<span className="text-[11px] text-[#93C5FD]">
									신규입사자의 급여 정보를 입력하세요
								</span>
							</div>
						</div>

						<div className="!mr-[30px]">
							<ul className="flex gap-[6px] items-center">
								<li className="text-[11px] text-[#FFFFFF] font-[700] bg-[#fff]/[0.1255] px-[12px] py-[7px] flex items-center gap-[6px] rounded-[999px]">
									<span className="bg-[#fff] rounded-[999px] px-[8px] py-[3px] text-[10px] text-[#1B3A6B]">
										1
									</span>
									<span>사원선택</span>
								</li>

								<ChevronRight size={12} color="#FFFFFF" />

								<li className="text-[11px] text-[#FFFFFF] font-[700] bg-[#fff]/[0.1255] px-[12px] py-[7px] flex items-center gap-[6px] rounded-[999px]">
									<span className="bg-[#fff] rounded-[999px] px-[8px] py-[3px] text-[10px] text-[#1B3A6B]">
										2
									</span>
									<span>급여입력</span>
								</li>
							</ul>
						</div>
					</div>
				</DialogHeader>

				{/* 본문영역 */}
				<div className="px-[24px] py-[27px] max-h-[80vh] overflow-y-auto">
					<SearchEmployeeSection />
					<Divider />
					<SalaryFormSection />
				</div>


				<DialogFooter className='justify-between'>
					<div className='flex gap-[6px] items-center'>
						<Info size={10} color='#9CA3AF' />
						<span className='text-[#9CA3AF] leading-[14.4px] text-[12px]'>등록 완료 후 급여 대장에 자동 반영됩니다</span>
					</div>

					<div className='flex gap-[10px] items-center'>
						<CButton
							beforeIcon={<XIcon size={13} color='#6B7280' />}
							buttonName='취소'
						/>
						<CButton
							beforeIcon={<RotateCw size={13} color='#6B7280' />}
							buttonName='초기화'
						/>

						<CButton
							type='type2'
							beforeIcon={<UserRoundPlus size={13} color='#FFFFFF' />}
							buttonName='초기화'
						/>
					</div>
				</DialogFooter>
			</DialogContent>

		</Dialog>
	);
}
// -------------------------------------------------------------------------------------
// 내부 컴포넌트 영역
function SearchEmployeeSection() {
	return (
		<section>
			<div
				className="
								flex text-[#1B3A6B] text-[14px]
								relative
								before:absolute
								before:content-['']
								before:w-[3px]
								before:h-[16px]
								before:bg-[#1B3A6B]
								before:rounded-[8px]
								justify-between
							"
			>
				<span className="text-[14px] text-[#1B3A6B] font-[700] pl-[8px]">
					신규입사자 검색
				</span>
				<span className="flex items-center bg-[#EFF6FF] rounded-[6px] px-[10px] py-[4px] w-fit gap-[4px]">
					<UsersRound size={12} color="#2563EB" />
					<span className="flex items-center leading-[14.5px] text-[#2563EB] text-[11px] font-[700]">
						검색결과 3명
					</span>
				</span>
			</div>

			<div className="flex gap-[8px] !mt-[12px]">
				<CSelect
					padding='9px 11px 9px 12px'
				/>
				<CInput
					border="1px solid #2563EB"
					padding="11.5px 14px 11.5px 32px"
					width={406}
					beforeIcon={
						<Search
							size={15}
							color="#2563EB"
							className="absolute left-[14px] top-1/2 -translate-y-1/2"
						/>
					}
				/>
				<CButton
					beforeIcon={<Search size={15} color="#fff" />}
					buttonName="검색"
					type="type2"
				/>
			</div>

			<div className="!mt-[12px] max-h-[180px] overflow-y-scroll">
				<table>
					<thead className="bg-[#F8FAFC]">
						<tr className="flex items-center py-[11.5px] px-[15px] border border-[#E5E7EB] rounded-tl-[8px] rounded-tr-[8px]">
							<th className="w-[36px]">
								<input type="checkbox" className="h-4 w-4 accent-[#D1D5DB]" />
							</th>
							<th className="flex items-center w-[110px]">
								<span>사번</span>
							</th>

							<th className="w-[194px]">
								<span>사원명 · 부서</span>
							</th>

							<th className="w-[80px]">
								<span>직급</span>
							</th>

							<th className="w-[100px]">
								<span>입사일</span>
							</th>

							<th className="w-[80px]">
								<span>등록여부</span>
							</th>
						</tr>
					</thead>
					<tbody className='max-h-[118px] overflow-y-scroll'>
						<tr
							className={`flex items-center py-[11.5px] px-[16px] ${true ? 'bg-[#EFF6FF] border border-[#DBEAFE]' : 'bg-[#fff] border border-[#E5E7EB]'}`}
						>
							<td className="w-[36px] flex items-center justify-center">
								<input
									type="checkbox"
									className="h-4 w-4 accent-[#D1D5DB]"
									checked
								/>
							</td>
							<td className="flex items-center w-[110px]">
								<span>EMP-2025-041</span>
							</td>

							<td className="w-[194px] flex items-center justify-center">
								<div className="flex gap-[8px]">
									<span className="text-[#2563EB] text-[11px] font-[700] bg-[#DBEAFE] px-[12px] py-[3px] rounded-[999px] flex items-center">
										이
									</span>
									<div className="flex flex-col">
										<span className="text-[#111827] text-[13px] font-[700]">
											이수연
										</span>
										<span className="text-[#9CA3AF] text-[11px]">인사팀</span>
									</div>
								</div>
							</td>

							<td className="w-[80px] flex items-center justify-center">
								<span>사원</span>
							</td>

							<td className="w-[100px] flex items-center justify-center">
								<span>2025.07.01</span>
							</td>

							<td className="w-[80px] flex items-center justify-center">
								<span className="text-[#16A34A] text-[11px] bg-[#DCFCE7] rounded-[8px] px-[8px] py-[3px] font-[700]">
									미등록
								</span>

								{/* <span className="text-[#CA8A04] text-[11px] bg-[#FEF9C3] rounded-[8px] px-[8px] py-[3px] font-[700]">
									등록완료
								</span> */}
							</td>
						</tr>

						<tr
							className={`flex items-center py-[11.5px] px-[16px] ${true ? 'bg-[#EFF6FF] border border-[#DBEAFE]' : 'bg-[#fff] border border-[#E5E7EB]'}`}
						>
							<td className="w-[36px] flex items-center justify-center">
								<input
									type="checkbox"
									className="h-4 w-4 accent-[#D1D5DB]"
									checked
								/>
							</td>
							<td className="flex items-center w-[110px]">
								<span>EMP-2025-041</span>
							</td>

							<td className="w-[194px] flex items-center justify-center">
								<div className="flex gap-[8px]">
									<span className="text-[#2563EB] text-[11px] font-[700] bg-[#DBEAFE] px-[12px] py-[3px] rounded-[999px] flex items-center">
										이
									</span>
									<div className="flex flex-col">
										<span className="text-[#111827] text-[13px] font-[700]">
											이수연
										</span>
										<span className="text-[#9CA3AF] text-[11px]">인사팀</span>
									</div>
								</div>
							</td>

							<td className="w-[80px] flex items-center justify-center">
								<span>사원</span>
							</td>

							<td className="w-[100px] flex items-center justify-center">
								<span>2025.07.01</span>
							</td>

							<td className="w-[80px] flex items-center justify-center">
								<span className="text-[#16A34A] text-[11px] bg-[#DCFCE7] rounded-[8px] px-[8px] py-[3px] font-[700]">
									미등록
								</span>

								{/* <span className="text-[#CA8A04] text-[11px] bg-[#FEF9C3] rounded-[8px] px-[8px] py-[3px] font-[700]">
									등록완료
								</span> */}
							</td>
						</tr>

						<tr
							className={`flex items-center py-[11.5px] px-[16px] ${false ? 'bg-[#EFF6FF] border border-[#DBEAFE]' : 'bg-[#fff] border border-[#E5E7EB]'}`}
						>
							<td className="w-[36px] flex items-center justify-center">
								<input type="checkbox" className="h-4 w-4 accent-[#D1D5DB]" />
							</td>
							<td className="flex items-center w-[110px]">
								<span>EMP-2025-041</span>
							</td>

							<td className="w-[194px] flex items-center justify-center">
								<div className="flex gap-[8px]">
									<span className="text-[#2563EB] text-[11px] font-[700] bg-[#DBEAFE] px-[12px] py-[3px] rounded-[999px] flex items-center">
										이
									</span>
									<div className="flex flex-col">
										<span className="text-[#111827] text-[13px] font-[700]">
											이수연
										</span>
										<span className="text-[#9CA3AF] text-[11px]">인사팀</span>
									</div>
								</div>
							</td>

							<td className="w-[80px] flex items-center justify-center">
								<span>사원</span>
							</td>

							<td className="w-[100px] flex items-center justify-center">
								<span>2025.07.01</span>
							</td>

							<td className="w-[80px] flex items-center justify-center">
								{/* <span className="text-[#16A34A] text-[11px] bg-[#DCFCE7] rounded-[8px] px-[8px] py-[3px] font-[700]">
									미등록
								</span> */}

								<span className="text-[#CA8A04] text-[11px] bg-[#FEF9C3] rounded-[8px] px-[8px] py-[3px] font-[700]">
									등록완료
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	);
}

function Divider() {
	return (
		<div className="w-[632px] h-[1px] bg-[#E5E7EB] rounded-[8px] !mt-[20px] !mb-[20px]"></div>
	);
}

function SalaryFormSection() {
	return (
		<section>
			<div className="flex text-[#1B3A6B] text-[14px] justify-between">
				<span
					className="text-[14px] text-[#1B3A6B] font-[700] pl-[8px] flex items-center relative
								before:absolute
								before:content-['']
								before:w-[3px]
								before:left-[0]
								before:h-[16px]
								before:bg-[#1B3A6B]
								before:rounded-[8px]"
				>
					급여 정보 입력
				</span>
				<span className="flex items-center bg-[#DBEAFE] rounded-[6px] px-[12px] py-[5px] w-fit gap-[4px]">
					<span className="text-[#fff] bg-[#2563EB] text-[9px] font-[700] px-[5px] py-[3px] rounded-[999px]">
						이
					</span>
					<span className="flex items-center leading-[14.5px] text-[#2563EB] text-[11px] font-[700] gap-[8px]">
						<span className="font-[700] text-[12px]">
							이수연 · 인사팀 · 사원
						</span>
						<span className="border-[1.5px] border-[#2563EB] rounded-[999px]">
							<Check size={10} color="#2563EB" />
						</span>
					</span>
				</span>
			</div>

			<div className="flex flex-wrap gap-[12px] pt-[14px]">
				<SalaryInput title="기본급" impt unit="원" />
				<SalaryInput title="직급수당" impt unit="원" />
				<SalaryInput title="식대" unit="원" />
				<SalaryInput title="교통비" unit="원" />
				<SalarySelect title="지급방식" impt optionList={['계좌이체', '현금']} />
				<SalarySelect
					title="급여지급일"
					impt
					optionList={['매월25일', '매월10일']}
				/>
			</div>

			<div>
				<DeductionSection />
			</div>

			<MandatoryDeduction />
		</section>
	);
}

function SalaryInput({ title, impt, unit }) {
	return (
		<>
			<div className="flex flex-col relative w-fit">
				<label htmlFor="" className="text-[#374151] text-[12px] font-bold">
					{title}
					{impt && <span className="text-[#EF4444] text-[12px]">*</span>}
				</label>
				<input
					type="text"
					className="
						pl-[12px] pr-[30px] py-[11px] text-[#111827] text-[13px] rounded-[13px] border  focus:border-[#2563EB] focus:outline-none w-[202px] leading-[15.6px] font-bold
					"
				/>
				{unit && (
					<span className="absolute right-0 top-[50%] right-[15px]">
						{unit}
					</span>
				)}
			</div>
		</>
	);
}

function SalarySelect({ optionList = [], onChange, impt, title }) {
	return (
		<div className="flex flex-col relative w-fit">
			<label htmlFor="" className="text-[#374151] text-[12px] font-bold">
				{title}
				{impt && <span className="text-[#EF4444] text-[12px]">*</span>}
			</label>
			<select
				name=""
				id=""
				onChange={(e) => onChange?.(e)}
				className="border border-[#D1D5DB] text-[#111827] font-bold text-[13px] px-[12px] py-[11px] w-[202px] rounded-[13px]"
			>
				{optionList.map((item, idx) => (
					<option key={idx} value={item}>
						{item}
					</option>
				))}
			</select>
		</div>
	);
}

function DeductionSection({ }) {
	return (
		<div className='bg-[#F8FAFC] border border-[#E5E7EB] p-[14px] rounded-[10px] !mt-[10px]'>
			<div className='flex justify-between'>
				<div className='flex gap-[6px]'>
					<Calculator size={13} color='#6B7280' />
					<span className='text-[#374151] text-[13px] leading-[15.6px]'>공제 항목 (자동 계산)</span>
				</div>
				<div>
					<span className='leading-[13.2px] text-[#4F46E5] font-bold text-[11px] bg-[#E0E7FF] rounded-[6px] px-[10px] py-[3px] flex w-fit gap-[4px]'>
						<Zap size={13} color='#4F46E5' />
						급여 기준 자동 산정
					</span>
				</div>
			</div>

			<div className='flex flex-wrap gap-[10px]'>
				<DeductionItem title='국민연금 (4.6%)' amount={126000} />
				<DeductionItem title='건강보험 (3.545%)' amount={99260} />
				<DeductionItem title='고용보험 (0.9%)' amount={25200} />
				<DeductionItem title='소득세 (간이세액)' amount={52300} />
			</div>

		</div>
	)
}

function DeductionItem({ title, amount }) {
	return (
		<div className='flex flex-col w-fit !mt-[10px]'>
			<label htmlFor="" className='leading-[13.2px] text-[#6B7280] text-[11px] font-bold'>{title}</label>

			<div className='relative pt-[5px]'>
				<input type="text" disabled className='w-[143px] border border-[#E0E7FF] rounded-[8px] text-[#6B7280] text-[12px] leading-[14.4px] pl-[10px] pt-[10px] pb-[10px] pr-[20px]' readOnly value={Number(amount).toLocaleString()} />
				<span className='absolute font-bold right-[10px] top-[15px] text-[#4F46E5] text-[10px] leading-[12px] bg-[#E0E7FF] rounded-[4px] px-[6px] py-[2px]'>자동</span>
			</div>
		</div>
	)
}


function MandatoryDeduction() {
	return (
		<>
			<div className='flex bg-[#EFF6FF] border border-[#BFDBFE] rounded-[10px] py-[15.5] px-[16px] justify-between !mt-[14px]'>
				<div className='flex gap-[19px]'>
					<div className='flex flex-col justify-center gap-[3px]'>
						<span className='text-[#64748B] text-[11px] leading-[13.2px]'>총 지급액</span>
						<span className='text-[#1D4ED8] text-[15px] font-bold leading-[18px]'>{Number(3200000).toLocaleString()}</span>
					</div>

					<div className='flex items-center justify-center'>
						<span className='w-[10px] h-[1px] bg-[#BFDBFE] rounded-[10px] '></span>
					</div>


					<div className='flex flex-col justify-center items-center gap-[3px]'>
						<span className='text-[#64748B] leading-[13.2px] text-[11px]'>총 공제액</span>
						<span className='text-[#374151] text-[15px] leading-[18px] font-bold'>{Number(302760).toLocaleString()}원</span>
					</div>


					<div className='flex items-center justify-center flex-col gap-[5px]'>
						<span className='w-[10px] h-[1px] bg-[#BFDBFE] rounded-[10px] '></span>
						<span className='w-[10px] h-[1px] bg-[#BFDBFE] rounded-[10px] '></span>
					</div>

					<div className='flex flex-col justify-center items-center gap-[3px]'>
						<span className='text-[#64748B] leading-[13.2px] text-[11px]'>실 수령액</span>
						<span className='text-[#1B3A6B] leading-[20.4px] text-[17px] font-bold'>{Number(2897240).toLocaleString()}원</span>
					</div>
				</div>

				<div className='flex gap-[4px] items-center'>
					<Info size={10} color='#93C5FD' />
					<span className='text-[#64748B] leading-[13.2px] text-[11px]'>공제액은 자동 계산됩니다</span>
				</div>
			</div>
		</>
	)
}
