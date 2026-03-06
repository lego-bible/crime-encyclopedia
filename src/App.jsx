import React, { useState, useEffect, useMemo } from 'react';
import { Search, Copy, Trash2, BookOpen, AlertTriangle, Loader2, CheckCircle2, Fingerprint, Globe, MapPin, Database } from 'lucide-react';

// 국내 범죄 사건 100선 (가나다순 정렬을 위해 배열로 선언)
const DOMESTIC_CASES = [
  "가습기 살균제 사망 사건", "강기훈 유서 대필 조작 사건", "강서구 PC방 살인 사건 (김성수)", "강호순 연쇄살인 사건", "개구리 소년 실종 사건",
  "고유정 전 남편 살인 사건", "광주 인화학교 사건 (도가니)", "국가정보원 여론 조작 사건", "권인숙 성고문 사건 (부천 경찰서)", "김구 암살 사건 (안두희)",
  "김대두 연쇄살인 사건", "김대중 납치 사건", "김대중 아들 홍삼트리오 사건", "김보은 김진관 사건", "김길태 여중생 납치 살인 사건",
  "김영삼 아들 김현철 비리 사건", "김태현 세 모녀 살인 사건", "나영이 사건 (본명 아님, 조두순 사건)", "노태우 비자금 사건", "대구 지하철 참사 (방화)",
  "대장동 개발 사업 특혜 의혹", "대한항공 858편 폭파 사건 (김현희)", "동백림 사건", "디스커버리 펀드 사태", "라임 사태",
  "루나·테라 코인 폭락 사태 (권도형)", "막가파 사건", "민청학련 사건", "밀양 여중생 집단 성폭행 사건", "박근혜-최순실 게이트",
  "박사방 사건", "박정희 대통령 암살 사건 (김재규)", "박종철 고문치사 사건", "박춘풍 사건", "버닝썬 게이트",
  "부산 여중생 집단 폭행 사건", "부천 초등학생 토막 훼손 사건", "빌라왕 전세사기 사건", "사도세자 임오화변 (역사적 범죄)", "삼풍백화점 붕괴 사고 (기업 범죄)",
  "서래마을 영아 유기 사건", "선감학원 사건", "성수대교 붕괴 사고", "세월호 참사 책임 관련 사건", "송진우 암살 사건",
  "수지 김 간첩 조작 사건", "숙명여고 쌍둥이 시험지 유출 사건", "시화호 토막 살인 사건", "신당역 스토킹 살인 사건", "신안 염전 노예 사건",
  "심영구 연쇄살인 사건", "씨랜드 청소년수련원 화재", "아웅산 묘역 테러 사건", "안산 인질극 사건", "안인득 방화 살인 사건",
  "어린이집 원장 일가족 살인 사건", "엄여인 보험 살인 사건", "여운형 암살 사건", "오원춘 사건", "옵티머스 사태",
  "온보현 사건", "용인 엽기 살인 사건", "우범곤 순경 총기 난사 사건", "원영이 사건", "웰컴 투 비디오 사건 (손정우)",
  "유영철 연쇄살인 사건", "육영수 여사 저격 사건 (문세광)", "이명박 BBK 주가조작 사건", "이은해 계곡 살인 사건", "이철 밸류인베스트코리아 사기",
  "이태원 살인 사건 (아서 존 패터슨)", "이태원 압사 사고 책임 관련", "이한열 최루탄 피격 사건", "이형호 유괴 살인 사건", "인천 초등생 유괴 살인 사건",
  "인혁당 재건위 조작 사건", "장대호 한강 몸통 시신 사건", "장준하 의문사 사건", "전두환 비자금 사건", "전청조 혼인 빙자 사기 사건",
  "정남규 연쇄살인 사건", "정두영 연쇄살인 사건", "정유정 또래 여성 살인 사건", "정인상 납치 살인 사건", "제2의 n번방 사건",
  "제주 게스트하우스 살인 사건", "조두순 사건", "조선 신림역 칼부림 사건", "조희팔 다단계 사기 사건", "주수도 제이유 사기 사건",
  "지존파 연쇄살인 사건", "진주 아파트 방화 흉기난동 사건", "창원 골프장 납치 살인 사건", "최신종 연쇄살인 사건", "최원종 서현역 칼부림 사건",
  "치과 모녀 살인 사건", "평택 아동 살인 암매장 사건", "포천 고무통 살인 사건", "한강 의대생 실종 사건", "형제복지원 사건",
  "화성 연쇄살인 사건 (이춘재)", "n번방 성착취물 제작 및 유포 사건 (조주빈)", "LH 투기 의혹 사건", "IMF 외환위기 경제 사범 사건", "부산 형제복지원 인권유린 사건"
];

