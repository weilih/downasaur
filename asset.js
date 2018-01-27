window.onload = () => {
  canvas = document.getElementById("world");
  context = canvas.getContext("2d");

  ground = new Image();
  ground.src = "images/ground.png";
  ground.onload = () => { context.drawImage(ground, 0, 200); }

  dino_img = new Image();
  dino_img.src = "images/dino.png";
  dino = {
    img: dino_img, x: 0, y: 145,
    high_jump: 0,
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

  gravityForce = (dino) => {
    if(dino.action === "jump") return;

    if(dino.y < 145){
      dino.action = "fall"
      dino.y += 15;
    }else{
      dino.action = null;
    }
  }

  collision = (dino, tree) => {
    if(tree.x + tree.img.width < 0) return false;
    if(dino.img.width > tree.x && dino.y + dino.img.height > tree.y) return true;
  }

  tree_img = new Image();
  tree_img.src = "images/tree.png";
  tree_img.onload = () => { context.drawImage(tree_img, 500, 140); }

  planTree = (w = 0) => { return { img: tree_img, x: 450 + w, y: 140 }; }
  moveTree = (tree) => { return (tree.x -= 20); }

  var lastDraw = 0;

  function loop(timestamp){
    shouldDraw = (timestamp - lastDraw) >= 100;
    if(shouldDraw){
      lastDraw = timestamp;

      if(typeof(tree) !== "undefined" && collision(dino, tree)){ return; }

      jumpDino(dino);
      gravityForce(dino);

      if(typeof(tree) === "undefined"){ tree = planTree(); }
      if(typeof(tree) && tree.x < -100){ tree = planTree(); }
      if(typeof(tree)) { moveTree(tree); }

      context.clearRect(0, 0, 480, 200);
      context.drawImage(dino.img, dino.x, dino.y);
      context.drawImage(tree.img, tree.x, tree.y);
    }

    window.addEventListener("keypress", (event) => {
      switch(event.key){
        case ' ':
          if(dino.action === null ) { dino.action = "jump"; }
          break;
      }
    });
    window.requestAnimationFrame(loop);
  }

  window.requestAnimationFrame(loop);
};
