/**
 * 定义poker对象
 */
function Poker() {

}
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
 * Poker的花色定义
 * @type {{"1": string, "2": string, "3": string, "4": string, "5": string}}
 */
Poker.prototype.huaArray = {
    1:'fangkuai',//方块
    2:'meihua',//梅花
    3:'hongtao',//红桃
    4:'heitao',//黑桃
    5:'gui'//大王
};

/**
 * 获得Poker的花色值
 * @param poker
 * @returns {number}
 */
Poker.prototype.getHua = function (poker) {
    return Math.floor(poker/100);
}

/**
 * 获得花色名
 * @param poker
 * @returns {*}
 */
Poker.prototype.getHuaName = function (poker) {
    return this.huaArray[this.getHua(poker)];
}

/**
 * g获得Poker的大小
 * @param poker
 * @returns {number}
 */
Poker.prototype.getPokerValue = function (poker) {
    return poker%100;
}

/**
 * 洗牌
 */
Poker.prototype.xipai = function () {
    var myPokers = this.pokers.concat();
    var confusedPokers = [];
    while(myPokers.length) {
        confusedPokers.push(parseInt(myPokers.splice(random(0,myPokers.length-1),1).toString()));
    }
    return confusedPokers;
}
/**
 * 发牌
 * @returns {Array[]|*[]}
 */
Poker.prototype.fapai = function (players) {
    var playerPokers = [[],[],[],[]];
    var _confusedPokers = this.xipai();
    playerPokers[3] = _confusedPokers.splice(_confusedPokers.length-4,3).concat();
    for(var i in _confusedPokers) {
        if(0 == i%3){
            playerPokers[0].push(_confusedPokers[i]);
        }
        if(1 == i%3) {
            playerPokers[1].push(_confusedPokers[i]);
        }
        if(2 == i%3) {
            playerPokers[2].push(_confusedPokers[i]);
        }
    }
    for(var i in players) {
        if(players[i].role == 'dizhu') {
            playerPokers[i] = playerPokers[i].concat(playerPokers[3]);
        }
        if(players[i].isMe) {
            players[i].setPokers(playerPokers[i]);
        } else {
            players[i].setPokers(playerPokers[i].length);
        }
    }
    return players;


}
var pokerTool = new Poker();

/**
 * 定义玩家对象
 * @constructor
 */
