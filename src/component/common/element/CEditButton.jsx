import c from './CEditButton.module.css';
import {clsx} from "clsx";

export default function CEditButton({buttonName}) {
	
	return (
		<span className={clsx(c.editButton, "cursor-pointer")}>
      {buttonName}
    </span>
	)
	
}