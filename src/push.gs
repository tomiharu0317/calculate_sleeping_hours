/**
 * 1:text, 2:img
 * 1:[type, text]
 * 2:[type, originalContentUrl, previewImageUrl]
 * @param {Array} pushMessage - メッセージのオプションが入った最長2の二重配列
 */
const push = (pushMessage) => {

    const options = {
        "method" : "POST",
        "headers" : header(),
        "payload" : JSON.stringify(postData(pushMessage)),
    };

    UrlFetchApp.fetch(config.PUSH_URL, options);
}

const postData = (pushMessage) => {

    let messages = [];
    let list, message;

    for (let i = 0; i < pushMessage.length; i++) {
        list = pushMessage[i];

        if (list[i] === 1) {
            message = arrangeMessageFormat(list[1]);
        } else {
            message = arrangeImageFormat(list[1], list[2]);
        }

        messages.push(message);
    }

    return {
        "to" : properties.getProperty('userId'),
        "messages" : messages
      };
}

