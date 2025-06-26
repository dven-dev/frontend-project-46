import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'deleted', value: value1 };
    }

    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: value2 };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', children: buildDiff(value1, value2) };
    }

    if (!_.isEqual(value1, value2)) {
      return { key, type: 'changed', oldValue: value1, newValue: value2 };
    }

    return { key, type: 'unchanged', value: value1 };
  });
};

export default buildDiff;
