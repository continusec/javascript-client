Get started by creating a ContinusecClient.

For example:

    var client = new ContinusecClient("<your account number>", "<your secret key>");
    var log = client.getVerifiableLog("myfirstlog");
    log.create(function () {
        console.log("Success.");
    }, function (reason) {
        console.log("Failed:", reason);
    });
