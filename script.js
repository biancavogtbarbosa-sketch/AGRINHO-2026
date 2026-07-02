// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ===== MOBILE MENU =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe stat cards
document.querySelectorAll('.stat-card').forEach(card => {
    observer.observe(card);
});

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// ===== ANIMATED COUNTERS =====
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Observe stat numbers
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statObserver.observe(stat);
});

// ===== CHART.JS =====
const ctx = document.getElementById('emissionsChart').getContext('2d');

const emissionsChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['2010', '2015', '2020', '2025'],
        datasets: [
            {
                label: 'Emissões por hectare (ton CO₂/ha)',
                data: [2.8, 2.3, 1.9, 1.5],
                backgroundColor: 'rgba(44, 95, 45, 0.8)',
                borderColor: 'rgba(44, 95, 45, 1)',
                borderWidth: 2,
                borderRadius: 8
            },
            {
                label: 'Produtividade (ton/ha)',
                data: [2.5, 3.0, 3.4, 3.8],
                backgroundColor: 'rgba(151, 188, 98, 0.8)',
                borderColor: 'rgba(151, 188, 98, 1)',
                borderWidth: 2,
                borderRadius: 8
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        family: 'Space Grotesk',
                        size: 14
                    },
                    padding: 20
                }
            },
            title: {
                display: true,
                text: 'Evolução: Menos Emissões, Mais Produtividade',
                font: {
                    family: 'Playfair Display',
                    size: 18,
                    weight: 'bold'
                },
                padding: 20
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                    font: {
                        family: 'Space Grotesk'
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        family: 'Space Grotesk'
                    }
                }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
        }
    }
});

// ===== CALCULATOR =====
const calculatorForm = document.getElementById('calculatorForm');
const calculatorResult = document.getElementById('calculatorResult');

calculatorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const area = parseFloat(document.getElementById('area').value);
    const cultura = document.getElementById('cultura').value;
    const pratica = document.getElementById('pratica').value;
    
    // Calculation factors (simplified for demonstration)
    const factors = {
        soja: { water: 1.2, carbon: 0.8 },
        milho: { water: 1.0, carbon: 0.7 },
        cafe: { water: 1.5, carbon: 0.9 },
        cana: { water: 0.9, carbon: 1.1 },
        algodao: { water: 1.3, carbon: 0.85 }
    };
    
    const practiceFactors = {
        plantio_direto: { water: 1.2, carbon: 1.3 },
        ilpf: { water: 1.5, carbon: 1.8 },
        irrigacao: { water: 2.0, carbon: 1.1 },
        fbn: { water: 1.0, carbon: 1.5 }
    };
    
    const cultureFactor = factors[cultura];
    const practiceFactor = practiceFactors[pratica];
    
    const waterSaved = Math.round(area * cultureFactor.water * practiceFactor.water * 100);
    const carbonSaved = Math.round(area * cultureFactor.carbon * practiceFactor.carbon * 10) / 10;
    const treesEquivalent = Math.round(carbonSaved * 7); // 1 tree absorbs ~0.14 ton CO₂/year
    
    // Animate results
    animateResult('waterSaved', waterSaved);
    animateResult('carbonSaved', carbonSaved);
    animateResult('treesEquivalent', treesEquivalent);
    
    calculatorResult.classList.add('visible');
});

const animateResult = (elementId, target) => {
    const element = document.getElementById(elementId);
    const duration = 1500;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const update = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString('pt-BR');
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString('pt-BR');
        }
    };
    
    update();
};

// ===== CONCEPT CARDS =====
document.querySelectorAll('.concept-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = toggle.closest('.concept-card');
        card.classList.toggle('expanded');
    });
});

// Also toggle when clicking on the header
document.querySelectorAll('.concept-header').forEach(header => {
    header.addEventListener('click', () => {
        const card = header.closest('.concept-card');
        card.classList.toggle('expanded');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});
