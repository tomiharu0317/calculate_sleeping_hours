/**
 * postback.datetimeを受け取ってその日の睡眠時間を返す
 * @param {String} date YYYY-MM-DD
 * @return {Object} flexMessageObject
 */
const confirmDate = (date) => {
  let dateList = date.split('-');
  let year = dateList[0];
  let month = dateList[1];
  let day = Number(dateList[2]);
  let targetColumn = 2 * day - 1;

  let lastRow = findTargetRow(targetColumn, recordSheet.getLastRow());
  let recordNum = getRecordNum(lastRow);

  if (recordNum === 0) {
    return arrangeMessageFormat('記録はありません');
  }

  let totalSleepingTimes = recordSheet
    .getRange(lastRow, targetColumn + 1)
    .getValues();
  totalSleepingTimes = arrangeRecordedSleepiingTimeFormat(
    totalSleepingTimes[0][0]
  );

  let sleepingTimesObj = {
    type: 'bubble',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: year + '年' + month + '月' + day.toString() + '日の睡眠',
          weight: 'bold',
          size: '18px',
        },
      ],
      height: '70px',
    },
    hero: {
      type: 'box',
      layout: 'vertical',
      contents: [],
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [],
    },
    footer: {
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'text',
          text: '合計睡眠時間',
          weight: 'bold',
          size: '14px',
          margin: '10px',
        },
        {
          type: 'text',
          text: totalSleepingTimes,
          weight: 'bold',
        },
      ],
    },
  };

  sleepingTimesObj = addSleepingTimesToObj(
    sleepingTimesObj,
    recordNum,
    targetColumn
  );

  return arrangeFlexMessageFormat(sleepingTimesObj);
};

/**
 * それぞれの[就寝、起床、睡眠時間]をflexMessageのObjに追加する
 * @param {Obj} sleepingTimesObj
 * @param {Number} recordNum
 * @param {Number} targetColumn
 */
const addSleepingTimesToObj = (sleepingTimesObj, recordNum, targetColumn) => {
  let sleepRecord;

  for (let recordIndex = 1; recordIndex < recordNum + 1; recordIndex++) {
    // [['就寝', 'date'], ['起床', 'date'], ['睡眠時間', 'date']];
    sleepRecord = recordSheet
      .getRange(4 * recordIndex - 2, targetColumn, 3, 2)
      .getValues();

    sleepRecord = arrangeSleepingRecordToObj(sleepRecord, recordIndex);
    sleepingTimesObj.body.contents.push(sleepRecord);
  }

  return sleepingTimesObj;
};

/**
 * 過去7日間の睡眠時間とグラフを返す
 */
const confirmWeekly = () => {
  const date = new Date();
  const weeklyReportObj = fetchWeekSleepingTime(date.getDay(), date.getDate());
  return arrangeFlexMessageFormat(weeklyReportObj);
};

/**
 * messageを受け取って設定
 */
const addRemind = (remindMessage) => {
  let lastRow = remindSheet.getLastRow();

  remindSheet.getRange(lastRow + 1, 1).setValues([[remindMessage]]);
  return arrangeMessageFormat(remindMessage + '\n\nを追加しました');
};

/**
 * リマインド一覧と削除ボタンをflex messageで返す
 */
const deleteRemind = () => {
  return arrangeMessageFormat('リマインド削除');
};

/**
 * リマインド一覧を表示
 */
const showAllRemind = () => {
  let lastRow = remindSheet.getLastRow();

  if (lastRow === 1) {
    return arrangeMessageFormat('現在登録されているリマインドはありません');
  }

  let remindListObj = {
    type: 'bubble',
    hero: {
      type: 'box',
      layout: 'vertical',
      contents: [],
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'リマインド一覧',
          size: '18px',
          weight: 'bold',
          margin: '10px',
        },
      ],
    },
  };

  // [['リマインド'], ['リマインド2']];
  let remindList = remindSheet.getRange(2, 1, lastRow - 1, 1).getValues();
  remindListObj = addRemindToRemindListObj(remindListObj, remindList);
  return arrangeFlexMessageFormat(remindListObj);
};

/**
 * リマインドリストからひとつひとつをobjに整形してremindListObjに入れる
 * @param {Object} remindListObj
 * @param {Array} remindList
 */
const addRemindToRemindListObj = (remindListObj, remindList) => {
  let remind, obj;
  for (let i = 0; i < remindList.length; i++) {
    remind = remindList[i][0];
    obj = arrangeRemindFormat(remind);

    remindListObj.body.contents.push(obj);
  }

  return remindListObj;
};

/**
 * messageを削除/追加していいか確認
 * @param {String} message
 */
const finalCheck = (message) => {
  let text;

  if (handleLastMessage.getLast() === 'add') {
    text = 'を追加しますか？';
  } else {
    text = 'を削除しますか？';
  }

  let obj = {
    type: 'bubble',
    direction: 'ltr',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: message,
          align: 'center',
          offsetTop: '20px',
          wrap: true,
        },
      ],
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: text,
          align: 'center',
          offsetTop: '10px',
        },
      ],
      height: '70px',
    },
    footer: {
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'button',
          action: {
            type: 'postback',
            data: 'yes',
            label: 'はい',
          },
          color: '#1dcd00',
          style: 'primary',
        },
        {
          type: 'button',
          action: {
            type: 'postback',
            label: 'いいえ',
            data: 'no',
          },
          style: 'primary',
          color: '#f02011',
          margin: '10px',
        },
      ],
    },
  };

  return arrangeFlexMessageFormat(obj);
};
