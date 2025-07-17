// Contact form submission
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    try {
        // Feedback visual
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
        
        // Form submission
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) throw new Error('Erro na resposta do servidor');
        
        // Success - redirect
        window.location.href = form.querySelector('input[name="_next"]').value;
        
    } catch (error) {
        console.error('Erro no envio:', error);
        alert('Erro ao enviar mensagem. Por favor, tente novamente mais tarde.');
    } finally {
        // Restore button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Toggle between hamburger and X icon
        const icon = this.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.querySelector('#mobile-menu-button i').classList.remove('fa-times');
            document.querySelector('#mobile-menu-button i').classList.add('fa-bars');
        });
    });

    // Animated chart
    const ctx = document.getElementById('animated-chart').getContext('2d');
    
    // Sample chart data
    const data = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                label: 'Receita',
                data: [120000, 150000, 180000, 210000],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            },
            {
                label: 'Lucro',
                data: [40000, 55000, 65000, 75000],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }
        ]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
                        }
                    }
                }
            },
            animation: {
                duration: 2000
            }
        }
    };
    
    new Chart(ctx, config);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Resume download button
    document.getElementById('downloadBtn').addEventListener('click', function() {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = 'Tiago Pereira Nunes da Silva_en.pdf';
        link.download = 'Tiago Pereira Nunes da Silva_en.pdf';
        
        // Simulate click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show a confirmation (optional)
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check mr-2"></i> Download Iniciado';
        this.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        this.classList.add('bg-green-600', 'hover:bg-green-700');
        
        // Reset after 2 seconds
        setTimeout(() => {
            this.innerHTML = originalText;
            this.classList.remove('bg-green-600', 'hover:bg-green-700');
            this.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }, 2000);
    });

    // Simple fade-in animation for elements
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    // Considera a altura da seção #home para o efeito
    const homeSection = document.getElementById('home');
    if (!nav || !homeSection) return;
    const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
    if (window.scrollY < homeBottom - 80) {
        nav.style.opacity = '1';
    } else {
        nav.style.opacity = '0.7';
    }
});