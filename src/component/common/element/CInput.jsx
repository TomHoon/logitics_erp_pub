import { Input } from "@/components/ui/input";

import s from './CInput.module.css'

export default function CInput({placeholder}) {
    return (
        <>
            <input className={s.cInput} type="text" placeholder={placeholder} />
        </>
    )
}