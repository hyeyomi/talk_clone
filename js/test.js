const textColor = document.getElementsByClassName('open-post__member-status');
//className으로 찾으면 배열을 반납한다.

for (let item of textColor) {
  if (item.innerText == 'Active') {
    item.style.color = 'pink';
  } else item.style.color = 'blue';
}
