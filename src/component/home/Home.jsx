'use client';

import c from '@/component/home/Home.module.css';
import Nav from '@/component/common/Nav';
import {
	BanknoteArrowUp,
	Briefcase,
	Building2,
	CircleCheck,
	Clock,
	Eye,
	EyeOff,
	IdCard,
	Info,
	Lock,
	LogIn,
	Mail,
	ShieldCheck,
	UserPen,
	Users,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import CInputCustom from '@/component/common/element/CInputCustom';
import { useEffect, useState } from 'react';
import baseApi from '@/common/api/baseApi';
import { useRouter } from 'next/navigation';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { toast, Toaster } from 'sonner';
import KakoAddInfoModal from '../modal/KakaoAddInfoModal';
const POSITION_LIST = [
	'사원',
	'주임',
	'대리',
	'선임',
	'과장',
	'차장',
	'부장',
	'실장',
	'센터장',
];

const DEPARTMENT_LIST = [
	'전체',
	'경영지원본부',
	'인사팀',
	'재무회계팀',
	'총무팀',
	'물류운영본부',
	'배차팀',
	'배송운영팀',
	'배송관리팀',
	'관제팀',
	'긴급배송팀',
	'냉장/냉동물류본부',
	'냉장물류팀',
	'냉동물류팀',
	'신선식품배송팀',
	'새벽배송팀',
	'차량관리본부',
	'차량정비팀',
	'차량관제팀',
	'유류관리팀',
	'기사관리팀',
	'창고운영본부',
	'입고팀',
	'출고팀',
	'재고관리팀',
	'냉장창고팀',
	'냉동창고팀',
	'영업본부',
	'물류영업팀',
	'거래처관리팀',
	'고객지원팀(CS)',
	'IT본부',
	'ERP개발팀',
	'인프라운영팀',
	'보안관리팀',
];

export default function Home() {
	const [loginUserInfo, setLoginUserInfo] = useState({});
	const [keepLogin, setKeepLogin] = useState(false);
	const [isRenderLogin, setIsRenderLogin] = useState(true);
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [bankName, setBankName] = useState('');
	const [departmentName, setDepartmentName] = useState('');
	const [joinInfo, setJoinInfo] = useState({});
	const [isShowLoginPassword, setIsShowLoginPassword] = useState(false);

	const router = useRouter();

	const joinErp = async () => {
		try {
			const res = await baseApi.post('/api/v1/employees/joinErp', {
				...joinInfo,
			});

			setIsRenderLogin(true);
			toast('회원가입이 정상처리 되었습니다.', { position: 'top-center' });
			router.replace('/');
		} catch (e) {
			console.error(e);
			toast.warning(e?.response?.data?.message, { position: 'top-center' });
		} finally {
		}
	};

	const goLogin = async (params) => {
		try {
			const res = await baseApi.post('/api/v1/employees/login', {
				...(params || loginUserInfo),
			});

			if (res.data.data.accessToken) {
				if (keepLogin) {
					localStorage.setItem('keepLogin', 'true');
					localStorage.setItem('loginInfo', JSON.stringify(loginUserInfo));
				}

				localStorage.setItem('accessToken', res.data.data.accessToken);
				localStorage.setItem('user', JSON.stringify(res.data.data));
				router.replace('/info/register');
				return;
			}
		} catch (e) {
			toast(e.response.data.message || '네트워크 통신에 실패하였습니다.', {
				position: 'top-center',
			});
		}
	};

	useEffect(() => {
		const keepLogin = localStorage.getItem('keepLogin');
		const loginInfo = localStorage.getItem('loginInfo');
		if (keepLogin === 'true' && loginInfo) {
			const savedLoginInfo = JSON.parse(loginInfo);
			console.log(savedLoginInfo);

			goLogin(savedLoginInfo);
		}
	}, []);

	// kakao login load
	useEffect(() => {
		const initKakao = () => {
			if (window.Kakao && !window.Kakao.isInitialized()) {
				window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
			}
		};

		if (window.Kakao) {
			initKakao();
		} else {
			const script = document.createElement('script');
			script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
			script.async = true;
			script.onload = initKakao;
			document.head.appendChild(script);
		}
	}, []);

	const renderJoin = ({
		setIsRenderLogin,
		bankName,
		setBankName,
		departmentName,
		setDepartmentName,
		joinErp,
		joinInfo,
		setJoinInfo,
	}) => {
		return (
			<div className={`${c.joinArea} ${c.stagger}`}>
				<div className={c.joinWrapper}>
					<section className={c.titleSection}>
						<p>회원가입</p>
						<span>계정을 만들어 인사관리를 시작하세요</span>
					</section>

					<section className={c.joinFormSection}>
						<CInputCustom
							beforeIcon={<IdCard color="#9CA3AF" />}
							labelName="사번"
							placeholder="EMP-001"
							value={joinInfo?.employeeNo}
							onChange={(e) =>
								setJoinInfo((prev) => ({
									...prev,
									employeeNo: e.target.value,
								}))
							}
						/>

						<div className="flex flex-col gap-[2px]">
							<label htmlFor="">직급</label>
							<Select
								value={joinInfo?.positionName}
								onValueChange={(v) => {
									setJoinInfo((prev) => ({ ...prev, positionName: v }));
								}}
							>
								<SelectTrigger className="!h-[48px] !w-[273px]">
									<Briefcase
										size={24}
										color="#9CA3AF"
										className="!h-[24px] !w-[24px]"
									/>
									<SelectValue placeholder="직급선택" className="text-left" />
								</SelectTrigger>

								<SelectContent>
									{POSITION_LIST.map((bank) => (
										<SelectItem key={bank} value={bank}>
											{bank}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<CInputCustom
							inputType={isShowPassword ? 'text' : 'password'}
							beforeIcon={<Lock color="#9CA3AF" />}
							labelName="비밀번호"
							placeholder="비밀번호 입력"
							value={joinInfo?.password}
							onChange={(e) => {
								setJoinInfo((prev) => ({
									...prev,
									password: e.target.value,
								}));
							}}
							afterIcon={
								isShowPassword ? (
									<Eye
										color="#9CA3AF"
										className="cursor-pointer"
										onClick={() => {
											setIsShowPassword(false);
										}}
									/>
								) : (
									<EyeOff
										color="#9CA3AF"
										className="cursor-pointer"
										onClick={() => {
											setIsShowPassword(true);
										}}
									/>
								)
							}
						/>

						<CInputCustom
							inputType={isShowPassword ? 'text' : 'password'}
							beforeIcon={<Lock color="#9CA3AF" />}
							labelName="비밀번호 확인"
							placeholder="비밀번호 재입력"
							value={joinInfo?.checkPassword}
							onChange={(e) => {
								setJoinInfo((prev) => ({
									...prev,
									checkPassword: e.target.value,
								}));
							}}
							afterIcon={
								isShowPassword ? (
									<Eye
										color="#9CA3AF"
										className="cursor-pointer"
										onClick={() => {
											setIsShowPassword(false);
										}}
									/>
								) : (
									<EyeOff
										color="#9CA3AF"
										className="cursor-pointer"
										onClick={() => {
											setIsShowPassword(true);
										}}
									/>
								)
							}
						/>
					</section>

					<section className={c.guideAndConsent}>
						<div className={c.guideContentWrapper}>
							<Info size={11} color="#9CA3AF" />
							<span className={c.guideContent}>
								영문, 숫자, 특수문자 포함 8자리 이상
							</span>
						</div>

						<div className={c.consentWrapper}>
							<div className={c.checkConsent}>
								<Checkbox checked={true} />
								<span>이용약관 및 개인정보처리방침에 동의합니다</span>
							</div>
							<span className={`cursor-pointer ${c.consentClickButton}`}>
								내용 보기
							</span>
						</div>
					</section>

					<section className={c.joinButtonSection}>
						<div className={`cursor-pointer ${c.joinButton}`} onClick={joinErp}>
							<UserPen size={18} color="#FFFFFF" />
							<span>회원가입</span>
						</div>

						<div className={c.loginButton}>
							<p onClick={() => setIsRenderLogin(true)}>
								이미 계정이 있으신가요?
								<span className="cursor-pointer">로그인하기</span>
							</p>
						</div>
					</section>
				</div>
			</div>
		);
	};

	const renderLogin = () => {
		return (
			<div className={`${c.loginArea} ${c.stagger}`}>
				<section className={c.titleSection}>
					<p>로그인</p>
					<span>계정에 로그인하여 업무를 시작하세요</span>
				</section>

				<section className={c.inputSection}>
					<div className={c.inputItem}>
						<Mail className={c.mail} color="#9CA3AF" />
						<Mail className={c.mail} color="#9CA3AF" />
						<label htmlFor="email">이메일</label>
						<input
							type="text"
							placeholder="이메일 주소를 입력하세요"
							onChange={(e) =>
								setLoginUserInfo((prev) => ({ ...prev, email: e.target.value }))
							}
						/>
					</div>

					<div className={c.inputItem}>
						<Lock className={c.mail} color="#9CA3AF" />
						<Lock className={c.mail} color="#9CA3AF" />
						<label htmlFor="email">비밀번호</label>
						<input
							type={isShowLoginPassword ? 'text' : 'password'}
							placeholder="비밀번호를 입력하세요"
							onChange={(e) =>
								setLoginUserInfo((prev) => ({
									...prev,
									password: e.target.value,
								}))
							}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									goLogin();
								}
							}}
						/>
						{isShowLoginPassword ? (
							<Eye
								className={c.eye}
								color="#9CA3AF"
								onClick={() => setIsShowLoginPassword(false)}
							/>
						) : (
							<EyeOff
								className={c.eye}
								color="#9CA3AF"
								onClick={() => setIsShowLoginPassword(true)}
							/>
						)}
					</div>
				</section>

				<section className={c.loginOptionSection}>
					<div className={c.loginOptionItem}>
						<Checkbox onClick={() => setKeepLogin(!keepLogin)} />
						<span className={c.keepLoginTitle}>로그인 상태 유지</span>
					</div>

					<div className={c.loginOptionItem}>
						<span className={c.findPw}>비밀번호 찾기</span>
					</div>
				</section>

				<section className={c.loginButtonSection}>
					<div className={c.loginButtonItem} onClick={() => goLogin()}>
						<LogIn />
						<span>로그인</span>
					</div>

					<div className={c.loginButtonOr}>
						<span>또는</span>
					</div>

					<div
						onClick={() => {
							const handleKakaoLogin = () => {
								if (!window.Kakao?.isInitialized()) {
									window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
								}

								window.Kakao.Auth.authorize({
									redirectUri:
										process.env.NODE_ENV === 'production'
											? 'http://daewoo.digital:9800/oauth/kakao'
											: 'http://localhost:3000/oauth/kakao',
								});
							};

							handleKakaoLogin();
						}}
					>
						<img src="kakaologin.png" alt="" className="w-[400px] h-[60px]" />
					</div>
				</section>

				<section className={c.joinSection}>
					<div className={c.joinItem}>
						<span className={c.noAccount}>계정이 없으신가요?</span>
						<span
							className={`cursor-pointer ${c.applyJoin}`}
							onClick={() => setIsRenderLogin(false)}
						>
							회원가입 신청
						</span>
					</div>
				</section>
			</div>
		);
	};

	return (
		<div className={c.container}>
			<Nav initial />

			<div className={c.loginContentWrapper}>
				<div className={`${c.guideArea} ${c.stagger}`}>
					<p className={c.guideTitle}>
						<ShieldCheck />
						<span>Enterprise HR Solution</span>
					</p>

					<p className={c.guideCenterTitle}>
						스마트한 인사관리의 <br />
						<span className={c.centerTitleHL}>새로운 기준</span>
					</p>

					<p className={c.guideDesc}>
						직원 채용부터 급여, 근태까지 <br />
						하나의 플랫폼으로 관리하세요
					</p>

					<ul className={c.spec}>
						<li>
							<span className={c.specNumber}>2,400+</span>
							<span className={c.specDesc}>기업도입</span>
						</li>
						<li>
							<span className={c.specNumber}>98%</span>
							<span className={c.specDesc}>고객 만족도</span>
						</li>
						<li>
							<span className={c.specNumber}>15년</span>
							<span className={c.specDesc}>서비스 운영</span>
						</li>
					</ul>

					<ul className={c.functionList}>
						<li>
							<span className={c.functionIcon}>
								<Users color="#60A5FA" />
							</span>

							<div>
								<p className={c.functionTitle}>인사관리</p>
								<span className={c.functionDesc}>
									조직도, 인사발령, 직원 정보 통합 관리
								</span>
							</div>
						</li>

						<li>
							<span className={c.functionIcon}>
								<BanknoteArrowUp color="#60A5FA" />
							</span>

							<div>
								<p className={c.functionTitle}>급여관리</p>
								<span className={c.functionDesc}>
									자동 급여 계산, 세금 신고, 명세서 발송
								</span>
							</div>
						</li>

						<li>
							<span className={c.functionIcon}>
								<Clock color="#60A5FA" />
							</span>

							<div>
								<p className={c.functionTitle}>근태관리</p>
								<span className={c.functionDesc}>
									출퇴근, 휴가, 초과근무 실시간 모니터링
								</span>
							</div>
						</li>
					</ul>
				</div>

				{isRenderLogin
					? renderLogin()
					: renderJoin({
							setIsRenderLogin,
							bankName,
							setBankName,
							departmentName,
							setDepartmentName,
							joinErp,
							joinInfo,
							setJoinInfo,
						})}
			</div>
		</div>
	);
}
