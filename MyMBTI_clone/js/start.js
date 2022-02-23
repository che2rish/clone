const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 12;
const select = [0,0,0,0,0,0,0,0,0,0,0,0];

function calResult(){
//   var pointArray = [
//     {name:'mouse', value:0,key:0},
//     {name:'cow', value:0,key:1},
//     {name:'tiger', value:0,key:2},
//     {name:'rabbit', value:0,key:3},
//     {name:'dragon', value:0,key:4},
//     {name:'snake', value:0,key:5},
//     {name:'horse', value:0,key:6},
//     {name:'sheep', value:0,key:7},
//     {name:'monkey', value:0,key:8},
//     {name:'chick', value:0,key:9},
//     {name:'dog', value:0,key:10},
//     {name:'pig', value:0,key:11}   
//   ]
// //????????????????
//   for (let i = 0; i < endPoint; i++){
//     var target = qnaList[i].a[select[i]];
//     for(let j = 0; j < target.type.length; j++){
//       for(let k = 0; k < pointArray.length; k++){
//         if(target.type[j] === pointArray[k].name){
//           pointArray[k].value += 1;
//         }
//       }
//     }
//   }
//   var resultArray = pointArray.sort(function (a,b){
//     if(a.value > b.value){
//       return -1;
//     }
//     if(a.value < b.value){
//       return 1;
//     }
//     return 0;
//   });
  // let resultword = resultArray[0].key;
  // return resultword;

  var result = select.indexOf(Math.max(...select)); // ...select -> 전개구문??
  return result;
}

function setResult(){
  let point = calResult(); // 결과??
  const resultName = document.querySelector('.resultname'); 
  resultName.innerHTML = infoList[point].name; 

  var resultImg = document.createElement('img'); // 이미지 태그 생성
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/image-' + point + ".png"; // 이미지 주소값 만들기
  resultImg.src = imgURL; // 이미지 주소
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";

    setTimeout(()=> {
      result.style.WebkitAnimation = "fadeIn 1s";
      result.style.animation = "fadeIn 1s";
      setTimeout(()=>{
          qna.style.display = "none";
          result.style.display = "block";
      },450)})

      setResult();
      calResult();
}

// createElement는 지정한 tagName의 HTML 요소를 만들어 반환
// addEventListener는 지정한 이벤트가 대상에 전달될 때마다 호출할 함수 설정
function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-5');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
      var children = document.querySelectorAll('.answerList');
      for(let i = 0; i< children.length; i++){
          children[i].disabled = true; // 버튼 비활성화
          main.style.WebkitAnimation = "fadeOut 0.5s";
          main.style.animation = "fadeOut 0.5s";
      }
      setTimeout(() => {
        var target = qnaList[qIdx].a[idx].type;
        for(let j = 0; j < target.length; j++){
          select[target[j]] += 1;// 사용자가 몇번째 질문에서 몇번째 보기를 선택하였는지 
        }
  
        for(let i = 0; i< children.length; i++){
            children[i].style.display = 'none'; // 버튼 한 개를 선택하면 버튼 사라짐
        }
        goNext(++qIdx);
      },450)    
    },false);
}

// innerHtml -> 요소 내에 포함 된 HTML 또는 XML 마크업을 가져오거나 설정
function goNext(qIdx){
  if(qIdx === endPoint){
      goResult();
      return;
  }
  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for(let i in qnaList[qIdx].a){
      addAnswer(qnaList[qIdx].a[i].answer,qIdx,i);
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1)+ '%';
}

function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
   //  main section이 반쯤 꺼졌을 때 qna section 등장
    setTimeout(()=> {
      qna.style.WebkitAnimation = "fadeIn 1s";
      qna.style.animation = "fadeIn 1s";
      setTimeout(()=>{
          main.style.display = "none";
          qna.style.display = "block";
      },450)
      let qIdx = 0;
      goNext(qIdx);
    },450);
}