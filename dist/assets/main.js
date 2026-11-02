// ========== 雪花生成 ==========
const snowLayer = document.getElementById('snow-layer');
for (let i = 0; i < 50; i++) {
  const s = document.createElement('div');
  s.className = 'snowflake';
  const size = Math.random() * 3 + 1;
  s.style.width = size + 'px';
  s.style.height = size + 'px';
  s.style.left = Math.random() * 100 + '%';
  s.style.animationDuration = (Math.random() * 8 + 6) + 's';
  s.style.animationDelay = (Math.random() * 10) + 's';
  s.style.opacity = Math.random() * 0.6 + 0.2;
  snowLayer.appendChild(s);
}

// ========== Toast 提示 ==========
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}

// 按钮点击提示
document.getElementById('btn-undo').onclick = () => showToast('撤销功能将在第四步实现');
document.getElementById('btn-redo').onclick = () => showToast('重做功能将在第四步实现');
document.getElementById('btn-bg').onclick = () => showToast('背景切换将在第四步实现');
document.getElementById('btn-clear').onclick = () => showToast('清空画布将在第四步实现');
document.getElementById('btn-export').onclick = () => showToast('图片导出将在第五步实现');

// 分类切换
document.querySelectorAll('.category-tab').forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderDecor(tab.dataset.cat);
  };
});

