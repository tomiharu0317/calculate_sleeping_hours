var properties = PropertiesService.getScriptProperties();

// ACCESS_TOKEN     ：LINE developersのメッセージ送受信設定に記載のアクセストークン
// SHEET_ID         : Google spread sheetのシートID
// LineReplyUrl     ：LINE Messaging APIのURL（LINEからの応答用）
const config = {
    ACCESS_TOKEN    : properties.getProperty('ACCESS_TOKEN'),
    SHEET_ID        : properties.getProperty('SHEET_ID'),
    REPLY_URL       : 'https://api.line.me/v2/bot/message/reply'
};