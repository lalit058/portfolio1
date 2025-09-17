document.addEventListener('DOMContentLoaded', () => {

    // Sidebar Toggle
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    if (toggleBtn && sidebar) {
        // Toggle sidebar when button is clicked
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        // Close sidebar when clicking on overlay
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });

        // Close sidebar when clicking on nav links (mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                }
            });
        });

        // Close sidebar when clicking outside (on mobile)
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                sidebar.classList.contains('active') &&
                !sidebar.contains(e.target) &&
                !toggleBtn.contains(e.target)) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    }

    // Close sidebar when clicking on nav links (mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                const overlay = document.querySelector('.sidebar-overlay');
                if (overlay) overlay.remove();
            }
        });
    });

    // Count-up animation for stats
    function countUp() {
        const counters = document.querySelectorAll(".counter");
        counters.forEach(counter => {
            counter.innerText = '0';
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const current = +counter.innerText;
                const increment = target / 200;

                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    ScrollTrigger.create({
        trigger: "#stats",
        start: "top 80%",
        onEnter: countUp,
    });

    // Smooth Scroll & Active Nav
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) current = section.getAttribute('id');
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) link.classList.add('active');
        });

        if (backToTop) {
            backToTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
        }

        document.querySelectorAll('.fade-section').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                section.classList.add('visible');
            }
        });
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Typewriter Effect
    const roles = ["Full Stack Web Developer", "React & Node.js Enthusiast", "Python & Django Developer"];
    const heroRole = document.getElementById('hero-role');
    let roleIndex = 0, charIndex = 0;

    function typeRole() {
        if (charIndex < roles[roleIndex].length) {
            heroRole.textContent += roles[roleIndex][charIndex];
            charIndex++;
            setTimeout(typeRole, 100);
        } else {
            setTimeout(eraseRole, 1500);
        }
    }

    function eraseRole() {
        if (charIndex > 0) {
            heroRole.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseRole, 50);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 500);
        }
    }
    if (heroRole) typeRole();

    // Skills Animation
    function getCircleTextColor() {
        return document.body.classList.contains('dark-mode') ? '#fff' : '#111';
    }

    function renderSkillCircles() {
        document.querySelectorAll('.skill-item').forEach(item => {
            const percent = item.getAttribute('data-percent');
            const bar = item.querySelector('.progress-fill');
            const circle = item.querySelector('.circle');

            setTimeout(() => { if (bar) bar.style.width = percent + '%'; }, 300);

            const radius = 18;
            const circumference = 2 * Math.PI * radius;

            if (circle) {
                const textColor = getCircleTextColor();
                circle.innerHTML = `<svg width="40" height="40">
                    <circle cx="20" cy="20" r="${radius}" stroke="#555" stroke-width="4" fill="none"/>
                    <circle cx="20" cy="20" r="${radius}" stroke="#ff9800" stroke-width="4" fill="none"
                    stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}"/>
                    <text x="50%" y="50%" text-anchor="middle" dy="6" font-size="12" fill="${textColor}">${percent}%</text>
                </svg>`;

                const progressCircle = circle.querySelectorAll('circle')[1];
                setTimeout(() => {
                    progressCircle.style.transition = 'stroke-dashoffset 1.5s ease';
                    progressCircle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
                }, 400);
            }
        });
    }
    renderSkillCircles();

    function updateCircleTextColor() {
        const newColor = getCircleTextColor();
        document.querySelectorAll('.skill-item .circle text').forEach(txt => {
            txt.setAttribute('fill', newColor);
        });
    }

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                card.style.display = (filter === 'all' || card.classList.contains(filter)) ? 'block' : 'none';
            });
        });
    });

    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    let testIndex = 0;

    function showTestimonial() {
        testimonials.forEach(t => t.classList.remove('active'));
        if (testimonials[testIndex]) testimonials[testIndex].classList.add('active');
        testIndex = (testIndex + 1) % testimonials.length;
        setTimeout(showTestimonial, 5000);
    }
    if (testimonials.length > 0) showTestimonial();

    // Dark / Light Mode
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }

        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            } else {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            }
            updateCircleTextColor();
        });
    }

    // GitHub Stats Integration
    const username = "lalit058";
    const githubApi = `https://api.github.com/users/${username}`;
    const reposApi = `https://api.github.com/users/${username}/repos?sort=stars&per_page=5`;

    async function fetchGitHubData() {
        try {
            const res = await fetch(githubApi);
            const data = await res.json();

            document.getElementById("profile-pic").src = data.avatar_url;
            document.getElementById("username").textContent = data.login;
            document.getElementById("bio").textContent = data.bio || "";
            document.getElementById("followers").textContent = `Followers: ${data.followers}`;
            document.getElementById("following").textContent = `Following: ${data.following}`;
            document.getElementById("github-link").href = data.html_url;
            animateCounter("repo-count", data.public_repos);

            const reposRes = await fetch(reposApi);
            const repos = await reposRes.json();
            let starCount = 0;
            const languageSet = new Set();

            repos.forEach(repo => {
                if (repo.language) languageSet.add(repo.language);
                starCount += repo.stargazers_count;
            });

            document.getElementById("top-languages").textContent = `Top Languages: ${[...languageSet].join(", ")}`;
            animateCounter("star-count", starCount);

            const reposList = document.getElementById("repos-list");
            repos.forEach(repo => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a> - ⭐ ${repo.stargazers_count} - Forks: ${repo.forks_count}`;
                reposList.appendChild(li);
            });

        } catch (err) {
            console.error(err);
        }
    }

    function animateCounter(id, value) {
        const el = document.getElementById(id);
        let count = 0;
        const increment = Math.ceil(value / 100);
        const interval = setInterval(() => {
            count += increment;
            if (count >= value) {
                el.textContent = value;
                clearInterval(interval);
            } else {
                el.textContent = count;
            }
        }, 15);
    }

    fetchGitHubData();

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: contactForm.querySelector('input[type="text"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                message: contactForm.querySelector('textarea').value
            };

            try {
                const response = await fetch('http://localhost:3000/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                formMessage.textContent = result.message || result.error;
                formMessage.style.display = 'block';
                formMessage.style.color = result.message ? '#155724' : '#721c24';
                formMessage.className = result.message ? 'bold-success' : 'bold-error';

                if (result.message) contactForm.reset();

                setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
            } catch (err) {
                formMessage.textContent = 'Failed to send message. Please check your connection.';
                formMessage.style.display = 'block';
                formMessage.style.color = '#721c24';
                formMessage.style.fontWeight = '700';
                console.error(err);
                setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
            }
        });
    }

});
