"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightComplexNestedFilter = void 0;
const helpers_1 = require("../../../helpers");
class RightComplexNestedFilter {
    constructor(filterItem) {
        this.defaultFilterArr = [];
        this.filterItem = filterItem;
    }
    formRightComplexNestedFilter() {
        let leftComplexFilter = [];
        let rightComplexFilter = [];
        let leftFilterPart = [];
        let multiFilterLeftField;
        let multiFilterRightField;
        let multiFilterNestedLeftField;
        let defaultNestedFilterArr = [];
        if (Array.isArray(this.filterItem.right.left.value)) {
            multiFilterLeftField = helpers_1.formMultiValueFilter(this.filterItem, 'filterItemRightLeft');
            leftComplexFilter.push(multiFilterLeftField);
        }
        else {
            leftComplexFilter = [this.filterItem.right.left.field, this.filterItem.right.left.operator, this.filterItem.right.left.value];
        }
        if (Array.isArray(this.filterItem.right.right.value)) {
            multiFilterRightField = helpers_1.formMultiValueFilter(this.filterItem, 'filterItemRightRight');
            rightComplexFilter.push(multiFilterRightField);
        }
        else {
            rightComplexFilter = [this.filterItem.right.right.field, this.filterItem.right.right.operator, this.filterItem.right.right.value];
        }
        if (Array.isArray(this.filterItem.left.value)) {
            multiFilterNestedLeftField = helpers_1.formMultiValueFilter(this.filterItem, 'filterItemLeft');
            leftFilterPart.push(multiFilterNestedLeftField);
        }
        else {
            leftFilterPart = [this.filterItem.left.field, this.filterItem.left.operator, this.filterItem.left.value];
        }
        defaultNestedFilterArr = [leftComplexFilter, this.filterItem.right.type, rightComplexFilter];
        this.defaultFilterArr = [leftFilterPart, this.filterItem.type, defaultNestedFilterArr];
        return this.defaultFilterArr;
    }
}
exports.RightComplexNestedFilter = RightComplexNestedFilter;
