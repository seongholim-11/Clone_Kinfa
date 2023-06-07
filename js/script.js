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
let headerDepth1 = document.querySelectorAll('#nav .dep1')
let headerDepth2 = document.querySelectorAll('#nav .dep2')
let headerDepth1A = document.querySelectorAll('#nav .dep1a')
let headerDepth2A = document.querySelectorAll('#nav .dep2a')
let headerBg = document.querySelector('#nav .bg')

for (let i = 0; i < headerDepth1A.length; i++) {
    headerDepth1A[i].addEventListener('mouseover', function () {
        let dep2ul = headerDepth1[i].querySelector('ul.dep_height').offsetHeight
        headerBg.style.height = dep2ul + "px";
    })
}
for (let j = 0; j < headerDepth2A.length; j++) {
    headerDepth2A[j].addEventListener('mouseover', function () {
        headerDepth2[j].classList.add('active')
        let dep2ul = headerDepth2[j].parentNode.parentNode.querySelector('ul.dep_height').offsetHeight
        for (let k = 0; k < headerDepth1.length; k++) {
            headerDepth1[k].querySelector('ul.dep_height').style.height = dep2ul + "px"
        }
        headerBg.style.height = dep2ul + "px";
    })
    headerDepth2A[j].addEventListener('mouseout', function () {
        headerDepth2[j].classList.remove('active')
    })
}