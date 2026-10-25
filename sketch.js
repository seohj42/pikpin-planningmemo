let spots = [];
let draggedSpot = null;
let currentEditingSpot = null;

let currentDayFilter = 1;
let selectedSpotDay = 1;
let isDistanceView = false;
let distanceViewProgress = 0;

// [기본 제공 데이터 1] Day 목록
const DEFAULT_DAYS = [
  { id: 1, title: "Day 1" },
  { id: 2, title: "Day 2" },
  { id: 3, title: "Day 3" },
  { id: 4, title: "Day 4" },
  { id: 5, title: "Day 5" },
];

// [기본 제공 데이터 2] 메인 헤더
const DEFAULT_HEADER = {
  mainTitle: "도쿄 & 나고야 4박 5일 여행 계획",
  subTitle: "도쿄(3박) · 나고야(1박) 코스",
};

// [기본 제공 데이터 3] Day별 숙소
const DEFAULT_BASES_BY_DAY = {
  1: {
    name: "호텔 선루트 플라자 신주쿠",
    address: "〒151-0053 東京都渋谷区代々木2-3-1",
    memo: "체크인",
  },
  2: {
    name: "호텔 선루트 플라자 신주쿠",
    address: "〒151-0053 東京都渋谷区代々木2-3-1",
    memo: "연박",
  },
  3: {
    name: "호텔 선루트 플라자 신주쿠",
    address: "〒151-0053 東京都渋谷区代々木2-3-1",
    memo: "연박",
  },
  4: {
    name: "비아 인 나고야 에키마에 츠바키초",
    address: "愛知県名古屋市中村区椿町15-28",
    memo: "신칸센 이동 후 체크인",
  },
  5: {
    name: "비아 인 나고야 에키마에 츠바키초",
    address: "愛知県名古屋市中村区椿町15-28",
    memo: "",
  },
};

// [기본 제공 데이터 4] 장소 핀 목록
const DEFAULT_SPOTS = [
  // DAY 1 — 아사쿠사·스카이트리
  {
    id: 101,
    day: 1,
    order: 1,
    name: "센소지",
    category: "관광지",
    address: "〒111-0032 東京都台東区浅草2-3-1",
    transport: "지하철",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.28,
    scatterY: 0.38,
    angle: -0.8,
    memo: "",
  },
  {
    id: 102,
    day: 1,
    order: 2,
    name: "나카미세도리",
    category: "쇼핑",
    address: "〒111-0032 東京都台東区浅草2-3-1",
    transport: "도보",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.38,
    scatterY: 0.45,
    angle: -0.4,
    memo: "",
  },
  {
    id: 103,
    day: 1,
    order: 3,
    name: "아사쿠사 이마한 본점",
    category: "식당",
    address: "〒111-0035 東京都台東区西浅草3-1-12",
    transport: "도보",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.48,
    scatterY: 0.35,
    angle: 0.0,
    memo: "점심 식사",
  },
  {
    id: 104,
    day: 1,
    order: 4,
    name: "도쿄 스카이트리",
    category: "관광지",
    address: "〒131-0045 東京都墨田区押上1-1-2",
    transport: "지하철",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.65,
    scatterY: 0.32,
    angle: 0.4,
    memo: "",
  },
  {
    id: 105,
    day: 1,
    order: 5,
    name: "도쿄 소라마치",
    category: "쇼핑",
    address: "〒131-0045 東京都墨田区押上1-1-2",
    transport: "도보",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.72,
    scatterY: 0.48,
    angle: 0.8,
    memo: "",
  },
  {
    id: 106,
    day: 1,
    order: 6,
    name: "아사쿠사 스시 (미정)",
    category: "식당",
    address: "",
    transport: "지하철",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.32,
    scatterY: 0.58,
    angle: 3.14,
    memo: "식당 선택 필요",
  },

  // DAY 2 — 메이지 신궁·하라주쿠·오모테산도
  {
    id: 201,
    day: 2,
    order: 1,
    name: "메이지 신궁",
    category: "관광지",
    address: "〒151-8557 東京都渋谷区代々木神園町1-1",
    transport: "지하철",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.25,
    scatterY: 0.32,
    angle: -0.6,
    memo: "",
  },
  {
    id: 202,
    day: 2,
    order: 2,
    name: "다케시타도리",
    category: "관광지",
    address: "〒150-0001 東京都渋谷区神宮前1丁目",
    transport: "도보",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.38,
    scatterY: 0.42,
    angle: -0.2,
    memo: "",
  },
  {
    id: 203,
    day: 2,
    order: 3,
    name: "AFURI 하라주쿠점",
    category: "식당",
    address: "〒150-0001 東京都渋谷区神宮前1-10-37",
    transport: "도보",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.48,
    scatterY: 0.36,
    angle: 0.2,
    memo: "점심 라멘",
  },
  {
    id: 204,
    day: 2,
    order: 4,
    name: "라포레 하라주쿠",
    category: "쇼핑",
    address: "〒150-0001 東京都渋谷区神宮前1-11-6",
    transport: "도보",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.58,
    scatterY: 0.52,
    angle: 0.6,
    memo: "",
  },
  {
    id: 205,
    day: 2,
    order: 5,
    name: "오모테산도",
    category: "관광지",
    address: "東京都渋谷区神宮前",
    transport: "도보",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.68,
    scatterY: 0.44,
    angle: 1.0,
    memo: "",
  },
  {
    id: 206,
    day: 2,
    order: 6,
    name: "오모테산도 식당 (미정)",
    category: "식당",
    address: "",
    transport: "도보",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.78,
    scatterY: 0.58,
    angle: 3.14,
    memo: "식당 선택 필요",
  },

  // DAY 3 — 시부야·다이칸야마·나카메구로
  {
    id: 301,
    day: 3,
    order: 1,
    name: "시부야 스크램블 교차로",
    category: "관광지",
    address: "〒150-0043 東京都渋谷区道玄坂2丁目",
    transport: "지하철",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.28,
    scatterY: 0.4,
    angle: -0.7,
    memo: "",
  },
  {
    id: 302,
    day: 3,
    order: 2,
    name: "시부야 스시 (미정)",
    category: "식당",
    address: "",
    transport: "도보",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.38,
    scatterY: 0.32,
    angle: 3.14,
    memo: "식당 선택 필요",
  },
  {
    id: 303,
    day: 3,
    order: 3,
    name: "다이칸야마 T-SITE",
    category: "관광지",
    address: "〒150-0033 東京都渋谷区猿楽町16-15",
    transport: "도보",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.52,
    scatterY: 0.55,
    angle: -0.1,
    memo: "서점 & 카페",
  },
  {
    id: 304,
    day: 3,
    order: 4,
    name: "다이칸야마 편집숍 거리",
    category: "쇼핑",
    address: "〒150-0033 東京都渋谷区猿楽町",
    transport: "도보",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.62,
    scatterY: 0.45,
    angle: 0.3,
    memo: "",
  },
  {
    id: 305,
    day: 3,
    order: 5,
    name: "나카메구로역·메구로강",
    category: "관광지",
    address: "〒153-0051 東京都目黒区上目黒",
    transport: "도보",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.72,
    scatterY: 0.62,
    angle: 0.7,
    memo: "",
  },
  {
    id: 306,
    day: 3,
    order: 6,
    name: "IVY PLACE",
    category: "식당",
    address: "〒150-0033 東京都渋谷区猿楽町16-15",
    transport: "도보",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.58,
    scatterY: 0.68,
    angle: 1.1,
    memo: "저녁 다이닝",
  },

  // DAY 4 — 나고야성·사카에
  {
    id: 401,
    day: 4,
    order: 1,
    name: "도쿄역 → 나고야역",
    category: "기타",
    address: "〒100-0005 東京都千代田区丸の内1丁目",
    transport: "기차",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.22,
    scatterY: 0.42,
    angle: -0.8,
    memo: "신칸센 이동",
  },
  {
    id: 402,
    day: 4,
    order: 2,
    name: "야바톤 나고야역 매장",
    category: "식당",
    address: "〒450-0002 愛知県名古屋市中村区名駅1-1-4",
    transport: "도보",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.38,
    scatterY: 0.52,
    angle: -0.3,
    memo: "미소카츠 점심",
  },
  {
    id: 403,
    day: 4,
    order: 3,
    name: "나고야성",
    category: "관광지",
    address: "〒460-0031 愛知県名古屋市中区本丸1-1",
    transport: "지하철",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.52,
    scatterY: 0.32,
    angle: 0.2,
    memo: "",
  },
  {
    id: 404,
    day: 4,
    order: 4,
    name: "오아시스 21",
    category: "관광지",
    address: "〒461-0005 愛知県名古屋市東区東桜1-11-1",
    transport: "지하철",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.68,
    scatterY: 0.48,
    angle: 0.6,
    memo: "야경 스팟",
  },
  {
    id: 405,
    day: 4,
    order: 5,
    name: "라시크(LACHIC)",
    category: "쇼핑",
    address: "〒460-0008 愛知県名古屋市中区栄3-6-1",
    transport: "도보",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.75,
    scatterY: 0.6,
    angle: 0.9,
    memo: "",
  },
  {
    id: 406,
    day: 4,
    order: 6,
    name: "세카이노 야마짱 본점",
    category: "식당",
    address: "〒460-0008 愛知県名古屋市中区栄4-9-6",
    transport: "도보",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.82,
    scatterY: 0.4,
    angle: 1.3,
    memo: "테바사키 저녁",
  },

  // DAY 5 — 아쓰타 신궁·오스 상점가
  {
    id: 501,
    day: 5,
    order: 1,
    name: "아쓰타 신궁",
    category: "관광지",
    address: "〒456-0031 愛知県名古屋市熱田区神宮1-1-1",
    transport: "지하철",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.28,
    scatterY: 0.35,
    angle: -0.6,
    memo: "",
  },
  {
    id: 502,
    day: 5,
    order: 2,
    name: "아쓰타 호라이켄 본점",
    category: "식당",
    address: "〒456-0043 愛知県名古屋市熱田区神戸町503",
    transport: "도보",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.42,
    scatterY: 0.48,
    angle: -0.1,
    memo: "히츠마부시 장어덮밥",
  },
  {
    id: 503,
    day: 5,
    order: 3,
    name: "오스칸논",
    category: "관광지",
    address: "〒460-0011 愛知県名古屋市中区大須2-21-47",
    transport: "지하철",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.58,
    scatterY: 0.38,
    angle: 0.4,
    memo: "",
  },
  {
    id: 504,
    day: 5,
    order: 4,
    name: "오스 상점가",
    category: "쇼핑",
    address: "愛知県名古屋市中区大須2丁目",
    transport: "도보",
    selected: true,
    cardBg: "#FFFFFF",
    scatterX: 0.72,
    scatterY: 0.55,
    angle: 0.8,
    memo: "쇼핑 및 기념품",
  },
];

