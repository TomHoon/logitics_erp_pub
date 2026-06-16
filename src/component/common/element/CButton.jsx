import clsx from "clsx";
import s from './CButton.module.css'

export default function CButton({path, width, buttonName, onClick, type = 'type1', beforeIcon, afterIcon}) {
	return (
		<button
			onClick={() => onClick?.()}
			className={clsx(
				s.commonButton, type === 'type1'
					? s.type1
					: s.type2,
				"cursor-pointer",
			)}
			style={{
				width: width ? `${width}px` : 'auto'
			}}
		>
			{/*<img src={path} alt="" />*/}
			{beforeIcon}
			{buttonName}
			{afterIcon}
		</button>
	)
}