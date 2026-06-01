import BreadCrumb from "@/component/common/BreadCrumb";
import MainTitleWrapper from "@/component/common/MainTitleWrapper";
import c from "./EventSupportApply.module.css";
import {
  Baby,
  CakeSlice,
  Calendar,
  Ellipsis,
  Flower2,
  Heart,
  HeartHandshake,
  Info,
  Lock,
} from "lucide-react";
export default function EventSupportApply() {
  return (
    <div className={c.container}>
      <BreadCrumb />
      <MainTitleWrapper
        mainTitleData={{
          title: "경조비신청",
          desc: "경조사 발생 시 경조비를 신청하고 지급 현황을 관리합니다.",
        }}
      />

      <div className={c.formContainer}>
        <div className={c.formTitle}>
          <div className={c.formTitleLeft}>
            <HeartHandshake />
            <p>경조비신청 입력</p>
          </div>
          <div className={c.formTitleRight}>
            *<p>필수 입력 항목</p>
          </div>
        </div>

        <div className={c.formContent}>
          <section className={c.formItem}>
            <p>신청자 정보</p>
            <div className={c.formItemData}>
              <div className={c.formApplyInfoItem}>
                <p>사원번호</p>
                <div>
                  <input type="text" placeholder="EMP-001" readOnly />
                  <Lock />
                </div>
              </div>

              <div className={c.formApplyInfoItem}>
                <p>성명</p>
                <div>
                  <input type="text" placeholder="EMP-001" readOnly />
                  <Lock />
                </div>
              </div>

              <div className={c.formApplyInfoItem}>
                <p>부서</p>
                <div>
                  <input type="text" placeholder="EMP-001" readOnly />
                  <Lock />
                </div>
              </div>

              <div className={c.formApplyInfoItem}>
                <p>직급</p>
                <div>
                  <input type="text" placeholder="EMP-001" readOnly />
                  <Lock />
                </div>
              </div>

              <div className={c.formApplyInfoItem}>
                <p>신청일</p>
                <div>
                  <input type="text" placeholder="EMP-001" readOnly />
                  <Lock />
                </div>
              </div>
            </div>
          </section>

          <section className={c.formItem}>
            <p>
              경조 구분 <span>*</span>
            </p>
            <div className={c.formItemData}>
              <div className={c.eventTypeList}>
                <div className={c.eventTypeItem}>
                  <Heart />
                  <span>본인결혼</span>
                </div>

                <div className={c.eventTypeItem}>
                  <Heart />
                  <span>자녀결혼</span>
                </div>

                <div className={c.eventTypeItem}>
                  <Baby />
                  <span>출산</span>
                </div>

                <div className={c.eventTypeItem}>
                  <Flower2 />
                  <span>부모사망</span>
                </div>

                <div className={c.eventTypeItem}>
                  <Flower2 />
                  <span>배우자사망</span>
                </div>

                <div className={c.eventTypeItem}>
                  <CakeSlice />
                  <span>부모회갑</span>
                </div>

                <div className={c.eventTypeItem}>
                  <Ellipsis />
                  <span>기타</span>
                </div>
              </div>
            </div>

            <div className={c.eventDesc}>
              <Info />
              <p>본인결혼 선택됨 · 지급기준액: 500,000원</p>
            </div>
          </section>

          <section className={c.formItem}>
            <p>경조 대상자 정보</p>
            <div className={c.formItemData}>
              <div className={c.formApplyInfoItem}>
                <p>
                  대상자 성명 <span>*</span>
                </p>
                <div>
                  <input type="text" placeholder="성명을 입력하세요" />
                </div>
              </div>

              <div className={c.formApplyInfoItem}>
                <p>
                  관계 <span>*</span>
                </p>
                <div>
                  <select>
                    <option value="">선택하세요</option>
                    <option value="부모">부모</option>
                    <option value="배우자">배우자</option>
                  </select>
                </div>
              </div>

              <div className={c.formApplyInfoItem}>
                <p>
                  경조일 <span>*</span>
                </p>
                <div className={c.eventDate}>
                  <input type="text" placeholder="YYYY.MM.DD" />
                  <Calendar />
                </div>
              </div>

              <div className={c.formApplyInfoItem}>
                <p>경조 장소</p>
                <div>
                  <input type="text" placeholder="장소를 입력하세요 (선택)" />
                </div>
              </div>
            </div>
          </section>

          <section className={c.formItem}>
            <p>
              지급 계좌 <span>*</span>
            </p>
            <div className={c.formItemData}>
              <div className={c.formApplyInfoItem}>
                <p>은행명</p>
                <div>
                  <select>
                    <option value="">선택하세요</option>
                    <option value="국민은행">국민은행</option>
                    <option value="신한은행">신한은행</option>
                    <option value="하나은행">하나은행</option>
                  </select>
                </div>
              </div>

              <div className={c.formApplyInfoItem}>
                <p>계좌번호</p>
                <div>
                  <input type="text" placeholder="계좌번호를 입력하세요" />
                </div>
              </div>

              <div className={c.formApplyInfoItem}>
                <p>예금주명</p>
                <div>
                  <input type="text" placeholder="예금주명을 입력하세요" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
