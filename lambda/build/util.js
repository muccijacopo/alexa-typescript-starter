"use strict";
var AWS = require("aws-sdk");
var s3SigV4Client = new AWS.S3({
    signatureVersion: "v4",
    region: process.env.S3_PERSISTENCE_REGION,
});
module.exports.getS3PreSignedUrl = function getS3PreSignedUrl(s3ObjectKey) {
    var bucketName = process.env.S3_PERSISTENCE_BUCKET;
    var s3PreSignedUrl = s3SigV4Client.getSignedUrl("getObject", {
        Bucket: bucketName,
        Key: s3ObjectKey,
        Expires: 60 * 1,
    });
    console.log("Util.s3PreSignedUrl: " + s3ObjectKey + " URL " + s3PreSignedUrl);
    return s3PreSignedUrl;
};
