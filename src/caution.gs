/**
 * 今日までの睡眠時間を検査して異常があればその日の決まった時間に警告
 */
const caution = () => {
  [type, consecutiveDays] = inspectSleepingHours(
    fetchCautionData(),
    fetchTodaysTimeOfSleeping()
  );

  cautionSheet.getRange(2, 4, 1, 2).setValues([[type, consecutiveDays]]);

  if (type !== '健康' && consecutiveDays >= 3) {
    let message =
      consecutiveDays.toString() + '日間連続で' + type + 'の睡眠です';

    let pushMessageObj = {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '注意',
            color: '#f54242',
            weight: 'bold',
            size: '20px',
            align: 'center',
          },
        ],
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: message,
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '健康にお気を付けください',
          },
        ],
        paddingAll: '20px',
      },
    };
    let pushMessage = [[1, pushMessageObj]];
    push(pushMessage);
  }
};

/**
 * cautionSheetから睡眠の質と連続日数を取り出し、吐き出す
 * @return {Array} [type, consecutiveDays]
 */
const fetchCautionData = () => {
  //[['睡眠時間', '連続日数'], ['6時間未満', '6']]
  let cautionList = cautionSheet.getRange(2, 4, 1, 2).getValues();
  let type = cautionList[0][0];
  let consecutiveDays = Number(cautionList[0][1]);

  return [type, consecutiveDays];
};

/**
 * cautionSheetから(昨日-今日)の睡眠時間を取り出し、吐き出す
 * @return {String} timeOfSleeping
 */
const fetchTodaysTimeOfSleeping = () => {
  let date = new Date().getDate();

  //[['07時間29分']]
  let timeOfSleeping = cautionSheet.getRange(date, 2).getValues();
  timeOfSleeping = timeOfSleeping[0][0];

  let hours = Number(timeOfSleeping.split('時間')[0]);

  return hours;
};

/**
 * @param {Array} - [type, consecutiveDays]
 * @param {Number} hours 睡眠時間（時間だけ、分なし）
 * @return {Array} [type, consecutiveDays](検査対象の睡眠時間を検査した結果)
 */
const inspectSleepingHours = (cautionData, hours) => {
  let [type, consecutiveDays] = cautionData;

  if (type === '6時間未満' && hours < 6) {
    consecutiveDays++;
  } else if (type === '9時間以上' && hours >= 9) {
    consecutiveDays++;
  } else if (type === '健康' && 5 <= hours && hours < 9) {
    consecutiveDays++;
  } else {
    consecutiveDays = 1;

    if (hours < 6) {
      type = '6時間未満';
    } else if (hours >= 9) {
      type = '9時間以上';
    } else {
      type = '健康';
    }
  }

  return [type, consecutiveDays];
};
