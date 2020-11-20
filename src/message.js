const createFlexMessage = (layout, obj) => {

    return [
        {
          "type": "flex",
          "altText": "This is a Flex Message",
          "contents": {
            "type": "bubble",
            "body": {
              "type": "box",
              "layout": layout,
              "contents": [
                  createButton(type, label, data),
                  createButton(type, label, data)
              ]
            }
          }
        }
    ];
}

const createButton = (type, label, data) => {

    let obj = {
        "type": "button",
        "action": {
          "type": type,
          "label": label,
          "data": data
        }
    }

    if (type === 'datetimepicker') {
        obj["mode"] = "date";
    }

    return obj;
}

const createFlexMessageOptionObj = (name, type, label, data) => {

    return {name : {
        "type": type,
        "label": label,
        "data": data
    }};
}

obj = {
    "one" : {
        "type" : "postback",
        "label": ""

    }
}