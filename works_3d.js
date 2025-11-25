// works_3d.js - High Performance Event-Driven Version

const allProjects = [
    { title: "七十二空间", category: "Immersive", year: "2024", desc: "入选北京国际电影节。利用点云与粒子特效重构城市记忆的沉浸式影像作品。", img: "assets/images/p1_72spaces.jpg", link: "project_72spaces.html" },
    { title: "柒牌品牌广告", category: "AI", year: "2024", desc: "全球大学生 AI 创意大赛人气奖。利用 Midjourney 与 Runway 打造的超现实品牌叙事短片。", img: "assets/images/p2_qipai.jpg", link: "project_qipai.html" },
    { title: "迁形共忆", category: "Interactive", year: "2024", desc: "基于 TouchDesigner 的交互装置。采集海丝社区点云数据，通过触碰重构消失的文化空间。", img: "assets/images/p1_transmuted.jpg", link: "project_transmuted.html" },
    { title: "隐域穿梭", category: "AI", year: "2025", desc: "七彩虹 AIPC 挑战赛一等奖。结合赛博朋克视觉风格的显卡概念广告。", img: "assets/images/p2_hidden.jpg", link: "project_hidden.html" },
    { title: "光之门", category: "Immersive", year: "2024", desc: "广美毕业季开幕式核心视觉。以粒子光束勾勒建筑轮廓，象征创意的无限延展。", img: "assets/images/p2_gate.jpg", link: "project_gate.html" },
    { title: "亚森科技", category: "Branding", year: "2023", desc: "全案品牌升级。从 VI 识别系统到企业官网开发，构建现代化的数字化形象。", img: "assets/images/p3_yasen_cover.jpg", link: "project_yasen.html" },
    { title: "MIRROR", category: "Interactive", year: "2024", desc: "海峡两岸数字艺术二等奖。元宇宙背景下的情感交互虚拟角色。", img: "assets/images/p3_mirror.jpg", link: "project_mirror.html" },
    { title: "超现实数字梦境", category: "Immersive", year: "2024", desc: "元宇宙设计大赛银奖。将戏曲音频转化为可视化数据流。", img: "assets/images/p2_dream.jpg", link: "project_dream.html" },
    { title: "三星伴月", category: "Branding", year: "2022", desc: "三星堆文创 IP 设计。古蜀文明符号与现代潮玩美学的结合。", img: "assets/images/p3_stars.jpg", link: "project_stars.html" },
    { title: "忆音修复园", category: "Interactive", year: "2024", desc: "声音可视化装置。用数字手段修复人们对废弃游乐园的记忆。", img: "assets/images/p1_echoes.jpg", link: "project_echoes.html" }
];

const container = document.getElementById('gallery-container');
const progressBar = document.querySelector('.progress-bar');
const filterBtns = document.querySelectorAll('.filter-btn');
const navLabel = document.querySelector('.nav-label');
const navTrack = document.querySelector('.nav-track');

// 文本元素
const titleEl = document.getElementById('info-title');
const typeEl = document.getElementById('info-type');
const yearEl = document.getElementById('info-year');
const descEl = document.getElementById('info-desc');
const infoContent = document.querySelector('.info-content');

let currentProjects = [...allProjects];
let activeIndex = 0;
let cards = [];

function init() {
    if(infoContent) {
        infoContent.style.opacity = '1';
        infoContent.style.transform = 'translateY(0)';
    }
    setupFilters();
    renderGallery();
    updateLayout(); // 初始化布局
}

function setupFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            currentProjects = filter === 'All' ? [...allProjects] : allProjects.filter(p => p.category.includes(filter) || p.category === filter);
            
            activeIndex = 0;
            renderGallery();
            updateLayout();
        });
    });
}

