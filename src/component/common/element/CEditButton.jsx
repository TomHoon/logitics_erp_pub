import c from './CEditButton.module.css';

export default function CEditButton({buttonName}) {

  return (
    <span className={c.editButton}>
      {buttonName}
    </span>
  )

}