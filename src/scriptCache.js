// const makeCache = () => {
//     const cache = CacheService.getScriptCache();
//     return {
//       get: function(key) {
//         return JSON.parse(cache.get(key));
//       },
//       put: function(key, value, sec) {
//         //リファレンスよりcache.putの3つ目の引数は省略可。
//         //デフォルトでは10分間（600秒）保存される。最大値は6時間（21600秒）
//         cache.put(key, JSON.stringify(value), (sec === undefined) ? 600 : sec);
//         return value;
//       }
//     };
//   }

const setLastMessage = (userMessage) => {
    var properties = PropertiesService.getScriptProperties();

    let lastMessage = properties.getProperty('lastMessage');

    properties.setProperty('beforeLastMessage', lastMessage);
    properties.setProperty('lastMessage', userMessage);
};
