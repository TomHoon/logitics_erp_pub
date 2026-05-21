import s from './Aside.module.css'

export default function Aside({menus}) {
    console.log('menus >> ', menus);

    return (
        <div className={s.container}>
            {menus.map((item, index) => (
                <div className={s.menuItem} key={index}>
                    <p className={s.menuTitle}>
                        <img className={s.img13} src={item.titleInfo.iconPath} alt="" />
                        {item.titleInfo.title}
                    </p>

                    <ul className={s.menuSub}>
                        {item.subMenus.map((subItem, subIdx) => (
                            <li key={subIdx}>{subItem.title}</li>
                        ))}
                    </ul>

                </div>
            ))}
        </div>
    )
}