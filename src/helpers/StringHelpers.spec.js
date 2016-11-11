import { slugify, padLeft } from '../../src/helpers/StringHelpers';

describe('slugify', () => {
  it('replaces spaces with hyphens', () => {
    const str = 'simple text';
    expect(slugify(str)).toBe('simple-text');
  });

  it('replaces many whitespaces with hypens', () => {
    const str = `tab	linereturn
end`;
    expect(slugify(str)).toBe('tab-linereturn-end');
  });

  it('compresses multiple spaces into one hyphen', () => {
    const str = 'simple     text';
    expect(slugify(str)).toBe('simple-text');
  });

  it('converts capitals to lowercase', () => {
    const str = 'Title';
    expect(slugify(str)).toBe('title');
  });

  it('converts camel case to kabob style', () => {
    const str = 'camelCase';
    expect(slugify(str)).toBe('camel-case');
  });

  it('does not overload hyphens', () => {
    const str = 'simple---text';
    expect(slugify(str)).toBe('simple-text');
  });
});

describe('padLeft', () => {
  it('pads a string with another strign to a given length', () => {
    const str = '11';
    expect(padLeft(str, '0', 3)).toBe('011');
  });

  it('will not add extra padding to a string at the given length', () => {
    const str = '111';
    expect(padLeft(str, '0', 3)).toBe('111');
  });

  it('will not add extra padding to a string beyond the given length', () => {
    const str = '111';
    expect(padLeft(str, '0', 2)).toBe('111');
  });

});
