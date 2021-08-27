export const decipherJWT = function (token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    // @ts-ignore
    return JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
};

export const setCookie = async function (name: string, token: string) {
    let decipheredJWT = await decipherJWT(token)
    let expirationDate = decipheredJWT.alive_until
    document.cookie = name + "=" + token + "; expires=" + expirationDate + ";samesite=strict;secure;"
};

export const getCookie = function (cname: string) {
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

export const deleteAllCookies = function () {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export const deleteCookie = function (name: string) {
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
}

export const formMultiValueFilter = function (filterItem: any, filterVariant: string) {
    let temporalFilterArr
    let filterAll: Array<any> = []
    switch (filterVariant) {
        case ('filterItemLeft'):
            filterItem.left.value.forEach((valueItem: any) => {
                temporalFilterArr = [filterItem.left.field, filterItem.left.operator, valueItem]
                filterAll.push(temporalFilterArr)
            })
            break
        case ('filterItemRight'):
            filterItem.right.value.forEach((valueItem: any) => {
                temporalFilterArr = [filterItem.right.field, filterItem.right.operator, valueItem]
                filterAll.push(temporalFilterArr)
            })
            break
        case ('filterItemValue'):
            filterItem.value.forEach((valueItem: any) => {
                temporalFilterArr = [filterItem.field, filterItem.operator, valueItem]
                filterAll.push(temporalFilterArr)
            })
            break
        case ('filterItemLeftLeft'):
            filterItem.left.left.value.forEach((valueItem: any) => {
                temporalFilterArr = [filterItem.left.left.field, filterItem.left.left.operator, valueItem]
                filterAll.push(temporalFilterArr)
            })
            break
        case ('filterItemLeftRight'):
            filterItem.left.right.value.forEach((valueItem: any) => {
                temporalFilterArr = [filterItem.left.right.field, filterItem.left.right.operator, valueItem]
                filterAll.push(temporalFilterArr)
            })
            break
        case ('filterItemRightLeft'):
            filterItem.right.left.value.forEach((valueItem: any) => {
                temporalFilterArr = [filterItem.right.left.field, filterItem.right.left.operator, valueItem]
                filterAll.push(temporalFilterArr)
            })
            break
        case ('filterItemRightRight'):
            filterItem.right.right.value.forEach((valueItem: any) => {
                temporalFilterArr = [filterItem.right.right.field, filterItem.right.right.operator, valueItem]
                filterAll.push(temporalFilterArr)
            })
            break
    }
    let multiFilterField = filterAll.map((e, i) => (i < filterAll.length - 1 ? [e, 'OR'] : [e]))
        .reduce((a, b) => a.concat(b));
    return multiFilterField
}