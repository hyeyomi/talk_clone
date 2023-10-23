const stateBtn = document.querySelector('#state-button');
const stateContainer = document.querySelector('#state-container');
const stateMsg = document.querySelector('#state-message'); //form
const stateTitle = document.querySelector('#state_title');
const stateInputBtn = document.querySelector('#state-message__input__btn');
const stateMsgLength = document.querySelector('#stateMsg_length');
// const stateInputBtn = document.querySelector('#state-message__input__btn');
const x = document.querySelector('#x');
let isClick = false; // 버튼 클릭 X가 디폴트 상태

function clickStateBtn() {
  if (!isClick) {
    //클릭이 되면 hidden을 지워서 보이도록
    stateContainer.classList.remove('hidden');
    isClick = true;
    // stateMsg.style.position = "relative";
    // stateTitle.style.position = "relative";
  } else {
    stateContainer.classList.add('hidden');
    isClick = false;
  }
}
const stateInput = document.querySelector('#state-message__input');

function saveState(event) {
  event.preventDefault();
  const state = stateInput.value; // 상태메세지
  stateInput.value = ''; //새로고침
  text = state;
  paintState();
  saveStateText();
}

let text = '';

function saveStateText() {
  localStorage.setItem('text', JSON.stringify(text));
}

function paintState(txt) {
  const stateText = document.querySelector('#state_text');
  stateText.innerText = text;
  // console.log(text);
}

const savedTxt = localStorage.getItem('text');

if (savedTxt !== null) {
  const parsedTxt = JSON.parse(savedTxt);
  text = parsedTxt;
  paintState(parsedTxt);
}

stateBtn.addEventListener('click', clickStateBtn);
x.addEventListener('click', clickStateBtn);
stateMsg.addEventListener('submit', saveState);
stateInput.addEventListener('input', changeLength);
stateInput.addEventListener('keyUp',deleteContainer);

function changeLength(){
  stateMsgLength.innerText = `${stateInput.value.length}/30`;
}

function deleteContainer(){
  console.log("hi");
}

const profile = document.querySelector('#myProfile');

function goProfile() {
  location.href = 'profile.html';
}

profile.addEventListener('click', goProfile);
