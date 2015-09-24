var async  = require('async');
var util   = require('util');
var dogapi = require("dogapi");

exports.handler = function(event, context) {

  var options = {
    api_key: "$api_key$",
    app_key: "$app_key$"
  };

  dogapi.initialize(options);

  var objectBytes = event.Records[0].s3.object.size;
  var eventType   = event.Records[0].eventName.indexOf("ObjectDeleted") < 0 ? "created" : "deleted";

  var cfg = {
    metric_type: "counter"
  };

  async.series([
    function(callback) {
      dogapi.metric.send("s3lambda.$metric_name$. " + eventType + ".bytes", objectBytes, cfg, callback);
    },
    function(callback) {
      dogapi.metric.send("s3lambda.$metric_name$. " + eventType + ".put", 1, cfg, callback);
    },
    function(callback) {
      context.succeed("ok");
    }]);
};
