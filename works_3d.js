// works_3d.js - High Performance Event-Driven Version (包含缩略图联动功能)

// works_3d.js

const allProjects = [
    // --- Section 01: 数字空间 × 文化叙事 ---
    { 
        title: "七十二空间", 
        category: "Immersive", 
        year: "2024", 
        desc: "入选北京国际电影节。利用点云与粒子特效重构城市记忆的沉浸式影像作品。", 
        img: "assets/images/p1_72spaces.jpg", 
        link: "project_72spaces.html" 
    },
    { 
        title: "琵琶一曲世千年", 
        category: "Immersive", // 3D Mapping 通常归类为沉浸式
        year: "2023", 
        desc: "数字文旅 3D Mapping 项目。将古画与光影结合的数字叙事体验。", 
        img: "assets/images/p1_pipa.jpg", 
        link: "project_pipa.html" 
    },
    { 
        title: "超现实数字梦境", 
        category: "Immersive", // 根据主页语境，也可改为 AI，暂保持 Immersive
        year: "2024", 
        desc: "元宇宙设计大赛银奖。将戏曲音频转化为可视化数据流。", 
        img: "assets/images/p2_dream.jpg", 
        link: "project_dream.html" 
    },

    // --- Section 02: AI × 动态影像 ---
    { 
        title: "柒牌品牌广告", 
        category: "AI", 
        year: "2024", 
        desc: "全球大学生 AI 创意大赛人气奖。利用 Midjourney 与 Runway 打造的超现实品牌叙事短片。", 
        img: "assets/images/p2_qipai.jpg", 
        link: "project_qipai.html" 
    },
    { 
        title: "隐域穿梭", 
        category: "AI", 
        year: "2025", 
        desc: "七彩虹 AIPC 挑战赛一等奖。结合赛博朋克视觉风格的显卡概念广告。", 
        img: "assets/images/p2_hidden.jpg", 
        link: "project_hidden.html" 
    },
    { 
        title: "光之门", 
        category: "AI", 
        year: "2024", 
        desc: "广美毕业季开幕式核心视觉。以粒子光束勾勒建筑轮廓，象征创意的无限延展。", 
        img: "assets/images/p2_gate.jpg", 
        link: "project_gate.html" 
    },

    // --- Section 03: 视觉设计 × Interactive ---

    { 
        title: "MIRROR", 
        category: "Branding", 
        year: "2024", 
        desc: "海峡两岸数字艺术二等奖。元宇宙背景下的情感交互虚拟角色。", 
        img: "assets/images/p3_mirror.jpg", 
        link: "project_mirror.html" 
    },
    { 
        title: "亚森科技VI", 
        category: "Branding", 
        year: "2023", 
        desc: "全案品牌升级。从 VI 识别系统到企业官网开发，构建现代化的数字化形象。", 
        img: "assets/images/p3_yasen_cover.jpg", 
        link: "project_yasen.html" 
    },
    { 
        title: "U米 (U-Mi)", 
        category: "Branding", 
        year: "2025", 
        desc: "元宇宙数据工程师 IP。结合拟物化与科技感，打造兼具工程师气质与温暖性格的智能伙伴。", 
        img: "assets/images/p3_umi.jpg", 
        link: "project_umi.html" 
    },
    { 
        title: "三星伴月", 
        category: "Branding", 
        year: "2022", 
        desc: "三星堆文创 IP 设计。古蜀文明符号与现代潮玩美学的结合。", 
        img: "assets/images/p3_stars.jpg", 
        link: "project_stars.html" 
    },

    
    // --- Section 04: 交互 × 动态影像 ---
    { 
        title: "顽石与诗", 
        category: "Interactive", 
        year: "2024", 
        desc: "央美实验艺术系合作项目。扫描自然顽石触发儿童诗歌，通过 AR 技术构建自然与童真的诗意对话。", 
        img: "assets/images/p1_stones.jpg", 
        link: "project_stones.html" 
    },
    { 
        title: "迁形共忆", 
        category: "Interactive", 
        year: "2024", 
        desc: "基于 TouchDesigner 的交互装置。采集海丝社区点云数据，通过触碰重构消失的文化空间。", 
        img: "assets/images/p1_transmuted.jpg", 
        link: "project_transmuted.html" 
    },
    { 
        title: "忆音修复园", 
        category: "Interactive", 
        year: "2024", 
        desc: "声音可视化装置。用数字手段修复人们对废弃游乐园的记忆。", 
        img: "assets/images/p1_echoes.jpg", 
        link: "project_echoes.html" 
    },
    { 
        title: "城市脉动", 
        category: "Interactive", 
        year: "2024", 
        desc: "广州灯光节交互作品。以心形装置响应触碰压力，寓意粤港澳大湾区同频共振的生命律动。", 
        img: "assets/images/p1_urban.jpg", 
        link: "project_urban.html" 
    },

];

