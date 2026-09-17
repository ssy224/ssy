const defaultNames = [
  '阿明',
  '小華',
  '小美',
  '大雄',
  '琪琪',
  '阿寶',
  '花花',
  '胖虎'
];

const luckyMessages = [
  '今天就是你了！',
  '命運之神點頭了！',
  '幸運女神眷顧你！',
  '這回輪到你出場！',
  '超級幸運，別錯過！',
  '抽到了最強運勢！'
];

let names = [...defaultNames];

const nameInput = document.getElementById('nameInput');
const addNameBtn = document.getElementById('addNameBtn');
const drawBtn = document.getElementById('drawBtn');
const resetBtn = document.getElementById('resetBtn');
const resultName = document.getElementById('resultName');
const resultTag = document.getElementById('resultTag');
const nameList = document.getElementById('nameList');
const countBadge = document.getElementById('countBadge');

function renderList() {
  nameList.innerHTML = '';

  if (!names.length) {
    const empty = document.createElement('li');
    empty.className = 'empty-state';
    empty.textContent = '目前沒有抽籤名單，快加入幾位朋友吧！';
    nameList.appendChild(empty);
    countBadge.textContent = '0 人';
    return;
  }

  names.forEach((name, idx) => {
    const item = document.createElement('li');
    item.className = 'name-item';
    item.innerHTML = `
      <span>${name}</span>
      <button class="remove-btn" type="button" data-index="${idx}" aria-label="移除 ${name}">×</button>
    `;
    nameList.appendChild(item);
  });

  countBadge.textContent = `${names.length} 人`;
}

function addName() {
  const value = nameInput.value.trim();
  if (!value) {
    nameInput.focus();
    return;
  }

  const cleanValue = value.replace(/[\s\u3000]+/g, '');
  if (!cleanValue) {
    nameInput.focus();
    return;
  }

  if (names.includes(cleanValue)) {
    resultName.textContent = cleanValue;
    resultTag.textContent = '已經在名單裡了！';
    nameInput.value = '';
    nameInput.focus();
    return;
  }

  names.push(cleanValue);
  nameInput.value = '';
  renderList();
  nameInput.focus();
}

function removeName(index) {
  names.splice(index, 1);
  renderList();
}

function drawWinner() {
  if (!names.length) {
    resultName.textContent = '沒有名單';
    resultTag.textContent = '請先加入抽籤對象';
    return;
  }

  drawBtn.disabled = true;
  const totalSteps = 18;
  let step = 0;

  const interval = setInterval(() => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    resultName.textContent = randomName;
    resultTag.textContent = '抽籤中...';
    step += 1;

    if (step >= totalSteps) {
      clearInterval(interval);
      const winner = names[Math.floor(Math.random() * names.length)];
      resultName.textContent = winner;
      resultTag.textContent = luckyMessages[Math.floor(Math.random() * luckyMessages.length)];
      drawBtn.disabled = false;
    }
  }, 90);
}

function resetDrawing() {
  names = [...defaultNames];
  resultName.textContent = '等待抽籤';
  resultTag.textContent = '準備中...';
  drawBtn.disabled = false;
  renderList();
}

addNameBtn.addEventListener('click', addName);
nameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addName();
  }
});

drawBtn.addEventListener('click', drawWinner);
resetBtn.addEventListener('click', resetDrawing);

nameList.addEventListener('click', (event) => {
  const target = event.target;
  if (target.matches('.remove-btn')) {
    const index = Number(target.dataset.index);
    removeName(index);
  }
});

document.querySelectorAll('.tag').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.name;
    if (!names.includes(value)) {
      names.push(value);
      renderList();
    } else {
      resultName.textContent = value;
      resultTag.textContent = '已經在名單裡囉！';
    }
  });
});

renderList();
