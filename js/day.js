const chat_date = document.querySelector('#chat__date');

function getDate() {
  const dt = new Date(); // 현재 한국 표준 시각이 반납됨
  const year = String(dt.getFullYear()); // 년도
  const day = new Array(
    'Sunday',
    'Monday',
    'Tuesday',
    'wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  );
  const month = new Array(
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  );
  const date = String(dt.getDate());
  chat_date.innerText = `${day[dt.getDay()]}, ${
    month[dt.getMonth()]
  } ${date}, ${year}`;
  //   ms_time[0].innerText = `${hours}:${minutes}`;
}
getDate();
// setInterval(getDate, 1000); //1초마다 시간이 출력됨
const msgForm = document.getElementById('message-form');
const msgInput = document.querySelector('#message-form input');
const msgList = document.getElementById('result');

let messages = []; // 한 쌍이{메세지,id}로 구성됨

function saveMessage() {
  localStorage.setItem('message', JSON.stringify(messages)); // message가 대표 ID임 (이름역할)
}

function handleMsgSubmit(event) {
  event.preventDefault();
  const dt = new Date();
  const hours = String(dt.getHours()).padStart(2, '0');
  const minutes = String(dt.getMinutes()).padStart(2, '0');
  const seconds = String(dt.getSeconds());
  const newMsg = msgInput.value; // 메세지 내용
  msgInput.value = ''; // 내용 새로고침
  const newMsgObj = {
    text: newMsg,
    id: `${hours}:${minutes}:${seconds}`,
  };
  messages.push(newMsgObj);
  paintMsg(newMsgObj);
  saveMessage();
}

msgForm.addEventListener('submit', handleMsgSubmit);

const here = document.getElementById('message__list');

// const newTag = document.querySelector("#as");
function paintMsg(newMsg) {
  const div = document.createElement('div');
  div.className = 'message__info';
  div.id = newMsg.id;
  const bubble = document.createElement('span');
  bubble.className = 'message__bubble';
  bubble.innerText = newMsg.text;
  const time = document.createElement('span');
  time.className = 'message__time';
  time.innerText = newMsg.id.substr(0, 5);

  const button = document.createElement('button');
  const i = document.createElement('i');
  i.className = 'fa-regular fa-trash-can';
  // button.innerText = '❌';
  button.addEventListener('click', deleteMsg);
  button.appendChild(i);
  div.appendChild(bubble);
  div.appendChild(button);
  div.appendChild(time);
  here.appendChild(div);
}

const savedMsg = localStorage.getItem('message');

//입력한 메세지를 영구적으로 표시하기 위한 작업
if (savedMsg !== null) {
  // 메세지가 기록되어 있다면 (local storage에 기록이 있다면)
  const parsedMsg = JSON.parse(savedMsg);
  messages = parsedMsg;
  parsedMsg.forEach(paintMsg);
}

//엑스 버튼을 눌렀을때 해당 메세지가 삭제되어야 함
function deleteMsg(event) {
  const i = event.target.parentElement; //버튼의 부모 div를 삭제해야 하기 때문에
  const div = i.parentElement;
  div.remove(); // 태그 삭제됨
  console.log(div, messages[0]);
  //  local에 저장된 메세지 메모리까지 삭제해줘야 함
  messages = messages.filter((item) => item.id !== div.id); // 삭제된 div의 id와 다른 메세지들만 필터링돼서 messages 배열에 다시 저장됨
  //즉, 삭제된 div의 메세지는 messages 배열에서 삭제됨
  saveMessage(); // 새 메세지 배열을 local에 저장함
}
