/**
 * シート名からシートを取得する
 * @param {String} sheetName - シート名
 * @return {Sheet} Googleスプレッドシートのシートオブジェクト
 */
 const getSheet = (sheetName) => {
     const ss       = SpreadsheetApp.openById(config.SHEET_ID);
     const sheet    = ss.getSheetByName(sheetName);

    return sheet;
 }