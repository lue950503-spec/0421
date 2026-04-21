let capture;

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  
  // 取得攝影機影像
  capture = createCapture(VIDEO);
  
  // 隱藏預設的 HTML 影片元素，以便我們能將其繪製在 p5.js 畫布中
  capture.hide(); 
}

function draw() {
  // 設定畫布背景顏色
  background('#e7c6ff');
  
  // 將影像的繪製模式設定為置中 (以中心點為基準繪製)
  imageMode(CENTER);
  
  // 計算影像寬高 (畫布寬高的 60%)
  let imgWidth = width * 0.6;
  let imgHeight = height * 0.6;
  
  // 將攝影機影像繪製在畫布正中間
  image(capture, width / 2, height / 2, imgWidth, imgHeight);
}

// 當瀏覽器視窗大小改變時，自動調整畫布大小以維持全螢幕
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
