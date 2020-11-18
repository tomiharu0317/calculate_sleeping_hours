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

const testIsSleep = () => {

    console.log(isSleep.get()); // true
    isSleep.put(false);         // false
    console.log(isSleep.get()); // false
    isSleep.put(true);          // true
    console.log(isSleep.get()); // true
    isSleep.put(false);         // false
    console.log(isSleep.get()); // false
    isSleep.put(true);          // true

}

const testBedtime = () => {

    console.log(bedtime.get());
    bedtime.put(new Date());
    console.log(bedtime.get());
    bedtime.put(new Date());
    console.log(bedtime.get());
    bedtime.put(new Date());

    let gotobedTime = new Date(bedtime.get());
    console.log(gotobedTime);

}

const testCalcSleepingHours = () => {

    console.log(calcSleepingHours(new Date(2020, 10, 17, 00, 00), new Date())); // 月は0起点
    console.log(calcSleepingHours(new Date(2020, 10, 18, 00, 00), new Date())); // 月は0起点
    console.log(calcSleepingHours(new Date(2020, 10, 18, 12, 00), new Date())); // 月は0起点
    console.log(calcSleepingHours(new Date(2020, 10, 18, 14, 00), new Date())); // 月は0起点

}

const testArrangeTimeFormat = () => {

    console.log(arrangeTimeFormat(new Date(2020, 11, 17, 00, 00)));
    console.log(arrangeTimeFormat(new Date(2020, 11, 18, 00, 00)));
    console.log(arrangeTimeFormat(new Date(2020, 11, 18, 12, 00)));
    console.log(arrangeTimeFormat(new Date(2020, 11, 18, 14, 00)));

}

const testGetRecordNum = () => {

    console.log(getRecordNum(1));
    console.log(getRecordNum(14));
    console.log(getRecordNum(10));
    console.log(getRecordNum(6));

}

const testCalcTotalSleepingHours = () => {

    console.log(calcTotalSleepingHours('05:21', 0, 35));
    console.log(calcTotalSleepingHours('05:21', 1, 35));

}