// 装饰项数据（精致SVG + 图片素材）
const decorItems = {
  ball: [
    { name: '金彩球', svg: `<svg viewBox="0 0 40 40">
      <defs><radialGradient id="g1" cx="0.35" cy="0.3"><stop offset="0%" stop-color="#fff5d0"/><stop offset="60%" stop-color="#ffd88a"/><stop offset="100%" stop-color="#d8a040"/></radialGradient></defs>
      <rect x="17" y="5" width="6" height="5" rx="1" fill="#c89030"/>
      <circle cx="20" cy="23" r="12" fill="url(#g1)"/>
      <ellipse cx="16" cy="18" rx="4" ry="2.5" fill="rgba(255,255,255,0.6)"/>
    </svg>` },
    { name: '红彩球', svg: `<svg viewBox="0 0 40 40">
      <defs><radialGradient id="g2" cx="0.35" cy="0.3"><stop offset="0%" stop-color="#ffb0b0"/><stop offset="60%" stop-color="#f07070"/><stop offset="100%" stop-color="#c03030"/></radialGradient></defs>
      <rect x="17" y="5" width="6" height="5" rx="1" fill="#a03030"/>
      <circle cx="20" cy="23" r="12" fill="url(#g2)"/>
      <ellipse cx="16" cy="18" rx="4" ry="2.5" fill="rgba(255,255,255,0.6)"/>
    </svg>` },
    { name: '蓝彩球', svg: `<svg viewBox="0 0 40 40">
      <defs><radialGradient id="g3" cx="0.35" cy="0.3"><stop offset="0%" stop-color="#c0d8ff"/><stop offset="60%" stop-color="#8ab4ff"/><stop offset="100%" stop-color="#4070c0"/></radialGradient></defs>
      <rect x="17" y="5" width="6" height="5" rx="1" fill="#4060a0"/>
      <circle cx="20" cy="23" r="12" fill="url(#g3)"/>
      <ellipse cx="16" cy="18" rx="4" ry="2.5" fill="rgba(255,255,255,0.6)"/>
    </svg>` },
    { name: '粉彩球', svg: `<svg viewBox="0 0 40 40">
      <defs><radialGradient id="g4" cx="0.35" cy="0.3"><stop offset="0%" stop-color="#ffd0e8"/><stop offset="60%" stop-color="#f0a8d0"/><stop offset="100%" stop-color="#c06090"/></radialGradient></defs>
      <rect x="17" y="5" width="6" height="5" rx="1" fill="#a05080"/>
      <circle cx="20" cy="23" r="12" fill="url(#g4)"/>
      <ellipse cx="16" cy="18" rx="4" ry="2.5" fill="rgba(255,255,255,0.6)"/>
    </svg>` },
    { name: '绿彩球', svg: `<svg viewBox="0 0 40 40">
      <defs><radialGradient id="g5" cx="0.35" cy="0.3"><stop offset="0%" stop-color="#d0ffe8"/><stop offset="60%" stop-color="#8ae8c0"/><stop offset="100%" stop-color="#30a070"/></radialGradient></defs>
      <rect x="17" y="5" width="6" height="5" rx="1" fill="#308060"/>
      <circle cx="20" cy="23" r="12" fill="url(#g5)"/>
      <ellipse cx="16" cy="18" rx="4" ry="2.5" fill="rgba(255,255,255,0.6)"/>
    </svg>` },
    { name: '白彩球', svg: `<svg viewBox="0 0 40 40">
      <defs><radialGradient id="g6" cx="0.35" cy="0.3"><stop offset="0%" stop-color="#ffffff"/><stop offset="60%" stop-color="#e0e8f0"/><stop offset="100%" stop-color="#a0a8b8"/></radialGradient></defs>
      <rect x="17" y="5" width="6" height="5" rx="1" fill="#8890a0"/>
      <circle cx="20" cy="23" r="12" fill="url(#g6)"/>
      <ellipse cx="16" cy="18" rx="4" ry="2.5" fill="rgba(255,255,255,0.8)"/>
    </svg>` },
    { name: '金闪彩球', img: 'assets/deco-ball-gold1.png' },
    { name: '双金银球', img: 'assets/deco-ball-gold2.png' },
    { name: '鱼鳞金球', img: 'assets/deco-ball-gold3.png' },
    { name: '金红彩球松枝', img: 'assets/deco-gold-ball-pine.png' },
  ],
  star: [
    { name: '八角星', img: 'assets/star-octagon.png' },
    { name: '实心八芒星', img: 'assets/star-solid.png' },
    { name: '爆炸星', img: 'assets/star-burst.png' },
    { name: '粒子树', img: 'assets/tree-particles.png' },
    { name: '五角金星', svg: `<svg viewBox="0 0 40 40" filter="drop-shadow(0 0 4px #ffd88a)">
      <path d="M20 5 L24 16 L36 16 L26 23 L30 35 L20 28 L10 35 L14 23 L4 16 L16 16 Z" fill="#ffd88a"/>
      <circle cx="20" cy="20" r="3" fill="#fff5d0"/>
    </svg>` },
    { name: '六角星', svg: `<svg viewBox="0 0 40 40" filter="drop-shadow(0 0 4px #d8a8ff)">
      <path d="M20 4 L23 15 L34 15 L25 22 L28 33 L20 26 L12 33 L15 22 L6 15 L17 15 Z" fill="#d8a8ff"/>
    </svg>` },
    { name: '冰蓝星', svg: `<svg viewBox="0 0 40 40" filter="drop-shadow(0 0 4px #8ab4ff)">
      <path d="M20 5 L24 16 L36 16 L26 23 L30 35 L20 28 L10 35 L14 23 L4 16 L16 16 Z" fill="#8ab4ff"/>
    </svg>` },
  ],
  sparkle: [
    { name: '十字闪光', img: 'assets/sparkle-cross.png' },
    { name: '小光斑', svg: `<svg viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="4" fill="#ffffff" opacity="0.9"/>
      <circle cx="20" cy="20" r="8" fill="#ffffff" opacity="0.3"/>
    </svg>` },
    { name: '金光斑', svg: `<svg viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="5" fill="#ffd88a" opacity="0.9"/>
      <circle cx="20" cy="20" r="10" fill="#ffd88a" opacity="0.3"/>
    </svg>` },
    { name: '蓝光斑', svg: `<svg viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="5" fill="#8ab4ff" opacity="0.9"/>
      <circle cx="20" cy="20" r="10" fill="#8ab4ff" opacity="0.3"/>
    </svg>` },
    { name: '四角闪', svg: `<svg viewBox="0 0 40 40" filter="drop-shadow(0 0 3px #fff)">
      <path d="M20 8 L21 19 L32 20 L21 21 L20 32 L19 21 L8 20 L19 19 Z" fill="#ffffff"/>
    </svg>` },
  ],
  snow: [
    { name: '雪花', img: 'assets/snowflake.png' },
  ],
  bell: [
    { name: '双铃铛', img: 'assets/bells.png' },
    { name: '金铃铛', svg: `<svg viewBox="0 0 40 40" filter="drop-shadow(0 0 4px #ffd88a)">
      <path d="M12 28 Q12 14 20 12 Q28 14 28 28 L30 30 L10 30 Z" fill="#ffd88a"/>
      <circle cx="20" cy="32" r="3" fill="#d8a040"/>
      <rect x="17" y="6" width="6" height="4" rx="1" fill="#c89030"/>
    </svg>` },
    { name: '银铃铛', svg: `<svg viewBox="0 0 40 40" filter="drop-shadow(0 0 4px #c8d0e8)">
      <path d="M12 28 Q12 14 20 12 Q28 14 28 28 L30 30 L10 30 Z" fill="#c8d0e8"/>
      <circle cx="20" cy="32" r="3" fill="#8890a8"/>
      <rect x="17" y="6" width="6" height="4" rx="1" fill="#8890a8"/>
    </svg>` },
    { name: '红格铃铛', img: 'assets/deco-bell-red.png' },
    { name: '格纹铃铛挂饰', img: 'assets/deco-plaid-bell.png' },
    { name: '三红铃铛', img: 'assets/deco-red-bell3.png' },
  ],
  bow: [
    { name: '红蝴蝶结', svg: `<svg viewBox="0 0 40 40" filter="drop-shadow(0 0 4px #f07070)">
      <path d="M20 20 L8 10 L12 20 L8 30 Z" fill="#f07070"/>
      <path d="M20 20 L32 10 L28 20 L32 30 Z" fill="#f07070"/>
      <circle cx="20" cy="20" r="4" fill="#c03030"/>
    </svg>` },
    { name: '金蝴蝶结', svg: `<svg viewBox="0 0 40 40" filter="drop-shadow(0 0 4px #ffd88a)">
      <path d="M20 20 L8 10 L12 20 L8 30 Z" fill="#ffd88a"/>
      <path d="M20 20 L32 10 L28 20 L32 30 Z" fill="#ffd88a"/>
      <circle cx="20" cy="20" r="4" fill="#d8a040"/>
    </svg>` },
    { name: '金透明结', img: 'assets/deco-bow-gold1.png' },
    { name: '珍珠金结', img: 'assets/deco-bow-gold2.png' },
    { name: '闪粉大结', img: 'assets/deco-bow-gold3.png' },
    { name: '金色花环', img: 'assets/deco-wreath.png' },
    { name: '红色圣诞花环', img: 'assets/deco-wreath-red.png' },
    { name: '松果彩球组合', img: 'assets/deco-pinecone-ball.png' },
    { name: '松枝彩条挂饰', img: 'assets/deco-pine-garland.png' },
  ],
  candy: [
    { name: '拐杖糖', svg: `<svg viewBox="0 0 40 40">
      <path d="M14 8 L14 28 Q14 34 20 34 Q26 34 26 28 L26 20" stroke="#f07070" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M14 8 L14 28 Q14 34 20 34 Q26 34 26 28 L26 20" stroke="#ffffff" stroke-width="3" fill="none" stroke-dasharray="4 6" stroke-linecap="round"/>
    </svg>` },
    { name: '棒棒糖', svg: `<svg viewBox="0 0 40 40">
      <circle cx="20" cy="16" r="10" fill="#f0a8d0"/>
      <path d="M12 16 Q16 10 20 16 Q24 22 28 16" stroke="#fff" stroke-width="2" fill="none"/>
      <rect x="19" y="24" width="2" height="12" fill="#e0e0e0"/>
    </svg>` },
    { name: '拐杖糖铃铛', img: 'assets/deco-cane-bell.png' },
    { name: '水彩拐杖糖', img: 'assets/deco-cane-watercolor.png' },
  ],
};

