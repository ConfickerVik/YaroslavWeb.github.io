function spawnFoodLV2S() {
    if (game.time % 60 == 0) { //good FOOD
      game.goodfood.push({
        x: getRandomInt(20, 1240),
        y: -50,
        img: game.item[getRandomInt(0, 4)],
        dmg: 0
      });
    }
    if (game.time % 180 == 0) { //bad Food
      game.badfood.push({
        x: getRandomInt(20, 1240),
        y: -50,
        img: game.item[getRandomInt(4, 7)],
        dmg: 1
      });
    }
  }