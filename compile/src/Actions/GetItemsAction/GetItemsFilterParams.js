"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetItemsFilterParams = void 0;
const helpers_1 = require("../../helpers");
const LeftComplexNestedFilter_1 = require("./Filters/LeftComplexNestedFilter");
const RightComplexNestedFilter_1 = require("./Filters/RightComplexNestedFilter");
class GetItemsFilterParams {
    constructor(filterObj) {
        this.filter = [];
        this.tempArr = [];
        this.userFilterInput = filterObj;
    }
    /**
     * Функция разбирает массив с фильтрами, полученный от пользователя
     * и передает каждый айтем в след. функцию
     */
    checkFilterType() {
        if (this.userFilterInput) {
            this.userFilterInput.forEach((item) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                if ((item === null || item === void 0 ? void 0 : item.left) && !((_a = item.left) === null || _a === void 0 ? void 0 : _a.left) && !((_b = item.right) === null || _b === void 0 ? void 0 : _b.left)) {
                    this.createDefaultObjectInstance(item);
                }
                else if (((_c = item.left) === null || _c === void 0 ? void 0 : _c.left) || ((_d = item.right) === null || _d === void 0 ? void 0 : _d.left)) {
                    if (((_e = item.left) === null || _e === void 0 ? void 0 : _e.left) && !((_f = item.right) === null || _f === void 0 ? void 0 : _f.left)) {
                        let complexLeftFilter = new LeftComplexNestedFilter_1.LeftComplexNestedFilter(item);
                        let complexLeftFilterResult = complexLeftFilter.formLeftComplexNestedItem();
                        this.formIndividualFilter(complexLeftFilterResult);
                    }
                    if (!((_g = item.left) === null || _g === void 0 ? void 0 : _g.left) && ((_h = item.right) === null || _h === void 0 ? void 0 : _h.left)) {
                        let complexRightFilter = new RightComplexNestedFilter_1.RightComplexNestedFilter(item);
                        let complexRightFilterResult = complexRightFilter.formRightComplexNestedFilter();
                        this.formIndividualFilter(complexRightFilterResult);
                    }
                }
                else if (item.value) {
                    this.formSimpleFilter(item);
                }
            });
        }
    }
    /**
     * Функция формирует массив с условиями для одного фильтра
     * @param filterItem
     */
    createDefaultObjectInstance(filterItem) {
        let multiFilterFieldLeft;
        let multiFilterFieldRight;
        let leftComplexFilter = [];
        let rightComplexFilter = [];
        if (Array.isArray(filterItem === null || filterItem === void 0 ? void 0 : filterItem.left.value)) {
            multiFilterFieldLeft = helpers_1.formMultiValueFilter(filterItem, 'filterItemLeft');
            leftComplexFilter.push(multiFilterFieldLeft);
        }
        else {
            leftComplexFilter = [filterItem.left.field, filterItem.left.operator, filterItem.left.value];
        }
        if (Array.isArray(filterItem === null || filterItem === void 0 ? void 0 : filterItem.right.value)) {
            multiFilterFieldRight = helpers_1.formMultiValueFilter(filterItem, 'filterItemRight');
            rightComplexFilter.push(multiFilterFieldRight);
        }
        else {
            rightComplexFilter = [filterItem.right.field, filterItem.right.operator, filterItem.right.value];
        }
        this.defaultFilterArr = [leftComplexFilter, filterItem.type, rightComplexFilter];
        this.formIndividualFilter(this.defaultFilterArr);
    }
    formSimpleFilter(filterItem) {
        if (Array.isArray(filterItem.value)) {
            this.multiFilterField = helpers_1.formMultiValueFilter(filterItem, 'filterItemValue');
            this.tempArr.push(this.multiFilterField);
        }
        else {
            this.defaultFilterArr = [filterItem.field, filterItem.operator, filterItem.value];
            this.tempArr.push(this.defaultFilterArr);
        }
    }
    formIndividualFilter(filterItem) {
        var _a;
        if (((_a = this.userFilterInput) === null || _a === void 0 ? void 0 : _a.length) === 1) {
            this.tempArr = filterItem;
        }
        else {
            this.tempArr.push([filterItem]);
        }
    }
    /**
     * Функция формирует массив из всех примененных фильтров для отправки в запросе
     */
    formFilterObject() {
        var _a;
        // @ts-ignore
        if (this.tempArr.length > 1 && ((_a = this.userFilterInput) === null || _a === void 0 ? void 0 : _a.length) > 1) {
            this.filter = this.tempArr
                .map((e, i) => (i < this.tempArr.length - 1 ? [e, 'AND'] : [e]))
                .reduce((a, b) => a.concat(b));
            console.log(this.filter, 'filter');
            return this.filter;
        }
        else {
            this.filter = this.tempArr;
            return this.filter;
        }
    }
}
exports.GetItemsFilterParams = GetItemsFilterParams;