let headerInfo = { ...DEFAULT_HEADER };
let baseInfo = { name: "", address: "", memo: "" };
let baseInfosByDay = {};
let editingBaseDayId = 1;
let baseRangeStartId = null;
let baseRangeEndId = null;
let baseRangeSelectingEnd = false;
let isBaseModalDirty = false;
let pressedBase = false;
let currentEditingLegSpot = null;

let selectedDayForMenu = null;
let clickTimer = null;
let pressStartX = 0;
let pressStartY = 0;

let zoomLevel = 1.0;
let panX = 0;
let panY = 0;
let isPanning = false;
let startPanX = 0;
let startPanY = 0;

const DEFAULT_CATEGORIES = [
  { name: "식당", color: "#FF7D61" },
  { name: "관광지", color: "#D8F255" },
  { name: "쇼핑", color: "#9D80FF" },
  { name: "카페", color: "#61D2FF" },
  { name: "기타", color: "#FFB84D" },
];

const NEW_CATEGORY_COLORS = [
  "#FF9EC4",
  "#7AE0B5",
  "#FFD166",
  "#B8A9FF",
  "#8EC5FF",
  "#FF9F7A",
  "#A5E36B",
  "#F28CF2",
];

const UNCATEGORIZED_COLOR = "#D5D8DD";

let categories = DEFAULT_CATEGORIES.map((c) => ({
  name: c.name,
  color: c.color,
}));
let activeLayers = {};
let selectedCategoryName = "";
let isAddingCategory = false;

function escapeHtml(text) {
  const escapeMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return String(text).replace(/[&<>"']/g, (ch) => escapeMap[ch]);
}

const TRANSPORT_MODE_VALUES = {
  walk: "도보",
  car: "자동차",
  bus: "버스",
  subway: "지하철",
};

function selectTransport(prefix, mode) {
  const input = document.getElementById(`${prefix}-transport-input`);
  const optionGroup = document.getElementById(`${prefix}-transport-options`);
  if (!input || !optionGroup) return;

  optionGroup.querySelectorAll(".transport-option").forEach((button) => {
    const isSelected = button.dataset.mode === mode;
    button.classList.toggle("active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
    button.style.backgroundColor = isSelected ? "#e9edf2" : "#ffffff";
    button.style.borderColor = isSelected ? "#656d78" : "#d9dde3";
    button.style.color = isSelected ? "#252a31" : "#454b55";
    button.style.boxShadow = isSelected ? "0 0 0 1px #656d78 inset" : "none";
  });
  const isOther = mode === "other";
  input.hidden = !isOther;
  if (isOther) {
    if (Object.values(TRANSPORT_MODE_VALUES).includes(input.value))
      input.value = "";
    input.focus();
  } else {
    input.value = TRANSPORT_MODE_VALUES[mode] || "";
  }
}

function syncTransportSelection(prefix, value) {
  const normalizedValue = String(value || "").trim();
  const mode = Object.keys(TRANSPORT_MODE_VALUES).find(
    (key) => TRANSPORT_MODE_VALUES[key] === normalizedValue,
  );
  const input = document.getElementById(`${prefix}-transport-input`);
  const optionGroup = document.getElementById(`${prefix}-transport-options`);
  if (!input || !optionGroup) return;

  const selectedMode = mode || (normalizedValue ? "other" : "");
  optionGroup.querySelectorAll(".transport-option").forEach((button) => {
    const isSelected = button.dataset.mode === selectedMode;
    button.classList.toggle("active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
    button.style.backgroundColor = isSelected ? "#e9edf2" : "#ffffff";
    button.style.borderColor = isSelected ? "#656d78" : "#d9dde3";
    button.style.color = isSelected ? "#252a31" : "#454b55";
    button.style.boxShadow = isSelected ? "0 0 0 1px #656d78 inset" : "none";
  });
  input.hidden = selectedMode !== "other";
  input.value = mode ? normalizedValue : normalizedValue;
}

function getTransportValue(prefix) {
  const input = document.getElementById(`${prefix}-transport-input`);
  return input ? input.value.trim() : "";
}

function formatTransportAction(value) {
  const mode = String(value || "").trim();
  const knownActions = {
    도보: "도보로 이동",
    "도보로 이동": "도보로 이동",
    자동차: "차로 이동",
    차량: "차로 이동",
    "차량으로 이동": "차로 이동",
    "자동차로 이동": "차로 이동",
    차: "차로 이동",
    버스: "버스로 이동",
    "버스로 이동": "버스로 이동",
    지하철: "지하철로 이동",
    "지하철로 이동": "지하철로 이동",
    기차: "기차로 이동",
    "기차로 이동": "기차로 이동",
    비행기: "비행기로 이동",
    "비행기로 이동": "비행기로 이동",
    배: "배로 이동",
    "배로 이동": "배로 이동",
  };
  if (!mode || mode === "교통수단 미정") return "교통수단 미정";
  return knownActions[mode] || `${mode}로 이동`;
}

function formatTransportName(value) {
  const normalized = String(value || "").trim();
  const canonicalNames = {
    차량: "자동차",
    차: "자동차",
    "차로 이동": "자동차",
    "차량으로 이동": "자동차",
    "자동차로 이동": "자동차",
    "도보로 이동": "도보",
    "버스로 이동": "버스",
    "지하철로 이동": "지하철",
    "기차로 이동": "기차",
    "비행기로 이동": "비행기",
    "배로 이동": "배",
  };
  if (canonicalNames[normalized]) return canonicalNames[normalized];
  const action = formatTransportAction(value);
  return action.endsWith("로 이동") ? action.slice(0, -4) : action;
}

function normalizeBaseInfo(info) {
  return {
    name: info && info.name ? String(info.name) : "",
    address: info && info.address ? String(info.address) : "",
    memo: info && info.memo ? String(info.memo) : "",
  };
}

function getBaseInfoForDay(dayId) {
  return normalizeBaseInfo(baseInfosByDay[String(dayId)]);
}

function renderBaseDayRange() {
  const container = document.getElementById("base-day-range");
  if (!container) return;

  const currentBase = getBaseInfoForDay(editingBaseDayId);
  const currentKey = `${currentBase.name}|${currentBase.address}|${currentBase.memo}`;

  const startIndex = daysData.findIndex(
    (day) => Number(day.id) === Number(baseRangeStartId),
  );
  const endIndex = daysData.findIndex(
    (day) => Number(day.id) === Number(baseRangeEndId),
  );
  const rangeSelected = startIndex >= 0 && endIndex >= 0;
  const lowId = rangeSelected
    ? Math.min(Number(baseRangeStartId), Number(baseRangeEndId))
    : null;
  const highId = rangeSelected
    ? Math.max(Number(baseRangeStartId), Number(baseRangeEndId))
    : null;

  container.innerHTML = daysData
    .map((day) => {
      const isStart = rangeSelected && Number(day.id) === lowId;
      const isEnd = rangeSelected && Number(day.id) === highId;
      const inCurrentRange =
        rangeSelected && Number(day.id) >= lowId && Number(day.id) <= highId;
      const connectsForward = inCurrentRange && Number(day.id) < highId;

      const dayBase = getBaseInfoForDay(day.id);
      const dayKey = `${dayBase.name}|${dayBase.address}|${dayBase.memo}`;
      const isConnectedOther =
        !inCurrentRange && dayBase.name !== "" && dayKey !== currentKey;

      let classNames = "base-day-range-btn";
      if (inCurrentRange) classNames += " in-range active";
      if (connectsForward) classNames += " connects-forward";
      if (isStart) classNames += " range-start";
      if (isEnd) classNames += " range-end";
      if (isConnectedOther) classNames += " connected-other";

      return `<button type="button" class="${classNames}" data-base-day="${day.id}" aria-label="${escapeHtml(day.title)}" onclick="selectBaseRangeDay(${day.id})">D${day.id}</button>`;
    })
    .join("");

  const startDay = daysData.find(
    (day) => Number(day.id) === Number(baseRangeStartId),
  );
  const endDay = daysData.find(
    (day) => Number(day.id) === Number(baseRangeEndId),
  );
  document.getElementById("base-range-start-label").textContent = startDay
    ? startDay.title
    : "선택";
  document.getElementById("base-range-end-label").textContent = endDay
    ? endDay.title
    : "선택";
  document.getElementById("base-range-hint").textContent = !rangeSelected
    ? "숙박할 날짜를 선택하세요. 당일치기의 경우 하루만 선택하면 됩니다."
    : baseRangeSelectingEnd
      ? "기간을 지정하려면 종료 날짜를 누르세요. 완료 후 숙소 정보를 적어주세요."
      : "선택한 기간에 숙소 정보가 설정됩니다.";
}

function keepBaseModalInputState() {
  isBaseModalDirty = true;
}

function selectBaseRangeDay(dayId) {
  const clickedId = Number(dayId);
  const hasSelection = baseRangeStartId != null && baseRangeEndId != null;

  if (baseRangeSelectingEnd && clickedId === Number(baseRangeStartId)) {
    baseRangeStartId = null;
    baseRangeEndId = null;
    baseRangeSelectingEnd = false;
  } else if (
    !baseRangeSelectingEnd &&
    hasSelection &&
    (clickedId === Number(baseRangeStartId) ||
      clickedId === Number(baseRangeEndId))
  ) {
    baseRangeStartId = null;
    baseRangeEndId = null;
    baseRangeSelectingEnd = false;
  } else if (!baseRangeSelectingEnd) {
    baseRangeStartId = clickedId;
    baseRangeEndId = clickedId;
    baseRangeSelectingEnd = true;

    editingBaseDayId = clickedId;
    const startBase = getBaseInfoForDay(clickedId);

    if (!isBaseModalDirty) {
      document.getElementById("input-base-name").value = startBase.name;
      document.getElementById("input-base-address").value = startBase.address;
      document.getElementById("input-base-memo").value = startBase.memo;
    }
  } else {
    baseRangeStartId = Math.min(Number(baseRangeStartId), clickedId);
    baseRangeEndId = Math.max(Number(baseRangeEndId), clickedId);
    baseRangeSelectingEnd = false;
  }
  renderBaseDayRange();
}

function addNewBaseGroup() {
  baseRangeStartId = null;
  baseRangeEndId = null;
  baseRangeSelectingEnd = false;
  isBaseModalDirty = false;

  document.getElementById("input-base-name").value = "";
  document.getElementById("input-base-address").value = "";
  document.getElementById("input-base-memo").value = "";

  renderBaseDayRange();
}

function fillBaseModalForDay(dayId) {
  editingBaseDayId = Number(dayId) || currentDayFilter;
  const targetBase = getBaseInfoForDay(editingBaseDayId);

  let start = editingBaseDayId;
  let end = editingBaseDayId;

  if (targetBase.name || targetBase.address) {
    const key = `${targetBase.name}|${targetBase.address}|${targetBase.memo}`;
    const matchedDays = daysData.filter((d) => {
      const b = getBaseInfoForDay(d.id);
      return `${b.name}|${b.address}|${b.memo}` === key;
    });
    if (matchedDays.length > 0) {
      start = matchedDays[0].id;
      end = matchedDays[matchedDays.length - 1].id;
    }
  }

  baseRangeStartId = start;
  baseRangeEndId = end;
  baseRangeSelectingEnd = false;
  isBaseModalDirty = false;

  document.getElementById("input-base-name").value = targetBase.name;
  document.getElementById("input-base-address").value = targetBase.address;
  document.getElementById("input-base-memo").value = targetBase.memo;

  renderBaseDayRange();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 저장된 데이터가 있으면 안전하게 불러오고, 없으면 기본값 설정
  let savedSpots = getItem("myTripSpots");
  let savedDays = getItem("myTripDays");
  let savedHeader = getItem("myTripHeader");
  let savedCategories = getItem("myTripCategories");
  let savedBasesByDay = getItem("myTripBases");

  if (!savedSpots || savedSpots.length === 0) {
    headerInfo = { ...DEFAULT_HEADER };
    daysData = [...DEFAULT_DAYS];
    spots = JSON.parse(JSON.stringify(DEFAULT_SPOTS));

    Object.entries(DEFAULT_BASES_BY_DAY).forEach(([dayId, info]) => {
      baseInfosByDay[dayId] = normalizeBaseInfo(info);
    });

    storeItem("myTripHeader", headerInfo);
    storeItem("myTripDays", daysData);
    storeItem("myTripBases", baseInfosByDay);
    storeItem("myTripSpots", spots);
  } else {
    headerInfo = savedHeader || { ...DEFAULT_HEADER };
    daysData = savedDays && savedDays.length ? savedDays : [...DEFAULT_DAYS];
    spots = savedSpots;

    if (savedBasesByDay) {
      Object.entries(savedBasesByDay).forEach(([dayId, info]) => {
        baseInfosByDay[dayId] = normalizeBaseInfo(info);
      });
    } else {
      Object.entries(DEFAULT_BASES_BY_DAY).forEach(([dayId, info]) => {
        baseInfosByDay[dayId] = normalizeBaseInfo(info);
      });
    }
  }

  currentDayFilter = daysData[0].id;
  selectedSpotDay = currentDayFilter;
  baseInfo = getBaseInfoForDay(currentDayFilter);

  if (savedCategories && savedCategories.length > 0) {
    categories = savedCategories;
  }

  updateHeaderUI();
  ensureCategoriesForSpots();
  categories.forEach((c) => (activeLayers[c.name] = true));
  selectedCategoryName = categories[0].name;

  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".dropdown-menu") &&
      !e.target.closest(".day-opt-btn")
    ) {
      closeDropdownMenu();
    }

    const sidebar = document.getElementById("sidebar");
    const isDesktop = window.matchMedia("(min-width: 601px)").matches;
    if (
      isDesktop &&
      sidebar &&
      sidebar.classList.contains("open") &&
      !(e.composedPath
        ? e.composedPath().includes(sidebar)
        : sidebar.contains(e.target)) &&
      !e.target.closest("#btn-toggle-sidebar")
    ) {
      sidebar.classList.remove("open");
    }
  });

  window.addEventListener("resize", drawDayConnectingLines);

  setupCategoryUI();
  renderLayerBar();
  renderCategoryChips();
  renderDayBarUI();
  renderSidebarDayBarUI();
  populateDaySelectOptions();
  updateViewModeButtons();
  reorderSpots();
}

