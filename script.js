// Interactive Logic & Config Engine (Supabase Database Sync)
document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendarGrid');
    const starsContainer = document.getElementById('starsContainer');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalConfirmBtn = document.getElementById('modalConfirmBtn');
    const modalDayBadge = document.getElementById('modalDayBadge');
    const modalDate = document.getElementById('modalDate');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    // Admin Elements
    const secretAdminTrigger = document.getElementById('secretAdminTrigger');
    const adminLoginModal = document.getElementById('adminLoginModal');
    const adminForm = document.getElementById('adminForm');
    const adminPasswordInput = document.getElementById('adminPasswordInput');
    const adminPasswordError = document.getElementById('adminPasswordError');
    const adminIndicator = document.getElementById('adminIndicator');
    const modalViewContent = document.getElementById('modalViewContent');
    const modalEditContent = document.getElementById('modalEditContent');
    const editTitleInput = document.getElementById('editTitleInput');
    const editTextarea = document.getElementById('editTextarea');
    const saveEditBtn = document.getElementById('saveEditBtn');

    // User Password Elements
    const passwordOverlay = document.getElementById('passwordOverlay');
    const passwordForm = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');

    const TOTAL_DAYS = 25;
    let customMessages = {};
    let isAdmin = false;
    let currentEditingDay = null;
    let supabaseClient = null;

    // Romantic icons
    const icons = ['💌', '🌟', '💖', '🎁', '🕯️', '🕊️', '✨', '🌸', '🎵', '🌙', '💍', '💫', '🌹', '🎀', '🧸'];

    // ⚡ Supabase Client Initialization
    function initSupabase() {
        if (typeof window.supabase !== 'undefined' && CONFIG.SUPABASE_URL && CONFIG.SUPABASE_URL !== "YOUR_SUPABASE_URL") {
            try {
                supabaseClient = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
                loadSupabaseMessages();
            } catch (e) {
                console.warn('Supabase 연결 초기화 실패:', e);
            }
        }
    }

    // Load messages from Supabase
    async function loadSupabaseMessages() {
        if (!supabaseClient) {
            renderCalendar();
            return;
        }
        try {
            const { data, error } = await supabaseClient
                .from('calendar_messages')
                .select('*');

            if (error) {
                console.error('Supabase 데이터 로드 에러:', error);
            } else if (data && data.length > 0) {
                data.forEach(item => {
                    customMessages[item.day] = {
                        title: item.title,
                        text: item.text
                    };
                });
            }
        } catch (err) {
            console.error('Supabase 로드 오류:', err);
        } finally {
            renderCalendar();
        }
    }

    // Save/Upsert message to Supabase
    async function saveSupabaseMessage(day, title, text) {
        if (!supabaseClient) {
            customMessages[day] = { title, text };
            localStorage.setItem('300day_custom_messages', JSON.stringify(customMessages));
            showToast('💾 로컬에 저장되었습니다.');
            return;
        }

        try {
            showToast('⚡ Supabase DB에 저장 중...');
            const { error } = await supabaseClient
                .from('calendar_messages')
                .upsert({ day: day, title: title, text: text }, { onConflict: 'day' });

            if (error) {
                console.error(error);
                showToast('⚠️ 저장 실패! Supabase 테이블 상태를 확인하세요.');
            } else {
                customMessages[day] = { title, text };
                showToast('✨ Supabase DB에 실시간 저장되었습니다!');
                renderCalendar();
            }
        } catch (err) {
            console.error(err);
            showToast('⚠️ 저장 중 오류가 발생했습니다.');
        }
    }

    // 1. Password Protection System
    function initPasswordProtection() {
        if (!CONFIG.SITE_PASSWORD || sessionStorage.getItem('300day_authenticated') === 'true') {
            passwordOverlay.classList.add('hidden');
        } else {
            passwordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (passwordInput.value.trim() === CONFIG.SITE_PASSWORD) {
                    sessionStorage.setItem('300day_authenticated', 'true');
                    passwordOverlay.classList.add('hidden');
                } else {
                    passwordError.classList.add('show');
                    passwordInput.value = '';
                    passwordInput.focus();
                }
            });
        }
    }

    // 2. Secret Admin Trigger
    let secretClickCount = 0;
    let secretClickTimer;

    secretAdminTrigger.addEventListener('click', () => {
        if (isAdmin) {
            showToast('이미 관리자 모드가 활성화되어 있습니다!');
            return;
        }
        secretClickCount++;
        clearTimeout(secretClickTimer);
        secretClickTimer = setTimeout(() => { secretClickCount = 0; }, 2000);

        if (secretClickCount >= 5) {
            secretClickCount = 0;
            adminPasswordInput.value = '';
            adminPasswordError.classList.remove('show');
            adminLoginModal.classList.add('active');
        }
    });

    // Helper: SHA-256 Hash Function
    async function hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Admin Password Form
    adminForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputPass = adminPasswordInput.value.trim();
        const hashedInput = await hashString(inputPass);

        if (hashedInput === CONFIG.ADMIN_PASSWORD_HASH) {
            isAdmin = true;
            adminLoginModal.classList.remove('active');
            adminIndicator.classList.remove('hidden');
            showToast('👑 관리자 권한 승인! 모든 기기에 연동되는 글 수정 모드입니다.');
            renderCalendar();
        } else {
            adminPasswordError.classList.add('show');
        }
    });

    // Admin Logout Click
    adminIndicator.addEventListener('click', () => {
        isAdmin = false;
        adminIndicator.classList.add('hidden');
        showToast('🔒 관리자 모드가 해제되었습니다.');
        renderCalendar();
    });

    adminLoginModal.addEventListener('click', (e) => {
        if (e.target === adminLoginModal) adminLoginModal.classList.remove('active');
    });

    // 3. Calculate Unlocked Days
    function getUnlockedDayCount() {
        if (isAdmin) return TOTAL_DAYS;

        const startDate = new Date(CONFIG.START_DATE);
        startDate.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const diffTime = today - startDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        if (diffDays < 1) return 0;
        return Math.min(diffDays, TOTAL_DAYS);
    }

    // Initialize Stars
    function initStars() {
        starsContainer.innerHTML = '';
        for (let i = 0; i < 40; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            starsContainer.appendChild(star);
        }
    }

    // Render Calendar Grid
    function renderCalendar() {
        calendarGrid.innerHTML = '';
        const currentUnlockedDay = getUnlockedDayCount();

        if (isAdmin) {
            adminIndicator.classList.remove('hidden');
        }

        for (let day = 1; day <= TOTAL_DAYS; day++) {
            const door = document.createElement('div');
            door.className = 'door';
            door.dataset.day = day;

            const icon = icons[(day - 1) % icons.length];
            const isAvailable = day <= currentUnlockedDay;
            const isLocked = !isAvailable;

            if (isAvailable) {
                door.classList.add('available');
            } else {
                door.classList.add('locked');
            }

            door.innerHTML = `
                <div class="door-inner">
                    <span class="door-number">${day}</span>
                    <span class="door-icon">${isLocked ? '🔒' : icon}</span>
                </div>
            `;

            door.addEventListener('click', () => handleDoorClick(day, isAvailable));
            calendarGrid.appendChild(door);
        }
    }

    // Get message for Day
    function getMessageForDay(day) {
        if (customMessages[day]) return customMessages[day];
        if (MESSAGES[day]) return MESSAGES[day];
        return {
            title: `Day ${day}의 추억`,
            text: `이곳에 ${day}일 차 편지 내용을 적어주세요.`
        };
    }

    // Door Click Logic
    function handleDoorClick(day, isAvailable) {
        if (!isAvailable && !isAdmin) {
            const unlockDate = new Date(CONFIG.START_DATE);
            unlockDate.setDate(unlockDate.getDate() + (day - 1));
            const dateString = `${unlockDate.getMonth() + 1}월 ${unlockDate.getDate()}일`;

            showToast(`🔒 Day ${day}는 ${dateString}에 열 수 있어요!`);
            return;
        }

        currentEditingDay = day;
        renderCalendar();

        const cardDate = new Date(CONFIG.START_DATE);
        cardDate.setDate(cardDate.getDate() + (day - 1));
        const formattedDate = cardDate.toISOString().split('T')[0].replace(/-/g, '.');

        const msgData = getMessageForDay(day);

        modalDayBadge.textContent = `Day ${day}`;
        modalDate.textContent = formattedDate;

        if (isAdmin) {
            modalViewContent.classList.add('hidden');
            modalEditContent.classList.remove('hidden');
            modalConfirmBtn.classList.add('hidden');
            saveEditBtn.classList.remove('hidden');

            editTitleInput.value = msgData.title;
            editTextarea.value = msgData.text;
        } else {
            modalViewContent.classList.remove('hidden');
            modalEditContent.classList.add('hidden');
            modalConfirmBtn.classList.remove('hidden');
            saveEditBtn.classList.add('hidden');

            modalTitle.textContent = msgData.title;
            modalText.innerHTML = msgData.text.replace(/\n/g, '<br>');
        }

        openModal();
    }

    // Save Admin Edits
    saveEditBtn.addEventListener('click', () => {
        if (!currentEditingDay) return;
        const newTitle = editTitleInput.value.trim() || `Day ${currentEditingDay}`;
        const newText = editTextarea.value.trim() || '내용이 없습니다.';

        saveSupabaseMessage(currentEditingDay, newTitle, newText);
        closeModal();
    });

    // Modal Control
    function openModal() { modalOverlay.classList.add('active'); }
    function closeModal() { modalOverlay.classList.remove('active'); }

    // Toast Control
    let toastTimeout;
    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // Listeners
    modalClose.addEventListener('click', closeModal);
    modalConfirmBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

    // Initialize Everything
    function startApp() {
        initPasswordProtection();
        initStars();
        initSupabase();
        renderCalendar();
    }

    startApp();
});
