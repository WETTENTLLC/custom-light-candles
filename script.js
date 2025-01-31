document.addEventListener('DOMContentLoaded', () => {
    /** === Smooth Scrolling for Navigation Links === **/
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith("#")) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.warn(`No section found with ID '${targetId}'`);
                }
            }
        });
    });

    /** === Floating Frame Hover Effect === **/
    const frames = document.querySelectorAll('.frame');

    frames.forEach(frame => {
        frame.addEventListener('mouseover', () => {
            frame.classList.add('floating');
        });
        frame.addEventListener('mouseout', () => {
            frame.classList.remove('floating');
        });
    });

    /** === Carousel Functionality === **/
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    if (track && prevButton && nextButton) {
        let currentIndex = 0;

        nextButton.addEventListener('click', () => {
            const items = document.querySelectorAll('.carousel-item');
            if (currentIndex < items.length - 1) {
                currentIndex++;
                track.style.transform = `translateX(-${currentIndex * 260}px)`;
            }
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                track.style.transform = `translateX(-${currentIndex * 260}px)`;
            }
        });
    } else {
        console.warn("Carousel elements not found. Skipping carousel script.");
    }
});
