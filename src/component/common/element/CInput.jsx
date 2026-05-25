import s from './CInput.module.css'

export default function CInput({placeholder, width}) {
    return (
        <>
            <input
              className={`${s.cInput}`}
              style={{ width: `${width ?? 120}px` }}
              type="text"
              placeholder={placeholder}
            />
        </>
    )
}