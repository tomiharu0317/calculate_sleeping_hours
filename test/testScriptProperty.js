const testScriptProperty = () => {

    testSetAsPreviousMessage();
    testGetPreviousMessage();

    console.log('');
}


const testGetPreviousMessage = () => {

    let previousMessage = getPreviousMessage();
    console.log(previousMessage);

    console.log('');
}

const testSetAsPreviousMessage = () => {

    setAsPreviousMessage('確認');
    // setAsPreviousMessage('');
    // setAsPreviousMessage('');
    // setAsPreviousMessage('');

    console.log('');
}