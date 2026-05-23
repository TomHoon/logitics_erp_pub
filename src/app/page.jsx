import c from './Landing.module.css'
import Nav from "@/component/common/Nav";
import { ShieldCheck, Users, BanknoteArrowUp, Clock, LogIn } from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";

export default function Home() {
  return (
    <div className={c.container}>
      <Nav/>

      <div className={c.loginContentWrapper}>
        <div className={c.guideArea}>
          <p className={c.guideTitle}>
            <ShieldCheck />
            <span>Enterprise HR Solution</span>
          </p>

          <p className={c.guideCenterTitle}>
            스마트한 인사관리의 <br/>
            <span className={c.centerTitleHL}>새로운 기준</span>
          </p>

          <p className={c.guideDesc}>
            직원 채용부터 급여, 근태까지 <br/>
            하나의 플랫폼으로 관리하세요
          </p>

          <ul className={c.spec}>
            <li>
              <span className={c.specNumber}>2,400+</span>
              <span className={c.specDesc}>기업도입</span>
            </li>
            <li>
              <span className={c.specNumber}>98%</span>
              <span className={c.specDesc}>고객 만족도</span>
            </li>
            <li>
              <span className={c.specNumber}>15년</span>
              <span className={c.specDesc}>서비스 운영</span>
            </li>
          </ul>

          <ul>
            <li>
              <Users />

              <div>
                <p>인사관리</p>
                <span>조직도, 인사발령, 직원 정보 통합 관리</span>
              </div>
            </li>

            <li>
              <BanknoteArrowUp />


              <div>
                <p>급여관리</p>
                <span>자동 급여 계산, 세금 신고, 명세서 발송</span>
              </div>
            </li>

            <li>
              <Clock />

              <div>
                <p>근태관리</p>
                <span>출퇴근, 휴가, 초과근무 실시간 모니터링</span>
              </div>
            </li>
          </ul>
        </div>

        <div className={c.loginArea}>
          <section className={c.titleSection}>
            <p>로그인</p>
            <span>계정에 로그인하여 업무를 시작하세요</span>
          </section>

          <section className={c.inputSection}>
            <div className={c.inputItem}>
              <label htmlFor="email">이메일</label>
              <input type="text" placeholder='이메일 주소를 입력하세요'/>
            </div>

            <div className={c.inputItem}>
              <label htmlFor="email">비밀번호</label>
              <input type="password" placeholder='비밀번호를 입력하세요'/>
            </div>
          </section>

          <section className={c.loginOptionSection}>
            <div className={c.loginOptionItem}>
              <Checkbox/>
              <span>로그인 상태 유지</span>
            </div>

            <div className={c.loginOptionItem}>
              <span>비밀번호 찾기</span>
            </div>
          </section>

          <section className={c.loginButtonSection}>
            <div className={c.loginButtonItem}>
              <LogIn />
              <span>로그인</span>
            </div>

            <div className={c.loginButtonItem}>
              <span>또는</span>
            </div>

            <div className={c.loginButtonItem}>
              <img src="kakaologin.png" alt="" className='w-[400px] h-[60px]'/>
            </div>
          </section>

          <section className={c.joinSection}>
            <div className={c.joinItem}>
              <span>계정이 없으신가요?</span>
              <span>회원가입 신청</span>
            </div>

          </section>
        </div>

      </div>
    </div>
  );
}
