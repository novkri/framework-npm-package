import {formMultiValueFilter} from "../../../helpers";

export class RightComplexNestedFilter {
    filterItem: any
    defaultFilterArr: any[] = []
    constructor(filterItem: any) {
        this.filterItem = filterItem
    }
    formRightComplexNestedFilter() {
        let leftComplexFilter: any[][] = [];
        let rightComplexFilter: any[][] = [];
        let leftFilterPart: any[][] = [];
        let multiFilterLeftField: any;
        let multiFilterRightField:any;
        let multiFilterNestedLeftField: any
        let defaultNestedFilterArr: any[][] = []
        if (Array.isArray(this.filterItem.right.left.value)) {
            multiFilterLeftField = formMultiValueFilter(this.filterItem, 'filterItemRightLeft')
            leftComplexFilter.push(multiFilterLeftField)
        } else {
            leftComplexFilter = [this.filterItem.right.left.field, this.filterItem.right.left.operator, this.filterItem.right.left.value];
        }
        if (Array.isArray(this.filterItem.right.right.value)) {
            multiFilterRightField = formMultiValueFilter(this.filterItem, 'filterItemRightRight')
            rightComplexFilter.push(multiFilterRightField)

        } else {
            rightComplexFilter = [this.filterItem.right.right.field, this.filterItem.right.right.operator, this.filterItem.right.right.value]
        }
        if(Array.isArray(this.filterItem.left.value)) {
            multiFilterNestedLeftField = formMultiValueFilter(this.filterItem, 'filterItemLeft')
            leftFilterPart.push(multiFilterNestedLeftField)
        } else {
            leftFilterPart = [this.filterItem.left.field, this.filterItem.left.operator, this.filterItem.left.value];
        }
        defaultNestedFilterArr = [leftComplexFilter, this.filterItem.right.type, rightComplexFilter];
        this.defaultFilterArr = [leftFilterPart, this.filterItem.type, defaultNestedFilterArr];
        return this.defaultFilterArr
    }
}