function updateHeaderUI() {
  const mainEl = document.getElementById("header-main-title");
  const subEl = document.getElementById("header-sub-title");

  if (mainEl)
    mainEl.innerText = headerInfo.mainTitle || DEFAULT_HEADER.mainTitle;
  if (subEl) subEl.innerText = headerInfo.subTitle || DEFAULT_HEADER.subTitle;
}

function openBaseModal() {
  fillBaseModalForDay(currentDayFilter);
  document.getElementById("base-modal-overlay").classList.add("open");
}

function closeBaseModal() {
  document.getElementById("base-modal-overlay").classList.remove("open");
}

function saveBaseModal() {
  if (baseRangeStartId == null || baseRangeEndId == null) {
    alert("숙박 시작 날짜와 종료 날짜를 선택해주세요.");
    return;
  }
  const startId = Math.min(Number(baseRangeStartId), Number(baseRangeEndId));
  const endId = Math.max(Number(baseRangeStartId), Number(baseRangeEndId));
  const rangeDays = daysData.filter(
    (day) => Number(day.id) >= startId && Number(day.id) <= endId,
  );
  const nextBase = {
    name: document.getElementById("input-base-name").value.trim(),
    address: document.getElementById("input-base-address").value.trim(),
    memo: document.getElementById("input-base-memo").value.trim(),
  };
  const changedDayIds = [];
  rangeDays.forEach((day) => {
    const oldBase = getBaseInfoForDay(day.id);
    if (oldBase.name !== nextBase.name || oldBase.address !== nextBase.address)
      changedDayIds.push(Number(day.id));
    baseInfosByDay[String(day.id)] = { ...nextBase };
  });
  baseInfo = getBaseInfoForDay(currentDayFilter);
  if (changedDayIds.length) {
    spots.forEach((spot) => {
      if (!changedDayIds.includes(Number(spot.day))) return;
      spot.dist = null;
      spot.travelMinutes = null;
      spot.baseDistanceKm = null;
      spot.baseTravelMinutes = null;
      spot.routeStatus = "needs-update";
    });
    storeItem("myTripSpots", spots);
  }

  storeItem("myTripBases", baseInfosByDay);
  renderDayBarUI();
  closeBaseModal();
}

function openInGoogleMaps(query) {
  if (!query) {
    alert("주소나 이름을 먼저 입력해주세요.");
    return;
  }
  const url =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(query);
  window.open(url, "_blank", "noopener");
}

function ensureCategoriesForSpots() {
  spots.forEach((spot) => {
    if (!spot.category) return;
    const exists = categories.some((c) => c.name === spot.category);
    if (!exists) {
      categories.push({ name: spot.category, color: pickNewCategoryColor() });
    }
  });
}

function pickNewCategoryColor() {
  const used = categories.map((c) => c.color.toUpperCase());
  const free = NEW_CATEGORY_COLORS.find(
    (color) => !used.includes(color.toUpperCase()),
  );
  return (
    free || NEW_CATEGORY_COLORS[categories.length % NEW_CATEGORY_COLORS.length]
  );
}

function isSpotVisible(spot) {
  if (!spot.category) return true;
  return Boolean(activeLayers[spot.category]);
}

function setupCategoryUI() {
  const layerBar = document.getElementById("layer-bar");
  const chipBox = document.getElementById("category-chips");

  if (layerBar) {
    layerBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".layer-btn");
      if (!btn) return;
      toggleLayer(btn.dataset.cat);
    });
  }

  if (chipBox) {
    chipBox.addEventListener("click", (e) => {
      const delBtn = e.target.closest(".chip-del");
      if (delBtn) {
        e.stopPropagation();
        deleteCategory(delBtn.dataset.del);
        return;
      }

      const chip = e.target.closest(".chip");
      if (chip) {
        selectedCategoryName = chip.dataset.cat;
        renderCategoryChips();
        return;
      }

      const actBtn = e.target.closest("[data-act]");
      if (!actBtn) return;

      if (actBtn.dataset.act === "open") {
        isAddingCategory = true;
        renderCategoryChips();
      } else if (actBtn.dataset.act === "cancel") {
        isAddingCategory = false;
        renderCategoryChips();
      } else if (actBtn.dataset.act === "ok") {
        confirmNewCategory();
      }
    });

    chipBox.addEventListener("keydown", (e) => {
      if (e.target.id !== "chip-new-input") return;
      if (e.key === "Enter" && !e.isComposing) {
        e.preventDefault();
        confirmNewCategory();
      } else if (e.key === "Escape") {
        isAddingCategory = false;
        renderCategoryChips();
      }
    });
  }
}

function renderLayerBar() {
  const container = document.getElementById("layer-bar");
  if (!container) return;

  const isAllActive = categories.every((c) => activeLayers[c.name]);
  let html = `<button class="layer-btn cat-all ${isAllActive ? "active" : ""}" data-cat="ALL">전체 선택</button>`;

  categories.forEach((c) => {
    html += `<button class="layer-btn ${activeLayers[c.name] ? "active" : ""}" data-cat="${escapeHtml(c.name)}" style="--cat:${c.color}">${escapeHtml(c.name)}</button>`;
  });

  container.innerHTML = html;
}

function renderCategoryChips() {
  const container = document.getElementById("category-chips");
  if (!container) return;

  const prevInput = document.getElementById("chip-new-input");
  const typedValue = prevInput ? prevInput.value : "";

  const stillExists = categories.some((c) => c.name === selectedCategoryName);
  if (!stillExists) selectedCategoryName = categories[0].name;

  let html = "";
  categories.forEach((c) => {
    const selected = c.name === selectedCategoryName ? "selected" : "";
    html += `<div class="chip ${selected}" data-cat="${escapeHtml(c.name)}" style="--cat:${c.color}"><span class="chip-label">${escapeHtml(c.name)}</span><button class="chip-del" data-del="${escapeHtml(c.name)}" title="삭제">✕</button></div>`;
  });

  if (isAddingCategory) {
    html += `<div class="chip-new"><input type="text" id="chip-new-input" class="text-input chip-input" maxlength="10" placeholder="카테고리 이름" value="${escapeHtml(typedValue)}"><button class="chip-new-ok" data-act="ok">추가</button><button class="chip-new-cancel" data-act="cancel">취소</button></div>`;
  } else {
    html += `<button class="chip-add" data-act="open" title="추가">+</button>`;
  }

  container.innerHTML = html;

  if (isAddingCategory) {
    const input = document.getElementById("chip-new-input");
    if (input) input.focus();
  }
}

