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

    text = 'おはようございます\n\n睡眠時間は' + sleepingHours + 'でした';
  }

  return arrangeMessageFormat(text);
}

const calcTotalSleepingHours = (sleepingHours, recordNum, targetColumn) => {

  if (recordNum === 0) {
    return sleepingHours;
  } else {
    // '-----------------------------------------------------------------------------'
    let totalHours   = Number(sleepingHours.split(':')[0]);
    let totalMinutes = Number(sleepingHours.split(':')[1]);
    let sleepingTimes;

    for (let k = 1; k < recordNum + 1; k++) {
      // [['08:43']];

      // date型を文字列にしたやつで持ってくるからsplit()できない [ [ Sat Dec 30 1899 12:34:00 GMT+0900 (日本標準時) ] ]
      sleepingTimes = recordSheet.getRange(4*k, targetColumn+1).getValues();
      sleepingTimes = new Date(sleepingTimes[0][0]);

      totalHours   += sleepingTimes.getHours();
      totalMinutes += sleepingTimes.getMinutes();
    }

    totalHours   += Math.floor(totalMinutes / 60);
    totalMinutes %= 60;

    totalHours   = totalHours.toString().padStart(2, '0');
    totalMinutes = totalMinutes.toString().padStart(2, '0');

    return totalHours + ':' + totalMinutes;
    // '-----------------------------------------------------------------------------'
  }
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

const arrangeTimeFormat = (time) => {
  let hour = time.getHours().toString().padStart(2, '0');
  let minite = time.getMinutes().toString().padStart(2, '0');

  return hour + ':' + minite;
}

/**
 * 就寝時間と起床時間を受け取って、睡眠時間を吐く
 * @param {Object} gotobedTime
 * @param {Object} getupTime
 * @return {String}
 */
const calcSleepingHours = (gotobedTime, getupTime) => {

  let timeDiff = getupTime.getTime() - gotobedTime.getTime();

  let sleepingMinutes = Math.floor(timeDiff / (1000 * 60));
  let sleepingHours   = Math.floor(timeDiff / (1000 * 60 * 60));

  let minites = Math.floor(((sleepingMinutes / 60) - sleepingHours) * 60);

  sleepingHours = sleepingHours.toString().padStart(2, '0');
  minites = minites.toString().padStart(2, '0');

  return sleepingHours + ':' + minites;
}

const isSleep = {
  get() {
    return properties.getProperty('sleep');
  },
  put(bool) {
    properties.setProperty('sleep', bool);
  }
};

const bedtime = {
  get() {
    return properties.getProperty('bedtime');
  },
  put() {
    properties.setProperty('bedtime', new Date().toString());
  }
};

/**
 * 確認する関数
 */
const confirm = () => {
    return [
        {
          "type": "flex",
          "altText": "This is a Flex Message",
          "contents": {
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
          }
        }
    ];
}

/**
 * リマインドを設定する関数
 */
const remind = () => {
    return [
        {
          "type": "flex",
          "altText": "This is a Flex Message",
          "contents": {
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
        }
    ];
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