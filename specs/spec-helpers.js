import assign from 'object-assign';

const faketories = () => { return {
  template: {
    id: getNewId(),
    tags: [],
    name: 'Sparky Pro Electrocutionator',
    type: 'TextOnly',
    image: 'some/image.jpg',
    duration: '0:23',
    plan: 'Expert',
    price: '$5'
  },
  templateGroup: {
    id: getNewId(),
    tags: [],
    name: 'Some Great Group Name',
    type: 'TextOnly',
    image: 'some/image.jpg',
    duration: '0:23',
    plan: 'Expert',
    price: '$5',
    children: []
  }
}};

let incrementor = 1;

function getNewId () {
  return incrementor++;
}

function getFaketory (faketory) {
  return faketories()[faketory];
}

export function create (faketory, overrides) {
  let obj = getFaketory(faketory);
  overrides = overrides || {};
  return assign({}, obj, overrides);
}

export default create;