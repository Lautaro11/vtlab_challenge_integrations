export default (statusCode, message) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(message),
    };
};