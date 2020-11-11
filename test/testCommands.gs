const testCommands = () => {

    testMessageValidation();
    testConvertUserMessageToReplyMessage();

    console.log('');
}

const testMessageValidation = () => {

    console.log('testMessageValidation');

    console.log(messageValidation('起床'));
    console.log(messageValidation('就寝'));
    console.log(messageValidation('あ　　　い　う'));
    console.log(messageValidation('a'));
    console.log(messageValidation('存在しない'));
    console.log(messageValidation('a i u'));

    console.log('------------------------------\n');
}

const testConvertUserMessageToReplyMessage = () => {

    console.log('testConvertUserMessageToReplyMessage');

    console.log(convertUserMessageToReplyMessage('起床'));
    console.log(convertUserMessageToReplyMessage('就寝'));
    console.log(convertUserMessageToReplyMessage('確認'));
    console.log(convertUserMessageToReplyMessage('リマインド'));
    console.log(convertUserMessageToReplyMessage('お問い合わせ'));
    console.log(convertUserMessageToReplyMessage('ヘルプ'));
    console.log(convertUserMessageToReplyMessage('notExistCommand'));
    console.log(convertUserMessageToReplyMessage('formatError'));

    console.log('------------------------------\n');
}
