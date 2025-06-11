let currentScene = 0; // Start from scene1 (changed from 11 to 0 to start properly)
let video1, video2, video3, video4, video5, video6, video7, video8, video9, video10, video11, video12, video13, video14, video15, video16, video17, video18, video19, video20;
let backgroundImg, mapImg, loseImg, winImg;
let buttonStart, buttonMap, buttonBack, buttonWake, buttonKitchen, buttonLight, buttonToilet, buttonbutter, buttonclutter;
let buttonMouse, buttonNothing, buttonRoom, buttonCloser, buttonEnd, buttonHome, buttonTry;
let buttonah, buttonbasin, buttonumbrella, buttonready, buttonwait, buttonhit, buttoncheck;
let video1Ended = false;

let faceMesh; //face detection
let video; 
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };

//micphone detection
let mouseImg;
let mic;
let mouseSize = 200;
let threshold = 550;

//hit the mouse
let mice = [];
let maxMice = 10; 
let clickHandled = false;

//button fly
let btnImg;
let btnX, btnY;
let btnW = 220, btnH = 100;
let moving = true;
let label = "Catch me?";
let growClicks = 0;
let maxGrowClicks = 5; // 点击5次跳场景
let scene = 1;
let vx, vy; // 速度
let btnClicked = false; //

function preload() {
  video1 = createVideo('1.mp4');
  video2 = createVideo('2.mp4');
  video3 = createVideo('3.mp4');
  video4 = createVideo('4.mp4');
  video5 = createVideo('5.mp4');
  video6 = createVideo('6.mp4');
  video7 = createVideo('7.mp4');
  video8 = createVideo('8.mp4');
  video9 = createVideo('9.mp4');
  video10 = createVideo('10.mp4');
  video11 = createVideo('11.mp4');
  video12 = createVideo('12.mp4');
  video13 = createVideo('13.mp4');
  video14 = createVideo('14.mp4');
  video15 = createVideo('15.mp4');
  video16 = createVideo('16.mp4');
  video17 = createVideo('17.mp4'); 
  video18 = createVideo('18.mp4');
  video19 = createVideo('19.mp4');
  video20 = createVideo('20.mp4');


  btnImg = loadImage('assets/button.png');

  video1.hide(); video2.hide(); video3.hide(); video4.hide(); video5.hide();
  video6.hide(); video7.hide(); video8.hide(); video9.hide(); video10.hide();
  video11.hide(); video12.hide(); video13.hide(); video14.hide(); video15.hide();
  video16.hide(); video17.hide(); video18.hide(); video19.hide(); video20.hide();

  faceMesh = ml5.faceMesh(options); //人脸识别

}

function setup() {
  createCanvas(1280, 720);
  backgroundImg = loadImage('assets/cover.png');
  mapImg = loadImage('assets/map.png');
  loseImg = loadImage('assets/lose.png');
  winImg = loadImage('assets/win.png');

  buttonStart = loadImage('assets/buttonstart.png');
  buttonMap = loadImage('assets/buttonmap.png');
  buttonBack = loadImage('assets/buttonback.png');
  buttonWake = loadImage('assets/buttonwake.png');
  buttonKitchen = loadImage('assets/buttonkitchen.png');
  buttonLight = loadImage('assets/buttonlight.png');
  buttonToilet = loadImage('assets/buttontoilet.png');
  buttonMouse = loadImage('assets/buttonmouse.png');
  buttonNothing = loadImage('assets/buttonnothing.png');
  buttonRoom = loadImage('assets/buttonroom.png');
  buttonCloser = loadImage('assets/buttoncloser.png');
  buttonEnd = loadImage('assets/buttonend.png');
  buttonHome = loadImage('assets/buttonhome.png');
  buttonTry = loadImage('assets/buttontry.png');
  buttonah = loadImage('assets/buttonah.png')
  buttonbutter = loadImage('assets/buttonbutter.png');
  buttonclutter = loadImage('assets/buttonclutter.png');
  buttonbasin = loadImage('assets/buttonbasin.png');
  buttonumbrella = loadImage('assets/buttonumbrella.png');
  buttonready = loadImage('assets/buttonready.png');
  buttonwait = loadImage('assets/buttonwait.png');
  buttonhit = loadImage('assets/buttonhit.png');
  buttoncheck = loadImage('assets/buttoncheck.png');

  mouseImg = loadImage('assets/mousehead.png');



  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  faceMesh.detectStart(video, gotFaces);

  mic = new p5.AudioIn();
  mic.start();

  

  btnX = random(width - btnW);
  btnY = random(height - btnH);
  // 按钮移动初始速度
  vx = random(8, 10);
  vy = random(8, 10);
  


}

