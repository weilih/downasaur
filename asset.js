window.onload = () => {
  canvas = document.getElementById("world");
  context = canvas.getContext("2d");

  ground = new Image();
  ground.src = "images/ground.png";
  ground.onload = () => { context.drawImage(ground, 0, 200); }

  dino_img = new Image();
  dino_img.src = "images/dino.png";
  dino = {
    img: dino_img, x: 0, y: 130,
    high_jump: (130 - 70),
    jump_power: 30,
    action: null
  }
  dino_img.onload = () => { context.drawImage(dino_img, dino.x, dino.y); }

  jumpDino = (dino) => {
    if(dino.action !== "jump") return;

    if(dino.y > dino.high_jump){
      dino.y -= dino.jump_power;
    }else{
      dino.action = null;
    }
  }

    }
  }

  tree_img = new Image();
  tree_img.src = "images/tree.png";
  tree_img.onload = () => { context.drawImage(tree_img, 500, 140); }

  planTree = (w = 0) => { return { img: tree_img, x: 450 + w, y: 140 }; }
  moveTree = (tree) => { return (tree.x -= 20); }

  var lastDraw = 0;

  loop = (timestamp) => {
    shouldDraw = (timestamp - lastDraw) >= 150;
    if(shouldDraw){
      lastDraw = timestamp;
      context.clearRect(0, 0, 480, 200);

      jumpDino(dino);
      context.drawImage(dino.img, dino.x, dino.y);

      if(typeof(tree) === "undefined"){ tree = planTree(); }
      if(typeof(tree) && tree.x < -100){ tree = planTree(); }
      if(typeof(tree)) { moveTree(tree); }
      context.drawImage(tree.img, tree.x, tree.y);
    }

    window.addEventListener("keypress", (event) => {
      switch(event.key){
        case ' ':
          context.clearRect(0, 0, 70, 200);
          if(dino.action === null ) { dino.action = "jump"; }
          break;
      }
    });

    window.requestAnimationFrame(loop);
  }

  gameID = window.requestAnimationFrame(loop);
};
