
/**
 * postback.datetimeを受け取ってその日の睡眠時間を返す
 * @param {String} date
 */
const confirmDate = (date) => {

    return arrangeMessageFormat('確認日付\n' + date);
}

/**
 * 過去7日間の睡眠時間とグラフを返す
 */
const confirmWeekly = () => {

    return arrangeMessageFormat('確認週間');
}

/**
 * messageを受け取って設定
 */
const addRemind = () => {

    return arrangeMessageFormat('リマインド追加');
}

/**
 * リマインド一覧と削除ボタンをflex messageで返す
 */
const deleteRemind = () => {

    return arrangeMessageFormat('リマインド削除');
}

/**
 * リマインド一覧を表示
 */
const showAllRemind = () => {

    return arrangeMessageFormat('リマインド一覧');
}

/**
 * messageを削除/追加していいか確認
 * @param {String} message
 */
const finalCheck = (message) => {

    let text;

    if (handleLastMessage.getBeforeLast() === 'add') {
        text = 'を追加する';
    } else {
        text = 'を削除する';
    }

    return {
        "type": "bubble",
        "direction": "ltr",
        "header": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "洗濯の蛇口回した？",
              "align": "center",
              "offsetTop": "20px",
              "wrap": true
            }
          ]
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": text,
              "align": "center",
              "offsetTop": "10px"
            }
          ],
          "height": "70px"
        },
        "footer": {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "postback",
                "data": "yes",
                "label": "はい"
              },
              "color": "#1dcd00",
              "style": "primary"
            },
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "いいえ",
                "data": "no"
              },
              "style": "primary",
              "color": "#f02011",
              "margin": "10px"
            }
          ]
        }
      };
}