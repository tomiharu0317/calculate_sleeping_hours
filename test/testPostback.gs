const testFinalCheck = () => {
  console.log(finalCheck('リマインドイベント'));
};

const testConfirmDate = () => {
  console.log(confirmDate('2020-11-23'));
  console.log(confirmDate('2020-11-24'));
  console.log(confirmDate('2020-11-01'));
  console.log(confirmDate('2020-11-02'));
  console.log(confirmDate('2020-11-03'));
};

const testArrangeRecordedSleepingTimeFormat = () => {
  let timeList = recordSheet.getRange(14, 2).getValues();
  console.log(arrangeRecordedSleepiingTimeFormat(timeList[0][0]));
};

const testAddSleepTimesToObj = () => {
  let sleepingTimesObj = {
    type: 'bubble',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '11月dd日の睡眠',
          weight: 'bold',
          size: '18px',
        },
      ],
      height: '40px',
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
          text: '08:03',
          weight: 'bold',
        },
      ],
    },
  };

  console.log(addSleepingTimesToObj(sleepingTimesObj, 3, 1));
};

const testArrangeSleeppingRecordToObj = () => {
  let sleepRecord = recordSheet.getRange(2, 1, 3, 2).getValues();

  console.log(sleepRecord);
  console.log(arrangeSleepingRecordToObj(sleepRecord, 1));
};

const testFetchSleepRecord = () => {
  let sleepRecord;

  for (let recordIndex = 1; recordIndex < 3 + 1; recordIndex++) {
    sleepRecord = recordSheet
      .getRange(4 * recordIndex - 2, 2, 3, 2)
      .getValues();

    console.log(sleepRecord);
  }
};
