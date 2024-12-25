"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpdateUserInfo = exports.setSessionKey = exports.getSessionKey = exports.isUserLogin = exports.getUserInfo = exports.setLoginInfo = void 0;
const setLoginInfo = function (req, userInfo) {
    req.session.isLogin = true;
    req.session.userInfo = userInfo;
};
exports.setLoginInfo = setLoginInfo;
const getUserInfo = function (req) {
    if (req.session.isLogin) {
        return req.session.userInfo;
    }
    else {
        return {};
    }
};
exports.getUserInfo = getUserInfo;
const isUserLogin = function (req) {
    return req.session.isLogin ? req.session.isLogin : false;
};
exports.isUserLogin = isUserLogin;
const setUpdateUserInfo = function (req, userInfo) {
    req.session.userInfo = userInfo;
};
exports.setUpdateUserInfo = setUpdateUserInfo;
const getSessionKey = function (req) {
    return req.session['onceKey'];
};
exports.getSessionKey = getSessionKey;
const setSessionKey = function (req, onceKey) {
    req.session['onceKey'] = onceKey;
};
exports.setSessionKey = setSessionKey;
const getTimeDiffByMin = (_prevTime) => {
    const createTime = new Date(_prevTime);
    const currentTime = new Date();
    const diffMSec = currentTime.getTime() - createTime.getTime();
    const diffMin = diffMSec / (60 * 1000);
    return diffMin;
};