// --- DOM 元素获取 ---
const container = document.getElementById('gallery-container');
const progressBar = document.querySelector('.progress-bar');
const filterBtns = document.querySelectorAll('.filter-btn');
const navLabel = document.querySelector('.nav-label');
const navTrack = document.querySelector('.nav-track');

// 左右切换按钮
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// 文本元素
const titleEl = document.getElementById('info-title');
const typeEl = document.getElementById('info-type');
const yearEl = document.getElementById('info-year');
const descEl = document.getElementById('info-desc');
const infoContent = document.querySelector('.info-content');

// --- 新增：缩略图相关 DOM ---
const thumbTrack = document.getElementById('thumb-track'); // 获取缩略图容器
let thumbCards = []; // 用来存缩略图的 DOM

// --- 状态变量 ---
let currentProjects = [...allProjects];
let activeIndex = 0;
let cards = [];

// --- 初始化 ---
function init() {
    if(infoContent) {
        infoContent.style.opacity = '1';
        infoContent.style.transform = 'translateY(0)';
    }
    setupFilters();
    setupNavButtons(); // 初始化按钮监听
    renderGallery();
    updateLayout(); // 初始化布局
}

// --- 过滤器设置 ---
function setupFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            currentProjects = filter === 'All' ? [...allProjects] : allProjects.filter(p => p.category.includes(filter) || p.category === filter);
            
            activeIndex = 0; // 重置到第一张
            renderGallery();
            updateLayout();
        });
    });
}

// --- 按钮监听设置 ---
function setupNavButtons() {
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (activeIndex > 0) {
                activeIndex--;
                updateLayout();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (activeIndex < currentProjects.length - 1) {
                activeIndex++;
                updateLayout();
            }
        });
    }
}

// --- 渲染画廊 DOM (包含缩略图生成) ---
function renderGallery() {
    container.innerHTML = '';
    if (navTrack) navTrack.innerHTML = '';
    
    // 清空旧的缩略图
    if (thumbTrack) thumbTrack.innerHTML = ''; 

    if (currentProjects.length === 0) {
        container.innerHTML = '<div style="color:white;text-align:center;margin-top:20vh;">No projects found.</div>';
        updateInfo(null);
        return;
    }

    currentProjects.forEach((proj, index) => {
        // 1. 创建大图 Card
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.style.backgroundImage = `url('${proj.img}')`;
        
        // 点击卡片逻辑
        card.addEventListener('click', () => {
            if (index === activeIndex) window.location.href = proj.link;
            else {
                activeIndex = index;
                updateLayout();
            }
        });
        container.appendChild(card);

        // 2. 创建底部小圆点 (如果还有的话)
        if (navTrack) {
            const dot = document.createElement('div');
            dot.className = 'nav-dot';
            dot.addEventListener('click', () => {
                activeIndex = index;
                updateLayout();
            });
            navTrack.appendChild(dot);
        }

        // 3. 创建缩略图 (新增逻辑)
        if (thumbTrack) {
            const thumb = document.createElement('div');
            thumb.className = 'thumb-item';
            thumb.style.backgroundImage = `url('${proj.img}')`;
            
            // 点击缩略图切换
            thumb.addEventListener('click', () => {
                activeIndex = index;
                updateLayout();
            });
            thumbTrack.appendChild(thumb);
        }
    });

    cards = document.querySelectorAll('.gallery-card');
    thumbCards = document.querySelectorAll('.thumb-item'); // 获取所有缩略图元素
    
    // 初始化一次状态
    updateInfo(activeIndex);
    updateNavDots(activeIndex);
    updateThumbs(activeIndex); 
    updateButtonState(); 
}

