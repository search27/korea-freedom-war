"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerUtils = void 0;
const SessionController_1 = require("../session/SessionController");
const axios = require('axios');
const RXG = require('../../libs/RXG.js').RXG;
class ServerUtils {
    constructor() {
        this.getPaymentOrderId = function (type) {
            const uuidv4 = () => {
                return `xxxxxxxx-${type}-RSxxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            };
            return uuidv4();
        };
        this.getFullDateFromDate = function (d, isUtc) {
            if (isUtc) {
                return d.getUTCFullYear() + '/'
                    + ((d.getUTCMonth() + 1) < 10 ? '0' + (d.getUTCMonth() + 1) : (d.getUTCMonth() + 1))
                    + '/'
                    + (d.getUTCDate() < 10 ? '0' + d.getUTCDate() : d.getUTCDate())
                    + ' '
                    + (d.getUTCHours() < 10 ? '0' + d.getUTCHours() : d.getUTCHours()) + ':'
                    + (d.getUTCMinutes() < 10 ? '0' + d.getUTCMinutes() : d.getUTCMinutes());
            }
            else {
                return d.getFullYear() + '/'
                    + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1))
                    + '/'
                    + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate())
                    + ' '
                    + (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
            }
        }.bind(this);
        this.getXHREncoder = (data) => __awaiter(this, void 0, void 0, function* () {
            const compData = RXG.Util.Base64.encode(encodeURI(JSON.stringify(data)));
            return compData;
        });
        this.callXHRParser = (data) => __awaiter(this, void 0, void 0, function* () {
            const decData = decodeURI(RXG.Util.Base64.decode(data));
            return JSON.parse(decData);
        });
        this.isRxStoreAccessKey = (req) => __awaiter(this, void 0, void 0, function* () {
            const onceKey = (0, SessionController_1.getSessionKey)(req);
            const accessKey = req.get('cloud-rx-store-access');
            if (!onceKey)
                return false;
            if (!accessKey)
                return false;
            if (onceKey === accessKey)
                return true;
            else
                return false;
        });
        this.isAccessChecker = (req, origins) => __awaiter(this, void 0, void 0, function* () {
            const header = yield this.getHeader(req);
            // const referer = header['referer'];
            const host = header['host'];
            let isOkay = false;
            if (host.indexOf('localhost') === -1) {
                // if(!referer) return false;
                // Product
                for (let i = 0; i < origins.length; i++) {
                    if (host.indexOf(origins[i]) !== -1) {
                        isOkay = true;
                        break;
                    }
                }
            }
            else { // Localhost
                for (let i = 0; i < origins.length; i++) {
                    if (host.indexOf(origins[i]) !== -1) {
                        isOkay = true;
                        break;
                    }
                }
                return isOkay;
            }
        });
        this.isMobile = (userAgent) => {
            const reg = /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricssonLG|SAMSUNG|Samsung/gi;
            if (userAgent) {
                if (userAgent.match(reg) !== null) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        };
        this.getBrowser = function (userAgent) {
            const newUserAgent = userAgent.toLowerCase();
            if (newUserAgent.indexOf('whale') !== -1)
                return 'naver whale';
            if (newUserAgent.indexOf('opr') !== -1)
                return 'opera';
            if (newUserAgent.indexOf('fxios') !== -1)
                return 'firefox';
            if (newUserAgent.indexOf('firefox') !== -1)
                return 'firefox';
            if (newUserAgent.indexOf('edg') !== -1)
                return 'microsoft edge';
            if (newUserAgent.indexOf('msie') !== -1)
                return 'internet explorer';
            if (newUserAgent.indexOf('trident') !== -1)
                return 'Internet explorer';
            if (newUserAgent.indexOf('chrome') !== -1)
                return 'chrome';
            if (newUserAgent.indexOf('crios') !== -1)
                return 'chrome';
            if (newUserAgent.indexOf('duckduckgo') !== -1)
                return 'duckduckgo';
            if (newUserAgent.indexOf('safari') !== -1)
                return 'safari';
            return 'NO FIND';
        };
        this.regexes = {
            ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
            ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
        };
    }
    existy(value) {
        return value != null;
    }
    not(func) {
        // return !func.apply(null, Array.prototype.slice.call(arguments));
        return function () {
            return !func.apply(null, Array.prototype.slice.call(arguments));
        };
    }
    getClientIpFromXForwardedFor(value) {
        if (!this.existy(value)) {
            return null;
        }
        // if (this.not.string(value)) {
        //     throw new TypeError("Expected a string, got \"".concat(typeof(value), "\""));
        // }
        var forwardedIps = value.split(',').map(function (e) {
            var ip = e.trim();
            if (ip.includes(':')) {
                var splitted = ip.split(':');
                if (splitted.length === 2) {
                    return splitted[0];
                }
            }
            return ip;
        });
        for (var i = 0; i < forwardedIps.length; i++) {
            if (this.ip(forwardedIps[i])) {
                return forwardedIps[i];
            }
        }
        return null;
    }
    ip(value) {
        return ((this.existy(value) && this.regexes.ipv4.test(value)) || this.regexes.ipv6.test(value));
    }
    object(value) {
        return Object(value) === value;
    }
    string(value) {
        return Object.prototype.toString.call(value) === '[object String]';
    }
    isLocalOrOutIp(ip) {
        if (ip.indexOf('127.0.0.1') !== -1)
            return true;
        if (ip.indexOf('::1') !== -1)
            return true;
        if (ip.indexOf('localhost') !== -1)
            return true;
        return false;
    }
    getClientIp(req) {
        if (req.headers) {
            if (this.ip(req.headers['x-client-ip'])) {
                return req.headers['x-client-ip'];
            }
            var xForwardedFor = this.getClientIpFromXForwardedFor(req.headers['x-forwarded-for']);
            if (this.ip(xForwardedFor)) {
                return xForwardedFor;
            }
            if (this.ip(req.headers['cf-connecting-ip'])) {
                return req.headers['cf-connecting-ip'];
            }
            if (this.ip(req.headers['fastly-client-ip'])) {
                return req.headers['fastly-client-ip'];
            }
            if (this.ip(req.headers['true-client-ip'])) {
                return req.headers['true-client-ip'];
            }
            if (this.ip(req.headers['x-real-ip'])) {
                return req.headers['x-real-ip'];
            }
            if (this.ip(req.headers['x-cluster-client-ip'])) {
                return req.headers['x-cluster-client-ip'];
            }
            if (this.ip(req.headers['x-forwarded'])) {
                return req.headers['x-forwarded'];
            }
            if (this.ip(req.headers['forwarded-for'])) {
                return req.headers['forwarded-for'];
            }
            if (this.ip(req.headers.forwarded)) {
                return req.headers.forwarded;
            }
            if (this.ip(req.headers['x-appengine-user-ip'])) {
                return req.headers['x-appengine-user-ip'];
            }
        }
        if (this.existy(req.connection)) {
            if (this.ip(req.connection.remoteAddress)) {
                return req.connection.remoteAddress;
            }
            if (this.existy(req.connection.socket) && this.ip(req.connection.socket.remoteAddress)) {
                return req.connection.socket.remoteAddress;
            }
        }
        if (this.existy(req.socket) && this.ip(req.socket.remoteAddress)) {
            return req.socket.remoteAddress;
        }
        if (this.existy(req.info) && this.ip(req.info.remoteAddress)) {
            return req.info.remoteAddress;
        }
        if (this.existy(req.requestContext) && this.existy(req.requestContext.identity) && this.ip(req.requestContext.identity.sourceIp)) {
            return req.requestContext.identity.sourceIp;
        }
        if (req.headers) {
            if (this.ip(req.headers['Cf-Pseudo-IPv4'])) {
                return req.headers['Cf-Pseudo-IPv4'];
            }
        }
        if (this.existy(req.address))
            return req.address;
        if (this.existy(req.raw)) {
            return this.getClientIp(req.raw);
        }
        return null;
    }
    getIp(request) {
        return this.getClientIp(request);
    }
    getToday(date) {
        let yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        if (mm < 10)
            mm = '0' + mm;
        if (dd < 10)
            dd = '0' + dd;
        return String(yyyy) + '/' + String(mm) + '/' + String(dd);
    }
    getTime(date) {
        let hh = date.getHours();
        if (hh < 10)
            hh = '0' + hh;
        let min = date.getMinutes();
        if (min < 10)
            min = '0' + min;
        let sec = date.getMilliseconds();
        return String(hh) + ':' + String(min) + ':' + String(sec);
    }
    getTodayFullFormat() {
        const date = new Date();
        return this.getToday(date) + ' ' + this.getTime(date);
    }
    getHeader(request) {
        const today = this.getTodayFullFormat();
        let headers = request.headers;
        if (!headers) {
            const handshake = request['handshake'];
            headers = handshake['headers'];
            headers['cip'] = handshake['address'];
        }
        else {
            headers['cip'] = this.getIp(request);
        }
        headers['cnow'] = today;
        return headers;
    }
    errorMsg(str) {
        console.log(' ------------------> 에러가 발생했습니다! 마스터!');
        console.log(str);
    }
}
exports.ServerUtils = ServerUtils;
// module.exports.NodeUtils = new NodeUtils();
