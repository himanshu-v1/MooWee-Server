const hosts = ['http://localhost:3000'];
const exposedHeaders = ['sessionId', 'set-cookie'];
const allowedHeaders = ['sessionid', 'content-type'];

const setHeaders = (res) => {
    res.header("Access-Control-Allow-Origin", hosts);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Expose-Headers", exposedHeaders);
    res.header("Access-Control-Allow-Headers", allowedHeaders);
};

const setCookieHeader = (res, response) => {
    res.header('set-cookie', `sessionId=${response.insertedId}; Path=/`);
}

export { setHeaders, setCookieHeader };