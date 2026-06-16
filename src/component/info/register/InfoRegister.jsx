'use client'

import BreadCrumb from "@/component/common/BreadCrumb";
import MainTitleWrapper from "@/component/common/MainTitleWrapper";
import SearchBar from "@/component/common/SearchBar";
import ViewTable from "@/component/common/ViewTable";
import CEditButton from "@/component/common/element/CEditButton";
import CStatusLabel from "@/component/common/element/CStatusLabel";
import {useEffect, useState} from "react";
import baseApi from "@/common/api/baseApi";
import {clsx} from "clsx";

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
	사원번호: 'employeeNo',
	성명: 'name',
	부서: 'departmentName',
	직급: 'positionName',
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
				type={row[key] === "재직" ? "type1" : "type2"}
				
				labelName={row[key]}
			/>
		);
	}
	
	return row[key];
};


export default function InfoRegister() {
	
	const [employees, setEmployees] = useState([]);
	
	const getEmployees = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			const res = await baseApi.get("/api/v1/employees", {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});
			
			setEmployees(res?.data?.data);
		} catch (e) {
			console.error(e.status)
		}
	}
	
	useEffect(() => {
		getEmployees();
	}, []);
	
	return (
		<div className="flex flex-col gap-[16px]">
			<BreadCrumb/>
			<MainTitleWrapper/>
			<SearchBar/>
			<ViewTable
				columns={columns}
				rowList={employees}
				smallColumnIdxList={[8, 9]}
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
								<li key={`${column}-${columnIndex}`}
										className={clsx([8, 9].includes(columnIndex) ? 'flex-[0.5]' : 'flex-1')}>
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