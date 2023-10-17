const clock = document.querySelector("#status-bar__clock");

function getClock(){
    const date = new Date(); // 현재 한국 표준 시각이 반납됨
    const hours = String(date.getHours()).padStart(2,'0');
    //2자리로 표현할 것이고, 남은 공간은 0으로 채운다.
    const minutes = String(date.getMinutes()).padStart(2,'0');
    clock.innerText = `${hours}:${minutes}`;
}

getClock();
setInterval(getClock, 1000); //1초마다 시간이 출력됨