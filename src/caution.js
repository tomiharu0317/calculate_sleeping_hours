
const caution = () => {
    let date = new Date().getDate() - 1;

    let timeOfSleeping = cautionSheet.getRange(date, 2).getValues();
    let cautionList    = cautionSheet.getRange(2, 4, 1, 2).getValues();

    let hours = Number(timeOfSleeping.split('時間')[0]);
    let type = cautionList[0][0];
    let consecutiveDays = Number(cautionList[0][1]);

    [type, consecutiveDays] = inspectSleepingHours(type, consecutiveDays);

    cautionSheet.getRange(2, 4, 1, 2).setValues([[type, consecutiveDays]]);

    if (type !== '健康' && consecutiveDays >= 3) {
        push();
    }
}

const inspectSleepingHours = (type, consecutiveDays) => {

    if (type === '6時間未満' && hours < 6) {
        consecutiveDays ++;
    } else if (type === '9時間以上' && hours >= 9) {
        consecutiveDays ++;
    } else if (type === '健康' && 5 <= hours && hours < 9) {
        consecutiveDays ++;
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
}

