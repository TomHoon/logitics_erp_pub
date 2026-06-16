import s from './CInput.module.css'
import {clsx} from "clsx";

export default function CInput({placeholder, width, readOnly = false}) {
	return (
		<>
			<input
				readOnly={readOnly}
				className={clsx(s.cInput, "leading-[15.6px]", readOnly ? s.cInputReadonly : "")}
				style={{width: `${width ?? 120}px`}}
				type="text"
				placeholder={placeholder}
			/>
		</>
	)
}