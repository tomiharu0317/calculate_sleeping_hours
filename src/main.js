var properties = PropertiesService.getScriptProperties();

/**
 * Postを実行する
 * @param {JSON} e
 * @return {JSON}
 */
function doPost(e) {

    let replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
    let eventType = JSON.parse(e.postData.contents).events[0].type;
    let replyMessage;

    userId.put(e);

    if (eventType === 'postback') {
        replyMessage = handlePostBack(e);
    } else {
        replyMessage = handleUserMessage(e);
    }

    UrlFetchApp.fetch(config.REPLY_URL, createReplyRequest(replyToken, replyMessage));

    return ContentService.createTextOutput(JSON.stringify({ content: 'post ok' })).setMimeType(ContentService.MimeType.JSON);
}

const userId = {
    get() {
      return properties.getProperty('sleep');
    },
    put(e) {
      let userId = JSON.parse(e.postData.contents).events[0].source.userId;
      properties.setProperty('userId', userId);
    }
};

const handleUserMessage = (e) => {

    let userMessage = JSON.parse(e.postData.contents).events[0].message.text;
    let lastMessage = properties.getProperty('lastMessage');
    let beforeLastMessage = properties.getProperty('beforeLastMessage');

    let replyMessage = convertUserMessageToReplyMessage(messageValidation(beforeLastMessage, lastMessage, userMessage));

    setLastMessage(userMessage);

    return replyMessage;
}

const handlePostBack = (e) => {
    let postbackData = JSON.parse(e.postData.contents).events[0].postback.data;
    let text;

    if (postbackData === 'date') {
        text = JSON.parse(e.postData.contents).events[0].postback.params.date
    } else {
        text = postbackData;
    }

    return arrangeMessageFormat(text);
}

const arrangeMessageFormat = (text) => {

    return [
        {
            "type":"text",
            "text": text
        }
    ];
}


/**
 * 入力メッセージの検証
 * @param {String} beforeLastMessage 前の前に入力されたメッセージ
 * @param {String} lastMessage       前に入力されたメッセージ
 * @param {String} userMessage       入力されたメッセージ
 * @return {String}
 */
const messageValidation = (beforeLastMessage, lastMessage, userMessage) => {

  　// 全角空白を半角空白へ
  　userMessage = userMessage.replace(/　/g, ' ');

    let messageList = userMessage.split(' ');
    let messageLength = messageList.length;

    if (messageLength > 1) {
        return 'formatError';
    } else {
        let message = commands.includes(messageList[0]) ? messageList[0] : 'notExistCommand';

        return message;
    }
}

/**
 * ユーザーの入力メッセージからそれに対応したメッセージを返す
 * @param {String}
 */
const convertUserMessageToReplyMessage = (message) => {

    if (message === '起床') {
        return getUp();
    } else if (message === '就寝') {
        return goToBed();
    } else if (message === '確認') {　      //クイックリプライ[日付、週間]
        return confirm();
    } else if (message === 'リマインド') {  //クイックリプライ[追加、削除、一覧]
        return remind();
    } else if (message === 'お問い合わせ') {
        return contact();
    } else {
        return help();
    }
}

/**
 * リクエストのヘッダーを作成
 * @return {Object} リクエスト情報のヘッダー
 */
function header() {
    return {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN,
        }
  }

/**
 * 応答用のリクエスト情報（JSON）を作成する
 * @param {String} replyToken - WebHookで受信した応答用Token（LINE BOTより）
 * @param {String} replyMessage - message情報
 * @return {Object} リクエスト情報（JSON）
 */
const createReplyRequest = (replyToken, replyMessage) => {
    return {
      'headers': header(),
      'method': 'post',
      'payload': JSON.stringify({
        'replyToken': replyToken,
        'messages': replyMessage,
      }),
    }
  }

const push = (pushMessage) => {

    const options = {
        "method" : "POST",
        "headers" : header(),
        "payload" : JSON.stringify(postData(pushMessage)),
    };

    UrlFetchApp.fetch(config.PUSH_URL, options);
}

const postData = (pushMessage) => {
    return {
        "to" : properties.getProperty('userId'),
        "messages" : [
            {
                "type" : "text",
                "text" : pushMessage,
            }
        ]
      };
}