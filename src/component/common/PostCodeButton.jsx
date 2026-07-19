'use client';

import { useState } from 'react';
import CButton from '@/component/common/element/CButton';

// 주소검색 공통
export default function PostCodeButton({ onCompletePostData, buttonRender }) {
	const [open, setOpen] = useState(false);

	const openPostcode = () => {
		if (!window || window === undefined) return;

		const postCode = new window.daum.Postcode({
			oncomplete(data) {
				onCompletePostData?.(data);
				const geocoder = new window.kakao.maps.services.Geocoder();
				geocoder.addressSearch(data.address, (result, status) => {
					if (status === window.kakao.maps.services.Status.OK) {
						const lat = result[0].y;
						const lng = result[0].x;

						console.log('위도>>', lat);
						console.log('경도>>', lng);
					}
				});
			},
		});

		postCode.open();
	};

	return (
		<>
			<CButton type="type2" buttonName="주소검색" onClick={openPostcode} />
		</>
	);
}
