import { EgalConstructor } from './src/Model/EgalConstructor';

let newEgal = new EgalConstructor({
  modelName: 'model',
  userName: 'admin',
  password: 'password',
  url: 'url',
  connectionType: 'axios',
  tokenName: 'monolit'
});

const filter2 = {
  OR: {
    email: {
      operator: 'eq',
      value: 'email@email.com'
    },
    id: {
      operator: 'eq',
      value: [1, 2, 3, 4, 5]
    }
  },
  email: {
    operator: 'eq',
    value: 'email@email.com'
  },
  id: {
    operator: 'eq',
    value: [1, 2, 3, 4, 5]
  },
  OR: {
    email: {
      operator: 'eq',
      value: 'email@email.com'
    },
    id: {
      operator: 'eq',
      value: [1, 2, 3, 4, 5]
    }
  }
};

const filter1 = [
  {
    field: 'email',
    operator: '',
    value: ''
  },
  [
    {
      field: 'age',
      operator: '',
      value: ''
    },
    'or',
    {
      field: 'age',
      operator: '',
      value: ''
    }
  ],
  [
    [
      {
        field: 'age',
        operator: '',
        value: ''
      },
      'or',
      [
        {
          field: 'age',
          operator: '',
          value: ''
        },
        'or',
        {
          field: 'age',
          operator: '',
          value: ''
        }
      ]
    ],
    'and',
    {
      field: 'name',
      operator: '',
      value: ''
    }
  ]
];

const filter = {
  email: {
    operator: 'eq',
    value: 'email@email.com'
  },
  id: {
    operator: 'eq',
    value: [1, 2, 3, 4, 5]
  },
  nested: {
    email: {
      operator: 'eq',
      value: 'email@email.com'
    },
    id: {
      operator: 'eq',
      value: [1, 2, 3, 4, 5]
    },
    nested: {
      email: {
        operator: 'eq',
        value: 'email@email.com'
      },
      operator: 'or',
      id: {
        operator: 'eq',
        value: [1, 2, 3, 4, 5]
      }
    }
  }
};
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
  [
    {
      field: 'left filed',
      operator: 'or',
      value: ['value1', 'value2', 'value3']
    },
    'or',
    {
      field: 'right filed',
      operator: 'or',
      value: ['value1', 'value2', 'value3']
    }
  ],
  [
    [
      {
        field: 'left nested filed',
        operator: 'or',
        value: ['value1', 'value2', 'value3']
      },
      'or',
      {
        field: 'right nested filed',
        operator: 'or',
        value: ['value1', 'value2', 'value3']
      }
    ],
    'or',
    {
      field: 'right filed',
      operator: 'or',
      value: ['value1', 'value2', 'value3']
    }
  ],
  [
    {
      field: 'right filed',
      operator: 'or',
      value: ['value1', 'value2', 'value3']
    },
    'or',
    [
      {
        field: 'left nested filed',
        operator: 'or',
        value: ['value1', 'value2', 'value3']
      },
      'or',
      {
        field: 'right nested filed',
        operator: 'or',
        value: ['value1', 'value2', 'value3']
      }
    ]
  ]
];
newEgal.actionGetItems('monolit', 'axios', undefined, undefined, filter);
