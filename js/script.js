// 헤더 더보기메뉴
let moreBtn = document.querySelector('.allmenu_btn')
let moreBtnIcon = document.querySelector('.allmenu_icon')
let moreBtnLine = document.querySelectorAll('.allmenu_btn span')
let moreBtntext = document.querySelector('.allmenu_btn .state')
let plusMenu = document.querySelector('.plus_menu')
let moreBtnNum = 0;

moreBtnIcon.addEventListener('click', function () {
    if (moreBtnNum == 0) {
        moreBtnIcon.classList.remove('inactive')
        moreBtnIcon.classList.add('active')
        plusMenu.style.display = 'block'
        moreBtntext.innerText = "전체닫기"
        moreBtnNum = 1;
    } else {
        moreBtnIcon.classList.remove('active')
        moreBtnIcon.classList.add('inactive')
        moreBtnNum = 0;
        plusMenu.style.display = 'none'
        moreBtntext.innerText = "전체보기"
    }
})

// 헤더 nav 메뉴
const dep2a = document.querySelectorAll('#nav .dep2')
const dep1 = document.querySelectorAll('#nav .dep1')
const ul = document.querySelectorAll('#nav .dep1 .dep_height')
const gnbHeight = document.querySelector('#gnb')


for (let i = 0; i < dep2a.length; i++) {
    dep2a[i].addEventListener('mouseover', function () {
        var max_h = 0;
        this.lastElementChild.classList.add('active');
        dep1.forEach(function (li) {
            var h = parseInt(getComputedStyle(li).height);

            if (max_h < h) {
                max_h = h;
                console.log("🚀 ~ file: script.js:41 ~ max_h:", max_h)
            }
        });

        dep1.forEach(function (li) {
            li.style.height = max_h + "px"; // Set the maximum height
        });
    })
}

/* for (let i = 0; i < dep2a.length; i++) {
    dep2a[i].addEventListener('mouseout', function () {
        this.lastElementChild.classList.remove('active');
    })
} */

// -----------------------------------------------------------------------------------

// banner
const banner_track = document.querySelector('.banner_track');
const banner_slide = document.querySelectorAll('.banner_slide');
const banner_dot = document.querySelectorAll('ul.slide-dot li button');
const banner_prev = document.querySelector('.main_visual_prev');
const banner_next = document.querySelector('.main_visual_next');

let bannerInterval;
let bannerIndex = 0;

banner_dot[0].classList.add('active');
bannerAutoSlide();

function bannerAutoSlide() {
  bannerInterval = setInterval(() => {
    updateBanner(1);
  }, 6000);
}

function updateBanner(direction) {
  banner_slide[bannerIndex].classList.remove('active');
  banner_dot[bannerIndex].classList.remove('active');
  bannerIndex = (bannerIndex + direction + banner_slide.length) % banner_slide.length;
  banner_slide[bannerIndex].classList.add('active');
  banner_dot[bannerIndex].classList.add('active');
}

function stopAutoSlide() {
  clearInterval(bannerInterval);
}

function handleNextClick() {
  stopAutoSlide();
  updateBanner(1);
}

function handlePrevClick() {
  stopAutoSlide();
  updateBanner(-1);
}

function handleDotClick(idx) {
  return () => {
    stopAutoSlide();
    banner_slide[bannerIndex].classList.remove('active');
    banner_dot[bannerIndex].classList.remove('active');
    bannerIndex = idx;
    banner_slide[bannerIndex].classList.add('active');
    banner_dot[bannerIndex].classList.add('active');
  };
}

banner_next.addEventListener('mouseover', stopAutoSlide);
banner_next.addEventListener('mouseout', bannerAutoSlide);
banner_next.addEventListener('click', handleNextClick);

banner_prev.addEventListener('mouseover', stopAutoSlide);
banner_prev.addEventListener('mouseout', bannerAutoSlide);
banner_prev.addEventListener('click', handlePrevClick);

for (let i = 0; i < banner_dot.length; i++) {
  banner_dot[i].addEventListener('mouseover', stopAutoSlide);
  banner_dot[i].addEventListener('mouseout', bannerAutoSlide);
  banner_dot[i].addEventListener('click', handleDotClick(i));
}

