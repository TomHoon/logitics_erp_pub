import c from './Landing.module.css'
import Nav from "@/component/common/Nav";
import { ShieldCheck, Users, BanknoteArrowUp, Clock, LogIn, Mail, Lock, EyeOff, Eye } from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";

const renderLogin = () => {
  return (
    <div className={`${c.loginArea} ${c.stagger}`}>
      <section className={c.titleSection}>
        <p>로그인</p>
        <span>계정에 로그인하여 업무를 시작하세요</span>
      </section>

      <section className={c.inputSection}>
        <div className={c.inputItem}>
          <Mail className={c.mail} color='#9CA3AF'/>
          <label htmlFor="email">이메일</label>
          <input type="text" placeholder='이메일 주소를 입력하세요'/>
        </div>

        <div className={c.inputItem}>
          <Lock className={c.mail} color='#9CA3AF'/>
          <label htmlFor="email">비밀번호</label>
          <input type="password" placeholder='비밀번호를 입력하세요'/>
          <EyeOff className={c.eye} color='#9CA3AF'/>
          {/*<Eye className={c.mail} color='#9CA3AF'/>*/}
        </div>
      </section>

      <section className={c.loginOptionSection}>
        <div className={c.loginOptionItem}>
          <Checkbox/>
          <span className={c.keepLoginTitle}>로그인 상태 유지</span>
        </div>

        <div className={c.loginOptionItem}>
          <span className={c.findPw}>비밀번호 찾기</span>
        </div>
      </section>

      <section className={c.loginButtonSection}>
        <div className={c.loginButtonItem}>
          <LogIn />
          <span>로그인</span>
        </div>

        <div className={c.loginButtonOr}>
          <span>또는</span>
        </div>

        <div>
          <img src="kakaologin.png" alt="" className='w-[400px] h-[60px]'/>
        </div>
      </section>

      <section className={c.joinSection}>
        <div className={c.joinItem}>
          <span className={c.noAccount}>계정이 없으신가요?</span>
          <span className={c.applyJoin}>회원가입 신청</span>
        </div>

      </section>
    </div>
  )
}


export default function Home() {
  return (
    <div className={c.container}>
      <Nav/>

      <div className={c.loginContentWrapper}>
        <div className={`${c.guideArea} ${c.stagger}`}>
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

          <ul className={c.functionList}>
            <li>
              <span className={c.functionIcon}>
                <Users color='#60A5FA'/>
              </span>

              <div>
                <p className={c.functionTitle}>인사관리</p>
                <span className={c.functionDesc}>조직도, 인사발령, 직원 정보 통합 관리</span>
              </div>
            </li>

            <li>
              <span className={c.functionIcon}>
                <BanknoteArrowUp color='#60A5FA'/>
              </span>


              <div>
                <p className={c.functionTitle}>급여관리</p>
                <span className={c.functionDesc}>자동 급여 계산, 세금 신고, 명세서 발송</span>
              </div>
            </li>

            <li>
              <span className={c.functionIcon}>
                <Clock color='#60A5FA'/>
              </span>

              <div>
                <p className={c.functionTitle}>근태관리</p>
                <span className={c.functionDesc}>출퇴근, 휴가, 초과근무 실시간 모니터링</span>
              </div>
            </li>
          </ul>
        </div>

        {renderLogin()}

      </div>
    </div>
  );
}
