// const hosts = ['http://localhost:3000', 'https://moowee-client-439014673656.us-central1.run.app'];
const corsOptions = {
    cors: ['http://localhost:3000', 'https://moowee-client-439014673656.us-central1.run.app'],
    optionSuccessStatus: 200 //legacy
};  //app.use(cors(corsOptions));

const exposedHeaders = ['sessionId', 'set-cookie'];
const allowedHeaders = ['sessionid', 'content-type'];

const setHeaders = (req, res) => {
    const origin = corsOptions.cors.includes(req.header('origin').toLowerCase()) ? req.headers.origin : corsOptions.cors[0];
    res.header("Access-Control-Allow-Origin", origin);
    // res.header("Access-Control-Allow-Origin", hosts);
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

const getUserAgentHeader = () => {
    return {
        headers: {
            'User-Agent': 'MooWee/1.0 (https://github.com/himanshu-v1/MooWee-Server; shimanshu545@gmail.com)',
            'Accept-Language': 'en-US,en;q=0.9',
        },
    };
}

export { setHeaders, setCookieHeader, getUserAgentHeader };