function confirmNewCategory() {
  const input = document.getElementById("chip-new-input");
  const name = input ? input.value.trim() : "";

  if (!name) return alert("카테고리를 입력해주세요!");
  if (name.toUpperCase() === "ALL") return alert("사용할 수 없는 이름입니다.");
  if (categories.some((c) => c.name === name))
    return alert("이미 있는 카테고리입니다.");

  categories.push({ name: name, color: pickNewCategoryColor() });
  activeLayers[name] = true;
  selectedCategoryName = name;
  isAddingCategory = false;

  storeItem("myTripCategories", categories);
  renderCategoryChips();
  renderLayerBar();
}

function deleteCategory(name) {
  if (categories.length <= 1)
    return alert("카테고리는 최소 1개 이상 있어야 합니다.");

  const affected = spots.filter((s) => s.category === name);
  let message = `'${name}' 카테고리를 삭제하시겠습니까?`;
  if (affected.length > 0) {
    message += `\n이 카테고리의 핀 ${affected.length}개는 '미분류'로 변경됩니다.`;
  }
  if (!confirm(message)) return;

  affected.forEach((s) => (s.category = ""));
  categories = categories.filter((c) => c.name !== name);
  delete activeLayers[name];

  if (selectedCategoryName === name) selectedCategoryName = categories[0].name;

  storeItem("myTripCategories", categories);
  if (affected.length > 0) storeItem("myTripSpots", spots);

  renderCategoryChips();
  renderLayerBar();
}

function toggleLayer(category) {
  if (category === "ALL") {
    const isAllActive = categories.every((c) => activeLayers[c.name]);
    categories.forEach((c) => (activeLayers[c.name] = !isAllActive));
  } else {
    activeLayers[category] = !activeLayers[category];
  }
  renderLayerBar();
}

function getCategoryColor(cat) {
  const found = categories.find((c) => c.name === cat);
  return found ? found.color : UNCATEGORIZED_COLOR;
}

function hasBaseDistance(spot) {
  const val = Number(spot.baseDistanceKm);
  return Number.isFinite(val) && val >= 0;
}

function getSpotPosition(spot, centerX, centerY) {
  const xRatio = Number.isFinite(spot.scatterX) ? spot.scatterX : 0.5;
  const yRatio = Number.isFinite(spot.scatterY) ? spot.scatterY : 0.5;
  const scattered = { x: xRatio * width, y: yRatio * height };

  const spotDist = Number(spot.baseDistanceKm);
  if (!isDistanceView || !hasBaseDistance(spot) || !Number.isFinite(spotDist)) {
    return scattered;
  }

  const validDistances = spots
    .filter(
      (s) =>
        Number(s.day) === Number(currentDayFilter) &&
        hasBaseDistance(s) &&
        Number.isFinite(Number(s.baseDistanceKm)),
    )
    .map((s) => Number(s.baseDistanceKm));

  if (!validDistances.length) return scattered;

  const minDist = Math.min(...validDistances);
  const maxDist = Math.max(...validDistances);
  const distRange = Math.max(0.5, maxDist - minDist);

  const normDist = distRange > 0 ? (spotDist - minDist) / distRange : 0;

  const minRadius = 140;
  const maxRadius = Math.min(width, height) * 0.38;
  const radius = lerp(minRadius, maxRadius, normDist);

  const orderOffset = (spot.order || 1) * 0.22;
  const finalAngle = (spot.angle || 0) + orderOffset;

  const radial = {
    x: centerX + cos(finalAngle) * radius,
    y: centerY + sin(finalAngle) * radius,
  };

  return {
    x: lerp(scattered.x, radial.x, distanceViewProgress),
    y: lerp(scattered.y, radial.y, distanceViewProgress),
  };
}

function drawGrid() {
  push();
  stroke(220, 224, 230, 180);
  strokeWeight(1 / zoomLevel);

  const gridSize = 40;
  const startX = -width * 2;
  const endX = width * 3;
  const startY = -height * 2;
  const endY = height * 3;

  for (let x = startX; x <= endX; x += gridSize) {
    line(x, startY, x, endY);
  }
  for (let y = startY; y <= endY; y += gridSize) {
    line(startX, y, endX, y);
  }
  pop();
}

function drawDistanceGuides(centerX, centerY) {
  const validDistances = spots
    .filter(
      (spot) =>
        Number(spot.day) === Number(currentDayFilter) &&
        hasBaseDistance(spot) &&
        Number.isFinite(Number(spot.baseDistanceKm)),
    )
    .map((spot) => Number(spot.baseDistanceKm));

  if (!isDistanceView || !validDistances.length || distanceViewProgress <= 0)
    return;

  const minDistance = Math.min(...validDistances);
  const maxDistance = Math.max(...validDistances);

  if (!Number.isFinite(minDistance) || !Number.isFinite(maxDistance)) return;

  const range = Math.max(0.5, maxDistance - minDistance);
  const step = range / 4;
  const ringCount = 4;
  const maxRadius = Math.min(width, height) * 0.38;
  const minRadius = 140;

  noFill();
  stroke("rgba(20, 24, 31, 0.12)");
  strokeWeight(1 / zoomLevel);

  for (let ring = 0; ring <= ringCount; ring++) {
    const currentDist = minDistance + ring * step;
    const norm = ring / ringCount;
    const radius = lerp(minRadius, maxRadius, norm) * distanceViewProgress;

    ellipse(centerX, centerY, radius * 2);

    if (distanceViewProgress > 0.8 && Number.isFinite(currentDist)) {
      noStroke();
      fill("#777D86");
      textAlign(LEFT, CENTER);
      textSize(10 / zoomLevel);
      text(`${currentDist.toFixed(1)}km`, centerX + 7, centerY - radius + 10);
      noFill();
      stroke("rgba(20, 24, 31, 0.12)");
    }
  }
}

function drawLegTimeLabel(fromPoint, toPoint, destinationSpot) {
  const minutes = Number(destinationSpot.legTravelMinutes);
  const { x, y } = getLegControlPosition(fromPoint, toPoint);
  const hasTime = Number.isFinite(minutes) && minutes > 0;

  push();
  rectMode(CENTER);
  if (!hasTime) {
    stroke("#858C96");
    strokeWeight(1.5 / zoomLevel);
    fill("#FFFFFF");
    ellipse(x, y, 25 / zoomLevel, 25 / zoomLevel);
    noStroke();
    fill("#555D68");
    textAlign(CENTER, CENTER);
    textSize(18 / zoomLevel);
    textStyle(NORMAL);
    text("+", x, y + 1 / zoomLevel);
  } else {
    noStroke();
    fill("#F45E91");
    ellipse(x, y, 13 / zoomLevel, 13 / zoomLevel);

    const transportName = formatTransportName(destinationSpot.transport);
    const distanceKm = Number(destinationSpot.legDistanceKm);
    const routeParts = [];
    if (Number.isFinite(distanceKm) && distanceKm > 0) {
      routeParts.push(`${distanceKm.toFixed(1)}km`);
    }
    routeParts.push(`${transportName} ${Math.round(minutes)}분`);
    const label = routeParts.join(" · ");

    textSize(10 / zoomLevel);
    textStyle(BOLD);
    const pillWidth = textWidth(label) + 16 / zoomLevel;
    const pillHeight = 20 / zoomLevel;
    fill("rgba(255, 255, 255, 0.97)");
    rect(x, y - 17 / zoomLevel, pillWidth, pillHeight, 9 / zoomLevel);
    fill("#343A40");
    textAlign(CENTER, CENTER);
    text(label, x, y - 17 / zoomLevel);
  }
  pop();
}

function getLegControlPosition(fromPoint, toPoint) {
  const dx = toPoint.x - fromPoint.x;
  const dy = toPoint.y - fromPoint.y;
  const length = Math.hypot(dx, dy);
  if (!length) return { x: fromPoint.x, y: fromPoint.y };

  const midpoint = {
    x: (fromPoint.x + toPoint.x) / 2,
    y: (fromPoint.y + toPoint.y) / 2,
  };
  const obstacles = spots
    .filter(
      (spot) =>
        isSpotVisible(spot) && Number(spot.day) === Number(currentDayFilter),
    )
    .map((spot) => ({
      spot,
      point: getSpotPosition(spot, width / 2, height / 2),
    }));
  const isCovered = (point) =>
    obstacles.some(({ spot, point: spotPoint }) => {
      const inCard =
        point.x >= spotPoint.x - 96 &&
        point.x <= spotPoint.x + 96 &&
        point.y >= spotPoint.y &&
        point.y <= spotPoint.y + 82;
      const onPin =
        Math.hypot(point.x - spotPoint.x, point.y - (spotPoint.y - 18)) <= 16;
      return inCard || onPin;
    });

  if (!isCovered(midpoint)) return midpoint;

  const sampleCount = Math.max(24, Math.ceil(length / 3));
  let bestStart = -1;
  let bestEnd = -1;
  let runStart = -1;
  for (let i = 0; i <= sampleCount; i++) {
    const t = i / sampleCount;
    const point = { x: fromPoint.x + dx * t, y: fromPoint.y + dy * t };
    const visible = !isCovered(point);
    if (visible && runStart < 0) runStart = i;
    if ((!visible || i === sampleCount) && runStart >= 0) {
      const runEnd = visible && i === sampleCount ? i : i - 1;
      if (runEnd - runStart > bestEnd - bestStart) {
        bestStart = runStart;
        bestEnd = runEnd;
      }
      runStart = -1;
    }
  }

  if (bestStart < 0) return midpoint;
  const visibleMidpointT = (bestStart + bestEnd) / (2 * sampleCount);
  return {
    x: fromPoint.x + dx * visibleMidpointT,
    y: fromPoint.y + dy * visibleMidpointT,
  };
}

function getSelectedRouteSpots() {
  return spots
    .filter(
      (spot) =>
        isSpotVisible(spot) &&
        spot.selected &&
        Number(spot.day) === Number(currentDayFilter),
    )
    .sort((a, b) => (a.order || 999) - (b.order || 999));
}

