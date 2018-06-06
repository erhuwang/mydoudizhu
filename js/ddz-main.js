
function Game() {
    this.players = new Array(3);
}
Game.prototype = {
    initGame : function() {
        this.setPlayerChair();
        getDocByTitle('button','出牌').addEventListener("click", function () {
            game.players[game.myChair].chupai();
        });
        getDocByTitle('button','重选').addEventListener("click",function () {
            resetChoosedPokers('mypoker','true');
        })
    },
    /**
     * 设置每个玩家的chair,同时设定本地chair
     */
    setPlayerChair : function() {
        for(var i in this.players) {
            this.players[i].setChair(parseInt(i));
            if(this.players[i].isMe) {
                this.myChair = parseInt(i);
            }
        }
        for(var i in this.players) {
            this.players[i].setLocalChair(this.myChair);
        }
    },
    /**
     * 设置玩家，如果有玩家离开桌子或玩家不足三人
     * @param player
     */
    setPlayers : function (player) {
        /*console.log(player);
        console.log(this.players.length);*/
        for(var i = 0; i < this.players.length; i++) {
            if(this.players[i] == null || this.players[i] == '') {
                this.players[i] = player;
                player.setChair(i);
                break;
            }
        }
    },
    /**
     * 设置玩家离开桌子
     * @param player
     */
    removePlayer : function (player) {
        for(var i in this.players) {
            if(this.players[i] == player) {
                this.players[i] = null;
            }
        }
    },
    /**
     * 开始游戏
     */
    startGame : function() {
        this.game = true;
        pokerTool.fapai( this.players);
    },
    /**
     * 游戏结束
     */
    endGame : function() {
        this.game = false;
    },
    /**
     * 游戏展示（核心）
     * @param player
     */
    showGame : function () {
        /**
         * 暂时定为返回
         */
        if(!this.game) {
            return;
        }
        /**
         * 游戏为true时
         */

        for(var i in this.players) {
                this.players[i].showMyPokers();
        }
    },

}
var game = new Game();