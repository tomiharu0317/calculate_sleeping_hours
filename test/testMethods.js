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

const testHandleLastMessage = () => {

    console.log(handleLastMessage.getLast());
    console.log(handleLastMessage.getBeforeLast());
    handleLastMessage.put('起床');
    console.log(handleLastMessage.getLast());
    console.log(handleLastMessage.getBeforeLast());
    handleLastMessage.put('add');
    console.log(handleLastMessage.getLast());
    console.log(handleLastMessage.getBeforeLast());
}

const testHandleEventType = () => {

    console.log(handleEventType.getLast());
    console.log(handleEventType.getBeforeLast());
    handleEventType.put('postback');
    console.log(handleEventType.getLast());
    console.log(handleEventType.getBeforeLast());
    handleEventType.put('message');
    console.log(handleEventType.getLast());
    console.log(handleEventType.getBeforeLast());

}