function openLegEditor(destinationSpot) {
  const routeSpots = getSelectedRouteSpots();
  const destinationIndex = routeSpots.findIndex(
    (spot) => spot.id === destinationSpot.id,
  );
  const fromSpot =
    destinationIndex > 0 ? routeSpots[destinationIndex - 1] : null;
  if (!fromSpot) return;

  currentEditingLegSpot = destinationSpot;
  document.getElementById("leg-editor-title").textContent =
    `${fromSpot.name} → ${destinationSpot.name}`;
  document.getElementById("leg-time-input").value =
    destinationSpot.legTravelMinutes ?? "";
  syncTransportSelection("leg", destinationSpot.transport || "");
  document.getElementById("leg-editor-bar").classList.add("open");
}

function closeLegEditor() {
  document.getElementById("leg-editor-bar").classList.remove("open");
  currentEditingLegSpot = null;
}

function clearLegDetails() {
  if (!currentEditingLegSpot) return;

  currentEditingLegSpot.transport = "";
  currentEditingLegSpot.legTravelMinutes = null;
  currentEditingLegSpot.legDistanceKm = null;
  currentEditingLegSpot.legRouteCalculationDisabled = true;

  document.getElementById("leg-time-input").value = "";
  document.getElementById("leg-transport-input").value = "";
  syncTransportSelection("leg", "");
  storeItem("myTripSpots", spots);
  updateSummaryUI(getSelectedRouteSpots());
}

function selectLegTransport(mode) {
  selectTransport("leg", mode);
  if (mode !== "other") saveLegDetails();
}

function saveLegDetails() {
  if (!currentEditingLegSpot) return;
  const selectedTransport = getTransportValue("leg");
  const timeValue = document.getElementById("leg-time-input").value.trim();
  const minutes = timeValue === "" ? null : Number(timeValue);
  currentEditingLegSpot.transport = selectedTransport || "교통수단 미정";
  currentEditingLegSpot.legRouteCalculationDisabled = false;
  currentEditingLegSpot.legTravelMinutes =
    Number.isFinite(minutes) && minutes > 0 ? minutes : null;
  if (minutes === null) currentEditingLegSpot.legDistanceKm = null;
  storeItem("myTripSpots", spots);
  updateSummaryUI(getSelectedRouteSpots());
}

function reorderSpots() {
  daysData.forEach((d) => {
    let daySpots = spots.filter((s) => s.selected && s.day === d.id);
    daySpots.sort((a, b) => (a.order || 999) - (b.order || 999));
    daySpots.forEach((spot, idx) => {
      spot.order = idx + 1;
    });
  });
}

function changeSpotOrder(spotToMove, newOrder) {
  let daySpots = spots.filter((s) => s.selected && s.day === spotToMove.day);
  daySpots.sort((a, b) => (a.order || 999) - (b.order || 999));

  newOrder = constrain(newOrder, 1, daySpots.length);
  let oldIndex = daySpots.findIndex((s) => s.id === spotToMove.id);
  if (oldIndex !== -1) daySpots.splice(oldIndex, 1);

  let newIndex = newOrder - 1;
  daySpots.splice(newIndex, 0, spotToMove);

  daySpots.forEach((s, idx) => {
    s.order = idx + 1;
  });
}

function drawHouseIcon(cx, cy) {
  const activeBase = getBaseInfoForDay(currentDayFilter);
  fill("#FFFFFF");
  stroke("rgba(20, 24, 31, 0.1)");
  strokeWeight(1 / zoomLevel);
  ellipse(cx, cy, 44);

  noStroke();
  fill("#1A1A1A");
  rectMode(CORNER);
  rect(cx - 9, cy - 2, 18, 13, 2);
  triangle(cx - 14, cy - 1, cx, cy - 14, cx + 14, cy - 1);

  fill("#FFFFFF");
  rect(cx - 2.5, cy + 3, 5, 8, 1);

  if (activeBase.name) {
    fill("#1A1A1A");
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(9);
    textStyle(BOLD);
    let shortName =
      activeBase.name.length > 12
        ? activeBase.name.substring(0, 11) + "…"
        : activeBase.name;
    text(shortName, cx, cy + 34);
  }
}

function draw() {
  clear();

  distanceViewProgress = isDistanceView
    ? Math.min(1, distanceViewProgress + 0.055)
    : Math.max(0, distanceViewProgress - 0.055);

  push();
  translate(width / 2 + panX, height / 2 + panY);
  scale(zoomLevel);
  translate(-width / 2, -height / 2);

  drawGrid();

  const centerX = width / 2;
  const centerY = height / 2;

  drawDistanceGuides(centerX, centerY);

  let visibleSelectedSpots = getSelectedRouteSpots();

  updateSummaryUI(visibleSelectedSpots);

  if (visibleSelectedSpots.length > 1) {
    stroke("rgba(26, 26, 26, 0.65)");
    strokeWeight(1.5 / zoomLevel);
    drawingContext.setLineDash([5 / zoomLevel, 6 / zoomLevel]);
    noFill();

    for (let i = 0; i < visibleSelectedSpots.length - 1; i++) {
      const fromSpot = visibleSelectedSpots[i];
      const toSpot = visibleSelectedSpots[i + 1];
      const fromPoint = getSpotPosition(fromSpot, centerX, centerY);
      const toPoint = getSpotPosition(toSpot, centerX, centerY);
      line(fromPoint.x, fromPoint.y, toPoint.x, toPoint.y);
      drawLegTimeLabel(fromPoint, toPoint, toSpot);
    }

    drawingContext.setLineDash([]);
  }

  drawHouseIcon(centerX, centerY);

  const hoverWorld = getTransformedMouse(mouseX, mouseY);
  let hoveredSpotId = draggedSpot ? draggedSpot.id : null;
  spots.forEach((spot) => {
    if (!isSpotVisible(spot) || spot.day !== currentDayFilter) return;
    const point = getSpotPosition(spot, centerX, centerY);
    if (dist(hoverWorld.x, hoverWorld.y, point.x, point.y - 18) < 17) {
      hoveredSpotId = spot.id;
    }
  });
  cursor(
    draggedSpot ? "grabbing" : hoveredSpotId !== null ? "grab" : "default",
  );

  spots.forEach((spot) => {
    if (!isSpotVisible(spot)) return;
    if (spot.day !== currentDayFilter) return;

    const point = getSpotPosition(spot, centerX, centerY);
    const px = point.x;
    const py = point.y;
    const mainColor = getCategoryColor(spot.category);
    const hasAddress = Boolean(spot.address && spot.address.trim().length > 0);

    stroke("rgba(20, 24, 31, 0.15)");
    strokeWeight(2 / zoomLevel);
    line(px, py, px, py - 12);

    spot.hoverScale = lerp(
      spot.hoverScale || 1,
      spot.id === hoveredSpotId ? 1.2 : 1,
      0.2,
    );
    const pinSize = 26 * spot.hoverScale;

    if (!hasAddress) {
      stroke("#FF3B30");
      strokeWeight(2.5 / zoomLevel);
    } else {
      noStroke();
    }
    fill(mainColor);
    ellipse(px, py - 18, pinSize, pinSize);

    if (spot.selected && spot.order) {
      fill("#17191D");
      ellipse(px, py - 18, 18 * spot.hoverScale, 18 * spot.hoverScale);
      noStroke();
      fill("#FFFFFF");
      textAlign(CENTER, CENTER);
      textSize((spot.order > 9 ? 9 : 11) * spot.hoverScale);
      textStyle(BOLD);
      text(spot.order, px, py - 18);
    }

    if (!hasAddress) {
      stroke("#FF3B30");
      strokeWeight(2.5 / zoomLevel);
      fill("#FFF8F8");
    } else if (spot.selected) {
      stroke("#1A1A1A");
      strokeWeight(2 / zoomLevel);
      fill(spot.cardBg || "#FFFFFF");
    } else {
      stroke("rgba(20, 24, 31, 0.12)");
      strokeWeight(1 / zoomLevel);
      fill(spot.cardBg || "#FFFFFF");
    }

    rectMode(CENTER);
    const cardHeight = 82;
    const cardOffsetY = 41;
    const cardWidth = 192;
    const cardLeft = px - cardWidth / 2;

    rect(px, py + cardOffsetY, cardWidth, cardHeight, 14);

    const fitText = (value, maxWidth) => {
      let result = String(value || "");
      while (result.length > 1 && textWidth(result) > maxWidth) {
        result = result.slice(0, -1);
      }
      if (result !== String(value || "")) result = result.slice(0, -1) + "…";
      return result;
    };

    const categoryText = String(spot.category || "기타");
    textSize(9);
    const tagWidth = constrain(textWidth(categoryText) + 16, 36, 58);
    const nameMaxWidth = cardWidth - 24 - tagWidth - 8;
    textAlign(LEFT, CENTER);
    noStroke();
    fill("#17191D");
    textSize(14);
    textStyle(BOLD);
    const displayName = fitText(spot.name || "장소", nameMaxWidth);
    const nameX = cardLeft + 12;
    const titleY = py + 18;
    text(displayName, nameX, titleY);

    const tagX = Math.min(
      nameX + textWidth(displayName) + 7,
      cardLeft + cardWidth - tagWidth - 10,
    );
    rectMode(CORNER);
    stroke(mainColor);
    strokeWeight(1 / zoomLevel);
    fill(mainColor);
    rect(tagX, titleY - 9, tagWidth, 18, 9);
    noStroke();
    fill("#17191D");
    textAlign(CENTER, CENTER);
    textSize(9);
    textStyle(BOLD);
    text(fitText(categoryText, tagWidth - 10), tagX + tagWidth / 2, titleY);
    rectMode(CENTER);

    noStroke();
    textAlign(LEFT, CENTER);
    fill("#414852");
    textSize(11);
    textStyle(BOLD);
    const transportText = formatTransportName(spot.transport);
    text(fitText(transportText, cardWidth - 24), cardLeft + 12, py + 44);

    if (!hasAddress) {
      fill("#FF3B30");
      textSize(11);
      textStyle(BOLD);
      text("⚠️ 주소 입력 필요", cardLeft + 12, py + 62.7);
    } else {
      fill("#737B86");
      textSize(11);
      textStyle(NORMAL);
      const baseDistanceText = hasBaseDistance(spot)
        ? `숙소 ${Number(spot.baseDistanceKm).toFixed(1)}km${Number.isFinite(Number(spot.baseTravelMinutes)) ? ` · 차로 ${Number(spot.baseTravelMinutes)}분` : ""}`
        : "숙소와의 거리: 계산 전";
      text(fitText(baseDistanceText, cardWidth - 24), cardLeft + 12, py + 62.7);
    }
  });

  pop();
}

