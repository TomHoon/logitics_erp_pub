"use client";

import CButton from "./element/CButton";
import s from "./MainTitle.module.css";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useState} from "react";
import {Save, UserPlus, XIcon} from "lucide-react";
import {clsx} from "clsx";
import CInput from "@/component/common/element/CInput";
import CSelect from "@/component/common/element/CSelect";
import PostCodeButton from "@/component/common/PostCodeButton";

const intialTitleData = {
	title: "인사정보등록",
	desc: "직원의 인사정보를 등록하고 관리합니다.",
};

// export default function MainTitleWrapper({mainTitleData, buttonRender}) {
export default function MainTitleWrapper({mainTitleData = {...intialTitleData}}) {
	
	const [open, setOpen] = useState(false);
	
	const buttonRender = () => {
		return (
			<>
				<CButton path="/download.png" type="type1" buttonName="PDF 다운로드"/>
				<CButton path="/plus.png" type="type2" buttonName="신규등록" onClick={() => setOpen(true)}/>
			</>
		);
	};
	return (
		<div className={s.container}>
			<div className={s.titleArea}>
				<span className={s.mainTitle}>{mainTitleData.title}</span>
				<span className={s.desc}>{mainTitleData.desc}</span>
			</div>
			
			<div className={s.buttonArea}>{buttonRender()}</div>
			
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent showCloseButton={false} className={"w-[600px] max-w-none"}>
					<DialogHeader
						className={clsx('bg-[#1B3A6B]', s.modalHeader)}
					>
						<DialogTitle>
							<div className={"flex items-center justify-between"}>
								<div className={"flex items-center gap-[10px]"}>
									<UserPlus color="#60A5FA"/>
									<span className={"text-[16px] font-bold text-[#fff]"}>인사정보등록</span>
								</div>
								
								<div className={clsx("bg-[#2D5F9E]", s.closeBtn, 'cursor-pointer')} onClick={() => setOpen(false)}>
									<XIcon size={16} color="#fff"/>
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
									<CInput width={268}/>
								</div>
								
								<div className={s.formItem}>
									<label htmlFor="">
										성명
										<span className="text-[#EF4444]">*</span>
									</label>
									<CInput width={268}/>
								
								</div>
								
								<div className={s.formItem}>
									<label htmlFor="">
										부서
										<span className="text-[#EF4444]">*</span>
									</label>
									<CSelect width={268}/>
								</div>
								
								<div className={s.formItem}>
									<label htmlFor="">
										직급
										<span className="text-[#EF4444]">*</span>
									</label>
									<CInput width={268}/>
								</div>
								
								<div className={s.formItem}>
									<label htmlFor="">
										입사일
										<span className="text-[#EF4444]">*</span>
									</label>
									<CInput width={268}/>
								</div>
								
								<div className={s.formItem}>
									<label htmlFor="">
										재직상태
										<span className="text-[#EF4444]">*</span>
									</label>
									<CInput width={268}/>
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
									<CInput width={268}/>
								</div>
								
								<div className={s.formItem}>
									<label htmlFor="">
										이메일
									</label>
									<CInput width={268}/>
								
								</div>
							</section>
						</div>
						
						{/*주소영역*/}
						<div className={s.contentItem}>
							<p className={s.title}>주소</p>
							<section className={s.formSection}>
								<div className={clsx(s.formItem, s.postItem)}>
									<label htmlFor="">
										우편번호
									</label>
									<div className="flex gap-[8px]">
										<CInput width={160} readOnly={true}/>
										<PostCodeButton
											onCompletePostData={(data) => {
												const roadAddress = data?.roadAddress;
												const zonecode = data?.zonecode;
											}}
										/>
									</div>
								</div>
								
								<div className={clsx(s.formItem, s.postItem)}>
									<label htmlFor="">
										도로명주소
									</label>
									<CInput width={568} readOnly={true}/>
								</div>
								
								<div className={clsx(s.formItem, s.postItem)}>
									<label htmlFor="">
										상세주소
									</label>
									<CInput width={568}/>
								</div>
							
							</section>
						</div>
						
						{/*비상연락처*/}
						<div className={s.contentItem}>
							<p className={s.title}>비상연락처</p>
							<section className={clsx(s.formSection, s.emergency)}>
								<div className={clsx(s.formItem)}>
									<label htmlFor="">
										성명
									</label>
									<CInput width={174}/>
								</div>
								
								<div className={clsx(s.formItem)}>
									<label htmlFor="">
										관계
									</label>
									<CSelect width={174}/>
								</div>
								
								<div className={clsx(s.formItem)}>
									<label htmlFor="">
										연락처
									</label>
									<CInput width={174}/>
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
									beforeIcon={<XIcon size={14}/>}
									onClick={() => setOpen(false)}
								/>
								<CButton type="type2" buttonName="저장" beforeIcon={<Save size={14}/>}/>
							</div>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
