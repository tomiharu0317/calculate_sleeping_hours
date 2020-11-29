/**
 * 1:flexMessageObj, 2:img
 * 1:[type, obj]
 * 2:[type, originalContentUrl, previewImageUrl]
 * @param {Array} pushMessage - メッセージのオプションが入った最長2の二重配列 [[type, option]]
 */
const push = (pushMessage) => {
  const options = {
    method: 'POST',
    headers: header(),
    payload: JSON.stringify(postData(pushMessage)),
  };

  UrlFetchApp.fetch(config.PUSH_URL, options);
};

/**
 * @param {Array} pushMessage - メッセージのオプションが入った最長2(週間報告の時)の二重配列 [[type, option]]
 * @return {Object} messages[ ここ ]
 */
const postData = (pushMessage) => {
  var properties = PropertiesService.getScriptProperties();

  let messages = [];
  let messageList, message;

  for (let i = 0; i < pushMessage.length; i++) {
    // [type, option]
    messageList = pushMessage[i];

    if (messageList[0] === 1) {
      message = arrangeFlexMessageFormat(messageList[1]);
    } else {
      message = arrangeImageFormat(messageList[1], messageList[2]);
    }

    messages.push(message);
  }

  return {
    to: properties.getProperty('userId'),
    messages: messages,
  };
};