function getDayTitleById(dayId) {
  let found = daysData.find((d) => d.id === dayId);
  return found ? found.title : `Day ${dayId}`;
}

function drawDayConnectingLines() {
  const svg = document.getElementById("day-connecting-lines");
  const container = document.getElementById("day-bar");
  if (!svg || !container) return;

  const buttons = Array.from(container.querySelectorAll(".day-circle-btn"));
  if (buttons.length <= 1) {
    svg.innerHTML = "";
    return;
  }

  const containerRect = container.getBoundingClientRect();
  const groups = [];
  let currentGroup = [];
  let prevKey = null;

  daysData.forEach((day, index) => {
    const btn = buttons[index];
    if (!btn) return;

    const base = getBaseInfoForDay(day.id);
    const key =
      base.name || base.address ? `${base.name}|${base.address}` : null;

    if (key && key === prevKey) {
      currentGroup.push({ day, btn });
    } else {
      if (currentGroup.length > 1) groups.push(currentGroup);
      currentGroup = key ? [{ day, btn }] : [];
    }
    prevKey = key;
  });
  if (currentGroup.length > 1) groups.push(currentGroup);

  let pathsHtml = "";
  groups.forEach((group) => {
    const firstRect = group[0].btn.getBoundingClientRect();
    const lastRect = group[group.length - 1].btn.getBoundingClientRect();

    const x1 = firstRect.left + firstRect.width / 2 - containerRect.left;
    const y1 = firstRect.top + firstRect.height / 2 - containerRect.top;
    const x2 = lastRect.left + lastRect.width / 2 - containerRect.left;
    const y2 = lastRect.top + lastRect.height / 2 - containerRect.top;

    pathsHtml += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FF528F" stroke-width="4" stroke-linecap="round" />`;
  });

  svg.innerHTML = pathsHtml;
}

function renderDayBarUI() {
  const container = document.getElementById("day-bar");
  if (!container) return;

  let html = "";
  daysData.forEach((d) => {
    let isActive = currentDayFilter === d.id ? "active" : "";
    let displayText = `D${d.id}`;

    if (d.title && d.title !== `Day ${d.id}` && d.title !== `Day${d.id}`) {
      displayText = d.title.substring(0, 2);
    }

    html += `
      <div class="day-btn-wrapper ${isActive}">
        <button class="day-circle-btn" onclick="selectDayFilter(${d.id}, this)">${escapeHtml(displayText)}</button>
        <button class="day-opt-btn" onclick="openDayDropdown(event, ${d.id})">⋮</button>
      </div>
    `;
  });

  html += `<button class="day-btn-add-circle" onclick="addNewDay()">+</button>`;
  container.innerHTML = html;

  setTimeout(drawDayConnectingLines, 50);
}

function renderSidebarDayBarUI() {
  const container = document.getElementById("sidebar-day-bar");
  const dayInput = document.getElementById("input-day");
  if (!container) return;

  if (
    !daysData.some((day) => day.id === selectedSpotDay) &&
    daysData.length > 0
  ) {
    selectedSpotDay = daysData[0].id;
  }

  let html = "";
  daysData.forEach((day) => {
    const isActive = selectedSpotDay === day.id ? "active" : "";
    let displayText = `D${day.id}`;
    if (
      day.title &&
      day.title !== `Day ${day.id}` &&
      day.title !== `Day${day.id}`
    ) {
      displayText = day.title.substring(0, 2);
    }

    html += `
      <div class="day-btn-wrapper ${isActive}">
        <button type="button" class="day-circle-btn" data-sidebar-day-id="${day.id}" aria-pressed="${selectedSpotDay === day.id}" onclick="selectSidebarSpotDay(${day.id})">${escapeHtml(displayText)}</button>
      </div>
    `;
  });
  html += `<button type="button" class="day-btn-add-circle" aria-label="Day 추가" onclick="addNewDay()">+</button>`;
  container.innerHTML = html;
  if (dayInput) dayInput.value = String(selectedSpotDay);
}

function selectSidebarSpotDay(dayId) {
  selectedSpotDay = dayId;
  const container = document.getElementById("sidebar-day-bar");
  const dayInput = document.getElementById("input-day");
  if (dayInput) dayInput.value = String(dayId);
  if (!container) return;

  container.querySelectorAll("[data-sidebar-day-id]").forEach((button) => {
    const isSelected = Number(button.dataset.sidebarDayId) === dayId;
    button.setAttribute("aria-pressed", String(isSelected));
    button.closest(".day-btn-wrapper")?.classList.toggle("active", isSelected);
  });
}

function selectDayFilter(dayId, btnEl) {
  currentDayFilter = dayId;
  selectedSpotDay = dayId;
  baseInfo = getBaseInfoForDay(dayId);
  renderDayBarUI();
  renderSidebarDayBarUI();
}

function openDayDropdown(event, dayId) {
  event.stopPropagation();
  selectedDayForMenu = daysData.find((d) => d.id === dayId);
  if (!selectedDayForMenu) return;

  const menu = document.getElementById("day-dropdown-menu");
  const btnRect = event.currentTarget.getBoundingClientRect();
  const menuWidth = 140;
  const left = Math.max(
    8,
    Math.min(btnRect.left - 40, window.innerWidth - menuWidth - 8),
  );

  menu.style.top = `${btnRect.bottom + 6}px`;
  menu.style.left = `${left}px`;
  menu.classList.add("show");
}

function closeDropdownMenu() {
  const menu = document.getElementById("day-dropdown-menu");
  if (menu) menu.classList.remove("show");
}

function onDropdownRename() {
  closeDropdownMenu();
  if (!selectedDayForMenu) return;

  let newTitle = prompt(
    "새로운 Day 제목을 입력하세요:",
    selectedDayForMenu.title,
  );
  if (newTitle && newTitle.trim() !== "") {
    selectedDayForMenu.title = newTitle.trim();
    storeItem("myTripDays", daysData);
    renderDayBarUI();
    renderSidebarDayBarUI();
    populateDaySelectOptions();
  }
}

function onDropdownDelete() {
  closeDropdownMenu();
  if (!selectedDayForMenu) return;

  if (daysData.length <= 1)
    return alert("최소 1개 이상의 스케줄이 존재해야 합니다.");

  if (confirm(`'${selectedDayForMenu.title}'을 삭제하시겠습니까?`)) {
    const targetId = selectedDayForMenu.id;
    const fallbackDayId =
      daysData[0].id === targetId ? daysData[1].id : daysData[0].id;
    spots.forEach((s) => {
      if (Number(s.day) === Number(targetId)) {
        s.day = fallbackDayId;
        s.dist = null;
        s.travelMinutes = null;
        s.baseDistanceKm = null;
        s.baseTravelMinutes = null;
        s.routeStatus = "needs-update";
      }
    });

    daysData = daysData.filter((d) => d.id !== targetId);
    delete baseInfosByDay[String(targetId)];
    if (currentDayFilter === targetId) currentDayFilter = fallbackDayId;
    if (selectedSpotDay === targetId) selectedSpotDay = fallbackDayId;
    if (editingBaseDayId === targetId) editingBaseDayId = fallbackDayId;
    baseInfo = getBaseInfoForDay(currentDayFilter);

    storeItem("myTripDays", daysData);
    storeItem("myTripSpots", spots);
    storeItem("myTripBases", baseInfosByDay);

    renderDayBarUI();
    renderSidebarDayBarUI();
    populateDaySelectOptions();
    reorderSpots();
  }
}

function addNewDay() {
  const copiedBase = getBaseInfoForDay(currentDayFilter);
  let newId =
    daysData.length > 0 ? Math.max(...daysData.map((d) => d.id)) + 1 : 1;
  daysData.push({ id: newId, title: `Day ${newId}` });
  baseInfosByDay[String(newId)] = normalizeBaseInfo(copiedBase);
  storeItem("myTripBases", baseInfosByDay);
  currentDayFilter = newId;
  selectedSpotDay = newId;
  baseInfo = getBaseInfoForDay(newId);

  storeItem("myTripDays", daysData);
  renderDayBarUI();
  renderSidebarDayBarUI();
  populateDaySelectOptions();
}

function populateDaySelectOptions() {
  const modalSelect = document.getElementById("modal-day-select");

  let html = "";
  daysData.forEach((d) => {
    html += `<option value="${d.id}">${escapeHtml(d.title)}</option>`;
  });

  if (modalSelect) modalSelect.innerHTML = html;
  if (document.getElementById("base-day-range")) renderBaseDayRange();
  renderSidebarDayBarUI();
}

function isUiEvent(event) {
  const target = event && event.target;
  if (!target || !target.closest) return false;
  return Boolean(
    target.closest(
      "#top-ui, #bottom-controls, #summary-bar, #leg-editor-bar, #sidebar, .dropdown-menu, #memo-modal-overlay, #base-modal-overlay",
    ),
  );
}

function isAnyOverlayOpen() {
  return ["sidebar", "memo-modal-overlay", "base-modal-overlay"].some((id) => {
    const el = document.getElementById(id);
    return el && el.classList.contains("open");
  });
}

function handleStart(x, y) {
  pressedBase = false;
  if (isAnyOverlayOpen()) return;

  pressStartX = x;
  pressStartY = y;

  const worldPos = getTransformedMouse(x, y);
  const centerX = width / 2;
  const centerY = height / 2;

  const routeSpots = getSelectedRouteSpots();
  for (let i = 0; i < routeSpots.length - 1; i++) {
    const fromPoint = getSpotPosition(routeSpots[i], centerX, centerY);
    const toPoint = getSpotPosition(routeSpots[i + 1], centerX, centerY);
    const controlPoint = getLegControlPosition(fromPoint, toPoint);
    if (
      dist(worldPos.x, worldPos.y, controlPoint.x, controlPoint.y) <
      17 / zoomLevel
    ) {
      isPanning = false;
      openLegEditor(routeSpots[i + 1]);
      return;
    }
  }

  let clickedSpot = null;

  spots.forEach((spot) => {
    if (!isSpotVisible(spot)) return;
    if (spot.day !== currentDayFilter) return;

    const point = getSpotPosition(spot, centerX, centerY);
    const px = point.x;
    const py = point.y;

    let d = dist(worldPos.x, worldPos.y, px, py - 18);
    if (d < 20) clickedSpot = spot;
  });

  if (clickedSpot) {
    draggedSpot = clickedSpot;
  } else {
    if (dist(worldPos.x, worldPos.y, centerX, centerY) < 28) pressedBase = true;
    isPanning = true;
    startPanX = x - panX;
    startPanY = y - panY;
  }
}