function modelReady() {
  console.log("FaceAPI model loaded!");
  
}

function gotResults(err, result) {
  if (err) {
    console.error(err);
    return;
  }

  detections = result;
  faceapi.detect(gotResults); // continue detecting
}


function draw() {
  switch (currentScene) {
    case 0: scene1(); break;    // Cover scene: start and map buttons
    case 1: scene2(); break;    // Wake up video, then show wake button
    case 2: scene3(); break;    // Map scene with back button
    case 3: scene4(); break;    // Room scene: choose between kitchen/light/toilet
    case 4: scene5(); break;    // Toilet scene: show mouse button
    case 5: scene6(); break;    // Light scene: two options (nothing/kitchen)
    case 6: scene7(); break;    // Kitchen scene: go to room
    case 7: scene8(); break;    // Closer scene: go to end
    case 8: scene9(); break;    // Alternate kitchen end scene
    case 9: scene10(); break;   // Room scene leading back to mouse scene
    case 10: scene11(); break;  // Final scene with end button
    case 11: scene12(); break;  // Face detection scene
    case 12: scene13(); break;  // Lose screen: retry or return home
    case 13: scene14(); break;  // Lose screen: retry or return home
    case 14: scene15(); break;  // Lose screen: retry or return home
    case 15: scene16(); break;  // Lose screen: retry or return home
    case 16: scene17(); break;  // Lose screen: retry or return home
    case 17: scene18(); break;  // Lose screen: retry or return home
    case 18: scene19(); break;  // Lose screen: retry or return home
    case 19: scene20(); break;  // Lose screen: retry or return home
    case 20: scene21(); break;  // Lose screen: retry or return home
    case 21: scene22(); break;  // Lose screen: retry or return home
    case 22: scene23(); break;  // Lose screen: retry or return home
    case 23: scene24(); break;  // Lose screen: retry or return home
    case 24: scene25(); break;  // Lose screen: retry or return home
    case 25: scene26(); break;  // Lose screen: retry or return home
    case 26: scene27(); break;  // Lose screen: retry or return home
    case 27: scene28(); break;  // Lose screen: retry or return home
    case 28: scene29(); break;  // Lose screen: retry or return home
    case 29: scene30(); break;  // Lose screen: retry or return home
    case 30: scene31(); break;  // Lose screen: retry or return home
    case 31: scene32(); break;  // Lose screen: retry or return home
    case 32: scene33(); break;  // Lose screen: retry or return home
  }
}
function modelReady() {
  console.log("FaceMesh model loaded");
}

function gotResults(results) {
  predictions = results;
}

// Scene 1: Cover page with start and map options
function scene1() {
  background(0);
  image(backgroundImg, 0, 0, width, height);
  image(buttonStart, 300, 600, 180, 80);
  image(buttonMap, 800, 600, 180, 80);
}

// Scene 2: Wake-up video scene
function scene2() {
  background(0);
  image(video1, 0, 0, width, height);
  video1.play();
  if(video1.elt.duration && video1.elt.currentTime > video1.elt.duration - 0.4){
    video1.pause();
    image(buttonWake, 550, 600, 180, 80);
  }

}


// Scene 3: Map with back button
function scene3() {
  background(0);
  image(mapImg, 500, 0, 250, 700);
  image(buttonBack, 1000, 600, 180, 80);
}

// Scene 4: Main room choices (kitchen, light, toilet)
function scene4() {
  background(0);
  image(video2, 0, 0, width, height);
  video2.play();
  if (video2.elt.duration && video2.elt.currentTime > video2.elt.duration - 0.4) {
    image(buttonKitchen, 250, 600, 180, 80);
    image(buttonLight, 550, 600, 180, 80);
    image(buttonToilet, 850, 600, 180, 80);
    video2.pause();
  }
}

// Scene 5: Toilet scene leading to mouse
function scene5() {
  background(0);
  image(video3, 0, 0, width, height);
  video3.play();
  if (video3.elt.duration && video3.elt.currentTime > video3.elt.duration - 0.4) {
    image(buttonMouse, 550, 600, 180, 80);
    video3.pause();
  }
}

