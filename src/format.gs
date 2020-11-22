const arrangeMessageFormat = (text) => {

    return {
        "type":"text",
        "text": text
    };
}

const arrangeImageFormat = (originalContetUrl, previewImageUrl) => {

    return {
        "type": "image",
        "originalContentUrl": originalContetUrl,
        "previewImageUrl": previewImageUrl
    };
}

const arrangeTotalSleepingHoursFormat = (totalSleepingHours) => {
    let cautionValues = [];
    let list = totalSleepingHours.split(':');
    let val  = list[0] + '時間' + list[1] + '分';
    cautionValues.push([val]);

    return cautionValues;
}

const arrangeTimeFormat = (time) => {
  let hour = time.getHours().toString().padStart(2, '0');
  let minite = time.getMinutes().toString().padStart(2, '0');

  return hour + ':' + minite;
}

/**
 * @param {Object} flexMessage
 */
const arrangeFlexMessageFormat = (flexMessage) => {

    return {
        "type": "flex",
        "altText": "This is a Flex Message",
        "contents": flexMessage
    };
}