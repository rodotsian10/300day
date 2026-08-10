// ==========================================
// ⚙️ [설정 파일] 캘린더 날짜 및 수파베이스(Supabase) 설정
// ==========================================

const CONFIG = {
    // 1. 캘린더 시작 날짜 (YYYY-MM-DD)
    // 내일(2026-08-11)부터 Day 1이 시작되도록 설정되었습니다.
    START_DATE: "2026-08-11",

    // 2. 전체 페이지 접속 비밀번호 (null로 설정 시 비번 없음)
    SITE_PASSWORD: null, 

    // 3. 관리자(글 수정/미리보기) 전용 비밀번호
    ADMIN_PASSWORD: "alphamale",

    // 4. ⚡ Supabase 프로젝트 정보
    SUPABASE_URL: "https://jxqoslxtetvgnhmsehug.supabase.co",
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4cW9zbHh0ZXR2Z25obXNlaHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzMjI5MTcsImV4cCI6MjEwMTg5ODkxN30.nXZxS0bqrhTFD6fiv699bpL5h40SPcYdzOBc72V5Mak",
};

// ==========================================
// 💌 [기본 메시지 데이터] (Day 1 ~ Day 31)
// ==========================================
const MESSAGES = {
    1: { title: "Day 1", text: "Day 1" },
    2: { title: "Day 2", text: "Day 2" },
    3: { title: "Day 3", text: "Day 3" },
    4: { title: "Day 4", text: "Day 4" },
    5: { title: "Day 5", text: "Day 5" },
    6: { title: "Day 6", text: "Day 6" },
    7: { title: "Day 7", text: "Day 7" },
    8: { title: "Day 8", text: "Day 8" },
    9: { title: "Day 9", text: "Day 9" },
    10: { title: "Day 10", text: "Day 10" },
    11: { title: "Day 11", text: "Day 11" },
    12: { title: "Day 12", text: "Day 12" },
    13: { title: "Day 13", text: "Day 13" },
    14: { title: "Day 14", text: "Day 14" },
    15: { title: "Day 15", text: "Day 15" },
    16: { title: "Day 16", text: "Day 16" },
    17: { title: "Day 17", text: "Day 17" },
    18: { title: "Day 18", text: "Day 18" },
    19: { title: "Day 19", text: "Day 19" },
    20: { title: "Day 20", text: "Day 20" },
    21: { title: "Day 21", text: "Day 21" },
    22: { title: "Day 22", text: "Day 22" },
    23: { title: "Day 23", text: "Day 23" },
    24: { title: "Day 24", text: "Day 24" },
    25: { title: "Day 25", text: "Day 25" },
    26: { title: "Day 26", text: "Day 26" },
    27: { title: "Day 27", text: "Day 27" },
    28: { title: "Day 28", text: "Day 28" },
    29: { title: "Day 29", text: "Day 29" },
    30: { title: "Day 30", text: "Day 30" },
    31: { title: "Day 31 🎉", text: "Day 31 🎉 300일을 축하해!" }
};
