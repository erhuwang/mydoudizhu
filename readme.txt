斗地主项目设计
    项目需求：完成经典版斗地主，使用技术html、css、javascript、Json、Ajax、java
    前台业务：完成斗地主界面的显示，动画
        具体：
        1. 玩家手牌的显示
        2. 玩家出牌的显示
        3. 玩家手牌的选择
        4. 地主底牌的显示
        5. 底分，倍率的显示
    后台：数据的生成、分发和存储
        具体：
        1. porkers对象的生成洗牌
        2. pokers分发
        3. 地主底牌的生成
        4.玩家出牌的检验与分发

     具体对象的设计：
     前台：
     pokers（牌组）
     poker（单张牌）
     倍率
     底分
     出牌规则（rule）

     后台：
     与前台类似，后台主要承担数据的分发工作
     /**
      * 定义poker牌组
      * 1:方块
      * 2：梅花
      * 3：红桃
      * 4：黑桃
      * 5：鬼
      * 516：小鬼
      * 518：大鬼
      * @type {number[]}
      */
     Poker.prototype.pokers= [
         103,104,105,106,107,108,109,110,111,112,113,114,115,
         203,204,205,206,207,208,209,210,211,212,213,214,215,
         303,304,305,306,307,308,309,310,311,312,313,314,315,
         403,404,405,406,407,408,409,410,411,412,413,414,415,
         516,518
     ];
     /**
      * 定义花色的取值
      * @type {{"1": string, "2": string, "3": string, "4": string, "5": string}}
      */
     Poker.prototype.huaArray= {
         1:'fangkuai',
         2:'meihua',
         3:'hongtao',
         4:'heitao',
         5:'gui'
     };
     /**
      * 获取花色的值
      * @param poker
      * @returns {number}
      */
     Poker.prototype.getHua = function (poker) {
         return Math.floor(poker/100);
     }
     Poker.prototype.getHuaName = function (poker) {
         return
     }