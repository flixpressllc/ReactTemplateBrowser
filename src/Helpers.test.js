import Helpers from './Helpers';

describe('slugify', () => {
  const slugify = Helpers.slugify;
  
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