function renderDecor(cat) {
  const grid = document.getElementById('decor-grid');
  grid.innerHTML = '';
  decorItems[cat].forEach(item => {
    const el = document.createElement('div');
    el.className = 'decor-item';
    let content = '';
    if (item.img) {
      content = `<img src="${item.img}" style="width:36px;height:36px;object-fit:contain;filter:drop-shadow(0 0 6px rgba(255,255,255,0.2))">`;
    } else {
      content = item.svg;
    }
    el.innerHTML = `
      ${content}
      <div class="decor-item-label">${item.name}</div>
    `;
    el.onclick = () => addDecorToCanvas(content, item.name);
    grid.appendChild(el);
  });
}

renderDecor('ball');

// ========== DIY交互：添加/拖拽/选中/删除/缩放旋转 ==========
const canvasFrame = document.getElementById('canvas-frame');
let selectedEl = null;
let dragState = null;

// 添加装饰到画布
function addDecorToCanvas(content, name) {
  const el = document.createElement('div');
  el.className = 'canvas-decor';
  el.innerHTML = content;
  // 闪光树类素材默认和圣诞树一样大（宽280px，高度自适应）
  const isBig = name.includes('树');
  if (isBig) {
    el.style.width = '280px';
    el.style.height = 'auto';
  } else {
    el.style.width = '40px';
    el.style.height = '40px';
  }
  // 位置：大素材居中对齐树，小素材随机
  const cx = canvasFrame.clientWidth / 2;
  const cy = canvasFrame.clientHeight / 2;
  if (isBig) {
    el.style.left = (cx - 140) + 'px';
    el.style.top = (cy - 180) + 'px';
  } else {
    el.style.left = (cx + (Math.random() - 0.5) * 60 - 20) + 'px';
    el.style.top = (cy + (Math.random() - 0.5) * 80 - 20) + 'px';
  }
  el.dataset.name = name;
  el.dataset.scale = 1;
  el.dataset.rotation = 0;
  canvasFrame.appendChild(el);
  selectDecor(el);
}

