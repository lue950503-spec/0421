let capture;
let pg; // 宣告用於 createGraphics 的變數

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  
  // 取得攝影機影像
  capture = createCapture(VIDEO);
  
  // 隱藏預設的 HTML 影片元素，以便我們能將其繪製在 p5.js 畫布中
  capture.hide();
  
  // 利用 createGraphics 產生一個與視訊畫面顯示大小一樣的圖層 (寬高皆為 60%)
  pg = createGraphics(width * 0.6, height * 0.6);
}

function draw() {
  // 設定畫布背景顏色
  background('#e7c6ff');
  
  // 將影像的繪製模式設定為置中 (以中心點為基準繪製)
  imageMode(CENTER);
  
  // 計算影像寬高 (畫布寬高的 60%)
  let imgWidth = width * 0.6;
  let imgHeight = height * 0.6;
  
  // 解決左右顛倒問題：使用 push() 和 pop() 來隔離座標系統的改變
  push();
  translate(width / 2, height / 2); // 將座標原點移動到畫布中心
  scale(-1, 1); // 將 X 軸縮放設為 -1 達成水平翻轉 (鏡像效果)
  // 將攝影機影像繪製在新的原點 (0, 0) 即可置中顯示
  image(capture, 0, 0, imgWidth, imgHeight);
  pop(); // 恢復原始的座標系統
  
  // 在 pg 圖層上繪製內容 (這裡以紅色邊框作為範例)
  pg.clear(); // 每一幀都清除前一幀的背景，保持透明才不會遮擋底下的攝影機畫面
  pg.stroke(255, 0, 0); // 設定線條為紅色
  pg.strokeWeight(5); // 設定線條粗細
  pg.noFill(); // 內部不填滿顏色
  pg.rect(0, 0, pg.width, pg.height); // 沿著 pg 的邊緣繪製矩形邊框
  
  // 將 pg 顯示在視訊畫面上方。因為放在 pop() 之後，所以內容不會跟著左右顛倒
  image(pg, width / 2, height / 2, imgWidth, imgHeight);
}

// 當瀏覽器視窗大小改變時，自動調整畫布大小以維持全螢幕
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 當視窗縮放時，同步重設 pg 圖層的大小
  if (pg) pg.resizeCanvas(width * 0.6, height * 0.6);
}
