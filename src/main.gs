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

const handleUserMessage = (e) => {

    let userMessage = JSON.parse(e.postData.contents).events[0].message.text;
    let eventType = JSON.parse(e.postData.contents).events[0].type;

    let lastMessage = handleLastMessage.getLast();
    let lastEventType = handleEventType.getLast();
    // let lastMessage = handleLastMessage.getBeforeLast();
    // let lastEventType = handleEventType.getBeforeLast();

    let replyMessage = convertUserMessageToReplyMessage(messageValidation(lastEventType, lastMessage, userMessage));

    handleLastMessage.put(userMessage);
    handleEventType.put(eventType);

    return replyMessage;
}

const handlePostBack = (e) => {
    let postbackData = JSON.parse(e.postData.contents).events[0].postback.data;
    let eventType = JSON.parse(e.postData.contents).events[0].type;

    handleLastMessage.put(postbackData);
    handleEventType.put(eventType);

    if (postbackData === 'date') {
        let date = JSON.parse(e.postData.contents).events[0].postback.params.date
        return confirmDate(date);
    } else if (postbackData === 'weekly') {
        return confirmWeekly();
    } else if (postbackData === 'add') {
        return arrangeMessageFormat('キーボードから入力してください');
    } else if (postbackData === 'delete') {
        return deleteRemind();
    } else if (postbackData === 'showAll') {
        return showAllRemind();
    } else if (postbackData === 'yes') {
        return arrangeMessageFormat(postbackData);
    } else if (postbackData === 'no') {
        return arrangeMessageFormat(postbackData);
    }

    // lastEventType === 'postback' && lastMessage === 'add' => handleUserMessage
    // lastEventType === 'postback' && lastMessage === '' => handlepostback
 }

/**
 * ユーザーの入力メッセージからそれに対応したメッセージを返す
 * @param {Array} - [flag, message]
 */
const convertUserMessageToReplyMessage = (flagAndMessage) => {

    let [flag, message] = flagAndMessage;

    if (flag === true || message === 'ヘルプ') {
        return help();
    } else if (message === '起床') {
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
        return finalCheck(message);
        // return arrangeMessageFormat('finalCheck');
    }
}

/**
 * 入力メッセージの検証
 * @param {String} lastEventType     前回のイベントタイプ(postback or text)
 * @param {String} lastMessage       前に入力されたメッセージ
 * @param {String} userMessage       入力されたメッセージ
 * @return {Array} [flag, message]
 */
const messageValidation = (lastEventType, lastMessage, userMessage) => {

  　// 全角空白を半角空白へ
  　userMessage = userMessage.replace(/　/g, ' ');

    // [userMessage]
    let messageList = userMessage.split(' ');
    let messageLength = messageList.length;
    let message;
    let flag = false;

    if (messageLength > 1) {
        message = 'formatError';
    } else {
        // userMessageがリマインド追加で促されたキーボード入力かどうか
        if (lastEventType === 'postback' && lastMessage === 'add') {
            message = messageList[0]
        } else {
            message = commands.includes(messageList[0]) ? messageList[0] : 'notExistCommand';
        }
    }

    if (message === 'formatError' || message === 'notExistCommand') {
        flag = true;
    }

    return [flag, message];
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
        'messages': [
            replyMessage
        ],
      }),
    }
  }