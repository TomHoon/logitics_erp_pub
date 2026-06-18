'use client';

import BreadCrumb from '@/component/common/BreadCrumb';
import MainTitleWrapper from '@/component/common/MainTitleWrapper';
import c from './EventSupportApply.module.css';
import {
	Baby,
	CakeSlice,
	Calendar,
	CalendarDays,
	Ellipsis,
	Flower2,
	Heart,
	HeartHandshake,
	Info,
	Lock,
	Paperclip,
	Download,
	FileText,
	XIcon,
	SendHorizontal,
	UserPlus,
	Save,
	Gift,
	Clock7,
} from 'lucide-react';
import { clsx } from 'clsx';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import CButton from '@/component/common/element/CButton';
import { getToday, parsingDate } from '@/common/utils/dateUtils';
import ViewTable from '@/component/common/ViewTable';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import LoadingSpinner from '@/common/LoadingSpinner';
import WelfareDetailModal from '@/component/modal/WelfareDetailModal';

const columns = [
	'NO',
	'신청일',
	'경조구분',
	'대상자',
	'관계',
	'경조일',
	'지급금액',
	'지급계좌',
	'처리상태',
	'관리',
];

const rowList = [
	{
		신청일: '2025.07.01',
		경조구분: '출산',
		대상자: '이동훈',
		관계: '본인',
		경조일: '2025.07.01',
		지급금액: '500,000원',
		지급계좌: '국민 12-****-****',
		처리상태: '검토중',
	},
	{
		신청일: '2025.06.28',
		경조구분: '결혼',
		대상자: '김민수',
		관계: '본인',
		경조일: '2025.07.10',
		지급금액: '1,000,000원',
		지급계좌: '신한 11-****-****',
		처리상태: '승인완료',
	},
	{
		신청일: '2025.06.25',
		경조구분: '부친상',
		대상자: '박지영',
		관계: '부친',
		경조일: '2025.06.24',
		지급금액: '700,000원',
		지급계좌: '우리 22-****-****',
		처리상태: '지급완료',
	},
	{
		신청일: '2025.06.20',
		경조구분: '모친상',
		대상자: '최현우',
		관계: '모친',
		경조일: '2025.06.19',
		지급금액: '700,000원',
		지급계좌: '하나 33-****-****',
		처리상태: '검토중',
	},
	{
		신청일: '2025.06.18',
		경조구분: '출산',
		대상자: '이수진',
		관계: '배우자',
		경조일: '2025.06.17',
		지급금액: '500,000원',
		지급계좌: '농협 44-****-****',
		처리상태: '반려',
	},
];

const smallFlexIndex = [2, 3, 4, 8, 9];

const getStatusClass = (item) => {
	const typeClass = {
		검토중: 'text-[#CA8A04] bg-[#FEF9C3]',
		승인완료: 'text-[#2563EB] bg-[#EFF6FF]',
		지급완료: 'text-[#166534] bg-[#DCFCE7]',
		반려: 'text-[#B91C1C] bg-[#FEE2E2]',
	};
	return `${typeClass[item] ?? 'text-[#6B7280] bg-[#F3F4F6]'} text-[11px] px-[10px] py-[3px] rounded-[8px] font-[700]`;
};

const getEventTypeClass = (item) => {
	const typeClass = {
		출산: 'text-[#16A34A] bg-[#F0FDF4]',
		결혼: 'text-[#2563EB] bg-[#EFF6FF]',
		본인결혼: 'text-[#2563EB] bg-[#DBEAFE]',
		부친상: 'text-[#DC2626] bg-[#FEF2F2]',
		모친상: 'text-[#DC2626] bg-[#FEF2F2]',
		배우자상: 'text-[#B91C1C] bg-[#FEE2E2]',
		조부상: 'text-[#EA580C] bg-[#FFF7ED]',
		조모상: 'text-[#EA580C] bg-[#FFF7ED]',
		칠순: 'text-[#7C3AED] bg-[#F3E8FF]',
		팔순: 'text-[#9333EA] bg-[#FAF5FF]',
		퇴직: 'text-[#475569] bg-[#F1F5F9]',
	};

	return `${typeClass[item] ?? 'text-[#6B7280] bg-[#F3F4F6]'} text-[11px] px-[10px] py-[3px] rounded-[8px] font-[700]`;
};

