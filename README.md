# S3 Put to Datadog Lambda Function

This [Boot](http://boot-clj.com) project builds instances of a node.js Lambda function for sending S3 events to Datadog.

# Usage

Create an instance of the function:

    boot build -k DATADOG_API_KEY -a DATADOG_APP_KEY -n somelog

* **DATADOG_API_KEY** is the Datadog API key for the account.
* **DATADOG_APP_KEY** is a key identifying this particular application.
* **somelog** is the name of the metric to report.  Two metrics are reported for every S3 put event, put and bytes.  The metrics for this application instance will be:
  1. `s3lambda.somelog.put` - sent once per S3 event
  2. `s3lambda.somelog.bytes` - sent with the number of bytes in the object that was put

Then, deploy the zip file in `target/` to Amazon.

Finally, in the S3 interface, send Put events to the deployed lambda function.
