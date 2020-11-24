const weeklyReport = () => {
  const date = new Date();
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];

  if (dayOfWeek === '日') {
    let weeklyReportObj = fetchWeekSleepingTime(date.getDay(), date.getDate());
    return push([[1, weeklyReportObj]]);
  }
};

/**
 * 過去7日間の睡眠時間を吐く
 * @param {Number} dayOfWeekNum この関数を呼び出した曜日の数字
 * @param {Number} day この関数を呼び出した日付
 */
const fetchWeekSleepingTime = (dayOfWeekNum, day) => {
  let dayOfWeek;
  let weeklyReportObj = {
    type: 'bubble',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '過去7日間の睡眠',
          size: '18px',
          weight: 'bold',
        },
      ],
      height: '70px',
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [],
    },
  };

  //   [['20', '07時間23分'], ['21', '08時間42分'], ...];
  let weeklySleepTimeList = cautionSheet.getRange(day - 7, 1, 7, 2).getValues();

  for (let i = 0; i < 7; i++) {
    dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][dayOfWeekNum % 7];
    weeklyReportObj = addDayOfWeekAndSleepTimeToObj(
      weeklyReportObj,
      dayOfWeek,
      weeklySleepTimeList[i]
    );

    dayOfWeekNum++;
  }

  return weeklyReportObj;
};

/**
 *
 * @param {Object} weeklyReportObj　報告用オブジェクト
 * @param {String} dayOfWeek 曜日の文字列
 * @param {Array} param2 [日付の文字列, 睡眠時間の文字列]
 */
const addDayOfWeekAndSleepTimeToObj = (
  weeklyReportObj,
  dayOfWeek,
  [dayStr, sleepTimeStr]
) => {
  let month = (new Date().getMonth() + 1).toString();

  if (sleepTimeStr === '') {
    sleepTimeStr = '記録なし';
  }

  let obj = {
    type: 'box',
    layout: 'horizontal',
    contents: [
      {
        type: 'text',
        text: month + '/' + dayStr + '(' + dayOfWeek + ')',
      },
      {
        type: 'text',
        text: sleepTimeStr,
      },
    ],
  };

  weeklyReportObj.body.contents.push(obj);

  return weeklyReportObj;
};

const isBlankCell = () => {
  let blankCell = cautionSheet.getRange(15, 3).getValues();
  console.log(blankCell);
  console.log(blankCell[0][0]);
  console.log(blankCell[0][0] == null);
  console.log(blankCell[0][0] === '');
};