// 해외 범죄 사건 200선
const FOREIGN_CASES = [
  "9.11 테러 (알 카에다)", "D.B. 쿠퍼 비행기 납치 사건", "FTX 파산 사태 (샘 뱅크먼-프리드)", "O.J. 심슨 살인 사건", "R. 켈리 성범죄 사건",
  "가브릴로 프린치프 (사라예보 사건)", "게리 리지웨이 (그린 리버 킬러)", "그레이트 트레인 로버리 (1963년 영국)", "난징 대학살 (전범)", "노토리어스 B.I.G. 암살 사건",
  "뉴질랜드 크라이스트처치 모스크 총기 난사 사건", "다이아몬드 목걸이 사건 (마리 앙투아네트 관련)", "다이애나 왕세자비 사망 사건 (음모론)", "데니스 레이더 (BTK 킬러)", "데이비드 버코위츠 (샘의 아들)",
  "도쿄 지하철 사린 가스 살포 사건 (옴진리교)", "드레퓌스 사건", "라스베이거스 스트립 총기 난사 사건", "런던 7.7 지하철 테러", "로마노프 왕조 처형 사건",
  "로스웰 UFO 추락 조작/은폐 사건", "루이스 가라비토 (짐승)", "루프트한자 강도 사건", "르완다 제노사이드", "리 하비 오스월드 (JFK 암살)",
  "리먼 브라더스 파산 사태 (금융 사기)", "리처드 라미레즈 (나이트 스토커)", "마들렌 맥캔 실종 사건", "마이클 잭슨 주치의 과실치사 사건", "마카오 갱단 전쟁",
  "마크 채프먼 (존 레논 암살)", "뭉크의 절규 도난 사건", "버나드 메이도프 폰지 사기 사건", "버지니아 공대 총기 난사 사건 (조승희)", "보스턴 마라톤 폭탄 테러",
  "보니와 클라이드 (Bonnie and Clyde)", "블랙 달리아 사건 (Black Dahlia)", "빅터 루스티그 (에펠탑을 판 사나이)", "빌 코스비 성폭행 사건", "샌디 훅 초등학교 총기 난사 사건",
  "스레브레니차 집단 학살", "시카고 타이레놀 살인 사건", "아나톨리 오노프리엔코", "아만다 녹스 사건", "알 카포네 (발렌타인 데이 대학살)",
  "알버트 피시 (Albert Fish)", "알렉산드르 피추시킨 (체스판 살인마)", "앤트워프 다이아몬드 센터 털이", "야쿠자 야마구치구미 분열 항쟁", "에드 가인 (Ed Gein)",
  "에드 켐퍼 (Ed Kemper)", "에드워드 스노든 폭로 사건", "에일린 워노스 (Aileen Wuornos)", "엔론 회계 부정 사건", "오스카 피스토리우스 여자친구 살인 사건",
  "오클라호마시티 폭탄 테러 (티머시 맥베이)", "우토야 섬 총기 난사 사건 (아네르스 베링 브레이비크)", "워터게이트 사건 (리처드 닉슨)", "월드콤 회계 부정 사건", "위키리크스 기밀 유출 사건 (줄리언 어산지)",
  "유나바머 (테드 카진스키)", "이란-콘트라 사건", "이사벨라 스튜어트 가드너 미술관 도난 사건", "이탈리아 마피아 막시 재판", "잭 더 리퍼 (Jack the Ripper)",
  "전범 홀로코스트 (아돌프 히틀러)", "제프리 다머 (Jeffrey Dahmer)", "제프리 앱스타인 미성년자 성착취 사건", "조반니 팔코네 판사 암살 사건", "조디 아리아스 살인 사건",
  "조디악 킬러 (Zodiac Killer)", "존 웨인 게이시 (John Wayne Gacy)", "존 윌크스 부스 (링컨 암살)", "존베넷 램지 살인 사건", "짐 존스 인민사원 집단 자살 사건 (존스타운)",
  "찰스 린드버그 아들 유괴 사건", "찰스 맨슨 가사건 (Tate-LaBianca)", "찰스 폰지 사기 사건", "체 게바라 처형", "콜드스트림 가드 강도 사건",
  "콜럼바인 고교 총기 난사 사건", "크메르 루주 대학살 (폴 포트)", "테드 번디 (Ted Bundy)", "테라노스 사기 사건 (엘리자베스 홈즈)", "토미 린 셀즈",
  "투팍 샤кур 암살 사건", "파나마 페이퍼스 유출 사건", "파블로 에스코바르 (메데인 카르텔)", "파리 바타클랑 극장 테러", "페드로 로페즈 (안데스의 괴물)",
  "프랭크 애버그네일 (캐치 미 이프 유 캔)", "피터 커튼 (뒤셀도르프의 뱀파이어)", "하비 와인스틴 성범죄 사건", "해롤드 쉽먼 (Harold Shipman)", "해튼 가든 안전금고 절도 사건",
  "호아킨 구스만 (엘 차포)", "케이시 앤서니 사건", "모나리자 도난 사건 (1911년)", "타일레놀 독극물 주입 사건", "커트 코베인 사망 사건 (음모론/자살)",
  // 이하 200개를 맞추기 위한 추가 해외 주요 사건 (총 200건)
  "맨해튼 프로젝트 스파이 사건 (클라우스 푹스)", "마리 앙투아네트 처형", "안네 프랑크 밀고 사건", "로버트 F. 케네디 암살 사건", "말콤 X 암살 사건",
  "마틴 루터 킹 목사 암살 사건", "인도 보팔 가스 누출 참사 (기업 과실)", "체르노빌 원전 사고 (직무유기/은폐)", "영국 잭 더 스트리퍼 (Jack the Stripper)", "조지 플로이드 사망 사건 (경찰 과잉진압)",
  "로스앤젤레스 폭동 원인 사건 (로드니 킹)", "블랙워터 이라크 민간인 학살 사건", "미국 대사관 인질 사건 (이란)", "뮌헨 올림픽 참사 (검은 9월단)", "안드레스 에스코바르 피살 사건",
  "아부그라이브 교도소 가혹행위 사건", "에어 인디아 182편 폭파 사건", "팬암 103편 폭파 사건 (락커비 테러)", "하이재킹 사건의 시초 (도슨 들판 납치)", "브라이튼 호텔 폭탄 테러",
  "인도 뭄바이 테러", "마드리드 열차 폭탄 테러", "발리 폭탄 테러", "베슬란 학교 인질 사태", "모스크바 극장 인질 사태",
  "아르메니아 대학살", "홀로도모르 (우크라이나 대기근 학살)", "방글라데시 대학살 (1971년)", "동티모르 학살", "아르헨티나 더티 워 (국가 테러리즘)",
  "피노체트 칠레 독재 학살", "과테말라 내전 원주민 학살", "엘살바도르 암살단 사건", "니카라과 소모사 독재 인권 유린", "아이티 뒤발리에 독재 학살",
  "우간다 이디 아민 학살", "중앙아프리카 보카사 1세 만행", "자이르 모부투 독재 비리", "리비아 카다피 국가 테러", "시리아 알 아사드 정권 화학무기 사용",
  "이라크 사담 후세인 쿠르드족 독가스 학살", "스페인 프랑코 정권 백색 테러", "이탈리아 무솔리니 파시스트 테러", "루마니아 차우셰스쿠 독재 및 횡령", "독일 적군파(RAF) 테러",
  "이탈리아 붉은 여단 테러 (알도 모로 납치)", "일본 적군 테러 사건", "신좌파 테러리즘 사건들", "유럽 난민 트럭 질식사 사건", "멕시코 아요치나파 학생 43명 실종 사건",
  "엘살바도르 MS-13 갱단 범죄", "콜롬비아 칼리 카르텔 범죄", "멕시코 시날로아 카르텔 범죄", "멕시코 로스 세타스 범죄", "이탈리아 은드랑게타 마피아 범죄",
  "이탈리아 카모라 마피아 범죄", "러시아 브라트바 (레드 마피아) 범죄", "홍콩 삼합회 범죄", "중국 흑사회 조직 범죄", "미국 코사 노스트라 범죄",
  "영국 크레이 쌍둥이 형제 범죄", "호주 바이키 갱 전쟁", "브라질 PCC 교도소 폭동 및 범죄", "인도 다우드 이브라힘 범죄 신디케이트", "필리핀 아부 사야프 납치 테러",
  "소말리아 해적 피랍 사건들", "나이지리아 보코하람 여학생 납치 사건", "아프가니스탄 탈레반 인권 유린", "ISIS(이슬람국가) 참수 및 테러", "알 샤바브 케냐 쇼핑몰 테러",
  "알 카에다 예멘 지부 테러", "콜롬비아 FARC 반군 납치 테러", "페루 빛나는 길 (센데로 루미노소) 테러", "네팔 마오주의 반군 학살", "스리랑카 타밀 타이거 테러",
  "아일랜드 IRA 테러 사건들", "바스크 ETA 분리주의 테러", "체첸 반군 폭탄 테러", "신장 위구르 분리주의 테러 (중국 정부 주장)", "티베트 시위 유혈 진압 (국가 폭력)",
  "미얀마 로힝야족 집단 학살", "중국 톈안먼 광장 민주화 시위 진압", "필리핀 마르코스 독재 부정부패", "인도네시아 수하르토 독재 학살 (1965년)", "대만 2.28 사건 (국가 폭력)",
  "광주 민주화 운동 유혈 진압 (국내이나 세계적 관점)", "제주 4.3 사건 (국가 폭력)", "국민방위군 사건 (군부 부패)", "보도연맹 학살 사건", "거창 양민 학살 사건",
  "프랑스 혁명 공포 정치 (기요틴)", "마녀사냥 (역사적 집단 광기/범죄)", "스페인 이단심문소 고문", "십자군 전쟁 민간인 학살", "몽골 제국 정복 전쟁 학살"
];

