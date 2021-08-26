"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeftComplexNestedFilter = void 0;
const helpers_1 = require("../../../helpers");
class LeftComplexNestedFilter {
    constructor(filterItem) {
        this.defaultFilterArr = [];
        this.filterItem = filterItem;
    }
    formLeftComplexNestedItem() {
        let leftComplexFilter = [];
        let rightComplexFilter = [];
        let rightFilterPart = [];
        let multiFilterLeftField;
        let multiFilterRightField;
        let multiFilterNestedRightField;
        let defaultNestedFilterArr = [];
        if (Array.isArray(this.filterItem.left.left.value)) {
            multiFilterLeftField = helpers_1.formMultiValueFilter(this.filterItem, 'filterItemLeftLeft');
            leftComplexFilter.push(multiFilterLeftField);
        }
        else {
            leftComplexFilter = [this.filterItem.left.left.field, this.filterItem.left.left.operator, this.filterItem.left.left.value];
        }
        if (Array.isArray(this.filterItem.left.right.value)) {
            multiFilterNestedRightField = helpers_1.formMultiValueFilter(this.filterItem, 'filterItemLeftRight');
            rightComplexFilter.push(multiFilterNestedRightField);
        }
        else {
            rightComplexFilter = [this.filterItem.left.right.field, this.filterItem.left.right.operator, this.filterItem.left.right.value];
        }
        if (Array.isArray(this.filterItem.right.value)) {
            multiFilterRightField = helpers_1.formMultiValueFilter(this.filterItem, 'filterItemRight');
            rightFilterPart.push(multiFilterRightField);
        }
        else {
            rightFilterPart = [this.filterItem.right.field, this.filterItem.right.operator, this.filterItem.right.value];
        }
        defaultNestedFilterArr = [leftComplexFilter, this.filterItem.left.type, rightComplexFilter];
        this.defaultFilterArr = [defaultNestedFilterArr, this.filterItem.type, rightFilterPart];
        return this.defaultFilterArr;
    }
}
exports.LeftComplexNestedFilter = LeftComplexNestedFilter;
