# S3 Put to Datadog Lambda Function

This [Boot](http://boot-clj.com) project builds instances of a node.js Lambda function for sending S3 events to Datadog.

# Usage

Create an instance of the function:

    boot build -k DATADOG_API_KEY -a DATADOG_APP_KEY -n somename

* **DATADOG_API_KEY** is the Datadog API key for the account.
* **DATADOG_APP_KEY** is a key identifying this particular application.
* **somename** is the name of the metric to report.  created and removed metrics are reported for every S3 event.  The metrics for this application instance will be:
  1. `s3lambda.somename.created`
  1. `s3lambda.somename.created.bytes`
  1. `s3lambda.somename.removed`
  1. `s3lambda.somename.removed.bytes`

Then, deploy the zip file in `target/` to Amazon.

Finally, in the S3 interface, wire events to the deployed lambda function.
