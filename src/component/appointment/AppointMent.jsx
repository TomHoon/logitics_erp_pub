'use client'

import c from './AppointMent.module.css';

import { Clock } from "lucide-react";

import BreadCrumb from "@/component/common/BreadCrumb";
import MainTitleWrapper from "@/component/common/MainTitleWrapper";
import SearchBar from "@/component/common/SearchBar";
import AppointmentForm from "@/component/appointment/AppointmentForm";
import ViewTable from "@/component/common/ViewTable";
import CButton from "@/component/common/element/CButton";

const columns = [
  'NO',
  '발령번호',
  '사원번호',
  '성명',
  '발령유형',
  '전부서/직급',
  '후부서/직급',
  '발령일',
  '등록자',
  '관리'
];

const rowList = [
  {
    발령번호: 'APT-2025-003',
    사원번호: 'EMP-002',
    성명: '이영희',
    발령유형: '승진',

    '전부서/직급': '경영지원팀',
    '후부서/직급': '인사팀',

    발령일: '2025.07.01',
    등록자: '홍길동',
  },

  {
    발령번호: 'APT-2025-002',
    사원번호: 'EMP-001',
    성명: '김철수',
    발령유형: '전보',

    '전부서/직급': '경영지원팀',
    '후부서/직급': '인사팀',

    발령일: '2025.04.01',
    등록자: '홍길동',
  },

  {
    발령번호: 'APT-2025-001',
    사원번호: 'EMP-004',
    성명: '최지영',
    발령유형: '겸직',

    '전부서/직급': '경영지원팀',
    '후부서/직급': '인사팀',

    발령일: '2025.01.15',
    등록자: '홍길동',
  },
];

const renderCell = (row, column) => {
  if (column === 'NO') {
    return null;
  }

  if (column === '관리') {
    return (
      <li>
        <button className='rounded-[4px] bg-[#EFF6FF] text-[12px] text-[#2563EB] px-[10px] py-[4px]'>수정</button>
        <button className='ml-[4px] rounded-[4px] bg-[#FFF1F2] text-[12px] text-[#E11D48] px-[10px] py-[4px]'>삭제</button>
      </li>
    )
  }

  return <li>{row[column]}</li>;
}

export default function AppointMent() {

  return (
    <div className={c.container}>
      <BreadCrumb />

      <MainTitleWrapper />

      <SearchBar />

      <AppointmentForm />
      <ViewTable
        rowList={rowList}
        renderTitle={() => (
          <>
            <Clock
              color="#1B3A6B"
              size={15}
            />

            <span className="text-[#1B3A6B] text-[14px] font-[700]">
              발령 이력
            </span>
          </>
        )}
        columns={columns}
        renderRow={(row, index) => {
          return (
            <>
              <li>{index + 1}</li>
              {columns.map((column, columnIndex) => (
                renderCell(row, column)
              ))}
            </>
          )
        }}


      />
    </div>
  );
}