function Player(name,isMe) {
    this.name = name;
    this.isMe = isMe;
}
Player.prototype = {
    /**
     * 设置玩家坐序
     * @param chair
     */
    setChair : function (chair) {
        this.chair = chair;
    },
    /**
     * 设置玩家的本地chair
     * @param mychair
     */
    setLocalChair : function(mychair) {
        if(this.isMe) {
            this.localChair = 'center';
            return;
        } else if (mychair < 2 && this.chair == mychair + 1) {
            this.localChair = 'right';
            return;
        } else if(this.chair == 0) {
            this.localChair = 'right';
            return;
        }
        this.localChair = 'left';
        return;
    },
    /**
     * 设置角色：农民或地主
     * @param role
     */
    setRole : function (role) {
        this.role = role;
    },
    /**
     * 设置牌组,如果为非本人则设置牌组长度
     * @param arr
     */
    setPokers : function (arr) {
        if(this.isMe) {
            this.pokers = arr;
            this.pokersLength = this.pokers.length;
            return;
        }
        this.pokersLength = arr;
    },
    /**
     * 将手牌排序
     * @returns {*}
     */
    //将pokers从大到小，从黑桃到梅花排序后输出
    sortPokers : function (unSortPorkers) {
        for(var i = 0; i < unSortPorkers.length - 1; i++) {
            for(var j = i + 1; j < unSortPorkers.length; j++) {
               var p_value1 = unSortPorkers[i]%100;
               var p_value2 = unSortPorkers[j]%100;
               var temp;
                if(p_value1 < p_value2) {
                    temp = unSortPorkers[i];
                    unSortPorkers[i] = unSortPorkers[j];
                    unSortPorkers[j] = temp;
                }
                if(p_value1 == p_value2) {
                    var p_hua1 = unSortPorkers[i]/100;
                    var p_hua2 = unSortPorkers[j]/100;
                    if(p_hua1 < p_hua2) {
                        temp = unSortPorkers[i];
                        unSortPorkers[i] = unSortPorkers[j];
                        unSortPorkers[j] = temp;
                    }
                }
            }
        }
        // console.log(unSortPorkers);
        return unSortPorkers;
    },
    /**
     * 展示自己手牌
     */
    showMyPokers : function () {
        this.showPokersLen();
        if(this.isMe) {
            var mypokers = getDocByCN("mypokers")[0];
            mypokers.innerHTML="";
            var sortedPokers = this.sortPokers(this.pokers);
            var left = 0;
            for(var i = 0; i < sortedPokers.length; i++) {
                var doc = document.createElement("div");
                doc.className = "mypoker";
                doc.setAttribute("data-poker",sortedPokers[i]);
                doc.setAttribute("data-choose","false");
                doc.style.left = left +"px";
                left += 40;
                doc.addEventListener("click",onPokersClick);
                this.decoratePoker(doc,sortedPokers[i]);
                mypokers.appendChild(doc);
            }
        }
    },
    /**
     * 画出poker花色与值
     * @param doc
     * @param poker
     */
    decoratePoker : function (doc,poker) {
        var poker_content = document.createElement("div");
        poker_content.className = "poker_content";
        var p1 = document.createElement('p');
        var p2 = document.createElement('p');
        var pokerValue = pokerTool.getPokerValue(poker);
        var pokerHuase = pokerTool.getHuaName(poker);
        doc.appendChild(poker_content);
        switch (pokerValue) {
            case 3 :
                p1.className = "poker_3";
                // p1.style.background = "url('../img/poker.png') no-repeat -193px";
                break;
            case 4 :
                p1.className = "poker_4";
                // p1.style.background = "url('../img/poker.png') no-repeat -177px";
                break;
            case 5 :
                p1.className = "poker_5";
                // p1.style.background = "url('../img/poker.png') no-repeat -163px";
                break;
            case 6 :
                p1.className = "poker_6";
                // p1.style.background = "url('../img/poker.png') no-repeat -145px";
                break;
            case 7 :
                p1.className = "poker_7";
                // p1.style.background = "url('../img/poker.png') no-repeat -226px";
                break;
            case 8 :
                p1.className = "poker_8";
                // p1.style.background = "url('../img/poker.png') no-repeat -210px";
                break;
            case 9 :
                p1.className = "poker_9";
                // p1.style.background = "url('../img/poker.png') no-repeat -127px";
                break;
            case 10 :
                p1.className = "poker_10";
                // p1.style.background = "url('../img/poker.png') no-repeat -105px";
                // p1.style.width = "24px";
                break;
            case 11 :
                p1.className = "poker_J";
                // p1.style.background = "url('../img/poker.png') no-repeat -87px";
                break;
            case 12 :
                p1.className = "poker_Q";
                // p1.style.background = "url('../img/poker.png') no-repeat -66px";
                // p1.style.width = "22px";
                break;
            case 13 :
                p1.className = "poker_K";
                // p1.style.background = "url('../img/poker.png') no-repeat -49px";
                break;
            case 14 :
                p1.className = "poker_A";
                // p1.style.background = "url('../img/poker.png') no-repeat -27px";
                // p1.style.width = "20px";
                break;
            case 15 :
                p1.className = "poker_2";
                // p1.style.background = "url('../img/poker.png') no-repeat -11px";
                break;
        }
        switch (pokerHuase)  {
            case "heitao" :
                p2.className = "heitao";
                // p1.className = "heitao " + p1.class;
                p1.setAttribute("huase","heitao");
                p1.style.backgroundPositionY = "-463px";
                break;
            case "hongtao" :
                p2.className = "hongtao";
                // p1.className = "hongtao " + p1.className;
                p1.setAttribute("huase","hongtao");
                p1.style.backgroundPositionY = "-487px";
                break;
            case "meihua" :
                p2.className = "meihua";
                // p1.className = "meihua " +  p1.className;
                p1.setAttribute("huase","heitao");
                p1.style.backgroundPositionY = "-463px";
                break;
            case "fangkuai" :
                p2.className = "fangkuai";
                // p1.className = "fangkuai " + p1.className;
                p1.setAttribute("huase","fangkuai");
                p1.style.backgroundPositionY = "-487px";
                break;
            case "gui" :
                switch (pokerValue)  {
                    case 16 :
                        poker_content.className = "xiaogui";
                        break;
                    case 18 :
                        poker_content.className = "dagui";
                        break;
                }
                break;
        }
        if(pokerHuase != "gui") {
            poker_content.appendChild(p1);
            poker_content.appendChild(p2);
        }
    },
    /**
     * 展示pokers的所剩数量
     */
    showPokersLen : function () {
        // console.log(this.chair);
        var doc = getDocByCN("poker_length");
        if(this.localChair == 'center') {
            doc[2].innerHTML = this.pokersLength;
            return;
        }
        if (this.localChair == 'right') {
            doc[1].innerHTML = this.pokersLength;
            return;
        }
        if (this.localChair == 'left') {
            doc[0].innerHTML = this.pokersLength;
            return;
        }
    },
    /**
     * 展示打出的牌
     * @param arr
     */
    showOutPokers : function (arr) {
        var centerDoc = getDocByCN("centerPlayerOut")[0];
        var leftDoc = getDocByCN("leftPlayerOut")[0];
        var rightDoc = getDocByCN("rightPlayerOut")[0];
        centerDoc.innerHTML = '';
        rightDoc.innerHTML = '';
        leftDoc.innerHTML = '';
        var outPokers = this.sortPokers(arr);
        var left = 0;
        var top = 0;
        if(this.localChair == 'center' && outPokers.length < 12) {
            left = (540 - 100 - (outPokers.length - 1) * 40)/2;
        }
        if(this.localChair == 'right' && outPokers.length < 12) {
            left = (540 - 100 - (outPokers.length - 1) * 40);
        }
        // console.log(left);
        for(var i in outPokers) {
            var poker = document.createElement('div');
            if(i != 0 && i%12 == 0) {
                left = 0;
                top += 50;
            }
            poker.className='OutPokers';
            poker.style.left = left +"px";
            poker.style.top = top + "px";
            left += 40;
            this.decoratePoker(poker,outPokers[i]);
            if(this.localChair == 'center') {
                centerDoc.appendChild(poker);
                continue;
            }
            if(this.localChair == 'left') {
                leftDoc.appendChild(poker);
                continue;
            }
            rightDoc.appendChild(poker);
        }
    },
    /**
     * 出牌
     */
    chupai : function () {
        if(this.isMe) {
            //1.获得选中的牌
            var choosedPokers = getPokersByChoose('mypoker','true');
            //2.从手牌中删除选中的牌，并重新show手牌
            this.setPokers(removeArr(this.pokers,choosedPokers));
            this.showMyPokers();
            //3.show打出的牌
            this.showOutPokers(choosedPokers);
            return;
        }
        //如果不是自己出牌，为其他玩家出牌
        //1.show打出的牌
        this.showOutPokers(arguments[0]);
        //2. 计算手牌剩余数量
        this.setPokers(this.pokersLength - arguments[0].length);
        //3. 更新余牌数量
        this.showMyPokers();
    }
}


