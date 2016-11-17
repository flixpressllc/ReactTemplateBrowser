export const SUBSCRIPTION_PLAN_NAMES_IN_ORDER = [
  'Free',
  'Personal',
  'Expert',
  'Business',
  'Enterprise'
];

export const PAYG_PLAN_NAMES = [
  'Pay As You Go',
  'Reseller'
]

export const ALL_PLAN_NAMES = [].concat(SUBSCRIPTION_PLAN_NAMES_IN_ORDER, PAYG_PLAN_NAMES);

let planValues = {};
for (let i = 0; i < SUBSCRIPTION_PLAN_NAMES_IN_ORDER.length; i++) {
  planValues[SUBSCRIPTION_PLAN_NAMES_IN_ORDER[i]] = i;
}

export let SUBSCRIPTION_PLAN_VALUES_HASH = planValues;

export const UHD_IMAGE_URL = "/images/4k.jpg";

export const DEFAULT_PAGE_SIZE = 20;
