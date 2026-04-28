# 작업 지시서 (TASKS.md)

이 문서는 위에서부터 순서대로 진행한다. 각 단계가 완료되면 다음 단계로 넘어간다.

---

## Phase 0: 프로젝트 초기 설정 (1일차)

### 0-1. 프로젝트 생성
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

### 0-2. 필수 패키지 설치
```bash
npm install pretendard
npm install -D @types/node
```

### 0-3. 기본 설정 파일 작성
- `app/layout.tsx`: Pretendard 폰트 적용, 메타태그 기본값, GA 스크립트 자리만 마련
- `tailwind.config.ts`: Pretendard 폰트 패밀리 등록, 한국어 친화 타이포그래피 설정
- `next.config.js`: 이미지 최적화 설정

### 0-4. 환경 변수 파일
`.env.local` 생성 (gitignore 확인):
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_ADSENSE_ID=
```

---

## Phase 1: 기본 페이지 + 인프라 (2~3일차)

### 1-1. 공통 컴포넌트
- `components/layout/Header.tsx`: 로고 + 카테고리 네비게이션 + 검색
- `components/layout/Footer.tsx`: 카테고리 링크 + 정책 페이지 링크 + 저작권
- `components/ui/Button.tsx`, `Input.tsx`, `Card.tsx`
- `components/AdSlot.tsx`: 일단 빈 div (애드센스 승인 후 채움)

### 1-2. 필수 페이지 작성
- `app/about/page.tsx` - 사이트 목적, 운영 철학, 운영자 정보 (1000자 이상)
- `app/privacy/page.tsx` - 개인정보처리방침 (쿠키, GA, 애드센스 명시)
- `app/terms/page.tsx` - 이용약관 (면책 조항 포함)
- `app/contact/page.tsx` - 이메일 주소 명시

### 1-3. 도구 메타데이터 시스템
`lib/tools.ts`:
```ts
export type ToolCategory = "finance" | "productivity" | "lifestyle" | "converter" | "realestate";

export interface Tool {
  slug: string;
  title: string;
  description: string;       // 메타 설명용 (160자 이내)
  category: ToolCategory;
  keywords: string[];
  publishedAt: string;
}

