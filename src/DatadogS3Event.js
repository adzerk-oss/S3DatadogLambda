var util = require('util');
var dogapi = require("dogapi");

exports.handler = function(event, context) {

  var options = {
    api_key: "$api_key$",
    app_key: "$app_key$"
  };

  dogapi.initialize(options);

  var objectBytes = event.Records[0].s3.object.size;

  var cfg = {
    metric_type: "counter"
  };

  dogapi.metric.send("s3lambda.$metric_name$.bytes", objectBytes, cfg, function(err, res) {
    console.dir(res)
  });

  dogapi.metric.send("s3lambda.$metric_name$.put", 1, cfg, function(err, res) {
    console.dir(res);
  });
};
