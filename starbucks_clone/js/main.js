const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click',function(){
    //Logic..
    searchInputEl.focus();
});

searchInputEl.addEventListener('focus',function(){
    searchEl.classList.add('focused');
    searchInputEl.setAttribute('placeholder','통합검색');
});

searchInputEl.addEventListener('blur',function(){
    searchEl.classList.remove('focused');
    searchInputEl.setAttribute('placeholder','');
});

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll',_.throttle(function(){
    console.log(window.scrollY);
    if(window.scrollY > 500){
        // 배지 숨기기
        // gsap.to(요소,지속시간,옵션);
        gsap.to(badgeEl,.6,{
            opacity:0,
            display: 'block'
        }); // gsap => 애니메이션 처리??
        //opacity 속성처럼 값을 숫자로 입력하는 속성들은, 전환효과를 통해
        //요소의 전/후 상태를 중간 숫자의 값으로 자연스럽게 만들어 줄 수 있지만,
        //display 속성처럼 값이 숫자가 아닌 속성은 전/후 상태의 중간값이 존재하지 않기 때문에
        //자연스러운 전환 효과를 적용할 수 없다.

        //버튼 보이기!!
        gsap.to(toTopEl,.2,{
            x: 0
        });

    }else{
        // 배지 보이기
        gsap.to(badgeEl,.6,{
            opacity:1,
            display: 'block'
        });

        //버튼 숨기기!!
        gsap.to(toTopEl,.2,{
            x: 100
        });
    }
},300));
// _.throttle(함수,시간(밀리세컨드 단위??))

toTopEl.addEventListener('click',function(){
    gsap.to(window,.7,{
        scrollTo:0
    });
});

const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl,index){
    gsap.to(fadeEl,1,{
        delay: (index+1) * .7,
        opacity: 1
    });
});

 new Swiper('.notice-line  .swiper-container', {
     direction: 'vertical', // 수직 슬라이드
    autoplay: true, // 자동 재생 여부
    loop: true // 반복 재생 여부
   });

new Swiper('.promotion .swiper-container', {
    // direction:'horizontal' // 기본값
    slidesPerView: 3,
    spaceBetween:10,
    centeredSlides:true,
    loop:true,
    // autoplay:{
    // delay:5000
    // },
    pagination: { // 페이지 번호 사용 여부
        el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
        clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
      },
    navigation: { // 슬라이드 이전/다음 버튼 사용 여부
        prevEl: '.promotion .swiper-prev', // 이전 버튼 선택자
        nextEl: '.promotion .swiper-next' // 다음 버튼 선택자
      }
});

new Swiper('.awards .swiper-container',{
    autoplay: true,
    loop: true,
    spaceBetween:30,
    slidesPerView : 5,
    navigation:{
        prevEl:'.awards .swiper-prev',
        nextEl:'.awards .swiper-next'
    }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click',function(){
    isHidePromotion = !isHidePromotion
    if(isHidePromotion){
        //숨김 처리!
        promotionEl.classList.add('hide');
    }else{
        //보임 처리!
        promotionEl.classList.remove('hide');
    }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
  }

function floatingObject(selector,delay,size){
// gsap.to(요소,시간,옵션);
gsap.to(selector,random(1.5,2.5),{
    y: size,
    repeat: -1,
    yoyo:true, // 한번 재생된 애니메이션을 다시 뒤로 재생?
    ease: Power1.easeInOut, // 움직임 제어
    delay:random(0,delay)
    });
}

floatingObject('.floating1',1,15);
floatingObject('.floating2',.5,15);
floatingObject('.floating3',1.5,20);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl){
    new ScrollMagic
        .Scene({
            triggerElement : spyEl, // 보여짐 여부를 감시할 요소를 지정
            triggerHook : .8
        })
        .setClassToggle(spyEl,'show')
        .addTo(new ScrollMagic.Controller());
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //2021