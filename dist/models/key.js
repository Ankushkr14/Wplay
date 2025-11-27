"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecord = exports.setRecord = exports.getRecord = exports.KEY_STORE = void 0;
exports.KEY_STORE = {};
const getRecord = (key) => {
    return exports.KEY_STORE[key];
};
exports.getRecord = getRecord;
const setRecord = (key, record) => {
    exports.KEY_STORE[key] = record;
};
exports.setRecord = setRecord;
const deleteRecord = (key) => {
    delete exports.KEY_STORE[key];
};
exports.deleteRecord = deleteRecord;
//# sourceMappingURL=key.js.map