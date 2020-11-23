/**
 * postback.datetimeを受け取ってその日の睡眠時間を返す
 * @param {String} date
 */
const confirmDate = (date) => {
  return arrangeMessageFormat('確認日付\n' + date);
};

/**
 * 過去7日間の睡眠時間とグラフを返す
 */
const confirmWeekly = () => {
  return arrangeMessageFormat('確認週間');
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