const eventTypeList = [
	{
		text: '본인결혼',
		icon: <Heart size={13} color="#D1D5DB" />,
	},
	{
		text: '자녀결혼',
		icon: <Heart size={13} color="#D1D5DB" />,
	},
	{
		text: '출산',
		icon: <Baby size={13} color="#D1D5DB" />,
	},
	{
		text: '부모사망',
		icon: <Flower2 size={13} color="#D1D5DB" />,
	},
	{
		text: '배우자사망',
		icon: <Flower2 size={13} color="#D1D5DB" />,
	},
	{
		text: '부모회갑',
		icon: <CakeSlice size={13} color="#D1D5DB" />,
	},
	{
		text: '기타',
		icon: <Ellipsis size={13} color="#D1D5DB" />,
	},
];

export default function EventSupportApply() {
	const [openCalendar, setOpenCalendar] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [date, setDate] = useState(parsingDate(new Date()));
	const [userInfo, setUserInfo] = useState({});
	const [selectedEventType, setSelectedEventType] = useState('본인결혼');

	useEffect(() => {
		const jsonUser = localStorage.getItem('user');
		const parsedUserInfo = JSON.parse(jsonUser);
		setUserInfo({ ...parsedUserInfo });
	}, []);

	const renderRow = (item, idx) => {
		return columns.map((c, cIdx) => {
			if (c === 'NO') {
				return (
					<li key={cIdx} className="flex-1 text-[12px] text-[#374151]">
						{idx}
					</li>
				);
			}

			if (c === '관리') {
				return (
					<li
						key={cIdx}
						className="flex-[0.5] text-[12px] text-[#374151]"
						onClick={() => setOpenDialog(true)}
					>
						<span
							onClick={() => setOpenDialog(true)}
							className={clsx(
								c.tableDetailButton,
								'text-[#374151] text-[12px] px-[10px] py-[4px] bg-[#F1F5F9] rounded-[4px]'
							)}
						>
							상세
						</span>
					</li>
				);
			}

			return (
				<li
					key={cIdx}
					className={clsx(
						['경조구분', '대상자', '관계', '처리상태'].includes(c)
							? 'flex-[0.5]'
							: 'flex-1',
						'text-[12px] text-[#374151]'
					)}
				>
					<span
						className={clsx(
							c === '경조구분' && getEventTypeClass(item[c]),
							c === '대상자' && 'font-[700]',
							c === '지급금액' && 'text-[#1B3A6B]',
							c === '처리상태' && getStatusClass(item[c])
						)}
					>
						{item[c]}
					</span>
				</li>
			);
		});
	};

	return (
		<div className={c.container}>
			<BreadCrumb />
			<MainTitleWrapper
				mainTitleData={{
					title: '경조비신청',
					desc: '경조사 발생 시 경조비를 신청하고 지급 현황을 관리합니다.',
				}}
			/>

			<div className={c.formContainer}>
				<div className={c.formTitle}>
					<div className={c.formTitleLeft}>
						<HeartHandshake color="#1B3A6B" size={15} />
						<p>경조비신청 입력</p>
					</div>
					<div className={c.formTitleRight}>
						<span>*</span>
						<p>필수 입력 항목</p>
					</div>
				</div>

				<div className={c.formContent}>
					<section className={c.formItem}>
						<p className={c.formItemTitle}>신청자 정보</p>
						<div className={c.formItemData}>
							<div className={c.formApplyInfoItem}>
								<p className={c.formInputLabel}>사원번호</p>
								<div className={c.formInputWrapper}>
									<input
										type="text"
										placeholder="EMP-001"
										readOnly
										className={c.formInput}
										disabled
										value={userInfo?.employeeNo}
									/>
									<Lock
										size={12}
										color="#9CA3AF"
										className="absolute right-[12px] top-1/2 -translate-y-1/2"
									/>
								</div>
							</div>

							<div className={c.formApplyInfoItem}>
								<p className={c.formInputLabel}>성명</p>
								<div className={c.formInputWrapper}>
									<input
										type="text"
										placeholder="EMP-001"
										readOnly
										className={c.formInput}
										disabled
										value={userInfo?.name}
									/>
									<Lock
										size={12}
										color="#9CA3AF"
										className="absolute right-[12px] top-1/2 -translate-y-1/2"
									/>
								</div>
							</div>

							<div className={c.formApplyInfoItem}>
								<p className={c.formInputLabel}>부서</p>
								<div className={c.formInputWrapper}>
									<input
										type="text"
										placeholder="EMP-001"
										readOnly
										className={c.formInput}
										disabled
										value={userInfo?.departmentName}
									/>
									<Lock
										size={12}
										color="#9CA3AF"
										className="absolute right-[12px] top-1/2 -translate-y-1/2"
									/>
								</div>
							</div>
							<div className={c.formApplyInfoItem}>
								<p className={c.formInputLabel}>직급</p>
								<div className={c.formInputWrapper}>
									<input
										type="text"
										placeholder="EMP-001"
										readOnly
										className={c.formInput}
										disabled
										value={userInfo?.position}
									/>
									<Lock
										size={12}
										color="#9CA3AF"
										className="absolute right-[12px] top-1/2 -translate-y-1/2"
									/>
								</div>
							</div>
							<div className={c.formApplyInfoItem}>
								<p className={c.formInputLabel}>신청일</p>
								<div className={c.formInputWrapper}>
									<input
										type="text"
										placeholder="EMP-001"
										readOnly
										className={c.formInput}
										disabled
										value={getToday()}
									/>
									<Lock
										size={12}
										color="#9CA3AF"
										className="absolute right-[12px] top-1/2 -translate-y-1/2"
									/>
								</div>
							</div>
						</div>
					</section>

					<section className={c.formItem}>
						<p className={c.formItemTitle}>
							경조 구분
							<span className="text-[#EF4444]">*</span>
						</p>
						<div className={c.formItemData}>
							<div className={c.eventTypeList}>
								{eventTypeList.map((item, idx) => (
									<>
										<div
											className={clsx(
												c.eventTypeItem,
												item.text === selectedEventType && c.active
											)}
											onClick={() => setSelectedEventType(item.text)}
										>
											{item.icon}
											<span>{item.text}</span>
										</div>
									</>
								))}
							</div>
						</div>

						<span className={c.eventDesc}>
							<Info size={13} color="#2563EB" />
							<span>본인결혼 선택됨 · 지급기준액: 500,000원</span>
						</span>
					</section>

					<section className={c.formItem}>
						<p className={c.formItemTitle}>경조 대상자 정보</p>

						<div className={c.formItemData}>
							<div className={c.formApplyInfoItem}>
								<p className={c.formInputLabel}>
									대상자성명
									<span className="text-[#EF4444]">*</span>
								</p>
								<div className={c.formInputWrapper}>
									<input
										type="text"
										placeholder="EMP-001"
										readOnly
										className={c.formInput2}
									/>
								</div>
							</div>

							<div className={c.formApplyInfoItem}>
								<p className={c.formInputLabel}>
									관계
									<span className="text-[#EF4444]">*</span>
								</p>

								<div className={c.formInputWrapper}>
									<select className={c.formSelect2}>
										<option value="">선택하세요</option>
										<option value="부모">부모</option>
										<option value="배우자">배우자</option>
									</select>
								</div>
							</div>

							<div className={c.formApplyInfoItem}>
								<p className={c.formInputLabel}>
									경조일
									<span className="text-[#EF4444]">*</span>
								</p>
								<div
									className={c.formInputWrapper}
									onClick={() => {
										setOpenCalendar(true);
									}}
								>
									<Popover open={openCalendar} onOpenChange={setOpenCalendar}>
										<PopoverTrigger>
											<div>
												<input
													type="text"
													placeholder="YYYY.MM.DD"
													readOnly
													className={c.formInput2}
												/>
												<CalendarDays
													size={13}
													color="#9CA3AF"
													className={c.formCalendarIcon}
												/>
											</div>
										</PopoverTrigger>
										<PopoverContent>
											<Calendar
												mode="single"
												selected={date}
												onSelect={(date) => {
													setDate(parsingDate(date));
													setOpenCalendar(false);
												}}
											/>
										</PopoverContent>
									</Popover>
								</div>
							</div>

							<div className={c.formApplyInfoItem}>
								<p className={c.formInputLabel}>경조장소</p>
								<div className={c.formInputWrapper}>
									<input
										type="text"
										placeholder="EMP-001"
										readOnly
										className={c.formInput2}
									/>
								</div>
							</div>
						</div>
					</section>

					<section className={c.formItem}>
						<p className={c.formItemTitle}>
							지급 계좌
							<span className="text-[#EF4444]">*</span>
						</p>
						<div className={c.formItemData}>
							<div className={c.formApplyInfoItem}>
								<p className={c.formInputLabel}>은행명</p>
								<div className={c.formInputWrapper}>
									<select className={c.formSelect2}>
										<option value="">선택하세요</option>
										<option value="부모">국민은행</option>
										<option value="배우자">하나은행</option>
									</select>
								</div>
							</div>

							<div className={c.formApplyInfoItem}>
								<p className={c.formInputLabel}>계좌번호</p>
								<div className={c.formInputWrapper}>
									<input
										type="text"
										placeholder="- 없이 숫자만 입력"
										className={c.formInput2}
									/>
								</div>
							</div>

							<div className={c.formApplyInfoItem}>
								<p className={c.formInputLabel}>예금주</p>
								<div className={c.formInputWrapper}>
									<input type="text" className={c.formInput2} />
								</div>
							</div>
						</div>
					</section>

					<section className={c.formItem}>
						<p className={c.formItemTitle}>
							첨부파일
							<span className="text-[#EF4444]">*</span>
						</p>

						<div className={c.formUploadSection}>
							{/* 파일업로드 클릭영역 */}
							<div className={c.formUploadWrapper}>
								<Paperclip size={13} color="#9CA3AF" />
								<div className={c.formUploadText}>
									<span className={c.textTop}>
										청첩장·출생증명서 등 관련 서류를 첨부해 주세요
									</span>
									<span className={c.textBottom}>
										PDF, JPG, PNG · 최대 10MB · 파일 3개까지
									</span>
								</div>
								<div>
									<CButton
										beforeIcon={<Download size={13} color="#374151" />}
										buttonName="파일선택"
										fontSize={13}
										padding="6px 16px"
									/>
								</div>
							</div>

							{/* 업로드된 리스트 */}
							<div className={c.formUploadedFilesWrapper}>
								<div className={c.uploadInfoWrapper}>
									<FileText color="#3B82F6" size={15} />
									<div className={c.formUploadedInfo}>
										<span className={c.formUploadedFileName}>
											청첩장_이영희.pdf
										</span>
										<span className={c.formUploadedFileSpec}>
											238 KB · 업로드 완료
										</span>
									</div>
								</div>
								<div className={c.uploadDeleteButton}>
									<XIcon size={13} color="#EF4444" />
									<span>삭제</span>
								</div>
							</div>

							{/* 비고 영역 */}
							<div className={c.formUploadCommentWrapper}>
								<p className={c.commentTitle}>비고</p>
								<textarea
									name=""
									id=""
									className={c.commentTextArea}
									placeholder="추가 사항을 입력하세요. (선택)"
								></textarea>
							</div>
						</div>
					</section>
					{/* 버튼영역 */}

					<div className={c.uploadButtonWrapper}>
						<CButton
							buttonName="취소"
							beforeIcon={<XIcon size={13} color="#6B7280" />}
						/>
						<CButton
							buttonName="신청하기"
							beforeIcon={<SendHorizontal size={13} />}
							type="type2"
						/>
					</div>
				</div>

				{/* 테이블영역 */}
				<ViewTable
					columns={columns}
					smallColumnIdxList={smallFlexIndex}
					renderRow={renderRow}
					rowList={rowList}
				/>
			</div>

			<WelfareDetailModal open={openDialog} setOpen={setOpenDialog} />
		</div>
	);
}
