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
const ulHeight = document.querySelectorAll('#nav .dep1 .dep_height')
let dep2UlHeight = 0;

for (let i = 0; i < dep2a.length; i++) {
    dep2a[i].addEventListener('mouseover', function () {
        this.lastElementChild.classList.add('active');
        })
}

for (let i = 0; i < dep2a.length; i++) {
    dep2a[i].addEventListener('mouseout', function () {
        this.lastElementChild.classList.remove('active');
    })
}


