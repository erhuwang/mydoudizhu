/**
 * 生成随机数
 * @param begin
 * @param end
 * @returns {*}
 */
function random(begin,end) {
    return Math.floor(Math.random()*(end - begin + 1)) + begin;
}
// console.log(random(0,5 ));

var player1 = new Player('玩家1',true);
var player2 = new Player("玩家2",false);
var player3 = new Player("玩家3",false);
// player['setRole']('dizhu');
player1.setRole('dizhu');
player2.setRole('nongming');
player3.setPokers('nongming');
/**
 * 测试setRole
 */
// console.log(player.role);

/**
 * 测试setPokers
 */
// console.log(player.pokers);
/**
 * 测试getPokers
 */
// console.log(player.sortPokers());
/**
 * 测试Game
 * showPoker
 * @type {Game}
 */
var game = new Game(player1,player2,player3);
// game.setPlayerChair();
game.initGame();
game.startGame();
game.showGame();
// console.log(game.masterPokers);
// var dom = getDocByCN('mypokers');
// console.log(dom);
// console.log(document.getElementsByClassName("mypokers")[0]);

/**
 * 测试洗牌
 */
// console.log(pokerTool.xipai());
/**
 * 测试random
 */
/*for(var i=0; i < 54;i++) {
    console.log(random(0,54));
}*/
/**
 * 测试发牌
 */
// console.log(pokerTool.fapai());
// player1.showOutPokers([104,103,408,409,516,518,303,403]);