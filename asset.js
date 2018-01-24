window.onload = () => {
  canvas = document.getElementById("world");
  context = canvas.getContext("2d");

  dino = new Image();
  dino.src = "images/dino.png";
  dino.onload = () => {
    context.drawImage(dino, 0, 130);
  }

  ground = new Image();
  ground.src = "images/ground.png";
  ground.onload = () => {
    context.drawImage(ground, 0, 200);
  }


  var gameID;
  gameLoop = (lastDraw) => {
    gameID = window.requestAnimationFrame((timestamp) => {
      shouldDraw = (timestamp - lastDraw) >= 300
      if(shouldDraw){
        lastDraw = timestamp;
        console.log("draw");
        context.clearRect(0, 0, 70, 200)
        context.drawImage(dino, 0, 130);
      }

      window.addEventListener("keypress", (event) => {
        switch(event.key){
          case ' ':
            context.clearRect(0, 0, 70, 200)
            context.drawImage(dino, 0, 40);
            break;
        }

        // console.log(key + " presesd");
      });

      gameLoop(lastDraw);
    })
  }

  gameLoop(0);
};
