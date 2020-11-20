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