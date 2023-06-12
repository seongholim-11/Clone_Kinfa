// 헤더 더보기메뉴
// 변수 선언
let moreBtn = document.querySelector('.allmenu_btn')
let moreBtnIcon = document.querySelector('.allmenu_icon')
let moreBtnLine = document.querySelectorAll('.allmenu_btn span')
let moreBtntext = document.querySelector('.allmenu_btn .state')
let plusMenu = document.querySelector('.plus_menu')
let moreBtnNum = 0;

// 햄버거 메뉴를 클릭하면
moreBtnIcon.addEventListener('click', function () {
    // moreBtnNum => 햄버거 메뉴가 열려 있는지 닫혀있는지 확인용
    // moreBtnNum가 0이면
    if (moreBtnNum == 0) {
        // 햄버거 메뉴 모양 바꾸기
        moreBtnIcon.classList.remove('inactive')
        moreBtnIcon.classList.add('active')
        // 더보기 메뉴 보이기
        plusMenu.style.display = 'block'
        // 글자 바꾸기
        moreBtntext.innerText = "전체닫기"
        // 더보기 메뉴 열려있음
        moreBtnNum = 1;
    } else {
        // 햄버거 메뉴 모양 바꾸기
        moreBtnIcon.classList.remove('active')
        moreBtnIcon.classList.add('inactive')
        // 더보기 메뉴 닫혀있음
        moreBtnNum = 0;
        // 더보기 메뉴 숨기기
        plusMenu.style.display = 'none'
        // 글자 바꾸기
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
            }
        });

        dep1.forEach(function (li) {
            li.style.height = max_h + "px";
        });
    })
}

// -----------------------------------------------------------------------------------

// banner
// 변수 선언
const banner_track = document.querySelector('.banner_track');
const banner_slide = document.querySelectorAll('.banner_slide');
const banner_dot = document.querySelectorAll('ul.slide-dot li button');
const banner_prev = document.querySelector('.main_visual_prev');
const banner_next = document.querySelector('.main_visual_next');
const banner_state = document.querySelector('.slide-state');

// setInterval
let bannerInterval;
let bannerIndex = 0;
// 정지, 재생 버튼 상태 확인
let bannerStateIndex = 0;

// 첫 dot 활성화
banner_dot[0].classList.add('active');
// 자동슬라이드 시작
bannerAutoSlide();

// 자동슬라이드 함수 만들기
function bannerAutoSlide() {
    // 스탑 버튼 활성화
    banner_state.classList.remove('play')
    banner_state.classList.add('stop')
    // 인터벌 시작
    bannerInterval = setInterval(() => {
        updateBanner(1);
    }, 6000);
}

// 배너 움직이는 함수
function updateBanner(direction) {
    // 현재 배너의 클래스 제거
    banner_slide[bannerIndex].classList.remove('active');
    banner_dot[bannerIndex].classList.remove('active');
    // ex) 1->2, (1 + 1 + 3) % 3 = 2
    bannerIndex = (bannerIndex + direction + banner_slide.length) % banner_slide.length;
    // 다음 배너의 클래스 추가
    banner_slide[bannerIndex].classList.add('active');
    banner_dot[bannerIndex].classList.add('active');
}

// 배너 멈추기 함수
function stopAutoSlide() {
    banner_state.classList.remove('stop')
    banner_state.classList.add('play')
    clearInterval(bannerInterval);
}

// 다음 버튼 누르면
function handleNextClick() {
    stopAutoSlide();
    updateBanner(1);
}

// 이전 버튼 누르면 
function handlePrevClick() {
    stopAutoSlide();
    updateBanner(-1);
}

// dot을 누르면 실행되는 함수
function handleDotClick(idx) {
    return () => {
        // 슬라이드를 멈춤
        stopAutoSlide();
        // 현재 배너와 dot의 클래스 제거
        banner_slide[bannerIndex].classList.remove('active');
        banner_dot[bannerIndex].classList.remove('active');
        // 3번째 dot을 누르면 idx가 3이 됨.
        bannerIndex = idx;
        // 다음 배너와 dot의 클래스 추가
        banner_slide[bannerIndex].classList.add('active');
        banner_dot[bannerIndex].classList.add('active');
    };
}

