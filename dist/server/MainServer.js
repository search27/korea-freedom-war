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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainServer = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const index_1 = __importDefault(require("../Routers/index"));
const axios = require('axios');
const Properties_1 = __importDefault(require("../Properties"));
class MainServer {
    constructor(_PORT) {
        this.rxStoreUsers = [];
        this.PORT = _PORT ? _PORT : 7777;
        this.init();
        this.router();
        this.execute();
    }
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    init() {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        const whitelist = [];
        const corsOptions = {
            origin: function (origin, callback) {
                // if (whitelist.indexOf(origin) !== -1) { // 만일 whitelist 배열에 origin인자가 있을 경우
                //   callback(null, true); // cors 허용
                // } else {
                //   // callback(new Error("Not Allowed Origin!")); // cors 비허용
                //   callback(null, true);
                // }
                callback(null, true);
            },
        };
        this.app.use((0, cors_1.default)(corsOptions));
        this.app.use((0, express_session_1.default)({
            secret: "secretNumber",
            resave: false,
            saveUninitialized: true,
            cookie: {
                httpOnly: true,
                maxAge: 1 * 60 * 60 * 1000
            },
        }));
        this.app.set('view engine', 'ejs');
        this.router();
    }
    router() {
        this.app.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const url = req.url;
            const exceptUrl = ['.js', '.css', '.map', '.png', '.jpeg', '.jpg'];
            let isOkay = false;
            for (let i = 0; i < exceptUrl.length; i++) {
                const each = exceptUrl[i];
                if (url.indexOf(each) !== -1) {
                    isOkay = true;
                    break;
                }
            }
            const wrongUrl = [
                '.env', 'wp-content', 'wlwmanifest.xml', 'xmlrpc.php', 'eval-stdin.php'
            ];
            let isWrong = false;
            for (let i = 0; i < wrongUrl.length; i++) {
                const each = wrongUrl[i];
                if (url.indexOf(each) !== -1) {
                    isWrong = true;
                    break;
                }
            }
            if (isWrong) {
                return res.render('error/wrong', {});
            }
            next();
        }));
        this.app.use('/', index_1.default);
    }
    execute() {
        const server = require('http').createServer(this.app);
        const io = new socket_io_1.Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
        io.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
            console.log(`io connection : ` + io.engine.clientsCount);
        }));
        server.listen(this.PORT, () => {
            console.log(`Local State - ` + Properties_1.default.getState());
            console.log(`SERVER START - PORT : ${this.PORT}`);
        });
    }
}
exports.MainServer = MainServer;
