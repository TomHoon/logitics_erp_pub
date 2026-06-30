'use client';

import s from './Aside.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { Banknote, Calendar, Clock, FileText, HeartHandshake, User } from 'lucide-react';

const infoMenuList = [
	{
		titleInfo: {
			iconPath: <User color="#60A5FA" size={13} />,
			title: '인사정보',
		},
		subMenus: [
			{ title: '인사정보등록', path: '/info/register' },
			{ title: '사원명수/인사기록카드', path: '/info/card' },
			{ title: '인사발령등록', path: '/info/appointment' },
		],
	},
	{
		titleInfo: {
			iconPath: <HeartHandshake color="#60A5FA" size={13} />,
			title: '경조비관리',
		},
		subMenus: [{ title: '경조비신청', path: '/event-support/apply' }],
	},
	{
		titleInfo: {
			iconPath: <FileText color="#60A5FA" size={13} />,
			title: '증명서관리',
		},
		subMenus: [{ title: '증명서발급', path: '/certificate/issue' }],
	},
];

const workMenuList = [
	{
		titleInfo: {
			iconPath: <Clock color="#60A5FA" size={13} />,
			title: '근태관리',
		},
		subMenus: [
			{ title: '일일근태등록', path: '/work/attendance' },
			{ title: '월근태현황', path: '/work/monthly' },
		],
	},
	{
		titleInfo: {
			iconPath: <Calendar color="#60A5FA" size={13} />,
			title: '휴가관리',
		},
		subMenus: [
			{ title: '휴가일수설정', path: '#' },
			{ title: '휴가일수계산', path: '#' },
			{ title: '휴가일수신청', path: '#' },
			{ title: '휴가사용현황', path: '#' },
		],
	},
];

const salaryMenuList = [
	{
		titleInfo: {
			iconPath: <Banknote size={13} color="#60A5FA" />,
			title: '급여관리',
		},
		subMenus: [
			{ title: '급여기본정보관리', path: '/salary/basic' },
			{ title: '급여지급', path: '/salary/payroll' },
			{ title: '기본수당외수당관리', path: '#' },
			{ title: '급여계산', path: '/salary/calculation' },
			{ title: '급여조회', path: '/salary/trend' },
		],
	},
];

/* 급여기본정보관리 급여지급 기본수당외수당관리 급여계산 급여조회 */

export default function Aside({ menus = infoMenuList }) {
	const router = useRouter();
	const pathname = usePathname();
	const lastPathname = pathname.split('/').filter(Boolean).pop();

	if (pathname.includes('work')) {
		menus = workMenuList;
	}
	if (pathname.includes('salary')) {
		menus = salaryMenuList;
	}

	return (
		<div className={s.container}>
			{menus.map((item, index) => (
				<div className={s.menuItem} key={index}>
					<p className={clsx(s.menuTitle, 'flex items-center')}>
						{item?.titleInfo?.iconPath}
						{item.titleInfo.title}
					</p>

					<ul className={s.menuSub}>
						{item.subMenus.map((subItem, subIdx) => (
							<li
								key={subIdx}
								className={clsx(
									pathname === subItem.path ? s.active : undefined,
									'cursor-pointer'
								)}
								onClick={() => router.push(subItem.path || '/')}
							>
								{subItem.title}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}
