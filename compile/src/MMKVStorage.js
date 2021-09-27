"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const react_native_mmkv_1 = require("react-native-mmkv");
const storage = new react_native_mmkv_1.MMKV();
//TODO: add getData management based on prop type
exports.default = storage;