// Scene 6: Light scene with two outcomes
function scene6() {
  background(0);
  image(video4, 0, 0, width, height);
  video4.play();
  if (video4.elt.duration && video4.elt.currentTime > video4.elt.duration - 0.4) {
    image(buttonNothing, 300, 600, 180, 80);
    image(buttonKitchen, 800, 600, 180, 80);
    video4.pause();
  }
}

// Scene 7: Kitchen scene with room transition
function scene7() {
  background(0);
  image(video5, 0, 0, width, height);
  video5.play();
  if (video5.elt.duration && video5.elt.currentTime > video5.elt.duration - 0.4) {
    image(buttonRoom, 550, 600, 180, 80);
    video5.pause();
  }
}

// Scene 8: Closer scene leading to end
function scene8() {
  background(0);
  image(video9, 0, 0, width, height);
  video9.play();
  if (video9.elt.duration && video9.elt.currentTime > video9.elt.duration - 0.4) {
    image(buttonCloser, 550, 600, 180, 80);
    video9.pause();
  }
}

// Scene 9: Alternate kitchen ending
function scene9() {
  background(0);
  image(video8, 0, 0, width, height);
  video8.play();
  if (video8.elt.duration && video8.elt.currentTime > video8.elt.duration - 0.4) {
    image(buttonEnd, 550, 600, 180, 80);
    video8.pause();
  }
}

// Scene 10: Room leads back to mouse scene
// 定义场景10函数
function scene10() {
  // 设置背景颜色为黑色
  background(0);
  // 在画布上显示视频
  image(video6, 0, 0, width, height);
  // 播放视频
  video6.play();
  // 如果视频已经播放完毕，则显示按钮
  if (video6.elt.duration && video6.elt.currentTime > video6.elt.duration - 0.4) {
    // 在画布上显示按钮
    image(buttonMouse, 550, 600, 180, 80);
    // 暂停视频
    video6.pause();
  }
}

// Scene 11: Ending video scene
function scene11() {
  background(0);
  image(video7, 0, 0, width, height);
  video7.play();
  if (video7.elt.duration && video7.elt.currentTime > video7.elt.duration - 0.4) {
    image(buttonEnd, 550, 600, 180, 80);
    video7.pause();
  }
}

// Scene 12: Capture user's face when the face is detected and getting bigger, trigger the next scene
function scene12() {
    // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw the faces' bounding boxes
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    let x = face.box.xMin; //脸部的左上角X
    let y = face.box.yMin; //脸部的左上角Y
    let w = face.box.width;  //脸部的宽
    let h = face.box.height; //脸部的高
    //let centerX = (face.box.xMin + face.box.xMax) / 2; // average of xMin and xMax
   // let centerY = (face.box.yMin + face.box.yMax) / 2; // average of yMin and yMax

    stroke(0, 255, 0);
    fill(255, 0, 0, 50);
    rect(x-w/2, y-h/2, w, h);
    text(i, x, y - 10);
    // if the face is getting bigger, trigger the next scene
    if (w > 800) {
      currentScene = 13;
    }

}
}

function scene13() {
  background(0);
  image(loseImg, 0, 0, width, height);
  image(buttonTry, 300, 600, 180, 80);
  image(buttonHome, 800, 600, 180, 80);
}
function scene14() {
  background(0);
  image(video10, 0, 0, width, height);
  video10.play();
  if (video10.elt.duration && video10.elt.currentTime > video10.elt.duration - 0.4) {
    image(buttonah, 550, 600, 180, 80);
    video10.pause();
  }
}

function scene15() {
  background(0);
  let vol = mic.getLevel();
  // volumn to size
  mouseSize = map(vol, 0, 0.5, 200, 600, true);

  fill(255, 255, 255, 255);
  textSize(120);
  text("shout!", width/2, height/3.5);

  
  image(mouseImg, width/2 - mouseSize/2, height/2 - mouseSize/2, mouseSize, mouseSize);

  if (mouseSize > threshold) {
    currentScene = 15;
  }
  let btnW = 600;
  let btnH = 60;
  let btnX = width - btnW - 30;
  let btnY = height - btnH - 30;

  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(btnX, btnY, btnW, btnH, 10);

  fill(0);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  text("If your browswer banned this effect, plz click to continue", btnX + btnW / 2, btnY + btnH / 2);

  // 检查是否点击按钮
  if (
    mouseIsPressed &&
    mouseX > btnX && mouseX < btnX + btnW &&
    mouseY > btnY && mouseY < btnY + btnH
  ) {
    currentScene = 15; // 跳转到下一页
  }
}

