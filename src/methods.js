var properties = PropertiesService.getScriptProperties();

const userId = {
    get() {
      return properties.getProperty('sleep');
    },
    put(e) {
      let userId = JSON.parse(e.postData.contents).events[0].source.userId;
      properties.setProperty('userId', userId);
    }
};

const isSleep = {
    get() {
      return properties.getProperty('sleep');
    },
    put(bool) {
      properties.setProperty('sleep', bool);
    }
  };

const bedtime = {
    get() {
      return properties.getProperty('bedtime');
    },
    put() {
      properties.setProperty('bedtime', new Date().toString());
    }
};

const handleLastMessage = {
    getLast() {
      return properties.getProperty('lastMessage');
    },
    getBeforeLast() {
      return properties.getProperty('beforeLastMessage');
    },
    put(userMessage) {
      let lastMessage = properties.getProperty('lastMessage');

      properties.setProperty('beforeLastMessage', lastMessage);
      properties.setProperty('lastMessage', userMessage);
    }
};

const handleEventType = {
  getLast() {
    return properties.getProperty('lastEventType');
  },
  getBeforeLast() {
    return properties.getProperty('beforeLastEventType');
  },
  put(eventType) {
    let lastEventType = properties.getProperty('lastEventType');

    properties.setProperty('beforeLastEventType', lastEventType);
    properties.setProperty('lastEventType', eventType);
  }
}