function renderGallery() {
    container.innerHTML = '';
    if (navTrack) navTrack.innerHTML = '';

    if (currentProjects.length === 0) {
        container.innerHTML = '<div style="color:white;text-align:center;margin-top:20vh;">No projects found.</div>';
        updateInfo(null);
        return;
    }

    currentProjects.forEach((proj, index) => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.style.backgroundImage = `url('${proj.img}')`;
        
        card.addEventListener('click', () => {
            if (index === activeIndex) window.location.href = proj.link;
            else {
                activeIndex = index;
                updateLayout();
            }
        });
        container.appendChild(card);

        if (navTrack) {
            const dot = document.createElement('div');
            dot.className = 'nav-dot';
            dot.addEventListener('click', () => {
                activeIndex = index;
                updateLayout();
            });
            navTrack.appendChild(dot);
        }
    });

    cards = document.querySelectorAll('.gallery-card');
    updateInfo(0);
    updateNavDots(0);
}

// --- 核心：高性能布局更新 (只在操作时运行) ---
function updateLayout() {
    cards.forEach((card, index) => {
        const diff = index - activeIndex;
        
        // 1. 绝对层级：离 activeIndex 越近，层级越高
        const zIndex = 100 - Math.abs(diff);
        card.style.zIndex = zIndex;

        if (diff === 0) {
            // === Active (C位) ===
            card.className = 'gallery-card active visible';
            card.style.transform = `translate3d(0, 0, 0) scale(1)`;
            card.style.opacity = 1;
        
        } else if (diff > 0) {
            // === Future (右后方阶梯) ===
            if (diff <= 5) { // 只显示后面5张，更远的隐藏以提升性能
                card.className = 'gallery-card visible';
                // 算法：每往后一张，向右移 200px，向后退 300px
                const tx = diff * 150; 
                const tz = diff * -200;
                card.style.transform = `translate3d(${tx}px, 0, ${tz}px) scale(1)`;
                card.style.opacity = 1; 
            } else {
                card.className = 'gallery-card'; // 移除 visible
                card.style.opacity = 0;
            }
        
        } else {
            // === Past (左方消失) ===
            // 稍微往左移一点并消失
            card.className = 'gallery-card';
            card.style.transform = `translate3d(-300px, 0, 100px) scale(0.8)`;
            card.style.opacity = 0;
        }
    });

    updateInfo(activeIndex);
    updateNavDots(activeIndex);
    
    // 进度条
    if (currentProjects.length > 1 && progressBar) {
        const progress = (activeIndex / (currentProjects.length - 1)) * 100;
        progressBar.style.height = `${Math.max(0, Math.min(100, progress))}%`;
    }
}

// 辅助函数
function updateInfo(index) {
    if (index === null || !currentProjects[index]) {
        if(titleEl) titleEl.innerText = "";
        return;
    }
    const data = currentProjects[index];
    if(titleEl) titleEl.innerText = data.title;
    if(typeEl) typeEl.innerText = data.category;
    if(yearEl) yearEl.innerText = data.year;
    if(descEl) descEl.innerText = data.desc;
    if (navLabel) navLabel.innerText = `${(index + 1).toString().padStart(2, '0')} / ${currentProjects.length.toString().padStart(2, '0')}`;
}

function updateNavDots(index) {
    if (!navTrack) return;
    const dots = navTrack.querySelectorAll('.nav-dot');
    dots.forEach((dot, i) => {
        if (i === index) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}

// --- 交互监听 ---

// 滚轮防抖
let lastWheel = 0;
window.addEventListener('wheel', (e) => {
    const now = Date.now();
    if (now - lastWheel < 100) return; // 100ms 内只响应一次
    lastWheel = now;

    if (e.deltaY > 0) {
        if (activeIndex < currentProjects.length - 1) activeIndex++;
    } else {
        if (activeIndex > 0) activeIndex--;
    }
    updateLayout();
});


// --- 手机端触摸滑动逻辑 (Touch Swipe) ---
let touchStartX = 0;
let touchStartY = 0;

window.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: false });

window.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    
    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;

    // 判断是水平滑动还是垂直滚动
    // 如果水平距离 > 垂直距离，且水平距离 > 40px，则认为是切换卡片
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
        if (deltaX > 0) {
            // 向左滑 -> 下一张
            if (targetIndex < currentProjects.length - 1) {
                targetIndex++;
            }
        } else {
            // 向右滑 -> 上一张
            if (targetIndex > 0) {
                targetIndex--;
            }
        }
    }
}, { passive: false });

init();