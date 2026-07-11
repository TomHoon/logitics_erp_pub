'use client';

import BreadCrumb from '@/component/common/BreadCrumb';
import MainTitleWrapper from '@/component/common/MainTitleWrapper';
import SearchBar from '@/component/common/SearchBar';
import ViewTable from '@/component/common/ViewTable';
import CEditButton from '@/component/common/element/CEditButton';
import CStatusLabel from '@/component/common/element/CStatusLabel';
import { useEffect, useState } from 'react';
import baseApi from '@/common/api/baseApi';
import { clsx } from 'clsx';

import CButton from '@/component/common/element/CButton';
import { toast } from 'sonner';
import LoadingSpinner from '@/common/LoadingSpinner';
import ConfirmAlert from '@/common/ConfirmAlert';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import InfoRegisterModal from '@/component/modal/InfoRegisterModal';
import { getToday } from '@/common/utils/dateUtils';

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

export default function InfoRegister() {
	const [employees, setEmployees] = useState([]);
	const [selectedInfo, setSelectedInfo] = useState({});
	const [open, setOpen] = useState(false);
	const [registerInfo, setRegisterInfo] = useState({});
	const [isEdit, setIsEdit] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isOpenAlert, setIsOpenAlert] = useState(false);
	const [departmentOptions, setDepartmentOptions] = useState([]);
	const [positionOptions, setPositionOptions] = useState([]);

	const buttonRender = () => {
		return (
			<>
				<CButton
					path="/download.png"
					type="type1"
					buttonName="PDF 다운로드"
					onClick={() => {
						setIsOpenAlert(true);
					}}
				/>
				<CButton
					path="/plus.png"
					type="type2"
					buttonName="신규등록"
					onClick={() => {
						setRegisterInfo({});
						setSelectedInfo({});
						setIsEdit(false);
						setOpen(true);
					}}
				/>
			</>
		);
	};

	const renderCell = (row, column) => {
		if (column === 'NO') {
			return null;
		}

		if (column === '관리') {
			return (
				<CEditButton
					buttonName="수정"
					onClick={() => {
						setSelectedInfo(row);
						setOpen(true);
						setIsEdit(true);
					}}
				/>
			);
		}

		const key = columnKeyMap[column];

		if (key === 'status') {
			return (
				<CStatusLabel
					type={row[key] === '재직' ? 'type1' : 'type2'}
					labelName={row[key]}
				/>
			);
		}

		return row[key];
	};

	const getDepartmentOptions = async () => {
		try {
			const res = await baseApi.get('/api/v1/department');
			const list = res?.data?.data || res?.data || [];
			setDepartmentOptions(list.map((d) => d.departmentName));
		} catch (e) {
			console.error(e);
		}
	};

	const getPositionOptions = async () => {
		try {
			const res = await baseApi.get('/api/v1/position');
			const list = res?.data?.data || res?.data || [];
			setPositionOptions(list.map((p) => p.positionName));
		} catch (e) {
			console.error(e);
		}
	};

	const getEmployees = async (params) => {
		try {
			setIsLoading(true);
			const token = localStorage.getItem('accessToken');
			const res = await baseApi.get('/api/v1/employees', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: { ...params },
			});

			setEmployees(res?.data?.data);
		} catch (e) {
			console.error(e.status);
		} finally {
			setIsLoading(false);
		}
	};

	const registerEmployee = async () => {
		const param = !isEdit
			? { ...registerInfo, employmentStatus: '재직중' }
			: { ...selectedInfo, employmentStatus: '재직중' };

		if (
			!param.name ||
			!param.departmentName ||
			!param.positionName ||
			!param.phone ||
			!param.bankName ||
			!param.accountNumber
		) {
			toast('필수 입력 항목(성명/부서/직급/휴대폰/은행/계좌번호)을 모두 입력해주세요.', {
				position: 'top-center',
			});
			return;
		}

		const token = localStorage.getItem('accessToken');
		try {
			setIsLoading(true);
			const url = '/api/v1/employees/registerEmployee';
			const res = await baseApi.post(
				url,
				{
					...param,
					hireDate: getToday(),
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			);

			if (res?.data?.success) {
				toast(`사원${isEdit ? '수정' : '등록'}이 정상처리 되었습니다.`, {
					position: 'top-center',
				});
				setOpen(false);

				// 재조회
				getEmployees();
			}
		} catch (error) {
			toast(error?.response?.data?.message, { position: 'top-center' });
		} finally {
			setIsLoading(false);
		}
	};

	const fontToBase64 = async (fontPath) => {
		const res = await fetch(fontPath);
		const buffer = await res.arrayBuffer();

		let binary = '';
		const bytes = new Uint8Array(buffer);

		bytes.forEach((byte) => {
			binary += String.fromCharCode(byte);
		});

		return btoa(binary);
	};

	const downloadPdf = async () => {
		const doc = new jsPDF();

		const fontBase64 = await fontToBase64('/fonts/NotoSansKR-Regular.ttf');

		doc.addFileToVFS('NotoSansKR-Regular.ttf', fontBase64);
		doc.addFont('NotoSansKR-Regular.ttf', 'NotoSansKR', 'normal');

		doc.setFont('NotoSansKR', 'normal');

		const cols = columns.filter((item) => item !== '관리' && item !== 'NO');

		autoTable(doc, {
			head: [cols],
			// body: [
			//
			// 	["김지원", "IT본부", "과장"],
			// 	["리흔", "경영지원본부", "사원"],
			// ],
			body: employees.map((employee, idx) => {
				const test = cols.map((c) => employee[columnKeyMap[c]]);
				console.log('test', test);
				return [idx, ...cols.map((c) => employee[columnKeyMap[c]])];
			}),
			styles: {
				font: 'NotoSansKR',
				fontStyle: 'normal',
			},
		});

		doc.save('employee.pdf');
	};

	useEffect(() => {
		console.log('jsPDF >> ', jsPDF);
		getEmployees();
		getDepartmentOptions();
		getPositionOptions();
	}, []);

	return (
		<div className="flex flex-col gap-[16px]">
			<BreadCrumb />
			<MainTitleWrapper buttonRender={buttonRender} />
			<SearchBar goSearch={(params) => getEmployees(params)} />
			<ViewTable
				columns={columns}
				rowList={employees}
				smallColumnIdxList={[2, 4, 8, 9]}
				renderRow={(row, index) => (
					<>
						{columns.map((column, columnIndex) => {
							if (column === 'NO') {
								return <li key={`${column}-${columnIndex}`}>{index + 1}</li>;
							}

							return (
								<li
									key={`${column}-${columnIndex}`}
									className={clsx(
										[2, 4, 8, 9].includes(columnIndex) ? 'flex-[0.5]' : 'flex-1'
									)}
								>
									{renderCell(row, column)}
								</li>
							);
						})}
					</>
				)}
			/>

			<InfoRegisterModal
				open={open}
				setOpen={setOpen}
				selectedInfo={selectedInfo}
				setSelectedInfo={setSelectedInfo}
				registerInfo={registerInfo}
				setRegisterInfo={setRegisterInfo}
				isEdit={isEdit}
				isLoading={isLoading}
				registerEmployee={registerEmployee}
				departmentOptions={departmentOptions}
				positionOptions={positionOptions}
			/>

			<LoadingSpinner isLoading={isLoading} />
			<ConfirmAlert
				isOpen={isOpenAlert}
				setOpen={setIsOpenAlert}
				message="PDF를 다운 받으시겠습니까?"
				clickOk={downloadPdf}
			/>
		</div>
	);
}
