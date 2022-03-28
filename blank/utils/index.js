var Config = require('../config/index.js');

function baseRequest (url, method, params,successCallback, failCallback,urlProps) {
  let env = Config.environment;
  let domainData = Config[env];
  console.log(domainData);
  tt.showLoading({mask:true,title:'加载中...'});
  tt.request({
    "url": `${domainData.domain}/${url}`,
    "data": params,
    "header": {
        "content-type": "application/json"
    },
    "method": method.toUpperCase() || 'GET',
    "dataType": "json",
    "responseType": "text",
    success(res) {
      successCallback && successCallback(res);
      tt.hideLoading();
    },
    fail(res) {
      failCallback && failCallback(res);
    }
})
}

var Tools = {
  baseRequest: baseRequest,
}
module.exports = Tools