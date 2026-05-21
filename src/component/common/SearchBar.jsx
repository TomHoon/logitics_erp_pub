'use client';

import CButton from './element/CButton';
import CInput from './element/CInput';
import CLabel from './element/CLabel';
import CSelect from './element/CSelect';
import s from './SearchBar.module.css';


export default function SearchBar() {
    return (
        <div className={s.container}>
            <div className={s.searchBarTitle}>
                <img className={s.searchBarIcon} src="search.png" alt="" />
                <span>검색조건</span>
            </div>

            <div className={s.searchConditionWrapper}>
                <div className={s.conditionItem}>
                    <CLabel
                        labelName='사원번호'
                    /> 
                    <CInput/>
                </div>
                <div className={s.conditionItem}>
                    <CLabel
                        labelName='부서'
                    /> 
                    <CSelect/>
                </div>
                <div className={s.conditionItem}>
                    <CLabel
                        labelName='직급'
                    /> 
                    <CSelect/>
                </div>
                <div className={s.conditionItem}>
                    <CLabel
                        labelName='재직중'
                    /> 
                    <CSelect/>
                </div>
                <div className={s.conditionItem}>
                    <CButton
                        path='/search-w.png'
                        type='type2'
                        buttonName='조회'
                    />

                    <CButton
                        path='/rotate.png'
                        type='type1'
                        buttonName='초기화'
                    />
                </div>
            </div>
        </div>
    )
}