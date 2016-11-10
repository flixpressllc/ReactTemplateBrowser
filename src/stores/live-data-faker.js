const templateData = [
  // {
  //   name: 'NAME',
  //   price: 500,
  //   duration: 27,
  //   plan: 'Personal',
  //   type: TYPE,
  //   has4k: false
  // },
  {
    name: 'Lots of Text',
    price: 0,
    duration: 25,
  },
  {
    name: 'World Intro',
    price: 0,
    duration: 10,
  },
  {
    name: 'Tech puzzle',
    price: 6,
    duration: 52,
    plan: 'Personal',
    type: 'Images',
  },
  {
    name: 'Envelope Photos',
    price: 5,
    duration: 66,
    plan: 'Personal',
    type: 'Images',
  },
  {
    name: 'Clean Impact',
    price: 6,
    duration: 40,
    plan: 'Personal',
    type: 'Images',
  },
  {
    name: 'Christmas Tree',
    price: 6,
    duration: 60,
    plan: 'Personal',
    type: 'Images',
    id: 7
  },
  {
    name: 'Art Gallery',
    price: 6,
    duration: 66,
    plan: 'Expert',
    type: 'Images',
  },
  {
    name: 'Chain Reaction',
    price: 0,
    duration: 19,
    plan: 'Free',
    type: 'Images',
    id: 10
  },
  {
    name: 'Space Grid',
    price: 8,
    duration: 70,
    plan: 'Personal',
    type: 'Images',
    id: 12
  },
  {
    name: 'Box Shuffle',
    duration: 15,
    plan: 'Free',
    price: 0,
    type: 'Images',
  },
  {
    name: 'Special Words',
    duration: 19,
    plan: 'Personal',
    price: 4,
    type: 'Images',
    id:19
  },
  {
    name: 'Robotic X-form',
    duration: 16,
    plan: 'Free',
    price: 0,
    type: 'Images',
  },
  {
    name: 'Teams Vs Team',
    duration: 10,
    plan: 'Personal',
    price: 4,
    type: 'Images',
    id: 23
  },
  {
    name: 'Cinema Intro',
    duration: 10,
    plan: 'Free',
    price: 0,
    id: 31
  },
  {
    name: 'Gaming Intro 1',
    duration: 10,
    plan: 'Personal',
    price: 4,
  },
  {
    name: 'Cinema Intro 2',
    duration: 12,
    plan: 'Personal',
    price: 4,
  },
  {
    name: 'Pro Intro 1',
    duration: 8,
    plan: 'Personal',
    price: 4,
    type: 'Images',
    id: 35
  },
  {
    name: 'Game Intro 2',
    duration: 10,
    plan: 'Personal',
    price: 6,
  },
  {
    name: 'Falling Words',
    duration: 15,
    plan: 'Personal',
    price: 4,
  },
  {
    name: 'Exploding Block',
    duration: 10,
    plan: 'Personal',
    price: 4,
  },

];

let idCounter = 1;
function createTemplate (name, priceInt, duration, plan, type, tags, has4k, id) {
  id = id ? id : idCounter + 1;
  idCounter = id;
  duration = typeof duration === 'string' ? duration : durToSring(duration);
  return {
    id: id,
    tags: tags || [],
    name: name,
    type: type || 'TextOnly',
    image: 'https://flixpress.com/tempImages/' + id + '.jpg',
    duration: '0:23',
    plan: plan || 'Free',
    price: '$' + priceInt,
    features: {
      has4k: !!has4k
    }
  }
};

function durToSring (int) {
  var minutes = Math.floor(int / 60);
  var seconds = int % 60;
  return `${minutes}:${str_pad_left(seconds,'0',2)}`
}

function str_pad_left(string,pad,length) {
  return (new Array(length+1).join(pad)+string).slice(-length);
}

function getTemplate (o) {
  return createTemplate(o.name, o.price, o.duration, o.plan, o.type, o.tags, o.has4k, o.id);
}

function create_list () {
  let finalTemplates = [];
  templateData.forEach(function(element) {
    finalTemplates.push(getTemplate(element));
  }, this);
  console.log(finalTemplates)
  return finalTemplates;
}

export default create_list();