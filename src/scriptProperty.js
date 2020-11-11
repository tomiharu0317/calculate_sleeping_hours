var properties = PropertiesService.getScriptProperties();

/**
 * ユーザーが前回入力したメッセージを取り出す
 * @return {String} getProperty('previousUserMessage)の値
 */
const getPreviousMessage = () => {

    return properties.getProperty('previousMessage');
}

/**
 * ユーザーが入力したメッセージをスクリプトのプロパティとして登録する
 * @param {String} userMessage
 */
const setAsPreviousMessage = (userMessage) => {

    properties.setProperty('previousMessage', userMessage);
}
