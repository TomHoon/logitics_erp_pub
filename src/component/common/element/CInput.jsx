import s from './CInput.module.css'
import { clsx } from "clsx";

export default function CInput({
	placeholder,
	width,
	readOnly = false,
	disabled = false,
	value = "",
	onChange,
	onKeyDown,
	type = "text",
	beforeIcon,
	afterIcon
}) {
	return (
		<>
			<div className='relative'>

				{beforeIcon && beforeIcon}
				<input
					readOnly={readOnly}
					className={clsx(s.cInput, "leading-[15.6px]", readOnly ? s.cInputReadonly : "")}
					style={{ width: `${width ?? 120}px` }}
					onChange={e => onChange?.(e)}
					type={type}
					placeholder={placeholder}
					value={value}
					disabled={disabled}
					onKeyDown={e => onKeyDown?.(e)}
				/>
				<span className='absolute top-1/2 right-[10px] -translate-y-1/2'>
					{afterIcon && afterIcon}
				</span>
			</div>

		</>
	)
}