import clsx from "clsx";
import s from './CButton.module.css'

export default function CButton({path, buttonName, onClick, type = 'type1', beforeIcon, afterIcon}) {
    return (
        <button
            onClick={() => console.log('...')}
            className={clsx(
                s.commonButton, type === 'type1' 
                ? s.type1 
                : s.type2
            )}
        >
            {/*<img src={path} alt="" />*/}
            {beforeIcon}
            {buttonName}
            {afterIcon}
        </button>
    )
}