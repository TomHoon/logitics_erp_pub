'use client';

import { useEffect, useState } from 'react';
import style from './Nav.module.css';
import { clsx } from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import baseApi from '@/common/api/baseApi';

export default function Nav({
	initial = '',
	fullName = '',
	departmentName = '',
}) {
	const [activeNav, setActiveNav] = useState('');
	const [userInfo, setUserInfo] = useState({});

	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const lastPathaname = pathname.split('/').filter(Boolean).pop();

		const isActivePersonalInfo = ['/certificate/issue', '/event-support/apply', '/info/appointment', '/info/register'].includes(pathname);

		if (isActivePersonalInfo) {
			setActiveNav('인사관리');
		}

		if (pathname.includes('work')) {
			setActiveNav('근태관리');
		}
		if (pathname.includes('salary')) {
			setActiveNav('급여관리');
		}
	}, [pathname]);

	useEffect(() => {
		const user = localStorage.getItem('user');
		const jsonUserInfo = JSON.parse(user);
		setUserInfo({ ...jsonUserInfo });
	}, []);

	return (
		<div className={`${style.container}`}>
			<div className={style.left}>
				<div
					className={clsx(style.left1, 'cursor-pointer')}
					onClick={() => router.push('/info/register')}
				>
					<img src="/briefcase.png" />
					<span>인사관리시스템</span>
				</div>

				<div className={style.left2}>
					<ul className={clsx(style.navMenu, 'cursor-pointer')}>
						<li
							className={clsx(activeNav === '인사관리' ? style.active : '')}
							onClick={() => router.push('/info/register')}
						>
							인사관리
						</li>
						<li
							className={clsx(activeNav === '근태관리' ? style.active : '')}
							onClick={() => router.push('/work/attendance')}
						>
							근태관리
						</li>
						<li
							className={clsx(activeNav === '급여관리' ? style.active : '')}
							onClick={() => router.push('/salary/basic')}
						>
							급여관리
						</li>
						{/* 						<li
							className={clsx(activeNav === '일용직관리' ? style.active : '')}
						>
							일용직관리
						</li> */}
					</ul>
				</div>
			</div>

			<div className={style.right}>
				{!initial && (
					<>
						<Bell size={18} color="#93C5FD" />
						<div className={`${style.nameWrapper} !ml-[16.5px]`}>
							<span className={style.circleInitial}>
								{(userInfo?.name || '').slice(0, 1)}
							</span>
							<span className={style.fullName}>{userInfo?.name}</span>
						</div>
						<div className={style.departWrapper}>
							<span>{departmentName}</span>
							<LogOut
								size={18}
								className="cursor-pointer"
								onClick={async () => {
									// 1. 로컬스토리지, 쿠키 로그인 정보 제거
									localStorage.clear();

									await baseApi.post('/api/v1/employees/logout');

									// 2. 로그인 으로 이동
									router.replace('/');
									toast('로그아웃 되었습니다. 로그인 페이지로 이동합니다.', {
										position: 'top-center',
									});
								}}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
