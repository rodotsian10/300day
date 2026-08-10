// ==========================================
// ⚙️ [설정 파일] 캘린더 날짜 및 수파베이스(Supabase) 설정
// ==========================================

const CONFIG = {
    // 1. 캘린더 시작 날짜 (YYYY-MM-DD)
    START_DATE: "2026-07-27",

    // 2. 전체 페이지 접속 비밀번호 (null로 설정 시 비번 없음)
    SITE_PASSWORD: null, 

    // 3. 관리자(글 수정/미리보기) 전용 비밀번호
    ADMIN_PASSWORD: "alphamale",

    // 4. ⚡ Supabase 프로젝트 정보
    SUPABASE_URL: "https://jxqoslxtetvgnhmsehug.supabase.co",
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4cW9zbHh0ZXR2Z25obXNlaHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzMjI5MTcsImV4cCI6MjEwMTg5ODkxN30.nXZxS0bqrhTFD6fiv699bpL5h40SPcYdzOBc72V5Mak",
};

// ==========================================
// 💌 [기본 메시지 데이터] (Supabase 연결 전 기본값)
// ==========================================
const MESSAGES = {
    1: { title: "D-24", text: "D-24" },
    2: { title: "D-23", text: "D-23" },
    3: { title: "D-22", text: "D-22" },
    4: { title: "D-21", text: "D-21" },
    5: { title: "D-20", text: "D-20" },
    6: { title: "D-19", text: "D-19" },
    7: { title: "D-18", text: "D-18" },
    8: { title: "D-17", text: "D-17" },
    9: { title: "D-16", text: "D-16" },
    10: { title: "D-15", text: "D-15" },
    11: { title: "D-14", text: "D-14" },
    12: { title: "D-13", text: "D-13" },
    13: { title: "D-12", text: "D-12" },
    14: { title: "D-11", text: "D-11" },
    15: { title: "D-10", text: "D-10" },
    16: { title: "D-9", text: "D-9" },
    17: { title: "D-8", text: "D-8" },
    18: { title: "D-7", text: "D-7" },
    19: { title: "D-6", text: "D-6" },
    20: { title: "D-5", text: "D-5" },
    21: { title: "D-4", text: "D-4" },
    22: { title: "D-3", text: "D-3" },
    23: { title: "D-2", text: "D-2" },
    24: { title: "D-1", text: "D-1" },
    25: { title: "D-Day 🎉", text: "D-Day 🎉 300일을 축하해!" }
};