// 버튼에 마우스 올리면 슬라이드 멈춤
banner_next.addEventListener('mouseover', stopAutoSlide);
// 버튼에 마우스 내리면 슬라이드 실행
banner_next.addEventListener('mouseout', bannerAutoSlide);
// 클릭하면 다음 슬라이드
banner_next.addEventListener('click', handleNextClick);

// 정지, 재생 버튼 구현
banner_state.addEventListener('click', function () {
    if (bannerStateIndex == 0) {
        stopAutoSlide();
        bannerStateIndex = 1;
    } else {

        bannerAutoSlide();
        bannerStateIndex = 0;
    }
});

// 버튼에 마우스 올리면 슬라이드 멈춤
banner_prev.addEventListener('mouseover', stopAutoSlide);
// 버튼에 마우스 내리면 슬라이드 실행
banner_prev.addEventListener('mouseout', bannerAutoSlide);
// 클릭하면 이전 슬라이드
banner_prev.addEventListener('click', handlePrevClick);

for (let i = 0; i < banner_dot.length; i++) {
    // dot에 마우스 올리면 슬라이드 멈춤
    banner_dot[i].addEventListener('mouseover', stopAutoSlide);
    // dot에 마우스 내리면 슬라이드 실행
    banner_dot[i].addEventListener('mouseout', bannerAutoSlide);
    // dot 클릭하면 n번째 슬라이드로 이동, dot 모양 바뀜
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

/* popup */

const popup_track = document.querySelector('.popup_track');
const popup_slide_box = document.querySelector('.popup_slide_box');
const popup_btn = document.querySelector('.popup_btn');
const popup_prev = document.querySelector('.popup_prev');
const popup_next = document.querySelector('.popup_next');
let intervalPopup;
let position = 0;
let pCount = 1;
let popup_btn_OnOff = 0;
let popup_prev_count = 0;
let popup_next_count = 0;

popupSlide()

// popupSlide() 함수 만들기
function popupSlide() {
    intervalPopup = setInterval(function () {
        // pCount: 0~6까지 슬라이드 이동
        position = (-690) * pCount;

        // 요소의 스타일 속성 변경
        popup_track.style.left = position + 'px';

        // 다음 슬라이드를 위해 증가
        pCount++

        // 슬라이드가 끝나기 전에 처음으로 초기화
        if (pCount >= 7) {
            pCount = 0;
        }
    }, 5000);
}

// 정지, 재생 버튼 누르면
popup_btn.addEventListener('click', function () {
    // 재생되고 있으면
    if (popup_btn_OnOff == 0) {
        // 재생 모양으로 아이콘 바꾸기
        popup_btn.classList.add('popup_play')
        // 슬라이드 멈추기
        clearInterval(intervalPopup);
        // 상태 변경
        popup_btn_OnOff = 1;
        // 정지되어 있으면
    } else {
        // 정지 모양으로 아이콘 바꾸기
        popup_btn.classList.remove('popup_play')
        // 자동 슬라이드 시작
        popupSlide()
        // 상태 변경
        popup_btn_OnOff = 0;
    }
})

// 마우스 올리면 정지, 내리면 재생
popup_prev.addEventListener('mouseover', function () {
    clearInterval(intervalPopup);
})
popup_prev.addEventListener('mouseout', function () {
    popupSlide();
})
popup_next.addEventListener('mouseover', function () {
    clearInterval(intervalPopup);
})
popup_next.addEventListener('mouseout', function () {
    popupSlide();
})

// 이전 버튼을 누르면
popup_prev.addEventListener('click', function () {
    // 처음 첫화면에서 마지막화면으로 가기 위해서는 버튼을 2번 눌러야 하는 것을 방지
    if (popup_prev_count == 0 && pCount == 1) {
        // 마지막 화면으로 이동
        pCount = 6
        position = (-690) * pCount;
        popup_track.style.left = position + 'px';
        // 처음이 아님으로 변경
        popup_prev_count = 1;
    } else {
        popup_prev_count = 1;
        pCount--
        position = (-690) * pCount;
        // 첫 화면에서 버튼을 한 번 더 누르면 빈화면을 나오는 것을 방지
        if (position > 0) {
            pCount = 6;
            position = (-690) * pCount;
        }
        // 화면 이동
        popup_track.style.left = position + 'px';

        // // 첫 화면에서 버튼을 한 번 더 누르면 마지막 화면으로 이동
        if (pCount <= -1) {
            pCount = 6;
        }
    }

})

popup_next.addEventListener('click', function () {
    // 처음 2번째 화면에서 안 넘어가는 것을 방지
    if (popup_next_count == 0 && pCount == 1) {
        pCount = 1;
        position = (-690) * pCount;
        popup_track.style.left = position + 'px';
        popup_next_count = 1
    } else {
        pCount++
        position = (-690) * pCount;
        // 마지막 화면에서 화면이 더 넘어가는 것을 방지
        if (position == -4830) {
            pCount = 0;
            position = (-690) * pCount;
        }
        popup_track.style.left = position + 'px';

        // 마지막 화면에서 한 번 더 누르면 첫 화면으로 이동
        if (pCount >= 7) {
            pCount = 0;
        }
    }
})

// -----------------------------------------------------------------------------------

// 서금원소식
// 변수 선언
const banner_slide_track = document.querySelector('.banner_slide_track');
const banner_slide_box = document.querySelectorAll('.banner_slide_box');
const kinfa_contents_banner_prev = document.querySelector('.kinfa_contents_banner_prev');
const kinfa_contents_banner_btn = document.querySelector('.kinfa_contents_banner_btn');
const kinfa_contents_banner_next = document.querySelector('.kinfa_contents_banner_next');
const now_page = document.querySelector('.banner-page-nav .now-page');

let cbannerInterval;
let cbannerIndex = 0;
// 정지, 재생 버튼 상태 확인
let contentsStateIndex = 0;

// 자동슬라이드 시작
cbannerAutoSlide();

// 자동슬라이드 함수 만들기
function cbannerAutoSlide() {
        // 스탑 버튼 활성화
    kinfa_contents_banner_btn.classList.remove('play')
    kinfa_contents_banner_btn.classList.add('stop')
    // 인터벌 시작
    cbannerInterval = setInterval(() => {
        cupdateBanner(1);
    }, 3000);
}

// 배너 움직이는 함수
function cupdateBanner(direction) {
    // 현재 배너의 클래스 제거
    banner_slide_box[cbannerIndex].classList.remove('active');
    // ex) 1->2, (1 + 1 + 3) % 3 = 2
    cbannerIndex = (cbannerIndex + direction + banner_slide_box.length) % banner_slide_box.length;
    // 다음 배너의 클래스 추가
    banner_slide_box[cbannerIndex].classList.add('active');
    // 현재 페이지 나타내기
    now_page.innerHTML = '0' + (cbannerIndex + 1)

}

// 배너 멈추기 함수
function cstopAutoSlide() {
    kinfa_contents_banner_btn.classList.remove('stop')
    kinfa_contents_banner_btn.classList.add('play')
    clearInterval(cbannerInterval);
}

// 다음 버튼 누르면
function chandleNextClick() {
    cstopAutoSlide();
    cupdateBanner(1);
}

// 이전 버튼 누르면 
function chandlePrevClick() {
    cstopAutoSlide();
    cupdateBanner(-1);
}

// 클릭하면 다음 슬라이드
kinfa_contents_banner_next.addEventListener('click', chandleNextClick);

// 정지, 재생 버튼 구현
kinfa_contents_banner_btn.addEventListener('click', function () {
    if (contentsStateIndex == 0) {
        cstopAutoSlide();
        contentsStateIndex = 1;
    } else {
        cbannerAutoSlide();
        contentsStateIndex = 0;
    }
});

// 클릭하면 이전 슬라이드
kinfa_contents_banner_prev.addEventListener('click', chandlePrevClick);