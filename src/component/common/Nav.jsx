'use client';

import { useEffect } from 'react';
import style from './Nav.module.css'
import baseApi from '@/common/api/baseApi';

export default function Nav({initial = '홍', fullName = '홍길동'}) {

    useEffect(() => {
        const getEmployees = async () => {
            const token = localStorage.getItem('accessToken');

            const res = await baseApi.get('/api/v1/employees', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(res);
        }
        getEmployees();
    }, []);

    return (
        <div className={`${style.container}`}>
        
            <div className={style.left}>
                <div className={style.left1}>
                    <img src="/briefcase.png"/>
                    <span>인사관리시스템</span>
                </div>

                <div className={style.left2}>
                    <ul className={style.navMenu}>
                        <li className={style.active}>인사관리</li>
                        <li>근태관리</li>
                        <li>급여관리</li>
                        <li>일용직관리</li>
                    </ul>
                </div>
            </div>

            <div className={style.right}>
                <img src="/Bell.png" className={`${style.imgIcon} ${style.bellIcon}`}/>
                <div className={style.nameWrapper}>
                    <span className={style.circleInitial}>홍</span>
                    <span className={style.fullName}>홍길동</span>
                </div>
                <div className={style.departWrapper}>
                    <span>인사팀</span>
                    <img src="/logout.png" className={style.imgIcon}/>
                </div>
                
            </div>
        </div>
    )
}