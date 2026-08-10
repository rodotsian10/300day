// ==========================================
// ⚙️ [설정 파일] 캘린더 날짜 및 수파베이스(Supabase) 설정
// ==========================================

const CONFIG = {
    // 1. 캘린더 시작 날짜 (YYYY-MM-DD)
    START_DATE: "2026-07-27",

    // 2. 전체 페이지 접속 비밀번호 (null로 설정 시 비번 없음)
    SITE_PASSWORD: null, 

    // 3. 관리자(글 수정/미리보기) 전용 비밀번호
    // ⚠️ 보안을 위해 암호화(SHA-256 Hash) 처리되었습니다. (원래 비번: alphamale)
    ADMIN_PASSWORD_HASH: "15c2d33ff0efc684e27f917540203f39a0ef688fb5e0e0fdfeb54d68e596bbdb",

    // 4. ⚡ Supabase 프로젝트 정보
    SUPABASE_URL: "https://jxqoslxtetvgnhmsehug.supabase.co",
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4cW9zbHh0ZXR2Z25obXNlaHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzMjI5MTcsImV4cCI6MjEwMTg5ODkxN30.nXZxS0bqrhTFD6fiv699bpL5h40SPcYdzOBc72V5Mak",
};

// ==========================================
// 💌 [기본 메시지 데이터] (Supabase 연결 전 기본값)
// ==========================================
const MESSAGES = {
    1: { title: "첫 번째 선물 💌", text: "우리가 만난 지 벌써 300일이 되었어!" },
    2: { title: "너의 웃음 😊", text: "힘든 날에도 너의 웃음 한 번이면 마음이 다 녹아내려." },
    15: { title: "15일 차 (오늘의 축하!) 🎉", text: "오늘이 바로 15일째 되는 날! 반 이상 왔네 💖" }
};
