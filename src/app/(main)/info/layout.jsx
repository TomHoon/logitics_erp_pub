import Aside from "@/component/common/Aside";
import Nav from "@/component/common/Nav";

import s from './layout.module.css';

export default function layout({children}) {


    const dummy = [
        {
            titleInfo: {
                iconPath: '/aside/user.png',
                title: '인사정보'
            },
            subMenus: [
                { title: '인사정보등록', path: '/info/reigster' },
                { title: '사원명수/인사기록카드', path: '/info/reigster' },
                { title: '인사발령등록', path: '/info/reigster' },
            ]
        },
        {
            titleInfo: {
                iconPath: '/aside/user.png',
                title: '경조비관리'
            },
            subMenus: [
                { title: '경조비신청', path: '/info/reigster' },
                { title: '경조비신청현황', path: '/info/reigster' },
            ]
        },
        {
            titleInfo: {
                iconPath: '/aside/user.png',
                title: '증명서관리'
            },
            subMenus: [
                { title: '증명서발급', path: '/info/reigster' },
            ]
        }
    ]

    return (
        <div className={s.container}>
            <Nav/>
            <div className={s.mainWrapper}>
                {/* aside영역 */}
                <Aside 
                    menus={dummy}
                />
                
                {/* 메인영역 */}
                <div className={s.mainContentWrapper}>
                    {children}
                </div>
            </div>

        </div>
    )
}