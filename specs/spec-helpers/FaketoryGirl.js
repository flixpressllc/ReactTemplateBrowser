import assign from 'object-assign';

const faketories = {
  template: {
    id: 79,
    tags: ['Pro', 'Gags'],
    name: 'Sparky Pro Electrocutionator',
    type: 'TextOnly',
    image: 'some/image.jpg',
    duration: '0:23',
    plan: 'Expert',
    price: '$5'
  }
};

function getFaketory (faketory) {
  return faketories[faketory];
}

function create (faketory, overrides) {
  let obj = getFaketory(faketory);
  overrides = overrides || {};
  return assign({}, obj, overrides);
}

export default create;