var card;
var rarity;
var rarityCards;
var gachaBtn = document.getElementById('gacha_btn');
var cardImage = document.getElementById('card_image');
var effectImage = document.getElementById('effect_image');

/**
 * レアリティ設定
 */
const rarities = [
    { type: 'n', name: 'ノーマル', probability: 60, },
    { type: 'np', name: 'ノーマル+', probability: 20, },
    { type: 'r', name: 'スーパーレア', probability: 15, },
    { type: 'sr', name: 'スーパーレア', probability: 4, },
    { type: 'ssr', name: 'スーパースペシャルレア', probability: 1, },
]

/**
 * レアリティを確率からランダムで決定
 * 
 * @returns 
 */
function randomRerity() {
    var min = 0;
    var max = 100;
    var number = Math.floor(Math.random() * (max + 1 - min)) + min
    var rarity;
    for (var index in rarities) {
        rarity = rarities[index];
        max = min + rarity.probability;
        // console.log(number, min, max);
        if (number >= min && number <= max) {
            return rarity;
        }
        min = max;
    }
}

/**
 * レアリティのカード一覧取得
 * 
 * @param {*} cards 
 * @param {*} rarity 
 * @returns 
 */
function cardsByRarity(cards, rarity) {
    return cards.filter(function (card) {
        var index = card.rarity.indexOf(rarity.type);
        if (index >= 0) return card;
    })
}

/**
 * カードからランダムで1枚引く
 * 
 * @param {*} cards 
 * @returns 
 */
function selectCard(cards) {
    var min = 0;
    var max = cards.length - 1;
    var index = Math.floor(Math.random() * (max + 1 - min)) + min
    return cards[index];
}

/**
 * ブランクカード画像
 * 
 * @param {*} number 
 */
function loadEmptyImage(number) {
    cardImage.src = `./images/card/empty${number}.png`;
}

/**
 * カード画像
 * 
 * @param {*} number 
 */
function loadImage(card, rarity) {
    cardImage.src = `./images/card/${card.id}_${rarity.type}.png`;
    cardImage.className = 'fadeIn';
}

/**
 * カード演出
 * 
 * @param {*} number 
 */
var effectIndex = 1;
var effectInterval = 6000;
var effectID;
var effectCard = function () {
    //ガチャボタン隠す
    gachaBtn.classList.toggle('d-none');

    //カード表示初期化 & CSSアニメーション
    cardImage.classList.toggle('hide')
    cardImage.classList.toggle('fadeInOut')

    //ブランク画像ロード
    loadEmptyImage(effectIndex);

    //タイマー
    effectID = setInterval(function () {
        //タイマー削除
        if (effectID) clearInterval(effectID);

        //カード読み込み
        loadImage(card, rarity)

        //ガチャボタン表示
        gachaBtn.classList.toggle('d-none');
    }, effectInterval)
}

/**
 * ガチャ実行
 * 
 */
function runGacha() {
    //ランダムレアリティ
    rarity = randomRerity();

    //レアリティのカード取得
    rarityCards = cardsByRarity(cards, rarity);

    //カード決定
    card = selectCard(rarityCards);

    //演出
    effectCard();

    // console.log('レアリティ:', rarity);
    // console.log('検索カード：', rarityCards);
    // console.log('カード：', card);
}

/**
 * HTMLロード後
 * 
 */
window.onload = function () {
    //クリックイベント追加
    gachaBtn.addEventListener('click', runGacha)
}
