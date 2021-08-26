import {formMultiValueFilter} from "../../../helpers";

export class LeftComplexNestedFilter {
    filterItem: any
    defaultFilterArr: any[] = []
    constructor(filterItem: any) {
        this.filterItem = filterItem
    }

    formLeftComplexNestedItem () {
        let leftComplexFilter: any[][] = [];
        let rightComplexFilter: any[][] = [];
        let rightFilterPart: any[][] = [];
        let multiFilterLeftField: any;
        let multiFilterRightField:any;
        let multiFilterNestedRightField: any;
        let defaultNestedFilterArr: any[][] = []
        if (Array.isArray(this.filterItem.left.left.value)) {
            multiFilterLeftField = formMultiValueFilter(this.filterItem, 'filterItemLeftLeft')
            leftComplexFilter.push(multiFilterLeftField)
        } else {
            leftComplexFilter = [this.filterItem.left.left.field, this.filterItem.left.left.operator, this.filterItem.left.left.value];
        }
        if (Array.isArray(this.filterItem.left.right.value)) {
            multiFilterNestedRightField = formMultiValueFilter(this.filterItem, 'filterItemLeftRight')
            rightComplexFilter.push(multiFilterNestedRightField)
        } else {
            rightComplexFilter = [this.filterItem.left.right.field, this.filterItem.left.right.operator, this.filterItem.left.right.value]
        }
        if(Array.isArray(this.filterItem.right.value)) {
            multiFilterRightField = formMultiValueFilter(this.filterItem, 'filterItemRight')
            rightFilterPart.push(multiFilterRightField)
        } else {
            rightFilterPart = [this.filterItem.right.field, this.filterItem.right.operator, this.filterItem.right.value];
        }
        defaultNestedFilterArr = [leftComplexFilter, this.filterItem.left.type, rightComplexFilter]
        this.defaultFilterArr = [defaultNestedFilterArr, this.filterItem.type, rightFilterPart];
        return this.defaultFilterArr
    }
}