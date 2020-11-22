const testCaution = () => {

    console.log('testfetchcautiondata-----------\n');
    testFetchCautionData();
    console.log('testfetchtodaystimeofsleeping------------\n');
    testFetchTodaysTimeOfSleeping();
    console.log('testinspectsleepinghours\n');
    testInspectSleepingHours();

}

const testInspectSleepingHours = () => {

    console.log(inspectSleepingHours(['6時間未満', 3], 4)); //['6時間未満', 4]
    console.log(inspectSleepingHours(['6時間未満', 3], 7)); //['健康', 1]
    console.log(inspectSleepingHours(['9時間以上', 3], 9)); //['9時間以上', 4]
    console.log(inspectSleepingHours(['9時間以上', 3], 7)); //['健康', 1]
    console.log(inspectSleepingHours(['健康', 3], 7));      //['健康', 4]
    console.log(inspectSleepingHours(['健康', 3], 4));      //['6時間未満', 1]
    console.log(inspectSleepingHours(['健康', 3], 10));     //['9時間以上', 1]

}

const testFetchCautionData = () => {

    console.log(fetchCautionData());
}

const testFetchTodaysTimeOfSleeping = () => {

    console.log(fetchTodaysTimeOfSleeping());
}

