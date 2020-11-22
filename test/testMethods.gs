const testSetAsPreviousMessage = () => {

    setAsPreviousMessage('確認');
    // setAsPreviousMessage('');
    // setAsPreviousMessage('');
    // setAsPreviousMessage('');

    console.log('');
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