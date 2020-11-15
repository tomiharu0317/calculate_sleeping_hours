const commands = ['ヘルプ', '起床', '就寝', '確認', 'リマインド', 'お問い合わせ'];

/**
 * 起床時間を記録する関数
 */
const getUp = () => {
    return '起床を記録しました。';
}

/**
 * 就寝時間を記録する関数
 */
const goToBed = () => {
    return '就寝を記録しました。';
}

/**
 * 確認する関数
 */
const confirm = () => {
    return [
        {
          "type": "flex",
          "altText": "This is a Flex Message",
          "contents": {
            "type": "bubble",
            "body": {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "datetimepicker",
                    "label": "日付",
                    "data": "date",
                    "mode": "date"
                  }
                },
                {
                  "type": "button",
                  "action": {
                    "type": "postback",
                    "label": "週間",
                    "data": "weekly"
                    // "displayText": "週間"
                  }
                }
              ]
            }
          }
        }
    ];
}

/**
 * リマインドを設定する関数
 */
const remind = () => {
    return [
        {
          "type": "flex",
          "altText": "This is a Flex Message",
          "contents": {
            "type": "bubble",
            "body": {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "postback",
                    "label": "追加",
                    "data": "add"
                  },
                },
                {
                  "type": "button",
                  "action": {
                    "type": "postback",
                    "label": "削除",
                    "data": "delete"
                  },
                },
                {
                  "type": "button",
                  "action": {
                    "type": "postback",
                    "label": "一覧",
                    "data": "showAll"
                  }
                }
              ]
            }
          }
        }
    ];
}

/**
 * お問い合わせ用のGoogle Form URLを送信する関数
 */
const contact = () => {
    return 'こちらのフォームからお問い合わせ下さい。（レビュー、使いにくい点など）';
}

/**
 * ヘルプを表示する関数
 */
const help = () => {
    return 'ヘルプ。';
}