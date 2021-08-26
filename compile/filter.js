"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EgalConstructor_1 = require("./src/Model/EgalConstructor");
let newEgal = new EgalConstructor_1.EgalConstructor({ modelName: 'model', userName: 'admin', password: 'password', url: 'url', connectionType: 'axios', tokenName: 'monolit' });
let filter = [
    {
        field: 'name',
        operator: 'or',
        value: ['value1', 'value2', 'value3']
    },
    {
        field: 'age',
        operator: 'and',
        value: 13
    },
    {
        left: {
            field: 'left filed',
            operator: 'or',
            value: ['value1', 'value2', 'value3']
        },
        type: 'or',
        right: {
            field: 'right filed',
            operator: 'or',
            value: ['value1', 'value2', 'value3']
        }
    },
    {
        left: {
            left: {
                field: 'left nested filed',
                operator: 'or',
                value: ['value1', 'value2', 'value3']
            },
            type: 'or',
            right: {
                field: 'right nested filed',
                operator: 'or',
                value: ['value1', 'value2', 'value3']
            }
        },
        type: 'or',
        right: {
            field: 'right filed',
            operator: 'or',
            value: ['value1', 'value2', 'value3']
        }
    },
    {
        left: {
            field: 'right filed',
            operator: 'or',
            value: ['value1', 'value2', 'value3']
        },
        type: 'or',
        right: {
            left: {
                field: 'left nested filed',
                operator: 'or',
                value: ['value1', 'value2', 'value3']
            },
            type: 'or',
            right: {
                field: 'right nested filed',
                operator: 'or',
                value: ['value1', 'value2', 'value3']
            }
        }
    }
];
newEgal.actionGetItems('monolit', 'axios', undefined, undefined, filter);
