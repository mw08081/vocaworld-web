# VocaWorld 공식 홈페이지

기존 게임 소개와 이미지를 유지하는 정적 사이트입니다. 개인정보처리방침과 이용약관은 로그인·결제·광고 없는 테스트 버전을 기준으로 작성한 **출시 전 초안**입니다. 서버 랭킹·게스트 인증은 도입 예정으로 구분했으며, 문서를 수정하는 것만으로 앱에 인증·서버 저장·삭제 기능이 구현되지는 않습니다.

## 로컬 빌드와 확인

Node.js 22 이상이 필요합니다. 외부 npm 의존성이나 설치 과정은 없습니다.

```powershell
# .env가 없는 새 환경에서만 복사
Copy-Item .env.example .env
npm.cmd run build
npm.cmd run preview
```

브라우저에서 `http://127.0.0.1:4173`을 엽니다. `/privacy.html`, `/terms.html`에서도 확인할 수 있습니다. Windows PowerShell에서는 실행 정책 변경 없이 `npm.cmd`를 사용합니다. 다른 환경에서는 `npm run build`, `npm run preview`를 사용하세요. 미리보기는 `dist`만 제공하며 `.env`를 공개하지 않습니다. HTML 원본을 직접 열면 빌드용 이메일 안내가 보이므로 빌드 결과로 확인하세요.

## 공개 연락처 설정

[.env.example](./.env.example)을 참고해 프로젝트 루트의 `.env`를 설정합니다.

| 환경변수 | 용도 |
| --- | --- |
| `PUBLIC_SUPPORT_EMAIL` | `vocaworld@pistrislabs.com` — 필수 지원 이메일 |
| `PUBLIC_COMPANY_NAME` | 실제 운영자 또는 사업자명 — 미확정 |
| `PUBLIC_REPRESENTATIVE` | 해당되는 경우 대표자명 — 미확정 |
| `PUBLIC_BUSINESS_REGISTRATION` | 해당되는 경우 사업자등록번호 — 미확정 |

빌드는 허용된 위 공개 필드만 HTML에 넣습니다. 이메일은 `mailto:` 링크로 출력되어 자바스크립트를 끈 브라우저에서도 사용할 수 있습니다. 공개 연락처는 비밀정보가 아닙니다. `.env` 자체는 Git과 배포 산출물에 포함하지 않습니다. 환경변수 변경 후에는 다시 빌드하세요. 같은 이름의 빌드 환경변수가 `.env`보다 우선합니다.

지원 주소 표시는 메일함을 생성하거나 DNS/MX, 메일 수신 서비스를 설정하지 않습니다. 실제 수신 여부는 사용하는 메일 서비스에서 확인해야 합니다.

## 배포

[vercel.json](./vercel.json)에 빌드 명령 `npm run build`와 출력 폴더 `dist`가 설정되어 있습니다. Vercel 프로젝트 환경변수에 `PUBLIC_SUPPORT_EMAIL=vocaworld@pistrislabs.com`을 등록하세요. 로컬 `.env`는 Git에 올라가지 않으므로 원격 빌드에는 별도 등록이 필요합니다. 다른 정적 호스팅도 **`dist` 내용만** 배포합니다. 소스 폴더 전체를 공개하지 마세요.

이 작업에서는 외부 배포를 수행하지 않았습니다. 스토어 등록 후 [script.js](./script.js)의 `storeUrl`에 실제 Play Store 링크를 넣습니다.

## 최종 약관·처리방침 확정에 필요한 정보

- 실제 운영자명과 개인정보 보호 담당자/부서, 시행일, 테스트 대상 연령. 이메일 도메인만으로 운영자명을 추정하지 않습니다.
- 이번 배포에서 서버 랭킹·게스트 인증을 실제로 제공하는지. 현재 확인한 Unity 코드는 로컬 랭킹 표시와 Firebase 초기화까지이며 서버 인증·저장 구현은 별도입니다.
- 게스트 ID와 인증 방식, 공개 별명, 랭킹 항목, 하트 서버 관리 여부. 오답 기록은 우선 기기 내 보관, 크리스탈 서버 저장은 기능 도입 후 검토하는 초안입니다.
- 항목별 처리 목적·법적 근거·보유 기간, 테스트 종료 후 삭제 시점, 백업 삭제 주기, 게스트 소유 확인과 삭제 요청 절차.
- 인증·DB·호스팅·메일·분석·오류 수집 업체의 실제 계약 주체, 처리 국가, 위탁 업무 및 국외 이전 세부사항. DB 리전만으로 전체 서비스의 처리 국가를 확정하지 않습니다.
- Firebase Analytics·Crashlytics SDK가 포함되어 있으므로 배포 빌드의 자동 수집, 광고 ID 관련 설정과 콘솔 보관 기간을 확인합니다. 사용하지 않을 SDK는 앱에서 실제로 제거/비활성화해야 하며, 문서에서 “미사용”이라고 쓰는 것만으로 비활성화되지 않습니다.
- 대상 연령에 따른 법정대리인 동의 및 앱 마켓 아동 정책 적용 여부, 랭킹 공개 안내, 실제 권리 행사 경로.

위 정보와 배포 앱의 동작을 일치시킨 뒤 초안 표시를 제거하고 시행일을 입력합니다. 앱 마켓의 데이터 안전/앱 개인정보 공개 항목도 동일하게 작성합니다. 향후 로그인·결제·광고·클라우드 오답 동기화 도입 전에 해당 처리 내용을 개정합니다.

## 확인한 공식 자료

- [Firebase Unity 게스트 인증과 기존 계정 연결](https://firebase.google.com/docs/auth/unity/anonymous-auth)
- [Android 식별자 사용 가이드](https://developer.android.com/identity/user-data-ids)
- [Firebase Analytics 수집 제어](https://firebase.google.com/docs/analytics/android/configure-data-collection)
- [Firebase 개인정보 처리 안내](https://firebase.google.com/support/privacy)
- [개인정보 보호법 제30조](https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1006185717)
