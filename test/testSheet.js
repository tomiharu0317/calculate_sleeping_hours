const testFindTargetRow = () => {

    let sheetLastRow = recordSheet.getLastRow();
    Logger.log(sheetLastRow);

    Logger.log('-----------------------------');
    Logger.log(findTargetRow(35,sheetLastRow));
    Logger.log(findTargetRow(1, sheetLastRow));
    Logger.log(findTargetRow(3, sheetLastRow));
    Logger.log(findTargetRow(5, sheetLastRow));
}


const testGetRecordNum = () => {

    console.log(getRecordNum(1));
    console.log(getRecordNum(14));
    console.log(getRecordNum(10));
    console.log(getRecordNum(6));

}