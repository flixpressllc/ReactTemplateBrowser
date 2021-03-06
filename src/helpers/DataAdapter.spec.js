import DataAdapter from '../../src/helpers/DataAdapter';
import { create } from '../../specs/spec-helpers';

const TEMPS_WITH_GROUPS = `1, Lots of Text, 0, Free Plan Templates, Intros, 26 seconds, Free, Images, NULL
2, World Intro, 0, Free Plan Templates, Intros, 10 seconds, Free, Images, NULL
3, Tech Puzzle, 2, Slideshow, Slideshow, 52 seconds, Personal, Images, NULL
60, Gaming XL2, 5, Intros, Intros, 15 seconds, Personal, Images, NULL
79, Flex Intro, 5, Intros, Intros, 10 seconds, Expert, TextOnly, 85
50, Hands Intro, 2, Intros, Intros, 8 seconds, Expert, TextOnly, 60
85, Compete Intro, 5, Intros, Intros, 10 seconds, Expert, Images, NULL`;

const TWO_TEMPS_AND_ONE_GROUP = `1, I'm a group, 0, Free Plan Templates, Intros, 26 seconds, Free, Images, NULL
2, I'm a template, 5, Intros, Intros, 10 seconds, Expert, Images, 1
4, I'm a template, 5, Intros, Intros, 10 seconds, Expert, Images, NULL`;

describe('Data Adapter', () => {
  it('finds internal group ids and sorts them', () => {
    const results = new DataAdapter(TEMPS_WITH_GROUPS);
    expect(results.templateGroupIds).toEqual([60, 85]);
  });

  it('creates template objects for templates only', () => {
    const results = new DataAdapter(TWO_TEMPS_AND_ONE_GROUP);
    expect(results.templatesArray.length).toEqual(2);
  });

  it('creates group objects for parent templates only', () => {
    const expectedGroup = create('templateGroup', {id: 1, name: 'I\'m a group', tags: ['Free Plan Templates', 'Intros'], image: 'https://flixpress.com/tempImages/1.jpg', children: [2] })

    const results = new DataAdapter(TWO_TEMPS_AND_ONE_GROUP);

    expect(results.templateGroupsArray.length).toEqual(1);
    expect(results.templateGroupsArray[0].id).toEqual(1);
  });

  it('creates the expected object for a template', () => {
    const expectedObject = {
      id: 2,
      tags: ['Intros', 'Intros'],
      name: 'I\'m a template',
      type: 'Images',
      image: 'https://flixpress.com/tempImages/2.jpg',
      duration: '0:10',
      plan: 'Expert',
      price: '$5',
      features: {
        has4k: false
      },
      parentId: 1
    }

    const results = new DataAdapter(TWO_TEMPS_AND_ONE_GROUP);

    expect(results.templatesArray[0]).toEqual(expectedObject);
  });

  it('creates the expected object for a template group', () => {
    const expectedObject = {
      id: 1,
      tags: ['Free Plan Templates', 'Intros'],
      name: 'I\'m a group',
      image: 'https://flixpress.com/tempImages/1.jpg',
      duration: '0:26',
      plan: 'Free',
      price: '$0',
      features: {
        has4k: false
      },
      type: 'Images',
      children: [2]
    }

    const results = new DataAdapter(TWO_TEMPS_AND_ONE_GROUP);

    expect(results.templateGroupsArray[0]).toEqual(expectedObject);
  });

  it('returns the non-child templates with the .getTemplates() method', () => {
    const results = new DataAdapter(TWO_TEMPS_AND_ONE_GROUP);
    const expectedObject = {
      id: 4,
      tags: ['Intros', 'Intros'],
      name: 'I\'m a template',
      type: 'Images',
      image: 'https://flixpress.com/tempImages/4.jpg',
      duration: '0:10',
      plan: 'Expert',
      price: '$5',
      features: {
        has4k: false
      }
    };

    expect(results.getTemplates()).toEqual([expectedObject]);
  });
  it('returns the template groups with the .getTemplateGroups() method', () => {
    const results = new DataAdapter(TWO_TEMPS_AND_ONE_GROUP);
    const expectedObject = {
      id: 1,
      tags: ['Free Plan Templates', 'Intros'],
      name: 'I\'m a group',
      image: 'https://flixpress.com/tempImages/1.jpg',
      duration: '0:26',
      plan: 'Free',
      price: '$0',
      features: {
        has4k: false
      },
      type: 'Images',
      children: [{
        id: 2,
        tags: ['Intros', 'Intros'],
        name: 'I\'m a template',
        type: 'Images',
        image: 'https://flixpress.com/tempImages/2.jpg',
        duration: '0:10',
        plan: 'Expert',
        price: '$5',
        features: {
          has4k: false
        },
        parentId: 1
      }]
    }

    expect(results.getTemplateGroups()).toEqual([expectedObject]);
  });
});