// 选中装饰
function selectDecor(el) {
  if (selectedEl) selectedEl.classList.remove('selected');
  selectedEl = el;
  if (el) {
    el.classList.add('selected');
    // 同步滑块
    const scale = parseFloat(el.dataset.scale);
    const rotation = parseFloat(el.dataset.rotation);
    document.querySelectorAll('.props-slider')[0].value = scale * 100;
    document.querySelectorAll('.props-slider')[1].value = rotation;
  }
}

// 点击画布空白处取消选中
canvasFrame.addEventListener('click', (e) => {
  if (e.target === canvasFrame || e.target.closest('.tree-svg') || e.target.closest('.canvas-greeting')) {
    selectDecor(null);
  }
});

// 拖拽逻辑
canvasFrame.addEventListener('mousedown', (e) => {
  const el = e.target.closest('.canvas-decor');
  if (!el) return;
  e.preventDefault();
  selectDecor(el);
  const rect = canvasFrame.getBoundingClientRect();
  dragState = {
    el: el,
    offsetX: e.clientX - rect.left - el.offsetLeft,
    offsetY: e.clientY - rect.top - el.offsetTop,
  };
});

document.addEventListener('mousemove', (e) => {
  if (!dragState) return;
  const rect = canvasFrame.getBoundingClientRect();
  let x = e.clientX - rect.left - dragState.offsetX;
  let y = e.clientY - rect.top - dragState.offsetY;
  // 限制在画布内
  x = Math.max(0, Math.min(x, canvasFrame.clientWidth - 40));
  y = Math.max(0, Math.min(y, canvasFrame.clientHeight - 40));
  dragState.el.style.left = x + 'px';
  dragState.el.style.top = y + 'px';
});

document.addEventListener('mouseup', () => {
  dragState = null;
});

// 缩放滑块
document.querySelectorAll('.props-slider')[0].oninput = (e) => {
  if (!selectedEl) return;
  const scale = e.target.value / 100;
  selectedEl.dataset.scale = scale;
  selectedEl.style.transform = `scale(${scale}) rotate(${selectedEl.dataset.rotation}deg)`;
};

// 旋转滑块
document.querySelectorAll('.props-slider')[1].oninput = (e) => {
  if (!selectedEl) return;
  const rotation = e.target.value;
  selectedEl.dataset.rotation = rotation;
  selectedEl.style.transform = `scale(${selectedEl.dataset.scale}) rotate(${rotation}deg)`;
};

