"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formMultiValueFilter = exports.deleteCookie = exports.deleteAllCookies = exports.getCookie = exports.setCookie = exports.decipherJWT = void 0;
const decipherJWT = function (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    // @ts-ignore
    return JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
};
exports.decipherJWT = decipherJWT;
const setCookie = async function (name, token) {
    let decipheredJWT = await exports.decipherJWT(token);
    let expirationDate = decipheredJWT.alive_until;
    document.cookie = name + "=" + token + "; expires=" + expirationDate + ";samesite=strict;secure;";
};
exports.setCookie = setCookie;
const getCookie = function (cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieParts = decodedCookie.split(';');
    for (let i = 0; i < cookieParts.length; i++) {
        let part = cookieParts[i];
        while (part.charAt(0) == ' ') {
            part = part.substring(1);
        }
        if (part.indexOf(name) == 0) {
            return part.substring(name.length, part.length);
        }
    }
    return "";
};
exports.getCookie = getCookie;
const deleteAllCookies = function () {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
};
exports.deleteAllCookies = deleteAllCookies;
const deleteCookie = function (name) {
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
};
exports.deleteCookie = deleteCookie;
const formMultiValueFilter = function (filterItem, filterVariant) {
    let temporalFilterArr;
    let filterAll = [];
    switch (filterVariant) {
        case ('filterItemLeft'):
            filterItem.left.value.forEach((valueItem) => {
                temporalFilterArr = [filterItem.left.field, filterItem.left.operator, valueItem];
                filterAll.push(temporalFilterArr);
            });
            break;
        case ('filterItemRight'):
            filterItem.right.value.forEach((valueItem) => {
                temporalFilterArr = [filterItem.right.field, filterItem.right.operator, valueItem];
                filterAll.push(temporalFilterArr);
            });
            break;
        case ('filterItemValue'):
            filterItem.value.forEach((valueItem) => {
                temporalFilterArr = [filterItem.field, filterItem.operator, valueItem];
                filterAll.push(temporalFilterArr);
            });
            break;
        case ('filterItemLeftLeft'):
            filterItem.left.left.value.forEach((valueItem) => {
                temporalFilterArr = [filterItem.left.left.field, filterItem.left.left.operator, valueItem];
                filterAll.push(temporalFilterArr);
            });
            break;
        case ('filterItemLeftRight'):
            filterItem.left.right.value.forEach((valueItem) => {
                temporalFilterArr = [filterItem.left.right.field, filterItem.left.right.operator, valueItem];
                filterAll.push(temporalFilterArr);
            });
            break;
        case ('filterItemRightLeft'):
            filterItem.right.left.value.forEach((valueItem) => {
                temporalFilterArr = [filterItem.right.left.field, filterItem.right.left.operator, valueItem];
                filterAll.push(temporalFilterArr);
            });
            break;
        case ('filterItemRightRight'):
            filterItem.right.right.value.forEach((valueItem) => {
                temporalFilterArr = [filterItem.right.right.field, filterItem.right.right.operator, valueItem];
                filterAll.push(temporalFilterArr);
            });
            break;
    }
    let multiFilterField = filterAll.map((e, i) => (i < filterAll.length - 1 ? [e, 'OR'] : [e]))
        .reduce((a, b) => a.concat(b));
    return multiFilterField;
};
exports.formMultiValueFilter = formMultiValueFilter;
