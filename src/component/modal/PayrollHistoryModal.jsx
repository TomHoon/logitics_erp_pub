'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import baseApi from '@/common/api/baseApi';
import LoadingSpinner from '@/common/LoadingSpinner';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PayrollHistoryModal({ open, setOpen, employeeNo, employeeName }) {
	const [rows, setRows] = useState([]);
	const [changeLogRows, setChangeLogRows] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getHistory = async () => {
		if (!employeeNo) return;
		setIsLoading(true);
		try {
			const [historyRes, changeLogRes] = await Promise.all([
				baseApi.get('/api/v1/payroll/history', { params: { employeeNo } }),
				baseApi.get('/api/v1/payroll/basic-salary-history', { params: { employeeNo } }),
			]);
			setRows(historyRes?.data?.data || historyRes?.data || []);
			setChangeLogRows(changeLogRes?.data?.data || changeLogRes?.data || []);
		} catch (e) {
			setRows([]);
			setChangeLogRows([]);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (open) getHistory();
	}, [open, employeeNo]);

	const formatYearMonth = (yearMonth) => {
		const s = String(yearMonth);
		return `${s.slice(0, 4)}.${s.slice(4, 6)}`;
	};

	const formatDateTime = (dt) => {
		if (!dt) return '-';
		return dt.replace('T', ' ').slice(0, 16).replaceAll('-', '.');
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="flex w-[640px] max-w-[640px] max-h-[80vh] flex-col">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Clock size={16} />
						{employeeName ? `${employeeName} 급여 변경 이력` : '급여 변경 이력'}
					</DialogTitle>
				</DialogHeader>

				<div className="flex-1 overflow-y-auto">
					<table className="w-full table-fixed border-collapse text-center text-[13px]">
						<thead>
							<tr className="h-[36px] bg-[#F1F5F9] text-[#64748B]">
								<th className="border border-[#E5E7EB]">년월</th>
								<th className="border border-[#E5E7EB]">기본급</th>
								<th className="border border-[#E5E7EB]">식대</th>
								<th className="border border-[#E5E7EB]">교통비</th>
								<th className="border border-[#E5E7EB]">직급수당</th>
								<th className="border border-[#E5E7EB]">지급일</th>
								<th className="border border-[#E5E7EB]">상태</th>
							</tr>
						</thead>
						<tbody>
							{rows.map((r) => (
								<tr key={r.payrollId} className="h-[38px]">
									<td className="border border-[#E5E7EB] font-bold text-[#183A6B]">
										{formatYearMonth(r.payrollYearMonth)}
									</td>
									<td className="border border-[#E5E7EB]">
										{Number(r.basicSalaryAmount).toLocaleString()}
									</td>
									<td className="border border-[#E5E7EB]">
										{Number(r.mealAllowanceAmount).toLocaleString()}
									</td>
									<td className="border border-[#E5E7EB]">
										{Number(r.transportationAllowanceAmount).toLocaleString()}
									</td>
									<td className="border border-[#E5E7EB]">
										{Number(r.positionAllowanceAmount).toLocaleString()}
									</td>
									<td className="border border-[#E5E7EB]">
										{r.paymentDate ? r.paymentDate.replaceAll('-', '.') : '-'}
									</td>
									<td className="border border-[#E5E7EB]">
										{r.payrollStatusText || '-'}
									</td>
								</tr>
							))}
							{rows.length === 0 && !isLoading && (
								<tr>
									<td
										colSpan={7}
										className="h-[60px] border border-[#E5E7EB] text-[#94A3B8]"
									>
										변경 이력이 없습니다.
									</td>
								</tr>
							)}
						</tbody>
					</table>

					<p className="!mt-4 !mb-2 text-[13px] font-bold text-[#183A6B]">
						기본급 수정 로그
					</p>
					<table className="w-full table-fixed border-collapse text-center text-[13px]">
						<thead>
							<tr className="h-[36px] bg-[#F1F5F9] text-[#64748B]">
								<th className="border border-[#E5E7EB]">변경일시</th>
								<th className="border border-[#E5E7EB]">변경 전</th>
								<th className="border border-[#E5E7EB]">변경 후</th>
							</tr>
						</thead>
						<tbody>
							{changeLogRows.map((r, idx) => (
								<tr key={idx} className="h-[38px]">
									<td className="border border-[#E5E7EB]">
										{formatDateTime(r.changedAt)}
									</td>
									<td className="border border-[#E5E7EB] text-[#EF4444]">
										{Number(r.oldAmount).toLocaleString()}
									</td>
									<td className="border border-[#E5E7EB] font-bold text-[#2563EB]">
										{Number(r.newAmount).toLocaleString()}
									</td>
								</tr>
							))}
							{changeLogRows.length === 0 && !isLoading && (
								<tr>
									<td
										colSpan={3}
										className="h-[60px] border border-[#E5E7EB] text-[#94A3B8]"
									>
										기본급 수정 이력이 없습니다.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				<LoadingSpinner isLoading={isLoading} />
			</DialogContent>
		</Dialog>
	);
}
