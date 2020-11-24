const testFetchWeekSleepingTime = () => {
  console.log(fetchWeekSleepingTime(2, 24));
  //   console.log(fetchWeekSleepingTime(2, 22));
  //   console.log(fetchWeekSleepingTime(2, 23));
  //   console.log(fetchWeekSleepingTime(2, 25));
};

const testAddDayOfWeekAndSleepTimeToObj = () => {
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

  console.log(addDayOfWeekAndSleepTimeToObj(weeklyReportObj, '水', ['25', '']));
};