// 위 코드 최적화 
/* const banner_track = document.querySelector('.banner_track')
const banner_slide = document.querySelectorAll('.banner_slide')

const banner_dot = document.querySelectorAll('ul.slide-dot li button')
banner_dot[0].classList.add('active')

const banner_prev = document.querySelector('.main_visual_prev')
const banner_next = document.querySelector('.main_visual_next')

let bannerInterval = 0;
let bannerIndex = 0;
let i = 0;
let idx = 0;

bannerAutoSlide()

function bannerAutoSlide() {
    setTimeout(function () {
        for (let j = 0; j < banner_slide.length; j++) {
            let classes = banner_slide[j].classList;
            if (classes.contains('active')) {
                bannerIndex = j;
            }
        }

        banner_slide.forEach(element => {
            element.classList.remove('active')
        });
        banner_dot.forEach(dot => {
            dot.classList.remove('active')
        });
        banner_slide[bannerIndex].classList.add('active')
        banner_dot[bannerIndex].classList.add('active')
        bannerIndex++
        if (bannerIndex == 3) { bannerIndex = 0 }
    }, 6000)
    bannerInterval = setInterval(function () {
        for (let j = 0; j < banner_slide.length; j++) {
            let classes = banner_slide[j].classList;
            if (classes.contains('active')) {
                bannerIndex = j;
            }
        }

        banner_slide.forEach(element => {
            element.classList.remove('active')
        });
        banner_dot.forEach(dot => {
            dot.classList.remove('active')
        });
        bannerIndex++
        if (bannerIndex == 3) { bannerIndex = 0 }
        banner_slide[bannerIndex].classList.add('active')
        banner_dot[bannerIndex].classList.add('active')
    }, 6000)
}

banner_next.addEventListener('mouseover', function () {
    clearInterval(bannerInterval)
})
banner_next.addEventListener('mouseout', function () {
    bannerAutoSlide()
})
banner_prev.addEventListener('mouseover', function () {
    clearInterval(bannerInterval)
})
banner_prev.addEventListener('mouseout', function () {
    bannerAutoSlide()
})


banner_next.addEventListener('click', function () {
    for (let j = 0; j < banner_slide.length; j++) {
        let classes = banner_slide[j].classList;
        if (classes.contains('active')) {
            bannerIndex = j;
        }
    }
    banner_slide.forEach(element => {
        element.classList.remove('active')
    });
    banner_dot.forEach(dot => {
        dot.classList.remove('active')
    });
    bannerIndex++
    if (bannerIndex == 3) { bannerIndex = 0 }
    banner_dot[bannerIndex].classList.add('active')
    banner_slide[bannerIndex].classList.add('active')
})

banner_prev.addEventListener('click', function () {
    for (let j = 0; j < banner_slide.length; j++) {
        let classes = banner_slide[j].classList;
        if (classes.contains('active')) {
            bannerIndex = j;
        }
    }
    banner_slide.forEach(element => {
        element.classList.remove('active')
    });
    banner_dot.forEach(dot => {
        dot.classList.remove('active')
    });
    bannerIndex--
    if (bannerIndex == -1) { bannerIndex = 2 }
    banner_dot[bannerIndex].classList.add('active')
    banner_slide[bannerIndex].classList.add('active')
})

function dot_click(idx) {
    banner_dot[idx].onclick = function () {
        banner_slide.forEach(element => {
            element.classList.remove('active')
        });
        banner_dot.forEach(dot => {
            dot.classList.remove('active')
        });
        banner_slide[idx].classList.add('active')
        banner_dot[idx].classList.add('active')
    };
}

for (let k = 0; k < banner_dot.length; k++) {
    dot_click(k);
    banner_dot[k].addEventListener('mouseover', function () {
        clearInterval(bannerInterval)
    })
    banner_dot[k].addEventListener('mouseout', function () {
        bannerAutoSlide()
    })
}  */

// -----------------------------------------------------------------------------------