const commands = ['ヘルプ', '起床', '就寝', '確認', 'リマインド', 'お問い合わせ'];
var properties = PropertiesService.getScriptProperties();

/**
 * 起床時間を記録する関数
 * @return {Object} - 整形されたテキストメッセージ
 */
const getUp = () => {
  let text, gotobedTime, getupTime, sleepingHours, totalSleepingHours;

  if (isSleep.get() === 'false') {
    text = '既に起床後です';

  } else {
    isSleep.put(false);
    gotobedTime = new Date(bedtime.get());
    getupTime = new Date();

    sleepingHours = calcSleepingHours(gotobedTime, getupTime);

    gotobedTime = arrangeTimeFormat(gotobedTime);
    getupTime = arrangeTimeFormat(getupTime);

    let targetColumn = 2 * (new Date().getDate()) - 1;
    let sheetLastRow = recordSheet.getLastRow();
    let lastRow = findTargetRow(targetColumn, sheetLastRow);

    let recordNum = getRecordNum(lastRow);

    totalSleepingHours = calcTotalSleepingHours(sleepingHours, recordNum, targetColumn);

    let values = [['就寝', gotobedTime], ['起床', getupTime], ['睡眠時間', sleepingHours], ['', ''], ['合計', totalSleepingHours]];

    if (lastRow === 1) {
      recordSheet.getRange(lastRow + 1, targetColumn, 5, 2).setValues(values);
    } else {
      recordSheet.getRange(lastRow, targetColumn, 5, 2).setValues(values);
    }

    let cautionValues = arrangeTotalSleepingHoursFormat(totalSleepingHours);
    cautionSheet.getRange(new Date().getDate(), 2).setValues(cautionValues);

    text = 'おはようございます\n\n睡眠時間は' + sleepingHours + 'でした';
  }

  return arrangeMessageFormat(text);
}

/**
 * 就寝時間を記録する関数
 */
const goToBed = () => {
  let text;

  if (isSleep.get() === 'true') {
    text = '既に睡眠中です';

  } else {
    isSleep.put(true);
    bedtime.put();

    // reminder();

    text = 'おやすみなさい💤';
  }

  return arrangeMessageFormat(text);
}

/**
 * 確認する関数
 */
const confirm = () => {

  let obj = {
    "type": "bubble",
    "body": {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "datetimepicker",
            "label": "日付",
            "data": "date",
            "mode": "date"
          }
        },
        {
          "type": "button",
          "action": {
            "type": "postback",
            "label": "週間",
            "data": "weekly"
            // "displayText": "週間"
          }
        }
      ]
    }
  };
  return arrangeFlexMessageFormat(obj);
}

/**
* リマインドを設定する関数
*/
const remind = () => {

  let obj = {
    "type": "bubble",
    "body": {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "postback",
            "label": "追加",
            "data": "add"
          },
        },
        {
          "type": "button",
          "action": {
            "type": "postback",
            "label": "削除",
            "data": "delete"
          },
        },
        {
          "type": "button",
          "action": {
            "type": "postback",
            "label": "一覧",
            "data": "showAll"
          }
        }
      ]
    }
  }

  return arrangeFlexMessageFormat(obj);
}

/**
* お問い合わせ用のGoogle Form URLを送信する関数
*/
const contact = () => {

  let text = 'こちらのフォームからお問い合わせ下さい。（レビュー、使いにくい点など）'
  return arrangeMessageFormat(text);
}

/**
* ヘルプを表示する関数
*/
const help = () => {

  let text = 'ヘルプ'
  return arrangeMessageFormat(text);
}