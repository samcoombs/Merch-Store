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
if(siteURL.pathname === '/'){

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
                                } else {
                                    video.pause();
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
    
    // And you would kick this off where appropriate with:
    playPauseVideo();

}

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


//   VIDEO PLAYER

