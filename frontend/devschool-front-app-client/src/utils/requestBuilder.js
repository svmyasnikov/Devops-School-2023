import Request from "superagent";

export const request = (method, url) => {
    const request = new Request(method, url);
    return request.type('application/json');
};