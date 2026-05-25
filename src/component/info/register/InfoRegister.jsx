'use client'

import BreadCrumb from "@/component/common/BreadCrumb";
import MainTitleWrapper from "@/component/common/MainTitleWrapper";
import SearchBar from "@/component/common/SearchBar";
import ViewTable from "@/component/common/ViewTable";
import CEditButton from "@/component/common/element/CEditButton";
import CStatusLabel from "@/component/common/element/CStatusLabel";
import {Clock} from "lucide-react";
const columns = [
  'NO',
  '사원번호',
  '성명',
  '부서',
  '직급',
  '입사일',
  '연락처',
  '이메일',
  '재직상태',
  '관리',
];

const columnKeyMap = {
  사원번호: 'employeeNumber',
  성명: 'name',
  부서: 'department',
  직급: 'position',
  입사일: 'hireDate',
  연락처: 'phone',
  이메일: 'email',
  재직상태: 'status',
};

const renderCell = (row, column) => {

  if (column === 'NO') {
    return null;
  }

  if (column === '관리') {
    return (
      <CEditButton
        buttonName="수정"
      />
    );
  }

  const key = columnKeyMap[column];

  if (key === 'status') {
    return (
      <CStatusLabel
        type="type1"
        labelName={row[key]}
      />
    );
  }

  return row[key];
};


export default function InfoRegister() {
  return (
    <div className="flex flex-col gap-[16px]">
      <BreadCrumb/>
      <MainTitleWrapper/>
      <SearchBar/>
      <ViewTable
        columns={columns}

        renderRow={(row, index) => (
          <>
            {columns.map((column, columnIndex) => {

              if (column === 'NO') {
                return (
                  <li key={`${column}-${columnIndex}`}>
                    {index + 1}
                  </li>
                );
              }

              return (
                <li key={`${column}-${columnIndex}`}>
                  {renderCell(row, column)}
                </li>
              );
            })}
          </>
        )}
      />
    </div>
  )
}