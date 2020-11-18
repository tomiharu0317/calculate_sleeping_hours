const getSheet = (sheetName) => {
    const sheet = SpreadsheetApp.openById(config.SHEET_ID);
    const ss    = sheet.getSheetByName(sheetName);
    return ss;
}

const getRecordSheetName = () => {

    let monthList = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];

    let date = new Date();

    let recordSheetName = monthList[date.getMonth()] + date.getFullYear().toString()

    return recordSheetName;
}

const recordSheet = getSheet(getRecordSheetName());
const remindSheet = getSheet('remind');
const cautionSheet = getSheet('caution');

/**
 * 指定範囲の最終行を取得
 * @param {Number} targetColumn
 * @param {Number} sheetLastRow
 */
const findTargetRow = (targetColumn, sheetLastRow) => {

    // [['11/1'], ['就寝'], ['起床'], ['睡眠時間'], [''], ['合計']];
    let values = recordSheet.getRange(1, targetColumn, sheetLastRow, 1).getValues();
    let targetRow;

    for (i = 0; i < sheetLastRow; i++) {
        if (values[i][0] === '合計') {
            targetRow = i + 1;
            break;
        }
    }

    if (targetRow == null) {
        targetRow = 1;
    }

    return targetRow;
}

const getRecordNum = (lastRow) => {

    if (lastRow === 1) {
        return 0;
    } else {
        // 4k + 2 = lastRow
        // k = (lastRow - 2) / 4;
        return (lastRow - 2) / 4;
    }
}