function scene16() {
  background(0);
  image(video11, 0, 0, width, height);
  video11.play();
  if (video11.elt.duration && video11.elt.currentTime > video11.elt.duration - 0.4) {
    
    video11.pause();
    image(buttonToilet, 250, 600, 180, 80);
    image(buttonclutter, 550, 600, 180, 80);
    image(buttonbutter, 850, 600, 180, 80);

  }
}
function scene17() {
  background(0);
  image(video12, 0, 0, width, height);
  video12.play();
  if (video12.elt.duration && video12.elt.currentTime > video12.elt.duration - 0.4) {
   
    image(buttonbasin, 550, 600, 180, 80);
    video12.pause();
  }
}
function scene18() {
  background(0);
  image(video13, 0, 0, width, height);
  video13.play();
  if (video13.elt.duration && video13.elt.currentTime > video13.elt.duration - 0.4) {

    image(buttonEnd, 550, 600, 180, 80);
    video13.pause();
  }
}
function scene19() {
  background(0);
  image(loseImg, 0, 0, width, height);
  image(buttonTry, 300, 600, 180, 80);
  image(buttonHome, 800, 600, 180, 80);
}
function scene20() {
  background(0);
  image(video15, 0, 0, width, height);
  video15.play();
  if (video15.elt.duration && video15.elt.currentTime > video15.elt.duration - 0.4) {

    image(buttonumbrella, 550, 600, 180, 80);
    video15.pause();
  }
}

function scene21() {
  background(0);
  //mice.push({ x: width / 2, y: height / 2, size: 80 });
  // Draw "hit the mouse" text
  textSize(48);
  textAlign(CENTER);
  fill(255, 255, 255, 255);
  text("hit the mouse", width / 2, height / 4);
  
  // Draw all mice
  for (let m of mice) {
    image(mouseImg, m.x, m.y, 100, 100); // Fixed size for all mice
  }

  // Click detection and mouse generation logic
  if (mouseIsPressed && !clickHandled) {
    // Check if a mouse was clicked
    for (let i = 0; i < mice.length; i++) {
      let m = mice[i];
      let d = dist(mouseX, mouseY, m.x + 50, m.y + 50); // Check distance to center of mouse
      if (d < 50) { // If clicked within mouse radius
       
        // Add new mouse at random position if under max
        if (mice.length < maxMice) {
          let newMouse = {
            x: random(width - 100),
            y: random(height - 100)
          };
          mice.push(newMouse);
        } else {
          // If we've reached max mice and clicked one, go to next scene
          currentScene = 21;
        }
        clickHandled = true;
        break;
      }
    }
  }

  // Reset click handling when mouse released
  if (!mouseIsPressed) {
    clickHandled = false;
  }
  
  // Initialize first mouse in center if array is empty
  if (mice.length === 0) {
    mice.push({
      x: width/2 - 50,
      y: height/2 - 50
    });
  }
}

function scene22() {
  background(0);
  image(video16, 0, 0, width, height);
  video16.play();
  if (video16.elt.duration && video16.elt.currentTime > video16.elt.duration - 0.4) {

    image(buttonEnd, 550, 600, 180, 80);
    video16.pause();
  }
}

function scene23() {
  background(0);
  image(video14, 0, 0, width, height);
  video14.play();
  if (video14.elt.duration && video14.elt.currentTime > video14.elt.duration - 0.4) {
    image(buttonToilet, 300, 600, 180, 80);
    image(buttonclutter, 800, 600, 180, 80);
    video14.pause();
  }
}
function scene24() {
  background(0);
  image(video12, 0, 0, width, height);
  video12.play();
  if (video12.elt.duration && video12.elt.currentTime > video12.elt.duration - 0.4) {
    image(buttonclutter, 550, 600, 180, 80);
    video12.pause();
  }
}
function scene25() {
  background(0);
  image(video15, 0, 0, width, height);
  video15.play();
  if (video15.elt.duration && video15.elt.currentTime > video15.elt.duration - 0.4) {
    image(buttonready, 550, 600, 180, 80);
    video15.pause();
  }
}
function scene26() {
  background(0);
  image(video17, 0, 0, width, height);
  video17.play();
  if (video17.elt.duration && video17.elt.currentTime > video17.elt.duration - 0.4) {
    image(buttonwait, 550, 600, 180, 80);
    video17.pause();
  }
}



