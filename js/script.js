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
const dep2a = document.querySelectorAll('#nav .dep2>a')
const dep1 = document.querySelectorAll('#nav .dep1')
const dep1ul = document.querySelectorAll('#nav .dep1 .dep_height')
const dep2li = document.querySelectorAll('#nav .dep2')
const dep2ul = document.querySelectorAll('#nav .dep2 ul')
const gnbHeight = document.querySelector('#gnb')

let maxNum = 0;
let minNum = 0;
let filtered;

/* 
    모든 ul non
    dep1    .nonactive
    dep2ul  none

    hover만 block
    dep1    .active
    dep2ul  block




    
*/
for (let i = 0; i < dep2a.length; i++) {
    dep2li[i].addEventListener('mouseover', function () {
        dep2ul[i].classList.add('active')
        dep2ul[i].closest('#nav .dep1').classList.add('active')
        filtered = not('#nav .dep1.active');
        for (let j = 0; j < filtered.length; j++) {
            let NonActivedep2ul = filtered[j].querySelectorAll('#nav .dep2 ul')
            for(let k = 0; k < NonActivedep2ul.length; k++){
                NonActivedep2ul[k].classList.remove('active')
            }

        }
        /* dep1ul.forEach(dep1ul => {
            dep1ul.style.height = 'auto';
        });
        dep1ul.forEach(dep1ul => {
            const ulHeight = dep1ul.offsetHeight;
            if (ulHeight > maxNum) {
                maxNum = ulHeight;
            }
        });
        dep1ul.forEach(dep1ul => {
            dep1ul.style.height = `${maxNum}px`;
        }); */
    })

    function not(selector) {
        // 모든 요소를 선택합니다.
        var elements = document.querySelectorAll('#nav .dep1')
        
        // 선택된 요소 중에서 지정된 선택자에 맞지 않는 요소를 필터링합니다.
        var filteredElements = Array.from(elements).filter(function(element) {
            return !element.matches(selector);
        });
        
        // 필터링된 요소들을 반환합니다.
        return filteredElements;
      }
      
      // 사용 예시

    
    dep2li[i].parentNode.addEventListener('mouseout', function () {
        // dep2ul[i].classList.remove('active')
        /* dep1ul.forEach(dep1ul => {
            dep1ul.style.height = 'auto';
        });
        for (let j = 0; j < dep1.length; j++) {
            if (dep1[j].offsetHeight < minNum) {
                minNum = dep1[j].offsetHeight;
            }
            dep1ul[j].style.height = minNum + "px";
        } */
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

// -----------------------------------------------------------------------------------

/* sns */

const sns_you_slide = document.querySelector('.you_slide');
const sns_card_slide = document.querySelector('.card_slide');
const you_btn = document.querySelector('.you-bottom .you_btn');
const card_btn = document.querySelector('.card-bottom .card_btn');
const you_prev = document.querySelector('.you-bottom .you_prev');
const card_prev = document.querySelector('.card-bottom .card_prev');
const you_next = document.querySelector('.you-bottom .you_next');
const card_next = document.querySelector('.card-bottom .card_next');
const you_dot = document.querySelectorAll('.you-bottom .sns-dot li button');
const card_dot = document.querySelectorAll('.card-bottom .sns-dot li button');
let intervalSnsYou;
let intervalSnsCard;
let syposition = 0;
let scposition = 0;
let syCount = 1;
let scCount = 1;
let sns_you_btn_OnOff = 0;
let sns_card_btn_OnOff = 0;
let sns_you_prev_count = 0;
let sns_card_prev_count = 0;
let sns_you_next_count = 0;
let sns_card_next_count = 0;
sns_you_slide.style.left = 0 + 'px';
sns_card_slide.style.left = 0 + 'px';
you_dot[0].classList.add('active')
card_dot[0].classList.add('active')

you()
card()

function you() {
    snsyouSlide()
    // snsSlide() 함수 만들기
    function snsyouSlide(idx) {
        intervalSnsYou = setInterval(function () {
            // syCount: 0~2까지 슬라이드 이동
            syposition = (-676) * syCount;
            youDotActive(syCount)
            // 요소의 스타일 속성 변경
            sns_you_slide.style.left = syposition + 'px';
            // 다음 슬라이드를 위해 증가
            syCount++
            // 슬라이드가 끝나기 전에 처음으로 초기화
            if (syCount >= 3) {
                syCount = 0;
            }
        }, 3000);
    }

    // 정지, 재생 버튼 누르면
    you_btn.addEventListener('click', function () {
        // 재생되고 있으면
        if (sns_you_btn_OnOff == 0) {
            // 재생 모양으로 아이콘 바꾸기
            you_btn.classList.add('play')
            // 슬라이드 멈추기
            clearInterval(intervalSnsYou);
            // 상태 변경
            sns_you_btn_OnOff = 1;
            // 정지되어 있으면
        } else {
            // 정지 모양으로 아이콘 바꾸기
            you_btn.classList.remove('play')
            // 자동 슬라이드 시작
            snsyouSlide()
            sns_you_btn_OnOff = 0;
        }
    })

    // 마우스 올리면 정지, 내리면 재생
    you_prev.addEventListener('mouseover', function () {
        clearInterval(intervalSnsYou);
    })
    you_prev.addEventListener('mouseout', function () {
        snsyouSlide();
    })
    you_next.addEventListener('mouseover', function () {
        clearInterval(intervalSnsYou);
    })
    you_next.addEventListener('mouseout', function () {
        snsyouSlide();
    })

    // 이전 버튼을 누르면
    you_prev.addEventListener('click', function () {
        // 처음 첫화면에서 마지막화면으로 가기 위해서는 버튼을 2번 눌러야 하는 것을 방지
        if (sns_you_prev_count == 0 && syCount == 1) {
            // 마지막 화면으로 이동
            syCount = 2
            syposition = (-676) * syCount;
            youDotActive(syCount)
            sns_you_slide.style.left = syposition + 'px';
            // 처음이 아님으로 변경
            sns_you_prev_count = 1;
        } else {
            sns_you_prev_count = 1;
            syCount--
            syposition = (-676) * syCount;
            // 첫 화면에서 버튼을 한 번 더 누르면 빈화면을 나오는 것을 방지
            if (syposition > 0) {
                syCount = 2;
                syposition = (-676) * syCount;
            }
            // 화면 이동
            youDotActive(syCount)
            sns_you_slide.style.left = syposition + 'px';

            // // 첫 화면에서 버튼을 한 번 더 누르면 마지막 화면으로 이동
            if (syCount <= -1) {
                syCount = 1;
            }
        }

    })

    you_next.addEventListener('click', function () {
        // 처음 2번째 화면으로 안 넘어가는 것을 방지
        if (sns_you_next_count == 0 && syCount == 1) {
            syCount = 1;
            youDotActive(syCount)
            syposition = (-676) * syCount;
            sns_you_slide.style.left = syposition + 'px';
            sns_you_next_count = 1
        } else {
            sns_you_next_count = 1
            syCount++
            syposition = (-676) * syCount;
            // 마지막 화면에서 화면이 더 넘어가는 것을 방지
            if (syposition < -1352) {
                syCount = 0;
                syposition = (-676) * syCount;
            }
            youDotActive(syCount)
            sns_you_slide.style.left = syposition + 'px';

            // 마지막 화면에서 한 번 더 누르면 첫 화면으로 이동
            if (syCount >= 3) {
                syCount = 0;
            }
        }
    })

    function youDotActive(idx) {
        for (let i = 0; i < you_dot.length; i++) {
            you_dot[i].classList.remove('active')
        }
        you_dot[idx].classList.add('active')
    }

    youDotClick()
    function youDotClick() {
        for (let j = 0; j < you_dot.length; j++) {
            you_dot[j].addEventListener('click', function () {
                syCount = j
                syposition = (-676) * syCount;
                sns_you_slide.style.left = syposition + 'px';
                youDotActive(j)
            })
        }
    }
}

function card() {
    snscardSlide()
    // snsSlide() 함수 만들기
    function snscardSlide(idx) {
        intervalSnsCard = setInterval(function () {
            // scCount: 0~2까지 슬라이드 이동
            scposition = (-676) * scCount;
            cardDotActive(scCount)
            // 요소의 스타일 속성 변경
            sns_card_slide.style.left = scposition + 'px';
            // 다음 슬라이드를 위해 증가
            scCount++
            // 슬라이드가 끝나기 전에 처음으로 초기화
            if (scCount >= 3) {
                scCount = 0;
            }
        }, 3000);
    }

    // 정지, 재생 버튼 누르면
    card_btn.addEventListener('click', function () {
        // 재생되고 있으면
        if (sns_card_btn_OnOff == 0) {
            // 재생 모양으로 아이콘 바꾸기
            card_btn.classList.add('play')
            // 슬라이드 멈추기
            clearInterval(intervalSnsCard);
            // 상태 변경
            sns_card_btn_OnOff = 1;
            // 정지되어 있으면
        } else {
            // 정지 모양으로 아이콘 바꾸기
            card_btn.classList.remove('play')
            // 자동 슬라이드 시작
            snscardSlide()
            sns_card_btn_OnOff = 0;
        }
    })

    // 마우스 올리면 정지, 내리면 재생
    card_prev.addEventListener('mouseover', function () {
        clearInterval(intervalSnsCard);
    })
    card_prev.addEventListener('mouseout', function () {
        snscardSlide();
    })
    card_next.addEventListener('mouseover', function () {
        clearInterval(intervalSnsCard);
    })
    card_next.addEventListener('mouseout', function () {
        snscardSlide();
    })

    // 이전 버튼을 누르면
    card_prev.addEventListener('click', function () {
        // 처음 첫화면에서 마지막화면으로 가기 위해서는 버튼을 2번 눌러야 하는 것을 방지
        if (sns_card_prev_count == 0 && scCount == 1) {
            // 마지막 화면으로 이동
            scCount = 2
            scposition = (-676) * scCount;
            cardDotActive(scCount)
            sns_card_slide.style.left = scposition + 'px';
            // 처음이 아님으로 변경
            sns_card_prev_count = 1;
        } else {
            sns_card_prev_count = 1;
            scCount--
            scposition = (-676) * scCount;
            // 첫 화면에서 버튼을 한 번 더 누르면 빈화면을 나오는 것을 방지
            if (scposition < 0) {
                scCount = 2;
                scposition = (-676) * scCount;
            }
            // 화면 이동
            cardDotActive(scCount)
            sns_card_slide.style.left = scposition + 'px';

            // // 첫 화면에서 버튼을 한 번 더 누르면 마지막 화면으로 이동
            if (scCount <= -1) {
                scCount = 1;
            }
        }

    })

    card_next.addEventListener('click', function () {
        // 처음 2번째 화면으로 안 넘어가는 것을 방지
        if (sns_card_next_count == 0 && scCount == 1) {
            scCount = 1;
            cardDotActive(scCount)
            scposition = (-676) * scCount;
            sns_card_slide.style.left = scposition + 'px';
            sns_card_next_count = 1
        } else {
            sns_card_next_count = 1
            scCount++
            scposition = (-676) * scCount;
            // 마지막 화면에서 화면이 더 넘어가는 것을 방지
            if (scposition - 1352) {
                scCount = 0;
                scposition = (-676) * scCount;
            }
            cardDotActive(scCount)
            sns_card_slide.style.left = scposition + 'px';

            // 마지막 화면에서 한 번 더 누르면 첫 화면으로 이동
            if (scCount >= 3) {
                scCount = 0;
            }
        }
    })

    function cardDotActive(idx) {
        for (let i = 0; i < card_dot.length; i++) {
            card_dot[i].classList.remove('active')
        }
        card_dot[idx].classList.add('active')
    }

    cardDotClick()
    function cardDotClick() {
        for (let j = 0; j < card_dot.length; j++) {
            card_dot[j].addEventListener('click', function () {
                scCount = j
                scposition = (-676) * scCount;
                sns_card_slide.style.left = scposition + 'px';
                cardDotActive(j)
            })
        }
    }
}

// 네이버 맵

var HOME_PATH = window.HOME_PATH || '.';
var positions = new naver.maps.LatLng(37.5578721, 126.974262);

var mapOptions = {
    center: new naver.maps.LatLng(37.5578721, 126.974262),
    scaleControl: false,
    logoControl: false,
    mapDataControl: false,
    zoomControl: true,
    minZoom: 6
};

var map = new naver.maps.Map('map', mapOptions);

var markerOptions = {
    position: positions.destinationPoint(0, 0),
    map: map,
    icon: {
        url: HOME_PATH + '/img/where.png',
        size: new naver.maps.Size(100, 60),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 26)
    }
};

var marker = new naver.maps.Marker(markerOptions);