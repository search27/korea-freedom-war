"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MainServer_1 = require("./server/MainServer");
const cluster = require('cluster');
const OS = require('os');
console.log(`CPU LENGTH : ${OS.cpus().length}`);
if (cluster.isMaster) {
    console.log('Master proccess : ' + process.pid);
    cluster.fork();
    cluster.fork();
}
else {
    console.log('Worker proccess : ' + process.pid);
    const app = new MainServer_1.MainServer(3001);
}
