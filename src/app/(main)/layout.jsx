import Aside from '@/component/common/Aside';
import Nav from '@/component/common/Nav';

import s from './layout.module.css';

export default function layout({ children }) {
	return (
		<div className={s.container}>
			<Nav />
			<div className={s.mainWrapper}>
				{/* aside영역 */}
				<Aside />

				{/* 메인영역 */}
				<div className={s.mainContentWrapper}>{children}</div>
			</div>
		</div>
	);
}
