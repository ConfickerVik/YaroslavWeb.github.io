function spawnFoodLV1S() {
    if (game.time % 90 == 0) { //good FOOD
      game.goodfood.push({
        x: getRandomInt(20, 1240),
        y: -50,
        img: game.item[getRandomInt(0, 4)],
        dmg: 0
      });
    }
  }