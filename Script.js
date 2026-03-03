const revealElements = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
const navToggle = document.querySelector('.nav-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const toTopBtn = document.getElementById('toTopBtn');
const year = document.getElementById('year');

const revealObserver = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	},
	{
		threshold: 0.18,
	}
);

revealElements.forEach((element) => revealObserver.observe(element));

const setActiveNavLink = () => {
	let currentSection = 'about';

	sections.forEach((section) => {
		const sectionTop = section.offsetTop - 130;
		if (window.scrollY >= sectionTop) {
			currentSection = section.id;
		}
	});

	navLinks.forEach((link) => {
		link.classList.remove('active');
		if (link.getAttribute('href') === `#${currentSection}`) {
			link.classList.add('active');
		}
	});
};

setActiveNavLink();
window.addEventListener('scroll', setActiveNavLink);

if (navToggle && navLinksContainer) {
	navToggle.addEventListener('click', () => {
		const isOpen = navLinksContainer.classList.toggle('open');
		navToggle.setAttribute('aria-expanded', String(isOpen));
		navToggle.textContent = isOpen ? '✕' : '☰';
	});

	navLinks.forEach((link) => {
		link.addEventListener('click', () => {
			navLinksContainer.classList.remove('open');
			navToggle.setAttribute('aria-expanded', 'false');
			navToggle.textContent = '☰';
		});
	});
}

if (toTopBtn) {
	const updateToTopVisibility = () => {
		if (window.scrollY > 500) {
			toTopBtn.classList.add('show');
		} else {
			toTopBtn.classList.remove('show');
		}
	};

	updateToTopVisibility();
	window.addEventListener('scroll', updateToTopVisibility);
	toTopBtn.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
}

if (year) {
	year.textContent = String(new Date().getFullYear());
}