export const tools: Tool[] = [
  // 도구 추가될 때마다 여기에 등록
];
```

### 1-4. 홈페이지 (도구 카탈로그)
- 카테고리별로 도구 카드 그리드
- 각 카드: 제목, 짧은 설명, 카테고리 배지
- 검색 기능 (클라이언트 사이드 필터)

### 1-5. SEO 인프라
- `app/sitemap.ts`: 모든 도구 + 정적 페이지 자동 등록
- `app/robots.ts`: 기본 robots.txt
- `app/layout.tsx`의 metadata에서 default OG 이미지, 사이트명 등 설정

---

## Phase 2: 첫 번째 도구 - 패턴 확립 (4일차)

**중요**: 첫 번째 도구는 이후 모든 도구의 템플릿이 된다. 신중하게 만들 것.

### 2-1. 첫 도구로 "연봉 실수령액 계산기" 제작
파일: `app/tools/salary-calculator/page.tsx`

페이지 구성:
1. **계산기 UI**: 연봉 입력 → 4대보험/소득세 차감 → 월 실수령액 출력
2. **사용 방법**: 3~5단계로 나눈 안내
3. **계산 원리 설명**: 4대보험 요율, 소득세 누진 구조 (관련 법령 명시)
4. **예시 시나리오**: 연봉 3000/5000/8000만원 케이스
5. **FAQ**: 5~7개 (식대 비과세, 부양가족 영향 등)
6. **관련 도구**: 퇴직금, 4대보험, 연차수당 계산기 (아직 없으면 "준비 중" 표시)

### 2-2. 도구 페이지 템플릿 추출
첫 도구 완성 후, 반복되는 구조를 컴포넌트로 추출:
- `components/tools/ToolLayout.tsx`: 도구 페이지 공통 레이아웃
- `components/tools/HowToSection.tsx`
- `components/tools/FAQSection.tsx`
- `components/tools/RelatedTools.tsx`

### 2-3. 메타데이터 + JSON-LD
- `generateMetadata` 함수로 동적 메타태그
- JSON-LD `WebApplication` 스키마 삽입

---

## Phase 3: 도구 19개 추가 (5~20일차, 하루 1~2개)

**우선순위 순서대로 작성** (검색량 많은 것부터):

### 금융/세금 (5개)
1. ~~연봉 실수령액 계산기~~ (Phase 2에서 완료)
2. 퇴직금 계산기
3. 4대보험 계산기
4. 연차수당 계산기
5. 종합소득세 간이 계산기

### 업무 효율 (4개)
6. 글자수 세기 (공백 포함/제외)
7. 띄어쓰기 검사기 (간단한 규칙 기반)
8. 마크다운 → HTML 변환기
9. 타임스탬프 ↔ 날짜 변환기

### 생활/건강 (4개)
10. 만 나이 계산기
11. BMI 계산기
12. 디데이 계산기
13. 음주 후 운전 가능 시간 계산기

### 변환기 (3개)
14. 단위 변환기 (길이/무게/부피 통합)
15. 환율 계산기 (주의: 실시간 환율 API는 비용 발생, 일일 1회 갱신 정적 데이터 추천)
16. 색상 코드 변환기 (HEX/RGB/HSL)

### 부동산/투자 (3개)
17. 대출 이자 계산기 (원리금균등/원금균등)
18. 부동산 양도세 간이 계산기
19. 적금/예금 만기 계산기

### 그리고 1개 더
20. 전월세 환산 계산기 (보증금 ↔ 월세)

### 각 도구 작업 체크리스트
- [ ] 계산 로직 구현 + 단위 테스트
- [ ] UI 구현 (모바일 반응형)
- [ ] 1500자 이상 설명 콘텐츠
- [ ] FAQ 5개 이상
- [ ] 관련 도구 링크
- [ ] 메타데이터 + JSON-LD
- [ ] `lib/tools.ts`에 등록
- [ ] 홈페이지 카탈로그에 노출 확인

---

## Phase 4: 런칭 준비 (21~25일차)

### 4-1. 도메인 구매 + Vercel 연결
- 도메인 추천: `tools.kr`, `dotool.co.kr`, `kortools.com` 등 짧고 기억하기 쉬운 것
- Cloudflare에서 도메인 구매 시 갱신비 저렴 + 보안 무료
- Vercel 프로젝트와 도메인 연결, HTTPS 자동 설정 확인

### 4-2. Google 도구 연결
- Google Search Console 등록 + sitemap 제출
- Google Analytics 4 설치 (`NEXT_PUBLIC_GA_ID` 환경변수에 ID 입력)
- Bing Webmaster Tools도 등록 (네이버 유입 일부 영향)

### 4-3. 네이버 SEO
- 네이버 서치어드바이저 등록
- 사이트맵 제출
- 네이버 SEO를 위한 OG 태그 보완 (네이버는 OG 우선)

### 4-4. 최종 점검
- Lighthouse 점수: Performance 90+, SEO 100, Accessibility 90+
- 모든 도구 모바일에서 작동 확인
- 깨진 링크 없는지 확인
- 메타태그 누락 페이지 없는지 확인

---

## Phase 5: 운영 및 애드센스 신청 (26일차~)

### 5-1. 콘텐츠 추가 (런칭 후 1~2개월)
- 주 2~3개씩 도구 추가
- 각 카테고리에 블로그성 글도 1~2개 추가 ("연봉 협상 팁", "퇴직금 세금 절약 방법" 등)

### 5-2. 자연 트래픽 확보
- 관련 커뮤니티에 공유 (단, 스팸성 X)
- 유틸리티 사이트 디렉토리 등록
- 검색 유입 데이터 보면서 부족한 콘텐츠 보강

### 5-3. 애드센스 신청
다음 조건 충족 후 신청:
- 사이트 운영 1개월 이상
- 일일 자연 검색 유입 50~100명 이상
- 모든 페이지 콘텐츠 충실
- 정책 페이지 완비

### 5-4. 승인 후 광고 배치
- `<AdSlot />` 컴포넌트에 애드센스 코드 삽입
- 도구 결과 아래 1개, 콘텐츠 중간 1개, 푸터 위 1개 권장 (페이지당 3개 이하)
- Auto Ads는 비추 (UX 망가뜨림)

---

## Claude Code에게: 작업 시 참고 사항

- 한 번에 여러 도구 만들지 말 것. 도구 1개씩 완성도 있게.
- 도구 만들기 전에 반드시 `lib/tools.ts`와 기존 도구 구조 먼저 확인.
- 컴포넌트는 재사용 가능하게 설계. 중복 코드 발견 시 리팩토링.
- 테스트는 계산 로직 위주로 (Vitest 추천).
- Git 커밋 메시지는 명확하게: `feat(tools): add salary calculator` 식.
- 한국어 콘텐츠 작성 시 자연스러운 표현 우선. AI 티 나는 문장은 사용자가 직접 검수 후 수정.

## 사용자에게 묻고 진행해야 할 것들

다음 사항은 Claude Code가 임의로 결정하지 말고 사용자에게 확인:
- 도메인 이름
- 사이트 이름/브랜드
- 운영자 이메일
- 색상 테마 (브랜드 컬러)
- 로고 (없으면 텍스트 로고로 시작)