function mouseReleased() {
  const moveDistance = dist(pressStartX, pressStartY, mouseX, mouseY);

  if (draggedSpot && moveDistance < 5) {
    const spotToOpen = draggedSpot;
    if (clickTimer) clearTimeout(clickTimer);

    clickTimer = setTimeout(() => {
      openMemoModal(spotToOpen);
      clickTimer = null;
    }, 220);
  } else {
    if (clickTimer) {
      clearTimeout(clickTimer);
      clickTimer = null;
    }
    if (pressedBase && moveDistance < 5) openBaseModal();
  }

  handleEnd();
}

function populateModalCategoryOptions(selectedName) {
  const select = document.getElementById("modal-category-select");
  if (!select) return;

  let html = `<option value="">미분류</option>`;
  categories.forEach((c) => {
    html += `<option value="${escapeHtml(c.name)}">${escapeHtml(c.name)}</option>`;
  });
  select.innerHTML = html;
  select.value = selectedName || "";
}

function openMemoModal(spot) {
  currentEditingSpot = spots.find((s) => s.id === spot.id);
  if (!currentEditingSpot) return;

  populateModalCategoryOptions(currentEditingSpot.category);

  const catBadge = document.getElementById("modal-category-badge");
  catBadge.innerText = currentEditingSpot.category || "미분류";
  catBadge.style.backgroundColor = getCategoryColor(
    currentEditingSpot.category,
  );
  catBadge.style.color = "#1a1a1a";

  document.getElementById("modal-spot-title").innerText =
    currentEditingSpot.name;
  document.getElementById("modal-spot-sub").innerText = "장소 정보 수정";

  document.getElementById("modal-memo-text").value =
    currentEditingSpot.memo || "";
  document.getElementById("modal-order-input").value =
    currentEditingSpot.order || 1;
  document.getElementById("modal-day-select").value =
    currentEditingSpot.day || 1;
  document.getElementById("modal-dist-input").value =
    currentEditingSpot.baseDistanceKm ?? "";
  document.getElementById("modal-address-input").value =
    currentEditingSpot.address || "";

  const modalEl = document.getElementById("memo-modal");
  const selectedBg = currentEditingSpot.cardBg || "#FFFFFF";
  modalEl.style.backgroundColor = selectedBg;

  const chips = document.querySelectorAll(".color-chip");
  chips.forEach((chip) => {
    chip.classList.remove("active");
    if (
      chip.style.backgroundColor.toUpperCase() === selectedBg.toUpperCase() ||
      (selectedBg === "#FFFFFF" &&
        chip.style.backgroundColor === "rgb(255, 255, 255)")
    ) {
      chip.classList.add("active");
    }
  });

  document.getElementById("memo-modal-overlay").classList.add("open");
}

function closeMemoModal() {
  document.getElementById("memo-modal-overlay").classList.remove("open");
  currentEditingSpot = null;
}

function selectModalColor(hexColor, targetChip) {
  if (!currentEditingSpot) return;
  currentEditingSpot.cardBg = hexColor;

  document.getElementById("memo-modal").style.backgroundColor = hexColor;
  const chips = document.querySelectorAll(".color-chip");
  chips.forEach((c) => c.classList.remove("active"));
  targetChip.classList.add("active");

  storeItem("myTripSpots", spots);
}

function saveMemoModal() {
  if (!currentEditingSpot) return;

  const newMemo = document.getElementById("modal-memo-text").value;
  let targetOrder =
    parseInt(document.getElementById("modal-order-input").value) || 1;
  let targetDay =
    parseInt(document.getElementById("modal-day-select").value) || 1;
  const distInput = document.getElementById("modal-dist-input").value.trim();
  const targetDist = distInput === "" ? null : Number(distInput);
  let targetCategory = document.getElementById("modal-category-select").value;
  let targetAddress = document
    .getElementById("modal-address-input")
    .value.trim();
  const addressChanged = targetAddress !== (currentEditingSpot.address || "");
  const previousBaseDistance =
    currentEditingSpot.baseDistanceKm == null
      ? null
      : Number(currentEditingSpot.baseDistanceKm);
  const oldDay = Number(currentEditingSpot.day);
  const oldDayBase = getBaseInfoForDay(oldDay);
  const newDayBase = getBaseInfoForDay(targetDay);
  const dayBaseChanged =
    oldDay !== targetDay &&
    (oldDayBase.name !== newDayBase.name ||
      oldDayBase.address !== newDayBase.address);

  currentEditingSpot.memo = newMemo;
  currentEditingSpot.day = targetDay;
  currentEditingSpot.dist = dayBaseChanged ? null : targetDist;
  currentEditingSpot.baseDistanceKm = dayBaseChanged ? null : targetDist;
  currentEditingSpot.baseTravelMinutes = dayBaseChanged
    ? null
    : currentEditingSpot.baseTravelMinutes;
  currentEditingSpot.travelMinutes = dayBaseChanged
    ? null
    : currentEditingSpot.travelMinutes;
  currentEditingSpot.category = targetCategory;
  currentEditingSpot.address = targetAddress;
  currentDayFilter = targetDay;
  selectedSpotDay = targetDay;
  if (addressChanged) {
    currentEditingSpot.baseDistanceKm = null;
    currentEditingSpot.baseTravelMinutes = null;
    currentEditingSpot.dist = null;
  }
  if (addressChanged || previousBaseDistance !== targetDist || dayBaseChanged) {
    currentEditingSpot.routeStatus = "needs-update";
  }

  changeSpotOrder(currentEditingSpot, targetOrder);
  reorderSpots();
  renderDayBarUI();
  renderSidebarDayBarUI();

  storeItem("myTripSpots", spots);
  closeMemoModal();
}

function deleteCurrentSpot() {
  if (!currentEditingSpot) return;

  if (confirm(`'${currentEditingSpot.name}' 핀을 삭제하시겠습니까?`)) {
    spots = spots.filter((s) => s.id !== currentEditingSpot.id);
    reorderSpots();
    storeItem("myTripSpots", spots);
    closeMemoModal();
  }
}

function handleMove(x, y) {
  if (draggedSpot) {
    const centerX = width / 2;
    const centerY = height / 2;
    const worldPos = getTransformedMouse(x, y);

    draggedSpot.scatterX = worldPos.x / width;
    draggedSpot.scatterY = worldPos.y / height;
    if (hasBaseDistance(draggedSpot)) {
      const dx = worldPos.x - centerX;
      const dy = worldPos.y - centerY;
      draggedSpot.angle = atan2(dy, dx);
    }
  } else if (isPanning) {
    panX = x - startPanX;
    panY = y - startPanY;
  }
}

function handleEnd() {
  if (draggedSpot) storeItem("myTripSpots", spots);
  draggedSpot = null;
  isPanning = false;
  pressedBase = false;
}

function setDistanceRouteStatus(message, isError = false) {
  const status = document.getElementById("distance-route-status");
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("error", Boolean(isError));
}

