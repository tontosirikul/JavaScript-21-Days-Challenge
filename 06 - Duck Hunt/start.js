(() => {
  // เริ่มเขียนโค้ด
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function createDucks() {
    return [...Array(5)].map(() => {
      return {
        // fly from left to right
        x: random(0, window.innerWidth),
        // fly from buttom
        y: window.innerHeight,
        speedX: random(-50, 50),
        speedY: random(5, 10),
      };
    });
  }
  function setupDuckElement(duck) {
    // create div for duck
    const duckElem = document.createElement("div");
    // assign css pre class
    duckElem.className = "duck";
    // set duck position
    duckElem.style.left = `${duck.x}px`;
    duckElem.style.top = `${duck.y}px`;
    // add duck
    duckElem.style.backgroundImage = "url(./left-1.png)";
    // add duck to body
    document.body.appendChild(duckElem);

    return { duck, duckElem };
  }

  function getDuckBackgroundImage(duck, duckElem) {
    const direction = duck.speedX > 0 ? "right" : "left";
    return duckElem.style.backgroundImage.indexOf("1") !== -1
      ? `url(./${direction}-2.png)`
      : `url(./${direction}-1.png)`;
  }

  function moveDuck(duckElem, duck) {
    // return position of element
    const { left, top } = duckElem.getBoundingClientRect();
    const outOfBoundX = duck.x < 0 || duck.x > window.innerWidth;
    const outOfBoundY = duck.y < 0 || duck.x > window.innerHeigth;
    if (outOfBoundX) {
      duck.speedX *= -1;
    }

    if (outOfBoundY) {
      duck.speedY *= -1;
    }
    duck.x = left + duck.speedX;
    duck.y = top - duck.speedY;
    duckElem.style.left = `${duck.x}px`;
    duckElem.style.top = `${duck.y}px`;
    duckElem.style.backgroundImage = getDuckBackgroundImage(duck, duckElem);
  }
  function shootDuck(event) {
    const duckElem = event.target;
    duckElem.style.transition = "top 2s";
    duckElem.style.top = `${window.innerHeight}px`;
    clearInterval(duckElem.interval);
    setTimeout(() => {
      document.body.removeChild(duckElem);
      const duck = document.querySelector(".duck");
      if (!duck) {
        const winningElem = document.querySelector(".winning");
        winningElem.style.opacity = 1;
      }
    }, 2000);
  }
  function run() {
    const ducks = createDucks();
    // create each duck
    const duckElems = ducks.map(setupDuckElement);

    duckElems.forEach(({ duck, duckElem }) => {
      duckElem.interval = setInterval(() => moveDuck(duckElem, duck), 100);
      duckElem.addEventListener("click", shootDuck);
    });
  }
  run();
})();