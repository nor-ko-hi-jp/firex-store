"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDocumentRef = void 0;
const firebase = require("firebase");
exports.isDocumentRef = (ref) => ref instanceof firebase.firestore.DocumentReference;
