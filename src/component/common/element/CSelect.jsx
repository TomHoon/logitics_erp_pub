import s from './CSelect.module.css';

export default function CSelect() {

    const optionList = [
        '전체',
        '부서1',
        '부서2',
        '부서3'
    ]

    return (
        <select className={s.cSelect}>
            {optionList.map((item,idx) => (
                <option value={item} key={idx}>{item}</option>  
            ))}
        </select>
    )
}