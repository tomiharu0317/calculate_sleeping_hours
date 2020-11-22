
/**
 * postback.datetimeを受け取ってその日の睡眠時間を返す
 * @param {String} date
 */
const confirmDate = (date) => {

    return arrangeMessageFormat('確認日付\n' + date);
}

/**
 * 過去7日間の睡眠時間とグラフを返す
 */
const confirmWeekly = () => {

    return arrangeMessageFormat('確認週間');
}

/**
 * 次のpostbackで設定
 */
const addRemind = () => {

    return arrangeMessageFormat('リマインド追加');
}

/**
 * リマインド一覧と削除ボタンをflex messageで返す
 */
const deleteRemind = () => {

    return arrangeMessageFormat('リマインド削除');
}

/**
 * リマインド一覧を表示
 */
const showAllRemind = () => {

    return arrangeMessageFormat('リマインド一覧');
}