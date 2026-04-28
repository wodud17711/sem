export type CategoryId =
  | "finance"
  | "productivity"
  | "lifestyle"
  | "converter"
  | "realestate";

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "finance",
    label: "금융·세금",
    description: "연봉 실수령액, 퇴직금, 4대보험, 종합소득세 등",
  },
  {
    id: "productivity",
    label: "업무 효율",
    description: "글자수 세기, 띄어쓰기, 마크다운, 타임스탬프 변환",
  },
  {
    id: "lifestyle",
    label: "생활·건강",
    description: "만 나이, BMI, 디데이, 음주 후 운전 가능 시간",
  },
  {
    id: "converter",
    label: "변환기",
    description: "단위, 환율, 색상 코드 변환",
  },
  {
    id: "realestate",
    label: "부동산·투자",
    description: "대출 이자, 양도세, 적금/예금, 전월세 환산",
  },
];
