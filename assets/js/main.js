// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 페이지 로드 시 애니메이션 적용
document.addEventListener('DOMContentLoaded', () => {
    // 프로필 카드 애니메이션
    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // 포트폴리오 아이템 애니메이션
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 수상이력(award) 모달 핸들링
    const awardItems = document.querySelectorAll('.award-item');
    const modal = document.querySelector('#award-modal');
    const modalOverlay = document.querySelector('#award-modal .modal-overlay');
    const modalImg = document.querySelector('#award-modal .modal-image');
    const modalTitle = document.querySelector('#award-modal .modal-title');
    const modalDesc = document.querySelector('#award-modal .modal-desc');
    const modalClose = document.querySelector('#award-modal .modal-close');

    if (awardItems && modal) {
        awardItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.getAttribute('data-image') || '';
                const title = item.getAttribute('data-title') || '';
                const desc = item.getAttribute('data-desc') || '';

                if (modalImg) modalImg.src = img;
                if (modalTitle) modalTitle.textContent = title;
                if (modalDesc) modalDesc.textContent = desc;

                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        };

        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
        if (modalClose) modalClose.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
    }
});

// 마우스 커서 효과 (선택사항)
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

