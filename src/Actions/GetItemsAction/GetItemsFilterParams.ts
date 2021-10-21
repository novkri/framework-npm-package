export class GetItemsFilterParams {
  filter: (string | object)[];
  temporalFilterArray: (string | object)[];
  userFilterInput: (string | object)[] | undefined;
  defaultFilterArr: any;
  multiFilterField: any;

  constructor(filterObj: (string | object)[] | undefined) {
    this.filter = [];
    this.temporalFilterArray = [];
    this.userFilterInput = filterObj;
  }

  /**
   * Функция разбирает массив с фильтрами, полученный от пользователя
   * и передает каждый айтем в след. функцию
   */
  checkFilterType() {
    if (this.userFilterInput) {
      // this.createDefaultObjectInstance(this.userFilterInput);
      this.userFilterInput.forEach((item: any) => {
        this.createDefaultObjectInstance(item);
      });
    }
  }

  createDefaultObjectInstance(filterItem: any) {
    console.log('start filter function');
    if (!Array.isArray(filterItem)) {
      if (Array.isArray(filterItem.value)) {
        this.formFilterWithMultipleValues(filterItem);
      } else {
        this.temporalFilterArray.push([filterItem.field, filterItem.operator, filterItem.value]);
      }
    } else if (Array.isArray(filterItem)) {
      this.temporalFilterArray.push([
        [filterItem[0].field, filterItem[0].operator, filterItem[0].value],
        filterItem[1],
        [filterItem[2].field, filterItem[2].operator, filterItem[2].value]
      ]);
      console.log(this.temporalFilterArray, 'temp arr');
    }
  }

  formFilterWithMultipleValues(filterItem: any) {
    let filterArr: any[][] = [];
    filterItem.value.forEach((valueItem: any) => {
      filterArr.push([filterItem.field, filterItem.operator, valueItem]);
    });
    this.temporalFilterArray.push(
      filterArr
        .map((e: any, i: number) => (i < filterArr.length - 1 ? [e, 'OR'] : [e]))
        // @ts-ignore
        .reduce((a: string | any[], b: any) => a.concat(b))
    );
  }

  /**
   * Функция формирует массив из всех примененных фильтров для отправки в запросе
   */
  formFilterObject() {
    // @ts-ignore
    if (this.temporalFilterArray.length > 1 && this.userFilterInput?.length > 1) {
      this.filter = this.temporalFilterArray
        .map((e, i) => (i < this.temporalFilterArray.length - 1 ? [e, 'AND'] : [e]))
        .reduce((a, b) => a.concat(b));
      return this.filter;
    } else {
      this.filter = this.temporalFilterArray;
      return this.filter;
    }
  }
}