function scene27() {
  background(0);
  image(video15, 0, 0, width, height);
  video15.play();
  if (video15.elt.duration && video15.elt.currentTime > video15.elt.duration - 0.4) {
    image(buttonToilet, 550, 600, 180, 80);
    video15.pause();
  }
}

function scene28() {
  background(0);
  image(video12, 0, 0, width, height);
  video12.play();
  if (video12.elt.duration && video12.elt.currentTime > video12.elt.duration - 0.4) {
    image(buttonready, 550, 600, 180, 80);
    video12.pause();
}
}
function scene29() {
  background(0);
  image(video18, 0, 0, width, height);
  video18.play();
  if (video18.elt.duration && video18.elt.currentTime > video18.elt.duration - 0.4) {
    image(buttonhit, 550, 600, 180, 80);
    video18.pause();
  }
}

function scene30() {
  background(0);

   // 画按钮
   image(btnImg, btnX, btnY, btnW, btnH);
   // 按钮上的文字
   textAlign(CENTER, CENTER);
   textSize(24);
   fill(0);
   text(label, btnX + btnW / 2, btnY + btnH / 2);
    // 按钮移动
    if (moving) {
      btnX += vx;
      btnY += vy;
      // 碰边反弹
      if (btnX <= 0 || btnX + btnW >= width) vx *= -1;
      if (btnY <= 0 || btnY + btnH >= height) vy *= -1;
    } 
    if (mouseIsPressed && !btnClicked &&
      mouseX > btnX && mouseX < btnX + btnW &&
      mouseY > btnY && mouseY < btnY + btnH) {
    if (moving) {
      moving = false;
      label = "Don't Hit me!!";
    } else {
      btnW += 10;
      btnH += 10;
      growClicks++;
      if (growClicks >= maxGrowClicks || btnW > width/2) {
        currentScene = 30;
      }
    }
    btnClicked = true; // 本帧已处理点击
  }

  // 松开鼠标时重置 clicked
  if (!mouseIsPressed) {
    btnClicked = false;
  }

} 


function scene31() {
  background(0);
  image(video19, 0, 0, width, height);
  video19.play();
  if (video19.elt.duration && video19.elt.currentTime > video19.elt.duration - 0.4) {
    image(buttoncheck, 550, 600, 180, 80);
    video19.pause();
  }
}

function scene32() {
  background(0);
  image(video20, 0, 0, width, height);
  video20.play();
  if (video20.elt.duration && video20.elt.currentTime > video20.elt.duration - 0.4) {
    image(buttonEnd, 550, 600, 180, 80);
    video20.pause();
  }
}
function scene33() {
  background(0);
  image(winImg, 0, 0, width, height);
  image(buttonHome, 550, 600, 180, 80);
}




    
  


// Scene 13: Lose screen with retry or return home

