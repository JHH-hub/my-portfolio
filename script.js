// script.js - One-Way Fade Out (Text Never Returns)

document.addEventListener('DOMContentLoaded', () => {
    
    const body = document.body;
    const heroSection = document.querySelector('#hero-section'); 

    if (heroSection) {
        // === 首页逻辑 ===
        console.log("Home Page Logic Active");

        // 定义一个函数：永久隐藏文字
        function hideTextPermanently() {
            if (!body.classList.contains('view-mode')) {
                body.classList.add('view-mode'); // 添加隐藏文字的类
            }
        }

        // 1. 【倒计时】2.5秒后自动隐藏
        let autoHideTimer = setTimeout(() => {
            // 只有当用户还在顶部时才执行，避免冲突
            if (window.scrollY < 50) {
                hideTextPermanently();
            }
        }, 2500);

        // 2. 【滚动监听】
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // A. 只要发生滚动，立即隐藏文字，并清除倒计时
            if (scrollY > 10) {
                clearTimeout(autoHideTimer);
                hideTextPermanently(); // 文字消失后，再也不会回来
            }

            // B. 背景变暗逻辑 (依然需要，为了看清下方作品)
            if (scrollY > 50) {
                body.classList.add('scrolled'); // 背景变黑
            } else {
                body.classList.remove('scrolled'); // 回到顶部背景变亮 (但文字不会回来)
            }
        });

        // 刷新页面时的修正
        if (window.scrollY > 10) {
            hideTextPermanently();
            body.classList.add('scrolled');
        }

    } else {
        // === 子页面逻辑 ===
        body.classList.add('scrolled');
        // 子页面也加上 view-mode 确保文字一开始就是隐藏的(虽然子页面没文字，但为了逻辑统一)
        body.classList.add('view-mode');
    }

    // --- 轮播逻辑 (保持不变) ---
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(container => {
        const track = container.querySelector('.carousel-track');
        const btnPrev = container.querySelector('.nav-btn.prev');
        const btnNext = container.querySelector('.nav-btn.next');
        const scrollAmount = 380; 

        if(btnNext && btnPrev) {
            btnNext.addEventListener('click', () => {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
            btnPrev.addEventListener('click', () => {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }
    });
});