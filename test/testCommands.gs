const testMessageValidation = () => {

    console.log('testMessageValidation');

    console.log(messageValidation('postback', 'add', 'リマインドイベント')); //[false, 'リマインドイベント']
    console.log(messageValidation('message', '起床', 'あ　あ'));            //[true, 'formatError']
    console.log(messageValidation('message', '起床', '存在しないコマンド')); //[true, 'notExistCommand']
    console.log(messageValidation('message', '起床', '就寝'));              //[false, '就寝']

    console.log('------------------------------\n');
}

const testConvertUserMessageToReplyMessage = () => {

    console.log('testConvertUserMessageToReplyMessage');

    console.log(convertUserMessageToReplyMessage([true, 'formatError']));                 //ヘルプ
    console.log(convertUserMessageToReplyMessage([true, 'notExistCommand']));             //ヘルプ
    console.log(convertUserMessageToReplyMessage([false, 'ヘルプ']));                     //ヘルプ
    console.log(convertUserMessageToReplyMessage([false, 'リマインド']));
    console.log(convertUserMessageToReplyMessage([false, '確認']));

    handleLastMessage.put('add');
    console.log(convertUserMessageToReplyMessage([false, 'リマインドイベント']));

    console.log('------------------------------\n');
}