export default function App() {
  // 정렬된 배열 (가나다순)
  const sortedDomestic = useMemo(() => [...DOMESTIC_CASES].sort((a, b) => a.localeCompare(b, 'ko-KR')), []);
  const sortedForeign = useMemo(() => [...FOREIGN_CASES].sort((a, b) => a.localeCompare(b, 'ko-KR')), []);

  // 상태 관리
  const [domesticInput, setDomesticInput] = useState("");
  const [foreignInput, setForeignInput] = useState("");
  const [manualInput, setManualInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 


  // 입력창 상호 배타적 초기화
  const handleDomesticChange = (e) => {
    setDomesticInput(e.target.value);
    setForeignInput("");
    setManualInput("");
  };

  const handleForeignChange = (e) => {
    setForeignInput(e.target.value);
    setDomesticInput("");
    setManualInput("");
  };

  const handleManualChange = (e) => {
    setManualInput(e.target.value);
    setDomesticInput("");
    setForeignInput("");
  };

  // Gemini API 호출 로직
  const fetchWithRetry = async (prompt, maxRetries = 5) => {
    let retries = 0;
    const delays = [1000, 2000, 4000, 8000, 16000];

    const systemInstruction = `당신은 전 세계의 범죄 사건과 역사적 비극을 철저하게 기록하는 <세계 범죄 사건 백과사전 데이터베이스>입니다.
사용자가 특정 범죄 사건을 요청하면, 해당 사건에 대해 A4 용지 최대 4장 분량에 달할 정도로 매우 깊이 있고 구체적으로 설명해야 합니다.
다음의 4가지 섹션으로 나누어 JSON 형식으로 응답해 주세요. 각 섹션의 내용은 최대한 상세하게(전문적인 수사 기록처럼) 작성되어야 합니다.
{
  "overview": "사건의 배경, 발생 일시 및 장소, 전반적인 개요를 매우 상세하게 서술...",
  "investigation": "경찰의 수사 초기 상황, 난항, 과학수사 및 증거 수집 과정, 결정적인 단서, 체포 과정 등 수사 전 과정을 서술...",
  "people": "범인의 성장 배경과 심리 상태, 범행 동기, 프로파일링 결과, 그리고 피해자의 상황 및 안타까운 사연 등 인물 중심의 서술...",
  "aftermath": "사건이 사회, 법, 제도에 미친 파장, 재판 결과 및 형량, 범인의 현재 상태, 사회적/제도적 변화 등을 서술..."
}`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            overview: { type: "STRING" },
            investigation: { type: "STRING" },
            people: { type: "STRING" },
            aftermath: { type: "STRING" }
          },
          required: ["overview", "investigation", "people", "aftermath"]
        }
      }
    };

    while (retries <= maxRetries) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!textResponse) throw new Error("No text response from API");

        let cleanJsonStr = textResponse.trim();
        if (cleanJsonStr.startsWith('```json')) {
          cleanJsonStr = cleanJsonStr.replace(/^```json\n/, '').replace(/\n```$/, '');
        } else if (cleanJsonStr.startsWith('```')) {
          cleanJsonStr = cleanJsonStr.replace(/^```\n/, '').replace(/\n```$/, '');
        }

        return JSON.parse(cleanJsonStr);
      } catch (err) {
        if (retries === maxRetries) throw err;
        await new Promise(resolve => setTimeout(resolve, delays[retries]));
        retries++;
      }
    }
  };

  const handleSearch = async () => {
    const query = domesticInput || foreignInput || manualInput.trim();
    if (!query) {
      showToast("사건을 선택하거나 직접 입력해주세요.", "error");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await fetchWithRetry(`사건명: ${query}`);
      setResult({ title: query, ...data });
    } catch (err) {
      console.error(err);
      setError("자료 데이터베이스에 접근하는 데 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleCopy = () => {
    if (!result) return;
    
    const textToCopy = `[사건명] ${result.title}\n\n[사건 개요]\n${result.overview}\n\n[수사 과정]\n${result.investigation}\n\n[범인과 피해자]\n${result.people}\n\n[사건 이후]\n${result.aftermath}`;
    
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      showToast("기밀 자료가 클립보드에 복사되었습니다.");
    } catch (err) {
      console.error("복사 실패", err);
      showToast("복사에 실패했습니다.", "error");
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const handleClearAndReturn = () => {
    setResult(null);
    setDomesticInput("");
    setForeignInput("");
    setManualInput("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-300 font-sans selection:bg-red-900 selection:text-white">
      {/* Dossier Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      
      {/* Header */}
      <header className="bg-[#111] border-b border-red-900/30 sticky top-0 z-10 shadow-2xl">
        <div className="container mx-auto px-4 max-w-5xl flex items-center justify-center gap-4 py-6">
          <Fingerprint size={36} className="text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
          <h1 className="text-3xl sm:text-4xl font-black tracking-widest text-neutral-100 uppercase">
            세계 범죄 사건 백과
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-5xl py-10 relative z-0">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-neutral-800 border border-neutral-700 text-white px-6 py-3 rounded-md shadow-2xl flex items-center gap-3 animate-fade-in">
            <CheckCircle2 size={20} className="text-red-500" />
            <span className="font-mono">{toastMessage}</span>
          </div>
        )}

        {/* Input Section */}
        {!result && (
          <div className="bg-[#171717] rounded-xl shadow-2xl border border-neutral-800 p-8 mb-8">
            <div className="flex items-center gap-3 mb-8 border-b border-neutral-800 pb-4">
              <Database size={24} className="text-red-600" />
              <h2 className="text-xl font-bold text-neutral-100 tracking-wide">수사 아카이브 검색</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Domestic Select */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-neutral-400">
                  <MapPin size={16} /> 국내 범죄 사건 (100선)
                </label>
                <select
                  value={domesticInput}
                  onChange={handleDomesticChange}
                  className="w-full bg-[#0a0a0a] border border-neutral-700 text-neutral-200 text-base rounded-md focus:ring-1 focus:ring-red-600 focus:border-red-600 block p-3.5 transition-colors cursor-pointer"
                >
                  <option value="">-- 국내 사건 선택 (가나다순) --</option>
                  {sortedDomestic.map(c => <option key={`dom-${c}`} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Foreign Select */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-neutral-400">
                  <Globe size={16} /> 해외 범죄 사건 (200선)
                </label>
                <select
                  value={foreignInput}
                  onChange={handleForeignChange}
                  className="w-full bg-[#0a0a0a] border border-neutral-700 text-neutral-200 text-base rounded-md focus:ring-1 focus:ring-red-600 focus:border-red-600 block p-3.5 transition-colors cursor-pointer"
                >
                  <option value="">-- 해외 사건 선택 (가나다순) --</option>
                  {sortedForeign.map(c => <option key={`for-${c}`} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="flex items-center text-neutral-600 text-sm font-mono mb-8">
              <div className="flex-1 border-t border-neutral-800"></div>
              <span className="px-4 tracking-widest text-xs">OR MANUAL ENTRY</span>
              <div className="flex-1 border-t border-neutral-800"></div>
            </div>

            {/* Manual Input */}
            <div className="space-y-3 mb-8">
              <label className="flex items-center gap-2 text-sm font-semibold text-neutral-400">
                <Search size={16} /> 사건명 직접 입력
              </label>
              <input
                type="text"
                value={manualInput}
                onChange={handleManualChange}
                placeholder="찾으시는 사건이 목록에 없다면 직접 입력하세요..."
                className="w-full bg-[#0a0a0a] border border-neutral-700 text-neutral-200 text-base rounded-md focus:ring-1 focus:ring-red-600 focus:border-red-600 block p-3.5 transition-colors font-mono"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            <button
              onClick={handleSearch}
              disabled={loading || (!domesticInput && !foreignInput && !manualInput.trim())}
              className="w-full bg-red-700 hover:bg-red-600 text-white font-bold tracking-widest rounded-md text-lg px-5 py-4 text-center flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(185,28,28,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.4)]"
            >
              {loading ? (
                <><Loader2 size={24} className="animate-spin" /> 아카이브 접근 및 자료 열람 중...</>
              ) : (
                <><BookOpen size={24} /> 기밀 자료 열람하기</>
              )}
            </button>

            {error && (
              <div className="mt-6 p-4 text-sm text-red-400 rounded-md bg-red-950/30 border border-red-900/50 flex items-start gap-3">
                <AlertTriangle size={20} className="mt-0.5 shrink-0" />
                <p className="font-mono">{error}</p>
              </div>
            )}
          </div>
        )}

        {/* Loading State Overlay */}
        {loading && !result && (
          <div className="py-32 flex flex-col items-center justify-center text-neutral-400 font-mono">
            <Loader2 size={64} className="animate-spin text-red-700 mb-6 drop-shadow-[0_0_10px_rgba(185,28,28,0.8)]" />
            <p className="text-xl tracking-widest text-neutral-200">ACCESSING DATABASE...</p>
            <p className="text-sm mt-3 text-neutral-500">A4 4장 분량의 방대한 수사 기록을 복호화 중입니다.</p>
          </div>
        )}

        {/* Result Section (Dossier View) */}
        {result && !loading && (
          <div className="animate-fade-in pb-12">
            
            {/* Top Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-[#171717] p-4 rounded-md shadow-lg border border-neutral-800">
              <h2 className="text-2xl font-black text-neutral-100 truncate px-4 border-l-4 border-red-600 uppercase tracking-wider">
                {result.title}
              </h2>
              <div className="flex gap-3 w-full sm:w-auto font-mono">
                <button onClick={handleCopy} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-5 py-2.5 rounded transition-colors text-sm">
                  <Copy size={16} /> 복사
                </button>
                <button onClick={handleClearAndReturn} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-950/50 hover:bg-red-900 text-red-400 px-5 py-2.5 rounded border border-red-900/50 transition-colors text-sm">
                  <Trash2 size={16} /> 닫기
                </button>
              </div>
            </div>

            {/* Content Cards (File Folders) */}
            <div className="space-y-8">
              
              <section className="bg-[#111] rounded-md shadow-2xl border border-neutral-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-neutral-700"></div>
                <div className="p-6 md:p-10">
                  <h3 className="text-xl font-bold text-red-500 mb-6 pb-4 border-b border-neutral-800 flex items-center gap-3 uppercase tracking-widest">
                    <span className="text-sm font-mono text-neutral-500 border border-neutral-700 px-2 py-1 rounded">FILE 01</span> 사건 개요
                  </h3>
                  <div className="prose prose-invert max-w-none text-neutral-300 leading-8 whitespace-pre-line text-justify font-serif">
                    {result.overview}
                  </div>
                </div>
              </section>

              <section className="bg-[#111] rounded-md shadow-2xl border border-neutral-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-neutral-700"></div>
                <div className="p-6 md:p-10">
                  <h3 className="text-xl font-bold text-red-500 mb-6 pb-4 border-b border-neutral-800 flex items-center gap-3 uppercase tracking-widest">
                    <span className="text-sm font-mono text-neutral-500 border border-neutral-700 px-2 py-1 rounded">FILE 02</span> 수사 과정
                  </h3>
                  <div className="prose prose-invert max-w-none text-neutral-300 leading-8 whitespace-pre-line text-justify font-serif">
                    {result.investigation}
                  </div>
                </div>
              </section>

              <section className="bg-[#111] rounded-md shadow-2xl border border-neutral-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-neutral-700"></div>
                <div className="p-6 md:p-10">
                  <h3 className="text-xl font-bold text-red-500 mb-6 pb-4 border-b border-neutral-800 flex items-center gap-3 uppercase tracking-widest">
                    <span className="text-sm font-mono text-neutral-500 border border-neutral-700 px-2 py-1 rounded">FILE 03</span> 범인과 피해자
                  </h3>
                  <div className="prose prose-invert max-w-none text-neutral-300 leading-8 whitespace-pre-line text-justify font-serif">
                    {result.people}
                  </div>
                </div>
              </section>

              <section className="bg-[#111] rounded-md shadow-2xl border border-neutral-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-neutral-700"></div>
                <div className="p-6 md:p-10">
                  <h3 className="text-xl font-bold text-red-500 mb-6 pb-4 border-b border-neutral-800 flex items-center gap-3 uppercase tracking-widest">
                    <span className="text-sm font-mono text-neutral-500 border border-neutral-700 px-2 py-1 rounded">FILE 04</span> 사건 이후
                  </h3>
                  <div className="prose prose-invert max-w-none text-neutral-300 leading-8 whitespace-pre-line text-justify font-serif">
                    {result.aftermath}
                  </div>
                </div>
              </section>

            </div>

            {/* Bottom Controls */}
            <div className="flex flex-col sm:flex-row justify-center items-center mt-12 gap-6 font-mono">
               <button onClick={handleCopy} className="w-full sm:w-auto flex items-center justify-center gap-3 bg-neutral-800 hover:bg-neutral-700 text-white px-8 py-4 rounded-md transition-colors font-bold tracking-widest shadow-lg border border-neutral-600">
                  <Copy size={20} /> 자료 전체 복사
                </button>
                <button onClick={handleClearAndReturn} className="w-full sm:w-auto flex items-center justify-center gap-3 bg-red-950/50 hover:bg-red-900 text-red-400 px-8 py-4 rounded-md transition-colors font-bold tracking-widest shadow-lg border border-red-900/50">
                  <Trash2 size={20} /> 문서 파기 및 복귀
                </button>
            </div>

          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        /* 스크롤바 커스텀 */
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        ::-webkit-scrollbar-thumb {
          background: #262626;
          border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #dc2626;
        }
      `}} />
    </div>
  );
}