// --- 核心：布局与状态更新 (包含联动逻辑) ---
function updateLayout() {
    cards.forEach((card, index) => {
        const diff = index - activeIndex;
        
        // 1. 绝对层级
        const zIndex = 100 - Math.abs(diff);
        card.style.zIndex = zIndex;

        if (diff === 0) {
            // === Active (C位) ===
            card.className = 'gallery-card active visible';
            card.style.transform = `translate3d(0, 0, 0) scale(1)`;
            card.style.opacity = 1;
        
        } else if (diff > 0) {
            // === Future (右后方) ===
            if (diff <= 5) { // 性能优化：只显示后面5张
                card.className = 'gallery-card visible';
                const tx = diff * 150; 
                const tz = diff * -200;
                card.style.transform = `translate3d(${tx}px, 0, ${tz}px) scale(1)`;
                card.style.opacity = 1; 
            } else {
                card.className = 'gallery-card'; 
                card.style.opacity = 0;
            }
        
        } else {
            // === Past (左方消失) ===
            card.className = 'gallery-card';
            card.style.transform = `translate3d(-300px, 0, 100px) scale(0.8)`;
            card.style.opacity = 0;
        }
    });

    // 更新文字
    updateInfo(activeIndex);
    // 更新小圆点
    updateNavDots(activeIndex);
    // 更新箭头状态
    updateButtonState(); 
    
    // --- 核心新增：更新缩略图状态 ---
    updateThumbs(activeIndex); 
    
    // 进度条更新
    if (currentProjects.length > 1 && progressBar) {
        const progress = (activeIndex / (currentProjects.length - 1)) * 100;
        progressBar.style.height = `${Math.max(0, Math.min(100, progress))}%`;
    }
}

// --- 辅助：更新文本信息 ---
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

// --- 辅助：更新底部圆点 ---
function updateNavDots(index) {
    if (!navTrack) return;
    const dots = navTrack.querySelectorAll('.nav-dot');
    dots.forEach((dot, i) => {
        if (i === index) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}

// --- 辅助：更新缩略图状态 (新增函数) ---
function updateThumbs(index) {
    if (!thumbCards.length) return;
    thumbCards.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
            // 可选：如果缩略图很多，自动滚动到当前选中的位置
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            thumb.classList.remove('active');
        }
    });
}

// --- 辅助：更新按钮状态 ---
function updateButtonState() {
    if (!prevBtn || !nextBtn) return;
    
    if (activeIndex === 0) prevBtn.classList.add('disabled');
    else prevBtn.classList.remove('disabled');

    if (activeIndex === currentProjects.length - 1) nextBtn.classList.add('disabled');
    else nextBtn.classList.remove('disabled');
}

// --- 交互监听 ---

// 1. 鼠标滚轮
let lastWheel = 0;
window.addEventListener('wheel', (e) => {
    const now = Date.now();
    if (now - lastWheel < 100) return; // 防抖
    lastWheel = now;

    if (e.deltaY > 0) {
        if (activeIndex < currentProjects.length - 1) {
            activeIndex++;
            updateLayout();
        }
    } else {
        if (activeIndex > 0) {
            activeIndex--;
            updateLayout();
        }
    }
});

// 2. 手机端触摸滑动
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

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
        if (deltaX > 0) {
            // 向左滑 (手指左移) -> 看下一张
            if (activeIndex < currentProjects.length - 1) {
                activeIndex++;
                updateLayout();
            }
        } else {
            // 向右滑 (手指右移) -> 看上一张
            if (activeIndex > 0) {
                activeIndex--;
                updateLayout();
            }
        }
    }
}, { passive: false });

// 启动
init();