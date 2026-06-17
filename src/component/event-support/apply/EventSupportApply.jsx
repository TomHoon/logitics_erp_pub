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
} from 'lucide-react';
import { clsx } from 'clsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';


const parsingDate = (targetDate) => {
	const newDate = new Date(targetDate);

	const year = newDate.getFullYear();
	const month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
	const date = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();


	const parsedDate = `${year}-${month}-${date}`;
	return parsedDate;
};


export default function EventSupportApply() {

	const [openCalendar, setOpenCalendar] = useState(false);
	const [date, setDate] = useState(parsingDate(new Date()));

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
									<input type="text" placeholder="EMP-001" readOnly className={c.formInput} />
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
									<input type="text" placeholder="EMP-001" readOnly className={c.formInput} />
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
									<input type="text" placeholder="EMP-001" readOnly className={c.formInput} />
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
									<input type="text" placeholder="EMP-001" readOnly className={c.formInput} />
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
									<input type="text" placeholder="EMP-001" readOnly className={c.formInput} />
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
								<div className={clsx(c.eventTypeItem, c.active)}>
									<Heart size={13} color="#D1D5DB" />
									<span>본인결혼</span>
								</div>

								<div className={c.eventTypeItem}>
									<Heart size={13} color="#D1D5DB" />
									<span>자녀결혼</span>
								</div>

								<div className={c.eventTypeItem}>
									<Baby size={13} color="#D1D5DB" />
									<span>출산</span>
								</div>

								<div className={c.eventTypeItem}>
									<Flower2 size={13} color="#D1D5DB" />
									<span>부모사망</span>
								</div>

								<div className={c.eventTypeItem}>
									<Flower2 size={13} color="#D1D5DB" />
									<span>배우자사망</span>
								</div>

								<div className={c.eventTypeItem}>
									<CakeSlice size={13} color="#D1D5DB" />
									<span>부모회갑</span>
								</div>

								<div className={c.eventTypeItem}>
									<Ellipsis size={13} color="#D1D5DB" />
									<span>기타</span>
								</div>
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
									<input type="text" placeholder="EMP-001" readOnly className={c.formInput2} />
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
								<div className={c.formInputWrapper} onClick={() => {
									console.log('??');
									setOpenCalendar(true);
								}}>
									<Popover open={openCalendar} onOpenChange={setOpenCalendar}>
										<PopoverTrigger>
											<div>
												<input
													type="text"
													placeholder="YYYY.MM.DD"
													readOnly
													className={c.formInput2}
												/>
												<CalendarDays size={13} color="#9CA3AF" className={c.formCalendarIcon} />
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
								<p className={c.formInputLabel}>
									경조장소
								</p>
								<div className={c.formInputWrapper}>
									<input type="text" placeholder="EMP-001" readOnly className={c.formInput2} />
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
								<p className={c.formInputLabel}>
									은행명
								</p>
								<div className={c.formInputWrapper}>
									<select className={c.formSelect2}>
										<option value="">선택하세요</option>
										<option value="부모">국민은행</option>
										<option value="배우자">하나은행</option>
									</select>
								</div>
							</div>

							<div className={c.formApplyInfoItem}>
								<p className={c.formInputLabel}>
									계좌번호
								</p>
								<div className={c.formInputWrapper}>
									<input type="text" placeholder="- 없이 숫자만 입력" className={c.formInput2} />
								</div>
							</div>

							<div className={c.formApplyInfoItem}>
								<p className={c.formInputLabel}>
									예금주
								</p>
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
						<div className={c.formItemData}>
							<div className={c.formUploadWrapper}>
								
							</div>

						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