function mousePressed() {
  switch (currentScene) {
    case 0: // scene1 - cover
      if (mouseX > 300 && mouseX < 480 && mouseY > 600 && mouseY < 680) currentScene = 1; // start
      if (mouseX > 800 && mouseX < 980 && mouseY > 600 && mouseY < 680) currentScene = 2; // map
      break;
    case 1: // scene2 - wake up
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 3;  video1.elt.currentTime = 0;}  // wake
      break;
    case 2: // scene3 - map
      //back button
      if (mouseX > 1000 && mouseX < 1180 && mouseY > 600 && mouseY < 680) currentScene = 0; // back
      break;
    case 3: // scene4 - main room
        if (mouseX > 250 && mouseX < 430 && mouseY > 600 && mouseY < 680) {currentScene = 4;  video2.elt.currentTime = 0;} // kitchen
        if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 6;  video2.elt.currentTime = 0;}   // light
        if (mouseX > 850 && mouseX < 1030 && mouseY > 600 && mouseY < 680) {currentScene = 5;  video2.elt.currentTime = 0;}  // toilet
      break;
    case 4: // scene5 - toilet
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 7;  video3.elt.currentTime = 0;} // mouse
      break;
    case 5: // scene6 - light
      if (mouseX > 300 && mouseX < 480 && mouseY > 600 && mouseY < 680) {currentScene = 8;  video4.elt.currentTime = 0;} // nothing
      if (mouseX > 800 && mouseX < 980 && mouseY > 600 && mouseY < 680) {currentScene = 9;  video4.elt.currentTime = 0;} // kitchen
      break;
    case 6: // scene7 - kitchen
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 10;  video5.elt.currentTime = 0;} // room
      break;
    case 7: // scene8 - closer
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 11;  video9.elt.currentTime = 0;} // end
      break;
    case 8: // scene9 - alt kitchen
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 12;  video8.elt.currentTime = 0;} // end
      break;
    case 9: // scene10 - room to mouse
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) currentScene = 7;
      break;
    case 10: // scene11 - final video
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) currentScene = 12;
      break;
    case 11: // scene12 - end
      break;
    case 12: // scene13 - face detection
      if (mouseX > 300 && mouseX < 480 && mouseY > 600 && mouseY < 680) currentScene = 3; // retry
      if (mouseX > 800 && mouseX < 980 && mouseY > 600 && mouseY < 680) currentScene = 0; // home
      break;
    case 13: // scene14 - ahhhhh
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 14; video10.elt.currentTime = 0;}
      break;
    case 14: // scene15 - micphone detection
      break;
    case 15: // scene 16 - video 11 play see mouse three choices
      if (mouseX > 250 && mouseX < 430 && mouseY > 600 && mouseY < 680) {currentScene = 16; video11.elt.currentTime = 0;}
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 19; video11.elt.currentTime = 0;}
      if (mouseX > 850 && mouseX < 1030 && mouseY > 600 && mouseY < 680) {currentScene = 22; video11.elt.currentTime = 0;}
      break;
    case 16: // scene 17 - video 12 find the basin
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 17; video12.elt.currentTime = 0;}
      break;
    case 17: // scene 18 - video 13  hold basin
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 18; video13.elt.currentTime = 0;}
      break;
    case 18: // scene19 - image lose  end
      if (mouseX > 300 && mouseX < 480 && mouseY > 600 && mouseY < 680) currentScene = 15; // retry
      if (mouseX > 800 && mouseX < 980 && mouseY > 600 && mouseY < 680) currentScene = 0; // home
      break;
    case 19: // scene20 - video 15 find the umbrellia
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 20; video15.elt.currentTime = 0; mice.push({ x: width / 2, y: height / 2, size: 80 }); clickHandled = false;}
       break;
    case 20: // scene21 - hit the mouse 
      break;
    case 21: // scene22 - video 16 use umbrella to hit the mouse
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 18; video16.elt.currentTime = 0;}
      break;
    case 22: // scene23 - video 14 get the butter first
      if (mouseX > 300 && mouseX < 480 && mouseY > 600 && mouseY < 680) currentScene = 23; // retry
      if (mouseX > 800 && mouseX < 980 && mouseY > 600 && mouseY < 680) currentScene = 26; // home
      break;
    case 23: // scene24 - video 12 search the toliet first
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 24; video12.elt.currentTime = 0;}
      break;
    case 24: // scene25 - video 15 then search the clutter  
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 25; video15.elt.currentTime = 0;}
      break;
    case 25: // scene26 - video 17 prepare the trap & wait patiently
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 28; video17.elt.currentTime = 0;}
      break;
    case 26: // scene27 - video 15 search the clutter first
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 27; video12.elt.currentTime = 0;}
      break;
    case 27: // scene28 - video 12  then search the toliet
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 25; video15.elt.currentTime = 0;}
      break;
    case 28: // scene29 - video 18 get close to the mouse
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 29; video18.elt.currentTime = 0;}
      break;
    case 29: // scene30 - button fly
      break;
    case 30: // scene31 - video 19 killed the mouse
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 31; video19.elt.currentTime = 0;}
      break;
    case 31: // scene32 - video 20 check the mouse
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) {currentScene = 32; video20.elt.currentTime = 0;}
      break;
    case 32: // scene33 - image win end
      if (mouseX > 550 && mouseX < 730 && mouseY > 600 && mouseY < 680) currentScene = 0; // retry
      break;

    

      
  }
}

function gotFaces(results) {
  faces = results;
}


function generateRandomMouse() {
  let margin = 60;
  let size = 80;
  let tries = 0;
  let x, y, ok;
  do {
    x = random(margin, width - margin);
    y = random(margin + 50, height - margin); // 避开"hit the mouse"字
    ok = true;
    // 避免新头像和其他头像太重叠
    for (let m of mice) {
      if (dist(x, y, m.x, m.y) < size) {
        ok = false;
        break;
      }
    }
    tries++;
    if (tries > 30) break; // 太挤也就不管了
  } while (!ok);
  return { x, y, size };
}
