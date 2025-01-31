document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 
'smooth' });
        });
    });

    const frames = document.querySelectorAll('.frame');
    frames.forEach(frame => {
        frame.addEventListener('mouseover', () => {
            frame.classList.add('floating');
        });
        frame.addEventListener('mouseout', () => {
            frame.classList.remove('floating');
        });
    });

    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    nextButton.addEventListener('click', () => {
        const items = document.querySelectorAll('.carousel-item');
        if (currentIndex < items.length - 1) {
            currentIndex++;
            track.style.transform = `translateX(-${currentIndex * 
260}px)`;
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            track.style.transform = `translateX(-${currentIndex * 
260}px)`;
        }
    });
});

