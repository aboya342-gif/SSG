document.addEventListener('DOMContentLoaded', () => {
    // Chart Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const mainChart = document.getElementById('main-chart');
    const chartTitle = document.getElementById('current-chart-title');
    const chartDesc = document.getElementById('chart-desc');

    const chartInfo = {
        '01_keyword_tfidf.png': {
            title: 'itemName 주요 키워드 분석 (TF-IDF)',
            desc: '상품명 분석을 통해 시리얼, 티셔츠, 2026 등 현재 시즌의 핵심 특가 키워드를 도출했습니다. 명확한 마케팅 소구점 확보가 가능합니다.'
        },
        '02_brand_count.png': {
            title: '상위 30개 브랜드 빈도수',
            desc: '스포츠 및 식품 브랜드의 압도적인 비중을 확인할 수 있습니다. 인지도 높은 브랜드 기반의 미끼 상품 전략이 유효함을 시사합니다.'
        },
        '03_seller_count.png': {
            title: '판매처(Seller) 빈도수 분석',
            desc: 'S.COM몰의 높은 비중과 신세계백화점의 프리미엄 라인업 간의 균형 잡힌 유통 구조가 파악되었습니다.'
        },
        '04_price_dist.png': {
            title: '전체 판매가 분포 현황',
            desc: '대부분의 상품이 10만원 이하의 중저가 구간에 집중되어 있으나, 일부 초고가 상품이 롱테일 구조를 형성하고 있어 가격 가독성 전략이 중요합니다.'
        },
        '05_discount_rate_dist.png': {
            title: '할인율 분포 분석',
            desc: '평균 25% 내외의 할인이 가장 활발하며, 50% 이상의 고할인 상품이 구매 전환의 핵심 동력으로 관찰됩니다.'
        },
        '10_correlation_heatmap.png': {
            title: '주요 수치 변수 상관관계',
            desc: '정가와 판매가 사이의 강력한 상관계수(0.99)를 확인했습니다. 이는 높은 정가를 바탕으로 한 할인율 마케팅의 신인도를 보여줍니다.'
        },
        '11_brand_seller_crosstab.png': {
            title: '브랜드 x 판매처 교차 분석',
            desc: '특정 판매처에 집중된 브랜드 라인업을 파악하여, 채널 다변화를 통한 추가 매출 가능성을 확인할 수 있습니다.'
        }
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const fileName = btn.getAttribute('data-chart');
            const info = chartInfo[fileName];

            // Change content with animation
            const chartDisplay = document.querySelector('.chart-display');
            chartDisplay.style.opacity = '0';
            
            setTimeout(() => {
                mainChart.src = `assets/${fileName}`;
                chartTitle.textContent = info.title;
                chartDesc.textContent = info.desc;
                chartDisplay.style.opacity = '1';
            }, 300);
        });
    });

    // Reveal on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-delay').forEach(el => {
        observer.observe(el);
    });

    // KPI Counter Animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.innerText;
        const speed = 100;
        const updateCount = () => {
            const count = +counter.innerText;
            const inc = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
});
