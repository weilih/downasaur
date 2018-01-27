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
  ground.onload = () => { context.drawImage(ground, 0, 200); }

  tree_img = new Image();
  tree_img.src = "images/tree.png";
  tree_img.onload = () => { context.drawImage(tree_img, 500, 140); }

  planTree = (w = 0) => { return { img: tree_img, x: 450 + w, y: 140 }; }
  moveTree = (tree) => { return (tree.x -= 10); }

  var lastDraw = 0;

  loop = (timestamp) => {
    shouldDraw = (timestamp - lastDraw) >= 300;
    if(shouldDraw){
      lastDraw = timestamp;
      console.log("draw");
      context.clearRect(0, 0, 480, 200);
      context.drawImage(dino_img, 0, 130);

      if(typeof(tree) === "undefined"){ tree = planTree(); }
      if(typeof(tree) && tree.x < -100){ tree = planTree(); }
      if(typeof(tree)) { moveTree(tree); }
      context.drawImage(tree.img, tree.x, tree.y);
    }

    window.addEventListener("keypress", (event) => {
      switch(event.key){
        case ' ':
          context.clearRect(0, 0, 70, 200)
          context.drawImage(dino_img, 0, 40);
          break;
      }
    });

    window.requestAnimationFrame(loop);
  }

  gameID = window.requestAnimationFrame(loop);
};
