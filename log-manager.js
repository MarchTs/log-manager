const httpRequest = require("http-requests");
const HttpOption = require("http-options");
const config = require("build-variance");

module.exports.insert3Party = async (
    url = new URL(),
    requestBody = "",
    user_agent = "unknown",
    responseBody = JSON
) => {
    let body = {
        url: url,
        request: requestBody,
        source: config.name,
        user_agent: user_agent,
        response: responseBody.body,
        duration: responseBody.duration + " ms"
    };

    // console.log("log body:", body);
    let logUrl = new URL(config.LOG_THIRD_PARTY_INSERT);
    try {
        let result = await httpRequest(
            logUrl,
            new HttpOption("POST"),
            body
        ).catch(reason => {
            console.log("log error catch:", reason.message);
        });
    } catch (reason) {
        console.log("log error try:", reason.message);
    }
    // console.log("log success:", result);
};

module.exports.insertInfo = async (
    url = new URL(),
    requestBody = "",
    user_agent = "unknown",
    responseBody = JSON
) => {
    let body = {
        url: url,
        request: requestBody,
        source: config.name,
        user_agent: user_agent,
        response: responseBody.body,
        duration: responseBody.duration
    };

    // console.log("log body:", body);
    let logUrl = new URL(config.LOG_INFO_INSERT);
    let result = await httpRequest(logUrl, new HttpOption("POST"), body).catch(
        reason => {
            // console.log("log error:", reason.message);
        }
    );
    // console.log("log success:", result);
};

module.exports.insertDBLog = async (
    storeName = "",
    input = "{}",
    output = "{}",
    dbConfig = "",
    duration = "0"
) => {
    let body = {
        storeName: storeName,
        input: input,
        output: output,
        dbConfig: dbConfig,
        server: config.name,
        duration: duration
    };

    let logUrl = new URL(config.LOG_DB_INSERT);
    let result = await httpRequest(logUrl, new HttpOption("POST"), body).catch(
        reason => {
            // console.log("log error:", reason.message);
        }
    );
    // console.log("log success:", result);
};