// 颜色选择
document.querySelectorAll('.color-dot').forEach(dot => {
  dot.onclick = () => {
    document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
    if (!selectedEl) return;
    const color = dot.style.background;
    // 简单实现：替换svg中的主要填充色
    const svg = selectedEl.querySelector('svg');
    if (svg) {
      svg.querySelectorAll('circle, path, rect, ellipse').forEach(node => {
        if (node.getAttribute('fill') && !node.getAttribute('fill').includes('url')) {
          node.setAttribute('fill', color);
        }
      });
    }
  };
});

// 删除按钮
document.querySelector('.props-delete').onclick = () => {
  if (!selectedEl) {
    showToast('请先选中一个装饰品');
    return;
  }
  selectedEl.remove();
  selectedEl = null;
};

// 祝福语输入
document.getElementById('greeting-input').oninput = (e) => {
  document.querySelector('.canvas-greeting').childNodes[0].textContent = e.target.value + ' ';
};
document.getElementById('greeting-sub-input').oninput = (e) => {
  document.querySelector('.canvas-greeting-sub').textContent = e.target.value;
};

// 切换圣诞树样式
document.querySelectorAll('.tree-thumb').forEach(thumb => {
  thumb.onclick = () => {
    document.querySelectorAll('.tree-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    document.getElementById('tree-img').src = thumb.dataset.img;
    saveToLocal();
  };
});

// ========== 第四步：撤销/重做/清空/自动保存 ==========
const undoStack = [];
const redoStack = [];
const MAX_HISTORY = 50;

// 保存当前画布状态到历史栈
function pushHistory() {
  const decorHTML = Array.from(canvasFrame.querySelectorAll('.canvas-decor')).map(el => ({
    name: el.dataset.name,
    left: el.style.left,
    top: el.style.top,
    width: el.style.width,
    height: el.style.height,
    scale: el.dataset.scale,
    rotation: el.dataset.rotation,
    innerHTML: el.innerHTML
  }));
  undoStack.push({
    decorHTML,
    treeImg: document.getElementById('tree-img').src,
    greeting: document.querySelector('.canvas-greeting').childNodes[0].textContent,
    greetingSub: document.querySelector('.canvas-greeting-sub').textContent
  });
  if (undoStack.length > MAX_HISTORY) undoStack.shift();
  redoStack.length = 0;
  updateUndoRedoButtons();
}

// 从历史栈恢复
function restoreFromState(state) {
  // 清空现有装饰
  canvasFrame.querySelectorAll('.canvas-decor').forEach(el => el.remove());
  // 恢复装饰
  state.decorHTML.forEach(decor => {
    const el = document.createElement('div');
    el.className = 'canvas-decor';
    el.innerHTML = decor.innerHTML;
    el.style.left = decor.left;
    el.style.top = decor.top;
    el.style.width = decor.width;
    el.style.height = decor.height;
    el.dataset.name = decor.name;
    el.dataset.scale = decor.scale;
    el.dataset.rotation = decor.rotation;
    el.style.transform = `scale(${decor.scale}) rotate(${decor.rotation}deg)`;
    canvasFrame.appendChild(el);
  });
  // 恢复圣诞树
  document.getElementById('tree-img').src = state.treeImg;
  document.querySelectorAll('.tree-thumb').forEach(t => {
    t.classList.toggle('active', t.dataset.img === state.treeImg);
  });
  // 恢复祝福语
  document.querySelector('.canvas-greeting').childNodes[0].textContent = state.greeting + ' ';
  document.querySelector('.canvas-greeting-sub').textContent = state.greetingSub;
  document.getElementById('greeting-input').value = state.greeting;
  document.getElementById('greeting-sub-input').value = state.greetingSub;
  selectDecor(null);
}

// 更新撤销/重做按钮状态
function updateUndoRedoButtons() {
  document.getElementById('btn-undo').disabled = undoStack.length === 0;
  document.getElementById('btn-redo').disabled = redoStack.length === 0;
  document.getElementById('btn-undo').style.opacity = undoStack.length === 0 ? 0.5 : 1;
  document.getElementById('btn-redo').style.opacity = redoStack.length === 0 ? 0.5 : 1;
}

// 撤销
document.getElementById('btn-undo').onclick = () => {
  if (undoStack.length === 0) return;
  const currentState = {
    decorHTML: Array.from(canvasFrame.querySelectorAll('.canvas-decor')).map(el => ({
      name: el.dataset.name, left: el.style.left, top: el.style.top,
      width: el.style.width, height: el.style.height,
      scale: el.dataset.scale, rotation: el.dataset.rotation, innerHTML: el.innerHTML
    })),
    treeImg: document.getElementById('tree-img').src,
    greeting: document.querySelector('.canvas-greeting').childNodes[0].textContent,
    greetingSub: document.querySelector('.canvas-greeting-sub').textContent
  };
  redoStack.push(currentState);
  const prevState = undoStack.pop();
  restoreFromState(prevState);
  updateUndoRedoButtons();
  saveToLocal();
  showToast('已撤销');
};

// 重做
document.getElementById('btn-redo').onclick = () => {
  if (redoStack.length === 0) return;
  const currentState = {
    decorHTML: Array.from(canvasFrame.querySelectorAll('.canvas-decor')).map(el => ({
      name: el.dataset.name, left: el.style.left, top: el.style.top,
      width: el.style.width, height: el.style.height,
      scale: el.dataset.scale, rotation: el.dataset.rotation, innerHTML: el.innerHTML
    })),
    treeImg: document.getElementById('tree-img').src,
    greeting: document.querySelector('.canvas-greeting').childNodes[0].textContent,
    greetingSub: document.querySelector('.canvas-greeting-sub').textContent
  };
  undoStack.push(currentState);
  const nextState = redoStack.pop();
  restoreFromState(nextState);
  updateUndoRedoButtons();
  saveToLocal();
  showToast('已重做');
};

// 清空
document.getElementById('btn-clear').onclick = () => {
  if (canvasFrame.querySelectorAll('.canvas-decor').length === 0) {
    showToast('画布已经是空的');
    return;
  }
  pushHistory();
  canvasFrame.querySelectorAll('.canvas-decor').forEach(el => el.remove());
  selectDecor(null);
  saveToLocal();
  showToast('已清空画布');
};

// 自动保存到 localStorage
function saveToLocal() {
  const state = {
    decorHTML: Array.from(canvasFrame.querySelectorAll('.canvas-decor')).map(el => ({
      name: el.dataset.name, left: el.style.left, top: el.style.top,
      width: el.style.width, height: el.style.height,
      scale: el.dataset.scale, rotation: el.dataset.rotation, innerHTML: el.innerHTML
    })),
    treeImg: document.getElementById('tree-img').src,
    greeting: document.getElementById('greeting-input').value,
    greetingSub: document.getElementById('greeting-sub-input').value,
    savedAt: new Date().toISOString()
  };
  try {
    localStorage.setItem('christmasDIY_save', JSON.stringify(state));
  } catch(e) { console.warn('保存失败', e); }
}

// 从 localStorage 加载
function loadFromLocal() {
  try {
    const raw = localStorage.getItem('christmasDIY_save');
    if (!raw) return;
    const state = JSON.parse(raw);
    restoreFromState(state);
    showToast('已自动恢复上次的作品');
  } catch(e) { console.warn('加载失败', e); }
}

// 初始化：页面加载时自动恢复
loadFromLocal();
updateUndoRedoButtons();

// 操作后自动保存（添加/删除/修改装饰时调用）
const originalAddDecor = addDecorToCanvas;
addDecorToCanvas = function(content, name) {
  pushHistory();
  originalAddDecor(content, name);
  saveToLocal();
};

// 监听删除按钮
const originalDelete = document.querySelector('.props-delete').onclick;
document.querySelector('.props-delete').onclick = () => {
  if (!selectedEl) {
    showToast('请先选中一个装饰品');
    return;
  }
  pushHistory();
  selectedEl.remove();
  selectedEl = null;
  saveToLocal();
};

// 监听拖拽结束（保存位置）
canvasFrame.addEventListener('mouseup', () => {
  if (dragState) {
    saveToLocal();
  }
});

// 监听祝福语输入变化
document.getElementById('greeting-input').oninput = (e) => {
  document.querySelector('.canvas-greeting').childNodes[0].textContent = e.target.value + ' ';
  saveToLocal();
};
document.getElementById('greeting-sub-input').oninput = (e) => {
  document.querySelector('.canvas-greeting-sub').textContent = e.target.value;
  saveToLocal();
};

// ========== 第五步：Canvas 高分辨率PNG导出 ==========
document.getElementById('btn-export').onclick = async () => {
  showToast('正在生成高清图片...');
  const scale = 2; // 2倍分辨率
  const w = canvasFrame.clientWidth;
  const h = canvasFrame.clientHeight;
  const canvas = document.createElement('canvas');
  canvas.width = w * scale;
  canvas.height = h * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  // 1. 绘制深蓝色背景
  ctx.fillStyle = '#0a1628';
  ctx.fillRect(0, 0, w, h);

  // 2. 绘制圣诞树
  const treeImg = document.getElementById('tree-img');
  if (treeImg && treeImg.src) {
    await drawImageFromUrl(ctx, treeImg.src, treeImg.offsetLeft, treeImg.offsetTop, treeImg.width, treeImg.height);
  }

  // 3. 绘制所有装饰元素
  const decorEls = canvasFrame.querySelectorAll('.canvas-decor');
  for (const el of decorEls) {
    const left = parseFloat(el.style.left);
    const top = parseFloat(el.style.top);
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    const scaleVal = parseFloat(el.dataset.scale || 1);
    const rotation = parseFloat(el.dataset.rotation || 0);

    ctx.save();
    ctx.translate(left + width / 2, top + height / 2);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.scale(scaleVal, scaleVal);

    const img = el.querySelector('img');
    const svg = el.querySelector('svg');

    if (img) {
      await drawImageFromUrl(ctx, img.src, -width / 2, -height / 2, width, height);
    } else if (svg) {
      // SVG转图片绘制
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      await drawImageFromUrl(ctx, url, -width / 2, -height / 2, width, height);
      URL.revokeObjectURL(url);
    }
    ctx.restore();
  }

  // 4. 绘制祝福语
  const greetingEl = document.querySelector('.canvas-greeting');
  const greetingText = document.getElementById('greeting-input').value || 'Merry Christmas';
  const greetingSub = document.getElementById('greeting-sub-input').value || '圣诞快乐';
  const gRect = greetingEl.getBoundingClientRect();
  const cRect = canvasFrame.getBoundingClientRect();
  const gLeft = gRect.left - cRect.left + gRect.width / 2;
  const gTop = gRect.top - cRect.top + gRect.height / 2;

  ctx.fillStyle = '#ffd88a';
  ctx.font = 'bold 28px "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(greetingText, gLeft, gTop);

  ctx.fillStyle = 'rgba(255,216,138,0.7)';
  ctx.font = '14px "Microsoft YaHei", sans-serif';
  ctx.fillText(greetingSub, gLeft, gTop + 24);

  // 5. 导出PNG并显示预览（小工具容器禁止a[download]，改为弹窗预览+长按保存）
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    showExportPreview(url);
    showToast('图片已生成，长按图片保存');
  }, 'image/png');
};

// 导出预览弹窗
function showExportPreview(imgUrl) {
  // 移除旧弹窗
  const old = document.getElementById('export-preview');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.id = 'export-preview';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;';
  overlay.innerHTML = `
    <div style="color:#ffd88a;font-size:16px;margin-bottom:16px;">长按图片保存到相册</div>
    <img src="${imgUrl}" style="max-width:100%;max-height:70vh;border-radius:8px;box-shadow:0 8px 32px rgba(0,0,0,0.5);" />
    <button id="export-close" style="margin-top:20px;padding:10px 32px;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.3);border-radius:20px;font-size:14px;cursor:pointer;">关闭</button>
  `;
  document.body.appendChild(overlay);
  document.getElementById('export-close').onclick = () => {
    overlay.remove();
    URL.revokeObjectURL(imgUrl);
  };
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      overlay.remove();
      URL.revokeObjectURL(imgUrl);
    }
  };
}

// 辅助：绘制图片（处理跨域和加载）
function drawImageFromUrl(ctx, url, x, y, w, h) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.drawImage(img, x, y, w, h);
      resolve();
    };
    img.onerror = () => resolve(); // 失败就跳过
    img.src = url;
  });
}
</script>