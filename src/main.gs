/**
 * Postを実行する
 * @param {JSON} e
 * @return {JSON}
 */
function doPost(e) {

    let replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
    let userMessage = JSON.parse(e.postData.contents).events[0].message.text;

    let replyMessage = convertUserMessageToReplyMessage(messageValidation(userMessage));

    setAsPreviousMessage(userMessage);

    UrlFetchApp.fetch(config.REPLY_URL, createReplyRequest(replyToken, replyMessage));


    return ContentService.createTextOutput(JSON.stringify({ content: 'post ok' })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * 入力メッセージの検証
 * @param {String} userMessage 入力されたメッセージ
 * @return {String}
 */
const messageValidation = (userMessage) => {


    // この部分を関数化してテストコードも書く
    //----------------------------------------------------------
  　// 全角空白を半角空白へ
  　userMessage = userMessage.replace(/　/g, ' ');

    // 全ての改行コードを無くす=>使えない
    userMessage.replace(/\r\n|\n|\r/g, '');
    //----------------------------------------------------------

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
 * @param {String} - message情報
 * @return {Object} リクエスト情報（JSON）
 */
const createReplyRequest = (replyToken, replyMessage) => {
    return {
      'headers': header(),
      'method': 'post',
      'payload': JSON.stringify({
        'replyToken': replyToken,
        'messages': [{
            'type': 'text',
            'text': replyMessage,
        }],
      }),
    }
  }