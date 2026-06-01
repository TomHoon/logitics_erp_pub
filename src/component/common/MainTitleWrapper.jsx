"use client";

import CButton from "./element/CButton";
import s from "./MainTitle.module.css";

const intialTitleData = {
  title: "인사정보등록",
  desc: "직원의 인사정보를 등록하고 관리합니다.",
};

// export default function MainTitleWrapper({mainTitleData, buttonRender}) {
export default function MainTitleWrapper({mainTitleData = {...intialTitleData}}) {
  const buttonRender = () => {
    return (
      <>
        <CButton path="/download.png" type="type1" buttonName="PDF 다운로드" />
        <CButton path="/plus.png" type="type2" buttonName="신규등록" />
      </>
    );
  };
  return (
    <div className={s.container}>
      <div className={s.titleArea}>
        <span className={s.mainTitle}>{mainTitleData.title}</span>
        <span className={s.desc}>{mainTitleData.desc}</span>
      </div>

      <div className={s.buttonArea}>{buttonRender()}</div>
    </div>
  );
}
