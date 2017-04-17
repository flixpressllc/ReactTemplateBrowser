import * as s from './app-settings';

// These tests just remind us to think through the logic of our
// other test suites as things change.
// If any of these ever fail, it is probably a good idea to see
// where the offending exports are used in our code

const expectedAllPlanNames = [
  'Free',
  'Personal',
  'Expert',
  'Business',
  'Enterprise',
  'Pay As You Go',
  'Reseller'
];

const expectedSubscriptionValuesHash = {
  'Free': 0,
  'Personal': 1,
  'Expert': 2,
  'Business': 3,
  'Enterprise': 4
}

it('has a known set of exports', () => {
  let exports = [];
  const expectedExports = [
    'SUBSCRIPTION_PLAN_NAMES_IN_ORDER',
    'PAYG_PLAN_NAMES',
    'ALL_PLAN_NAMES',
    'SUBSCRIPTION_PLAN_VALUES_HASH',
    'UHD_IMAGE_URL',
    'DEFAULT_PAGE_SIZE',
    'TEMPLATE_TYPES_REQUIRING_FLASH'
  ];

  for (let name in s) {
    if (s.hasOwnProperty(name)) { exports.push(name); }
  }

  for (var i = 0; i < exports.length; i++) {
    //Reversed Expectation
    expect(expectedExports).toContain(exports[i]);
  }
});
describe('Expected values', () => {
  it('has the right values for ALL_PLAN_NAMES', () => {
    let expectedArray = expectedAllPlanNames;
    let testingArray = s.ALL_PLAN_NAMES

    for (var i = 0; i < testingArray.length; i++) {
      expect(expectedArray[i]).toEqual(testingArray[i]);
    }
  });
  it('has the right length of values for ALL_PLAN_NAMES', () => {
    let expectedArray = expectedAllPlanNames;
    let testingArray = s.ALL_PLAN_NAMES

    expect(testingArray.length).toEqual(expectedArray.length);
  });
  it('has the right values for SUBSCRIPTION_PLAN_VALUES_HASH', () => {
    let expectedObject = expectedSubscriptionValuesHash;
    let testingObject = s.SUBSCRIPTION_PLAN_VALUES_HASH

    for (let name in expectedObject) {
      if (expectedObject.hasOwnProperty(name)){
        expect(testingObject[name]).toEqual(expectedObject[name]);
      }
    }
  });
});
