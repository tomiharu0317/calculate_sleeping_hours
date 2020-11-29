const arrangeMessageFormat = (text) => {
  return {
    type: 'text',
    text: text,
  };
};

const arrangeImageFormat = (originalContetUrl, previewImageUrl) => {
  return {
    type: 'image',
    originalContentUrl: originalContetUrl,
    previewImageUrl: previewImageUrl,
  };
};

const arrangeTotalSleepingHoursFormat = (totalSleepingHours) => {
  let cautionValues = [];
  let list = totalSleepingHours.split(':');
  let val = list[0] + '時間' + list[1] + '分';
  cautionValues.push([val]);

  return cautionValues;
};

const arrangeTimeFormat = (time) => {
  let hour = time.getHours().toString().padStart(2, '0');
  let minite = time.getMinutes().toString().padStart(2, '0');

  return hour + ':' + minite;
};

/**
 * @param {Object} flexMessage
 */
const arrangeFlexMessageFormat = (flexMessage) => {
  return {
    type: 'flex',
    altText: 'Flex message',
    contents: flexMessage,
  };
};

const arrangeRemindFormat = (remind) => {
  return {
    type: 'text',
    text: '・' + remind,
    margin: '10px',
    wrap: true,
  };
};

const wantToDeleteRemindFormat = (remind, index) => {
  return {
    type: 'box',
    layout: 'horizontal',
    contents: [
      {
        type: 'text',
        text: remind,
        gravity: 'center',
        wrap: true,
      },
      {
        type: 'button',
        action: {
          type: 'postback',
          label: '選択',
          data: index + '. ' + remind,
        },
        style: 'primary',
        height: 'sm',
        margin: '30px',
        gravity: 'center',
        adjustMode: 'shrink-to-fit',
      },
    ],
    height: '70px',
  };
};

/**
 * おかしな時間で計測された(spreadsheetの仕様)時間を整形して吐く
 * @param {String} sleepingTimes
 * @return {String} 'HH:MM'
 */
const arrangeRecordedSleepiingTimeFormat = (sleepingTimes) => {
  // date型を文字列にしたやつで持ってくるからsplit()できない [ [ Sat Dec 30 1899 12:34:00 GMT+0900 (日本標準時) ] ]
  sleepingTimes = new Date(sleepingTimes);

  let hours = sleepingTimes.getHours();
  let minutes = sleepingTimes.getMinutes();

  return (
    hours.toString().padStart(2, '0') +
    ':' +
    minutes.toString().padStart(2, '0')
  );
};

/**
 * [['就寝', 'date'], ['起床', 'date'], ['睡眠時間', 'date']]をObjにして返す
 * @param {Array} sleepRecord
 * @param {Number} recordIndex 何回目の睡眠か
 */
const arrangeSleepingRecordToObj = (sleepRecord, recordIndex) => {
  let sleepRecordObj = {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: recordIndex.toString() + '.',
      },
    ],
    height: '110px',
  };

  let text, time, obj;

  for (let i = 0; i < 3; i++) {
    text = sleepRecord[i][0];
    time = arrangeRecordedSleepiingTimeFormat(sleepRecord[i][1]);

    obj = {
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'text',
          text: text,
        },
        {
          type: 'text',
          text: time,
        },
      ],
    };

    sleepRecordObj.contents.push(obj);
  }

  return sleepRecordObj;
};