// Google Routes API로 숙소 거리와 핀 사이 구간 거리를 계산합니다.
async function refreshBaseRoutesForDay() {
  const baseAddress = String(
    getBaseInfoForDay(currentDayFilter).address || "",
  ).trim();

  if (!baseAddress) {
    setDistanceRouteStatus(
      "먼저 숙소 설정에서 숙소 주소를 입력해주세요.",
      true,
    );
    alert("먼저 숙소를 클릭하거나 설정창에서 숙소 주소를 입력해주세요.");
    return false;
  }

  const daySpots = spots
    .filter(
      (spot) => Number(spot.day) === Number(currentDayFilter) && spot.selected,
    )
    .sort((a, b) => (a.order || 999) - (b.order || 999));

  if (!daySpots.length) {
    setDistanceRouteStatus("계산할 핀이 없습니다.", true);
    return false;
  }

  const validSpots = daySpots.filter((spot) =>
    String(spot.address || "").trim(),
  );
  if (!validSpots.length) {
    setDistanceRouteStatus("주소가 입력된 핀이 없습니다.", true);
    alert("계산하려는 핀에 주소를 입력해주세요.");
    return false;
  }

  setDistanceRouteStatus(`숙소에서 핀 ${validSpots.length}곳까지 계산 중…`);
  const distanceButton = document.getElementById("btn-distance-view");
  if (distanceButton) distanceButton.disabled = true;

  try {
    if (!window.google?.maps?.importLibrary) {
      throw new Error("Google Maps JavaScript API가 로드되지 않았습니다.");
    }

    const [{ RouteMatrix }, { UnitSystem }] = await Promise.all([
      google.maps.importLibrary("routes"),
      google.maps.importLibrary("core"),
    ]);

    let successCount = 0;
    let failedCount = 0;

    // 숙소에서 각 주소 핀까지의 거리와 자동차 예상 시간을 계산합니다.
    for (let start = 0; start < validSpots.length; start += 49) {
      const batch = validSpots.slice(start, start + 49);
      const { matrix } = await RouteMatrix.computeRouteMatrix({
        origins: [baseAddress],
        destinations: batch.map((spot) => String(spot.address).trim()),
        travelMode: "DRIVING",
        routingPreference: "TRAFFIC_UNAWARE",
        units: UnitSystem.METRIC,
        fields: ["distanceMeters", "durationMillis", "condition"],
      });

      const routeItems = matrix?.rows?.[0]?.items || [];
      batch.forEach((spot, index) => {
        const route = routeItems[index];
        if (
          !route ||
          route.error ||
          route.condition !== "ROUTE_EXISTS" ||
          !Number.isFinite(Number(route.distanceMeters)) ||
          !Number.isFinite(Number(route.durationMillis))
        ) {
          spot.routeStatus = "error";
          failedCount += 1;
          return;
        }

        const distanceKm = Number(route.distanceMeters) / 1000;
        const minutes = Math.max(
          1,
          Math.ceil(Number(route.durationMillis) / 60000),
        );
        const destinationAddress = String(spot.address).trim();
        spot.baseDistanceKm = distanceKm;
        spot.dist = distanceKm;
        spot.baseTravelMinutes = minutes;
        spot.routeOriginAddress = baseAddress;
        spot.routeDestinationAddress = destinationAddress;
        spot.routeStatus = "calculated";
        successCount += 1;

        // 첫 번째 주소 핀은 숙소에서 오는 선이므로 숙소 경로 결과를 재사용합니다.
        if (spot === validSpots[0] && !spot.legRouteCalculationDisabled) {
          if (
            spot.legDistanceKm == null ||
            !Number.isFinite(Number(spot.legDistanceKm))
          ) {
            spot.legDistanceKm = distanceKm;
          }
          if (
            spot.legTravelMinutes == null ||
            !Number.isFinite(Number(spot.legTravelMinutes))
          ) {
            spot.legTravelMinutes = minutes;
          }
        }
      });
    }

    // 두 번째 핀부터는 직전 주소 핀에서 현재 핀까지의 구간을 계산합니다.
    const legRequests = validSpots
      .slice(1)
      .map((spot, index) => ({ spot, previousSpot: validSpots[index] }))
      .filter(({ spot }) => !spot.legRouteCalculationDisabled);
    const legResults = await Promise.all(
      legRequests.map(async ({ spot, previousSpot }) => {
        const { matrix } = await RouteMatrix.computeRouteMatrix({
          origins: [String(previousSpot.address).trim()],
          destinations: [String(spot.address).trim()],
          travelMode: "DRIVING",
          routingPreference: "TRAFFIC_UNAWARE",
          units: UnitSystem.METRIC,
          fields: ["distanceMeters", "durationMillis", "condition"],
        });
        return { spot, route: matrix?.rows?.[0]?.items?.[0] };
      }),
    );

    for (const { spot, route } of legResults) {
      if (
        !route ||
        route.error ||
        route.condition !== "ROUTE_EXISTS" ||
        !Number.isFinite(Number(route.distanceMeters)) ||
        !Number.isFinite(Number(route.durationMillis))
      ) {
        failedCount += 1;
        continue;
      }

      // 직접 입력한 구간 시간이 있으면 유지하고, 비어 있을 때만 계산값을 채웁니다.
      if (spot.legRouteCalculationDisabled) continue;
      if (
        spot.legDistanceKm == null ||
        !Number.isFinite(Number(spot.legDistanceKm))
      ) {
        spot.legDistanceKm = Number(route.distanceMeters) / 1000;
      }
      if (
        spot.legTravelMinutes == null ||
        !Number.isFinite(Number(spot.legTravelMinutes))
      ) {
        spot.legTravelMinutes = Math.max(
          1,
          Math.ceil(Number(route.durationMillis) / 60000),
        );
      }
      if (!spot.transport || spot.transport === "교통수단 미정") {
        spot.transport = "자동차";
      }
    }

    storeItem("myTripSpots", spots);

    if (!successCount) {
      throw new Error("경로를 찾지 못했어요. 주소를 더 정확하게 입력해보세요.");
    }

    const missingCount = daySpots.length - validSpots.length;
    const notes = [];
    if (failedCount) notes.push(`계산 실패 ${failedCount}구간`);
    if (missingCount) notes.push(`주소 없는 핀 ${missingCount}개 제외`);
    setDistanceRouteStatus(
      `완료: 숙소 거리와 핀 사이 자동차 예상 시간·거리를 계산했어요.${notes.length ? ` (${notes.join(", ")})` : ""}`,
      failedCount > 0,
    );
    return true;
  } catch (error) {
    console.error("Google Routes error:", error);
    setDistanceRouteStatus(
      "경로 계산에 실패했어요. Routes API 사용 설정과 API 키 제한을 확인해주세요.",
      true,
    );
    alert(
      "경로 계산에 실패했어요. Routes API가 켜져 있는지, API 키 제한에 Routes API와 현재 사이트 주소가 들어 있는지 확인해주세요.",
    );
    return false;
  } finally {
    if (distanceButton) distanceButton.disabled = false;
  }
}

async function setViewMode(useDistanceView) {
  if (!useDistanceView) {
    isDistanceView = false;
    updateViewModeButtons();
    setDistanceRouteStatus("");
    return;
  }

  const routesReady = await refreshBaseRoutesForDay();
  if (!routesReady) return;

  isDistanceView = true;
  updateViewModeButtons();
}

function updateViewModeButtons() {
  const freeButton = document.getElementById("btn-free-view");
  const distanceButton = document.getElementById("btn-distance-view");
  if (!freeButton || !distanceButton) return;

  freeButton.classList.toggle("active", !isDistanceView);
  freeButton.setAttribute("aria-pressed", String(!isDistanceView));
  distanceButton.classList.toggle("active", isDistanceView);
  distanceButton.setAttribute("aria-pressed", String(isDistanceView));
}

function toggleDistanceView() {
  setViewMode(!isDistanceView);
}

function zoomIn() {
  zoomLevel = constrain(zoomLevel + 0.15, 0.5, 3.0);
}
function zoomOut() {
  zoomLevel = constrain(zoomLevel - 0.15, 0.5, 3.0);
}

function getTransformedMouse(x, y) {
  const mx = x !== undefined ? x : mouseX;
  const my = y !== undefined ? y : mouseY;
  const centerX = width / 2;
  const centerY = height / 2;

  let wx = (mx - panX - centerX) / zoomLevel + centerX;
  let wy = (my - panY - centerY) / zoomLevel + centerY;

  return { x: wx, y: wy };
}

function mousePressed(event) {
  if (isUiEvent(event)) return;
  handleStart(mouseX, mouseY);
}
function mouseDragged() {
  handleMove(mouseX, mouseY);
}

function touchStarted(event) {
  if (isUiEvent(event)) return;
  if (touches.length > 0) handleStart(touches[0].x, touches[0].y);
}
function touchMoved(event) {
  if (isUiEvent(event)) return true;
  if (touches.length > 0) handleMove(touches[0].x, touches[0].y);
  return false;
}
function touchEnded() {
  handleEnd();
}

function doubleClicked(event) {
  if (isUiEvent(event)) return;
  if (isAnyOverlayOpen()) return;

  if (clickTimer) {
    clearTimeout(clickTimer);
    clickTimer = null;
  }

  const worldPos = getTransformedMouse(mouseX, mouseY);
  const centerX = width / 2;
  const centerY = height / 2;

  spots.forEach((spot) => {
    if (!isSpotVisible(spot)) return;
    if (spot.day !== currentDayFilter) return;

    const point = getSpotPosition(spot, centerX, centerY);
    const px = point.x;
    const py = point.y;

    let d = dist(worldPos.x, worldPos.y, px, py - 18);
    if (d < 20) {
      spot.selected = !spot.selected;
      if (spot.selected) {
        let sameDayCount = spots.filter(
          (s) => s.selected && s.day === spot.day,
        ).length;
        spot.order = sameDayCount;
      }
      reorderSpots();
      storeItem("myTripSpots", spots);
    }
  });
}

function submitSpotTemplate() {
  const nameInput = document.getElementById("input-name").value;
  if (!nameInput) return alert("핀 이름을 입력해주세요!");

  const category = selectedCategoryName;
  const address = document.getElementById("input-address").value.trim();
  const dayVal = parseInt(document.getElementById("input-day").value) || 1;
  const distanceInput = document.getElementById("input-dist").value.trim();
  const baseDistanceKm = distanceInput === "" ? null : Number(distanceInput);
  const memo = document.getElementById("input-memo").value || "";

  const sameDayCount = spots.filter(
    (s) => s.selected && s.day === dayVal,
  ).length;

  spots.push({
    id: Date.now(),
    name: nameInput,
    category: category,
    address: address,
    day: dayVal,
    transport: "교통수단 미정",
    dist: baseDistanceKm,
    travelMinutes: null,
    baseDistanceKm,
    baseTravelMinutes: null,
    legDistanceKm: null,
    legTravelMinutes: null,
    routeStatus: "not-calculated",
    angle: random(-PI, PI),
    scatterX: random(0.18, 0.82),
    scatterY: random(0.25, 0.78),
    memo: memo,
    cardBg: "#FFFFFF",
    selected: false,
    order: sameDayCount + 1,
  });

  currentDayFilter = dayVal;
  selectedSpotDay = dayVal;
  renderDayBarUI();
  renderSidebarDayBarUI();

  reorderSpots();
  storeItem("myTripSpots", spots);
  toggleSidebar();

  document.getElementById("input-name").value = "";
  document.getElementById("input-address").value = "";
  document.getElementById("input-dist").value = "";
  document.getElementById("input-memo").value = "";
}

// [하단 타임라인 한 줄 가로 정렬 및 터치 스크롤 함수]
function updateSummaryUI(selectedSpots) {
  const container = document.getElementById("summary-content");
  if (!container) return;

  if (!selectedSpots || selectedSpots.length === 0) {
    container.innerHTML = `<span style="font-size:0.75rem; color:#888;">아직 타임라인이 생성되지 않았습니다.</span>`;
    return;
  }

  container.style.cssText = `
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    justify-content: flex-start !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    white-space: nowrap !important;
    width: 100% !important;
    -webkit-overflow-scrolling: touch !important;
    scroll-behavior: smooth !important;
    touch-action: pan-x !important;
  `;

  let html = "";
  selectedSpots.forEach((spot, idx) => {
    const orderNum = spot.order ? spot.order : idx + 1;
    const distance = idx === 0 ? spot.baseDistanceKm : spot.legDistanceKm;
    const minutes = idx === 0 ? spot.baseTravelMinutes : spot.legTravelMinutes;
    const routeParts = [];
    if (distance != null && Number.isFinite(Number(distance)))
      routeParts.push(`${Number(distance).toFixed(1)}km`);
    if (minutes != null && Number.isFinite(Number(minutes)))
      routeParts.push(`${Math.round(Number(minutes))}분`);
    const routeText = routeParts.length
      ? routeParts.join(" · ")
      : "거리 입력 가능";

    html += `
      <div class="summary-item" style="display: inline-flex !important; flex-direction: row !important; align-items: center !important; gap: 6px !important; flex-shrink: 0 !important; white-space: nowrap !important;">
        <span class="summary-num">${orderNum}</span>
        <span>${escapeHtml(spot.name)}</span>
        <span class="summary-time-badge">${routeText}</span>
      </div>
    `;
    if (idx < selectedSpots.length - 1) {
      html += `<span class="summary-arrow" style="margin: 0 6px !important; color: #aaa !important; flex-shrink: 0 !important; display: inline-block !important;">➔</span>`;
    }
  });

  container.innerHTML = html;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawDayConnectingLines();
}
