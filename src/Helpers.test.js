import Helpers from './Helpers';

describe('slugify', () => {
  const slugify = Helpers.slugify;
  
  it('replaces spaces with hyphens', () => {
    const str = 'simple text';
    expect(slugify(str)).toBe('simple-text');
  });

  it('replaces many whitespaces with hypens', () => {
    const str = `tab	lineReturn
end`;
    expect(slugify(str)).toBe('tab-lineReturn-end');
  });

  it('compresses multiple spaces into one hyphen', () => {
    const str = 'simple     text';
    expect(slugify(str)).toBe('simple-text');
  });

  it('does not overload hyphens', () => {
    const str = 'simple---text';
    expect(slugify(str)).toBe('simple-text');
  });
});