/**
 * 其他工具类
 */

/**
 * 获得min-max的随机值
 * @returns {number}
 */
function random(min, max) {
    return Math.floor(Math.random()*(max-min+1) + min);
}
/**
 * 通过类名获得dom
 * @param cName
 * @returns {HTMLCollectionOf<Element>}
 */
function getDocByCN(cName) {
    return document.getElementsByClassName(cName);
}
/**
 * 通过title得到dom
 * @param cName
 * @param title
 * @returns {*}
 */
function getDocByTitle(cName,title) {
    var docList = getDocByCN('button');
    for(var i in docList) {
        if (docList[i].title == title) {
            return docList[i];
        }
    }
}
/**
 * 通过类名和属性值得到被choose的牌
 * @param cName
 * @param choose
 * @returns {Array}
 */
function getPokersByChoose(cName,choose) {
    var choosedPokers = [];
    var docList = getDocByCN(cName);
    for(var i = 0; i < docList.length; i++) {
        if(choose == docList[i].getAttribute('data-choose')) {
            var num = parseInt(docList[i].getAttribute('data-poker'));
            choosedPokers.push(num);
        }
    }
    return choosedPokers;
}

/**
 * 重置choosed的牌
 * @param cName
 * @param choose
 */
function resetChoosedPokers(cName,choose) {
    var docList = getDocByCN(cName);
    for(var i = 0; i < docList.length; i++) {
        if(choose == docList[i].getAttribute('data-choose')) {
            docList[i].setAttribute("data-choose","false");
        }
    }
}

/**
 * 从一个数组中删除另一个数组，两个数组都是从大到小排序后的数组
 * @param myarr
 */
function removeArr(myarr,arr) {
    // console.log(myarr);
    var spliceArr = [];
    for(var i in myarr) {
        for(var j in arr) {
            if(arr[j] == myarr[i]) {
                spliceArr.push(i);
                break;
            }
        }
    }
    for(var i in spliceArr) {
        myarr.splice(spliceArr[i]-i,1);
    }
    // console.log(myarr);
    return myarr;
}

/**
 * 为mypoker添加点击事件
 * @param e
 */
function onPokersClick(e) {
    e = e || window.event; 　//标准化事件对象（W3C DOM 和IE DOM ）
    var t = e.currentTarget || e.srcElement; //标准化事件对象属性<引起事件的元素>
    // console.log(t);
    if("false" == t.getAttribute("data-choose")) {
        t.setAttribute("data-choose","true");
        // t.style.bottom = "25px";
    } else {
        t.setAttribute("data-choose","false");
        // t.style.bottom = "3px";
    }
}
// function onPokersUp(e) {
//     e = e || window.event; 　//标准化事件对象（W3C DOM 和IE DOM ）
//     var t = e.currentTarget || e.srcElement; //标准化事件对象属性<引起事件的元素>
//     console.log(t);
//     if("false" == t.getAttribute("data-choose")) {
//         t.setAttribute("data-choose","true");
//         // t.style.bottom = "25px";
//     } else {
//         t.setAttribute("data-choose","false");
//         // t.style.bottom = "3px";
//     }
// }
