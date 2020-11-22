const testCalcTotalSleepingHours = () => {

    console.log(calcTotalSleepingHours('05:21', 0, 35));
    console.log(calcTotalSleepingHours('05:21', 1, 35));

}

const testCalcSleepingHours = () => {

    console.log(calcSleepingHours(new Date(2020, 10, 17, 00, 00), new Date())); // 月は0起点
    console.log(calcSleepingHours(new Date(2020, 10, 18, 00, 00), new Date())); // 月は0起点
    console.log(calcSleepingHours(new Date(2020, 10, 18, 12, 00), new Date())); // 月は0起点
    console.log(calcSleepingHours(new Date(2020, 10, 18, 14, 00), new Date())); // 月は0起点

}