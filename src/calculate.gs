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
