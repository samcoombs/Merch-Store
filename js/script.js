// Base URL
const siteURL = new URL(window.location.href);

// VARIABLES
const header = document.querySelector('.header');
const navLink = document.querySelectorAll('.header__list li a');

// GLOBAL
(function() {
    navLink.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = e.target.getAttribute("href");
            document.querySelector(id).scrollIntoView({ behavior: "smooth" });
        })
    })
})();

// Header mover
// (function() {
//     const hero = document.querySelector('.hero');
//     document.addEventListener('scroll', (e) => {
//         if(window.pageYOffset > hero.offsetHeight && window.innerWidth > 768) {
//             header.style.position = 'fixed';
//         } else {
//             header.style.position = 'absolute';
//         }
//     })
// })();


// HOMEPAGE ONLY
// When on WP: body.classList.contains('home')
if(siteURL.pathname === '/' || siteURL.pathname === '/index.html'){

    // Hero Mute
    (function(){
        let heroMuted = true;
        const heroVideo = document.querySelector('.hero video');
        const heroVidMuted = document.querySelector('.hero__volume--muted');
        const heroVidUnmuted = document.querySelector('.hero__volume--unmuted')
        document.querySelector('.hero__volume').addEventListener('click', () => {
            if(heroMuted){
                heroVideo.muted = false;
                heroVidMuted.style.display = 'none';
                heroVidUnmuted.style.display = 'block';
                heroMuted = false;
            } else {
                heroVideo.muted = true;
                heroVidMuted.style.display = 'block';
                heroVidUnmuted.style.display = 'none';
                heroMuted = true;
            }
        })
    }());
    

    function playPauseVideo() {
        let videos = document.querySelectorAll("video");
        videos.forEach((video) => {
            // We can only control playback without insteraction if video is mute
            // video.muted = true;
            // Play is a promise so we need to check we have it
            let playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.then((_) => {
                    let observer = new IntersectionObserver(
                        (entries) => {
                            entries.forEach((entry) => {
                                // console.log(entry.intersectionRatio)
                                if (entry.intersectionRatio !== 0) {
                                    video.play();
                                    header.classList.add('nav-visible');
                                    header.classList.remove('nav-hidden');
                                } else {
                                    video.pause();
                                    header.classList.add('nav-hidden');
                                    header.classList.remove('nav-visible');
                                }
                            });
                        },
                        { threshold: 0 }
                    );
                    observer.observe(video);
                });
            }
        });
    }

    // Mobile pause / play video
    (function() {
        const heroVideo = document.querySelector('.hero video');
            heroVideo.addEventListener('click', () => {
                if(window.innerWidth < 768 && !heroVideo.paused) {
                    heroVideo.pause();
                } else {
                    heroVideo.play();
                }
        })
        
    })();

    (function() {
        const heroVideo = document.querySelector('.hero video');
        if(window.innerWidth < 768) {
            heroVideo.removeAttribute('loop')
        }
    })();
    
    
    // And you would kick this off where appropriate with:
    playPauseVideo();



    // Expand Projects

    (function(){
        const expandDiv = document.querySelector('.expand-projects');
        const expandText = document.querySelector('.expand-projects p');
        const expandSpan = document.querySelector('.expand-projects span');
        const projectsContainer = document.querySelector('.hp-work__grid');

        const projectsHeight = function() {
            // Set div height dynamically
            projectsContainer.style.maxHeight = projectsContainer.scrollHeight / 2 + 'px';

            // Expand div height
            expandDiv.addEventListener('click', () => {
                if(expandDiv.getAttribute('value') === 'closed') {
                    projectsContainer.style.maxHeight = projectsContainer.scrollHeight + 'px';
                    projectsContainer.style.marginBottom = '40px';
                    expandDiv.setAttribute('value', 'open');
                    expandText.innerText = 'You want less?';
                    expandSpan.style.transform = 'rotate(-90deg)';
                } else {
                    projectsContainer.style.maxHeight = projectsContainer.scrollHeight / 2 + 'px';
                    expandDiv.setAttribute('value', 'closed');
                    projectsContainer.style.marginBottom = '20px';
                    expandText.innerText = 'You want some more?';
                    expandSpan.style.transform = 'rotate(90deg)';

                }
            })
            
            // Adjust div height on resize
            window.addEventListener('resize', () => {
                if(window.innerWidth > 768){
                    projectsContainer.style.maxHeight = projectsContainer.scrollHeight / 2 + 'px';
                    projectsContainer.style.marginBottom = '20px';
                 } else {
                    projectsContainer.style.maxHeight = '100%';
                    
                 }
            });
        }

        let projectsHeightTriggered = false;


        if(window.innerWidth > 768){
            projectsHeight(); 
            projectsHeightTriggered = true;
        } 

        window.addEventListener('resize', () => {
            if(window.innerWidth > 768 && projectsHeightTriggered === false){
                projectsHeight(); 
                projectsHeightTriggered = true;
             }
        })

    })();

}
// END OF HP

// OTHER PAGES NOT HOME
if(siteURL.pathname !== '/' && siteURL.pathname !== '/index.html'){

    const singleHero = document.querySelector('.single-hero');
    console.log(singleHero.scrollHeight)


    document.addEventListener('scroll', () => {

        if(window.pageYOffset > singleHero.scrollHeight){
            header.classList.add('nav-hidden');
            header.classList.remove('nav-visible');
        } else {
            header.classList.remove('nav-hidden');
            header.classList.add('nav-visible');
        }
    })

}
// END OF OTHER PAGES NOT HOME

// GLOBAL FUNCTIONS
(function () {
    const slickPrevArrow = '<?xml version="1.0" encoding="UTF-8"?><svg class="slick-prev slick-arrow" id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.89 55.63"><defs><style>.c{fill:none;stroke-width:10px;}</style></defs><path id="b" class="c" d="M31.35,3.54L7.07,27.82l24.28,24.28"/></svg>';
  
    const slickNextArrow = '<?xml version="1.0" encoding="UTF-8"?><svg class="slick-next slick-arrow" id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.89 55.63"><defs><style>.c{fill:none;stroke-width:10px;}</style></defs><path id="b" class="c" d="M3.54,52.1L27.82,27.82,3.54,3.54"/></svg>';
    
    
    
      $(document).ready(function(){
        $('.single-slider').slick({
          adaptiveHeight: true,
          autoplay: true,
          autoplaySpeed: 5000,
          speed: 1000,
          easing: "ease-in-out",
          prevArrow: slickPrevArrow,
          nextArrow: slickNextArrow,
        });
      });
  })();


  (function() {
    document.addEventListener('DOMContentLoaded', () => {
        const videoPlayerAudio = document.querySelector('.vjs-volume-panel.vjs-control.vjs-volume-panel-horizontal');
        const video = document.querySelector('.video-player .video-js');

        // Show audio slider
        window.addEventListener('resize', () => {
            if(window.innerWidth <= 768){
                videoPlayerAudio.classList.add('vjs-hover');
            } else {
                videoPlayerAudio.classList.remove('vjs-hover');
            }
        });

        // Keep audio slider visibl on mobile
        setInterval(() => {
            if(window.innerWidth <= 768){
                videoPlayerAudio.classList.add('vjs-hover');
            }

            // Prevent user inactive 
            if(window.innerWidth <= 768 && video.classList.contains('vjs-user-inactive')){
                video.classList.add('vjs-user-active');
                video.classList.remove('vjs-user-inactive');
            }
        },0)

    })
  })();
// END OF GLOBAL FUNCTIONS

