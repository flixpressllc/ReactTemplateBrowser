import * as ObjectHelpers from '../../src/helpers/ObjectHelpers';

describe('Object Helpers', () => {
  describe('clone()', () => {
    const clone = ObjectHelpers.clone;
    it('creates an equivilant, but separate object', () => {
      let IT = 'it.';
      let obj1 = {some:'random', kinds:['of', 'things'], 'inside': IT}

      let result = clone(obj1);

      expect(result).toEqual(obj1);
      expect(result).not.toBe(obj1);
    });

    it('decouples nested objects so they are no longer references', () => {
      let obj1 = {some:'random', kinds:['of', 'things'], 'inside': {a:{super:{nested:{object:'.'}}}}}

      let result = clone(obj1);

      expect(result.kinds).toEqual(obj1.kinds);
      expect(result.kinds).not.toBe(obj1.kinds);
      expect(result['inside'].a.super.nested).toEqual(obj1['inside'].a.super.nested);
      expect(result['inside'].a.super.nested).not.toBe(obj1['inside'].a.super.nested);
    });

    it('allows primitives without failing', () => {
      let aString = 'string';
      let aNumber = 12;

      let stringResult = clone(aString);
      let numberResult = clone(aNumber);

      expect(stringResult).toEqual(aString);
      expect(numberResult).toEqual(aNumber);
    });
  });


  describe('isEmpty()', () => {
    const isEmpty = ObjectHelpers.isEmpty;
    it('returns true for {}', () => {
      let emptyObj = {};

      let result = isEmpty(emptyObj);

      expect(result).toEqual(true);
    });

    it('returns true for undefined', () => {
      let result = isEmpty(undefined);

      expect(result).toEqual(true);
    });

    it('returns true for null', () => {
      let result = isEmpty(null);

      expect(result).toEqual(true);
    });

    it('returns true for nothing passed in', () => {
      let result = isEmpty();

      expect(result).toEqual(true);
    });

    it('returns false for {something:"here"}', () => {
      let obj = {something:"here"};

      let result = isEmpty(obj);

      expect(result).toEqual(false);
    });

    it('returns false for {something:{}}', () => {
      let obj = {something:{}};

      let result = isEmpty(obj);

      expect(result).toEqual(false);
    });

  });
});