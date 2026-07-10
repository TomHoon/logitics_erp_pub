'use client';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Info, Landmark, Save, UserPlus, XIcon } from 'lucide-react';
import s from '@/component/common/MainTitle.module.css';

import CInput from '@/component/common/element/CInput';
import CSelect from '@/component/common/element/CSelect';
import PostCodeButton from '@/component/common/PostCodeButton';
import CButton from '../common/element/CButton';
import LoadingSpinner from '@/common/LoadingSpinner';
import clsx from 'clsx';
import { getToday } from '@/common/utils/dateUtils';

export default function InfoRegisterModal({
	open,
	setOpen,
	selectedInfo,
	setSelectedInfo,
	registerInfo,
	setRegisterInfo,
	isEdit = false,
	isLoading = false,
	registerEmployee,
	departmentOptions = [],
	positionOptions = [],
}) {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				showCloseButton={false}
				className={'w-[600px] max-w-none p-0'}
			>
				<DialogHeader className={clsx('bg-[#1B3A6B]', s.modalHeader)}>
					<DialogTitle>
						<div className={'flex items-center justify-between'}>
							<div className={'flex items-center gap-[10px]'}>
								<UserPlus color="#60A5FA" />
								<span className={'text-[16px] font-bold text-[#fff]'}>
									인사정보등록
								</span>
							</div>

							<div
								className={clsx('bg-[#2D5F9E]', s.closeBtn, 'cursor-pointer')}
								onClick={() => setOpen(false)}
							>
								<XIcon size={16} color="#fff" />
							</div>
						</div>
					</DialogTitle>
				</DialogHeader>
				<div className={s.modalContent}>
					<div className={s.contentItem}>
						<p className={s.title}>기본정보</p>
						<section className={s.formSection}>
							<div className={s.formItem}>
								<label htmlFor="">
									사원번호
									<span className="text-[#EF4444]">*</span>
								</label>
								<CInput
									width={268}
									readOnly
									placeholder="사원등록시 자동부여"
									disabled
									value={selectedInfo?.employeeNo}
								/>
							</div>

							<div className={s.formItem}>
								<label htmlFor="">
									성명
									<span className="text-[#EF4444]">*</span>
								</label>
								<CInput
									width={268}
									value={
										selectedInfo?.name ? selectedInfo?.name : registerInfo?.name
									}
									onChange={(e) =>
										setRegisterInfo((prev) => ({
											...prev,
											name: e.target.value,
										}))
									}
								/>
							</div>

							<div className={s.formItem}>
								<label htmlFor="">
									부서
									<span className="text-[#EF4444]">*</span>
								</label>
								<CSelect
									width={268}
									optionList={departmentOptions}
									value={
										selectedInfo?.departmentName
											? selectedInfo?.departmentName
											: registerInfo?.departmentName
									}
									onChange={(e) =>
										setRegisterInfo((prev) => ({
											...prev,
											departmentName: e.target.value,
										}))
									}
								/>
							</div>

							<div className={s.formItem}>
								<label htmlFor="">
									직급
									<span className="text-[#EF4444]">*</span>
								</label>
								<CSelect
									optionList={positionOptions}
									width={268}
									value={
										selectedInfo?.positionName
											? selectedInfo?.positionName
											: registerInfo?.positionName
									}
									onChange={(e) =>
										setRegisterInfo((prev) => ({
											...prev,
											positionName: e.target.value,
										}))
									}
								/>
							</div>

							<div className={s.formItem}>
								<label htmlFor="">
									입사일
									<span className="text-[#EF4444]">*</span>
								</label>
								<CInput
									width={268}
									readOnly
									disabled
									value={getToday()}
									onChange={(e) =>
										setRegisterInfo((prev) => ({
											...prev,
											hireDate: e.target.value,
										}))
									}
								/>
							</div>

							<div className={s.formItem}>
								<label htmlFor="">
									재직상태
									<span className="text-[#EF4444]">*</span>
								</label>
								<CInput
									width={268}
									value={selectedInfo?.status || '재직중'}
									disabled
									readOnly
								/>
							</div>
						</section>
					</div>

					{/*연락처 영역*/}
					<div className={s.contentItem}>
						<p className={s.title}>연락처</p>
						<section className={s.formSection}>
							<div className={s.formItem}>
								<label htmlFor="">
									휴대폰
									<span className="text-[#EF4444]">*</span>
								</label>
								<CInput
									width={268}
									value={
										selectedInfo?.phone
											? selectedInfo?.phone
											: registerInfo?.phone
									}
									onChange={(e) =>
										setRegisterInfo((prev) => ({
											...prev,
											phone: e.target.value,
										}))
									}
								/>
							</div>

							<div className={s.formItem}>
								<label htmlFor="">이메일</label>
								<CInput
									width={268}
									type="email"
									value={
										selectedInfo?.email
											? selectedInfo?.email
											: registerInfo?.email
									}
									onChange={(e) =>
										setRegisterInfo((prev) => ({
											...prev,
											email: e.target.value,
										}))
									}
								/>
							</div>
						</section>
					</div>

					{/*주소영역*/}
					<div className={s.contentItem}>
						<p className={s.title}>주소</p>
						<section className={s.formSection}>
							<div className={clsx(s.formItem, s.postItem)}>
								<label htmlFor="">우편번호</label>
								<div className="flex gap-[8px]">
									<CInput
										width={160}
										readOnly
										disabled
										value={
											selectedInfo?.postCode
												? selectedInfo?.postCode
												: registerInfo?.postCode
										}
									/>
									<PostCodeButton
										onCompletePostData={(data) => {
											const roadAddress = data?.roadAddress;
											const zoneCode = data?.zonecode;
											if (isEdit) {
												setSelectedInfo((prev) => ({
													...prev,
													postCode: zoneCode,
													address: roadAddress,
												}));
											} else {
												setRegisterInfo((prev) => ({
													...prev,
													postCode: zoneCode,
													address: roadAddress,
												}));
											}
										}}
									/>
								</div>
							</div>

							<div className={clsx(s.formItem, s.postItem)}>
								<label htmlFor="">도로명주소</label>
								<CInput
									width={568}
									readOnly
									disabled
									value={isEdit ? selectedInfo?.address : registerInfo?.address}
								/>
							</div>

							<div className={clsx(s.formItem, s.postItem)}>
								<label htmlFor="">상세주소</label>
								<CInput
									width={568}
									value={
										isEdit
											? selectedInfo?.detailedAddress
											: registerInfo?.detailedAddress
									}
									onChange={(e) => {
										if (isEdit) {
											setSelectedInfo((prev) => ({
												...prev,
												detailedAddress: e.target.value,
											}));
										} else {
											setRegisterInfo((prev) => ({
												...prev,
												detailedAddress: e.target.value,
											}));
										}
									}}
								/>
							</div>
						</section>
					</div>

					{/* 계좌 */}
					<div className={s.contentItem}>
						<p className={`${s.title} flex gap-[8px]`}>
							급여계좌
							<div className="flex items-center text-[11px] leading-[13.2px] text-[#3B82F6] gap-[4px] px-[10px] py-[4.5px] bg-[#EFF6FF] rounded-[6px]">
								<span className="flex justify-center items-center">
									<Info size={11} />
								</span>
								<span>급여 입금용 계좌를 등록해 주세요</span>
							</div>
						</p>
						<section
							className={clsx(s.formSection, s.emergency, 'flex flex-wrap')}
						>
							<div className={clsx(s.formItem)}>
								<label htmlFor="">
									은행
									<span className="text-[#EF4444]">*</span>
								</label>
								<CSelect
									optionList={[
										'국민은행',
										'신한은행',
										'하나은행',
										'우리은행',
										'NH농협은행',
										'IBK기업은행',
										'SC제일은행',
										'한국씨티은행',
										'수협은행',
										'카카오뱅크',
										'케이뱅크',
										'토스뱅크',
										'부산은행',
										'대구은행',
										'경남은행',
										'광주은행',
										'전북은행',
										'제주은행',
									]}
									width={268}
									value={registerInfo?.bankName || ''}
									onChange={(e) =>
										setRegisterInfo((prev) => ({
											...prev,
											bankName: e.target.value,
										}))
									}
									placeholderRender={() => (
										<div>
											<span>은행을 선택하세요</span>
										</div>
									)}
								/>
							</div>

							<div className={clsx(s.formItem)}>
								<label htmlFor="">
									예금주
									<span className="text-[#EF4444]">*</span>
								</label>
								<CInput
									width={268}
									disabled
									readOnly
									placeholder="성명과 동일하게 자동입력"
								/>
							</div>

							<div className={clsx(s.formItem)}>
								<label htmlFor="">
									계좌번호
									<span className="text-[#EF4444]">*</span>
								</label>
								<CInput
									width={376}
									placeholder="- 없이 숫자만 입력"
									value={registerInfo?.accountNumber}
									onChange={(e) =>
										setRegisterInfo((prev) => ({
											...prev,
											accountNumber: e.target.value.replace(/\D/, ''),
										}))
									}
								/>
								<p className="bg-[#F0F9FF] border border-[#BAE6FD] text-[#0369A1] text-[12px] rounded-[8px] flex w-[568px] items-center px-[12px] py-[10px] gap-[4px] !mt-[10px]">
									<Info size={11}></Info>
									등록된 계좌로 매월 급여가 입금됩니다. 계좌번호를 정확히 입력해
									주세요.
								</p>
							</div>
						</section>
					</div>

					{/*비상연락처*/}
					<div className={s.contentItem}>
						<p className={s.title}>비상연락처</p>
						<section className={clsx(s.formSection, s.emergency)}>
							<div className={clsx(s.formItem)}>
								<label htmlFor="">성명</label>
								<CInput width={174} />
							</div>

							<div className={clsx(s.formItem)}>
								<label htmlFor="">관계</label>
								<CSelect width={140} />
							</div>

							<div className={clsx(s.formItem)}>
								<label htmlFor="">연락처</label>
								<CInput width={174} />
							</div>
						</section>
					</div>
				</div>

				<DialogFooter>
					<div className={s.footerContainer}>
						<span className={s.footerGuide}>
							<span className="text-[#EF4444] mr-[5px]">*</span>
							필수 입력 항목입니다.
						</span>

						<div className={s.footerButtons}>
							<CButton
								buttonName="취소"
								beforeIcon={<XIcon size={14} />}
								onClick={() => setOpen(false)}
							/>
							<CButton
								type="type2"
								buttonName="저장"
								beforeIcon={<Save size={14} />}
								onClick={() => {
									registerEmployee();
								}}
							/>
						</div>
					</div>
				</DialogFooter>
				<LoadingSpinner isLoading={isLoading} />
			</DialogContent>
		</Dialog>
	);
}
