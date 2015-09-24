(set-env!
 :dependencies '[[adzerk/boot-template "1.0.0"]]
 :asset-paths #{"lib/"}
 :source-paths #{"src/"})

(require '[adzerk.boot-template :refer [template]])

(deftask build
  "Configure and package this Lambda function."
  [k api-key KEY str "Datadog API key"
   a app-key KEY str "Datadog application key"
   n metric-name NAME str "The metric name to use.  S3 puts bytes will be submitted to Datadog using the name: s3lambda.NAME.{put, bytes}"]
  (assert (and api-key app-key metric-name) "api-key, app-key, and metric-name are required")
  (let [zip-name (format "S3DatadogLambda-%s.zip" metric-name)]
    (comp
     (template :paths ["index.js"]
               :subs {"api_key" api-key
                      "app_key" app-key
                      "metric_name" metric-name})
     (zip :file zip-name)
     (sift :include #{#"^.*zip"}))))
