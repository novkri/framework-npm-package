import {formMultiValueFilter} from '../../helpers'
import {LeftComplexNestedFilter} from "./Filters/LeftComplexNestedFilter";
import {RightComplexNestedFilter} from "./Filters/RightComplexNestedFilter";

export class GetItemsFilterParams {
    filter: (string | object)[];
    tempArr: (string | object)[];
    userFilterInput: (string | object)[] | undefined;
    defaultFilterArr: any;
    multiFilterField: any;

    constructor(filterObj: (string | object)[] | undefined) {
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
            this.userFilterInput.forEach((item: any) => {
                if (item?.left && !item.left?.left && !item.right?.left) {
                    this.createDefaultObjectInstance(item);
                } else if (item.left?.left || item.right?.left) {
                    if (item.left?.left && !item.right?.left) {
                        let complexLeftFilter = new LeftComplexNestedFilter(item)
                        let complexLeftFilterResult = complexLeftFilter.formLeftComplexNestedItem()
                        this.formIndividualFilter(complexLeftFilterResult)
                    }
                    if (!item.left?.left && item.right?.left) {
                        let complexRightFilter = new RightComplexNestedFilter(item)
                        let complexRightFilterResult = complexRightFilter.formRightComplexNestedFilter()
                        this.formIndividualFilter(complexRightFilterResult)
                    }
                } else if (item.value) {
                    this.formSimpleFilter(item)
                }
            });
        }
    }

    /**
     * Функция формирует массив с условиями для одного фильтра
     * @param filterItem
     */
    createDefaultObjectInstance(filterItem: any) {
        let multiFilterFieldLeft: any;
        let multiFilterFieldRight: any;
        let leftComplexFilter: any[][] = [];
        let rightComplexFilter: any[][] = [];
        if (Array.isArray(filterItem?.left.value)) {
            multiFilterFieldLeft = formMultiValueFilter(filterItem, 'filterItemLeft')
            leftComplexFilter.push(multiFilterFieldLeft)
        } else {
            leftComplexFilter = [filterItem.left.field, filterItem.left.operator, filterItem.left.value]
        }
        if (Array.isArray(filterItem?.right.value)) {
            multiFilterFieldRight = formMultiValueFilter(filterItem, 'filterItemRight')
            rightComplexFilter.push(multiFilterFieldRight)
        } else {
            rightComplexFilter = [filterItem.right.field, filterItem.right.operator, filterItem.right.value]
        }
        this.defaultFilterArr = [leftComplexFilter, filterItem.type, rightComplexFilter];
        this.formIndividualFilter(this.defaultFilterArr)
    }

    formSimpleFilter(filterItem: any) {
        if (Array.isArray(filterItem.value)) {
            this.multiFilterField = formMultiValueFilter(filterItem, 'filterItemValue')
            this.tempArr.push(this.multiFilterField)
        } else {
            this.defaultFilterArr = [filterItem.field, filterItem.operator, filterItem.value];
            this.tempArr.push(this.defaultFilterArr);
        }
    }

    formIndividualFilter(filterItem: any) {
        if (this.userFilterInput?.length === 1) {
            this.tempArr = filterItem;
        } else {
            this.tempArr.push([filterItem]);
        }
    }

    /**
     * Функция формирует массив из всех примененных фильтров для отправки в запросе
     */
    formFilterObject() {
        // @ts-ignore
        if (this.tempArr.length > 1 && this.userFilterInput?.length > 1) {
            this.filter = this.tempArr
                .map((e, i) => (i < this.tempArr.length - 1 ? [e, 'AND'] : [e]))
                .reduce((a, b) => a.concat(b));
            console.log(this.filter, 'filter')
            return this.filter;
        } else {
            this.filter = this.tempArr
            return this.filter;
        }
    }
}
