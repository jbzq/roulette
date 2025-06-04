const terminal = document.getElementById('terminal');
const hackBtn = document.getElementById('hackBtn');

let cube = [];

const size = 5; // Tamanho do cubo
const radomNum = () => Math.floor(Math.random() * 10); // Numeros aleatorios (0-9)

function createCube() {
  cube = [];
  for (let i = 0; i < 8; i++) {
    cube.push({ type: 'vertex', x: randomNum(), y: randomNum(), z: randomNum(), char: randomNum()});
  }

  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // Face frontal
    [4, 5], [5, 6], [6, 7], [7, 4], // Face traseira
    [0, 4], [1, 5], [2, 6], [3, 7] // Conexões
  ];

  edges.forEach(edge => {
    cube.push({
      type: 'edge',
      from: edge[0],
      to: edge[1],
      chars: Array(size).fill().map(() => randomNum())
    });
  });

  const faces = [
    [0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4],
    [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]
  ];

  faces.forEach(face => {
    cube.push({
      type: 'face',
      vertices: face,
      chars: Array(size * size).fill().map(() => randomNum())
    });
  });
};

function renderCube() {
  let output = '';
  const grid = Array(size * 2).fill().map(() => Array(size * 2).fill(' '));
      
  // Projeção 3D → 2D
  cube.forEach(item => {
    if (item.type === 'vertex') {
      const x = Math.floor(item.x / 10 * size) + size;
      const y = Math.floor(item.y / 10 * size) + size;
      if (x >= 0 && x < size * 2 && y >= 0 && y < size * 2) {
        grid[y][x] = item.char;
      }
    } else if (item.type === 'edge') {
      const from = cube[item.from];
      const to = cube[item.to];
      item.chars.forEach((char, i) => {
        const t = i / (item.chars.length - 1);
        const x = Math.floor((from.x * (1 - t) + to.x * t) / 10 * size + size;
        const y = Math.floor((from.y * (1 - t) + to.y * t) / 10 * size + size;
        if (x >= 0 && x < size * 2 && y >= 0 && y < size * 2) {
          grid[y][x] = char;
        }
      });
  }
});

      // Converte grid para string
      grid.forEach(row => {
        output += row.join('') + '\n';
      });
      terminal.textContent = output;
    }

    // Rotação do cubo
function rotateCube() {
  cube.forEach(item => {
    if (item.type === 'vertex') {
      // Rotação simples nos eixos X e Y
      const tempY = item.y;
      item.y = item.y * Math.cos(0.05) - item.z * Math.sin(0.05);
      item.z = tempY * Math.sin(0.05) + item.z * Math.cos(0.05);
          
      const tempX = item.x;
      item.x = item.x * Math.cos(0.03) - item.z * Math.sin(0.03);
      item.z = tempX * Math.sin(0.03) + item.z * Math.cos(0.03);
    }
  });
}

function animate() {
  rotateCube();
  renderCube();
  requestAnimationFrame(animate);
}

hackBtn.addEventListener('click', () => {
  terminal.textContent = 'SCANEANDO CUBO...\n';
  setTimeout(() => {
    terminal.textContent += 'VULNERABILIDADE ENCONTRADA: 0x' + 
      Array(8).fill().map(() => randomNum().toString(16)).join('') + '\n';
    createCube(); // Recria o cubo
   }, 1000);
});

createCube();
animate();
