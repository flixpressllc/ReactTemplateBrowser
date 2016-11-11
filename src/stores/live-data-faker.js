import { padLeft } from '../helpers/StringHelpers';

const copyPasteVal = `1	Lots of Text	0	Free Plan Templates	Intro	26 seconds	Free	TextOnly
2	World Intro	0	Free Plan Templates	Intro	10 seconds	Free	TextOnly
3	Tech Puzzle	6	Slideshow	Slideshow	52 seconds	Personal	Images
4	Envelope Photos	5	Slideshow	Slideshow	66 seconds	Personal	Images
5	Clean Impact	6	Promo	Promo	41 seconds	Personal	Images
7	Christmas Tree	6	Slideshow	Slideshow	60 seconds	Personal	Images
8	Art Gallery	6	Slideshow	Slideshow	66 seconds	Expert	Images
10	Chain Reaction	0	Free Plan Templates	Free Plan Templates	19 seconds	Free	Images
12	Space Grid	8	Slideshow	Slideshow	70 seconds	Personal	Images
13	Box Shuffle	0	Free Plan Templates	Intro	15 seconds	Free	Images
19	Special Words	4	Special Occasions	Special Occasions	20 seconds	Personal	Images
20	Robotic X-form	0	Free Plan Templates	Intro	17 seconds	Free	Images
23	Teams Vs Team	4	Intro	Intro	10 seconds	Personal	Images
31	Cinema Intro	0	Free Plan Templates	Intro	10 seconds	Free	TextOnly
32	Gaming Intro 1	4	Intro	Intro	11 seconds	Personal	TextOnly
33	Cinema Intro 2	4	Intro	Intro	12 seconds	Personal	TextOnly
35	Pro Intro 1	4	Intro	Intro	8 seconds	Personal	Images
36	Game Intro 2	6	Intro	Intro	10 seconds	Personal	TextOnly
37	Falling Words	4	Intro	Intro	15 seconds	Personal	TextOnly
38	Exploding Block	4	Intro	Intro	10 seconds	Personal	TextOnly
39	Mining Word	4	Intro	Intro	10 seconds	Personal	TextOnly
40	Pro Presenter	15	Pro Templates	Pro Templates	variable	Expert	Slides
42	Music Intro	0	Free Plan Templates	Intro	13 seconds	Free	TextOnly
43	Love Show	6	Special Occasions	Special Occasions	30 seconds	Expert	Images
44	Game Intro 3	6	Intro	Intro	12 seconds	Personal	TextOnly
45	TV Shatter 	6	Intro	Intro	10 seconds	Expert	Images
47	Digits Intro	6	Intro	Intro	10 seconds	Personal	TextOnly
49	Gaming Intro 4	6	Intro	Intro	11 seconds	Personal	TextOnly
50	Hands Intro	6	Intro	Intro	8 seconds	Expert	TextOnly
51	Cubism Intro	6	Intro	Intro	8 seconds	Expert	Images
53	Digimpact Pro	10	Pro Templates	Pro Templates	Variable Timing	Expert	Slides
54	Sci-Fi Intro	6	Intro	Intro	10 seconds	Personal	Images
55	Spooky Fest	8	Pranks/Gags	Pranks/Gags	60 seconds	Personal	Images
56	Gaming XL	8	Intro	Intro	15 Seconds	Personal	Images
59	Christmas Card	6	Special Occasions	Special Occasions	15 seconds	Personal	Images
60	Gaming XL2	7	Intro	Intro	15 seconds	Personal	Images
61	Multi-Person Ad	70	Ads	Ads	30 Seconds	Business	TextOnly
62	Simplicity	6	Intro	Intro	10 seconds	Personal	TextOnly
63	Fire Forge Intro	8	Intro	Intro	10 seconds	Expert	TextOnly
64	Epic Intro	8	Intro	Intro	12 seconds	Expert	Images
65	Neon Intro	8	Intro	Intro	10 seconds	Expert	TextOnly
66	Gaming XL3	8	Intro	Intro	10 seconds	Personal	Images
67	White Angle	6	Intro	Intro	10 seconds	Personal	Images
68	Pro Solutions Ad	25	Ads	Ads	30 seconds	Expert	Images
69	BigCity Intro	6	Intro	Intro	10 seconds	Personal	Images
70	CubePop Intro	6	Intro	Intro	11 seconds	Personal	Images
71	Explainer ProA	30	Pro Templates	Pro Templates	Variable Timing	Business	Slides
73	Explainer ProB	30	Pro Templates	Pro Templates	Variable timing	Business	Slides
74	Text Customization Demo	0	Intro	Intro	10 seconds	Personal	TrialTextOnly
75	Image Customization Demo	0	Intro	Intro	10 seconds	Personal	TrialImages
76	City HQ Intro	8	Intro	Intro	10 seconds	Expert	Images
77	Glamour Intro	8	Intro	Intro	10 seconds	Personal	Images
78	Cat Ad Pro	30	Ads	Ads	30 seconds	Expert	TextOnly
79	Flex Intro	8	Intro	Intro	10 seconds	Expert	TextOnly
81	CityHQ Pro	30	Pro Templates	Pro Templates	Variable Timing	Expert	Slides
82	Problem Ad	40	Ads	Ads	30 seconds	Business	Images
83	Stellar Intro	8	Intro	Intro	13 seconds	Expert	TextOnly
84	Xform Intro	10	Intro	Intro	10 seconds	Expert	TextOnly
85	Compete Intro	10	Intro	Intro	10 seconds	Expert	Images
86	Wealth Intro	8	Intro	Intro	10 seconds	Expert	Images
87	Groundbreaking Intro	8	Intro	Intro	10 seconds	Personal	Images
88	Splash Intro	8	Intro	Intro	12 seconds	Personal	TextOnly
89	Gallery HQ	10	Slideshow	Slideshow	60 seconds	Expert	Images
90	SkyWall Intro	8	Intro	Intro	10 seconds	Personal	Images
91	Earth Intro	10	Intro	Intro	12 seconds	Personal	TextOnly
92	Slideshow Flex	8	Slideshow	Slideshow	54 seconds	Expert	Images
93	Tech Cubes Intro	12	Intro	Intro	13 seconds	Expert	Images
94	Groundbreak II Intro	12	Intro	Intro	15 seconds	Expert	Images
95	Pro Presenter Demo	0	Free Plan Templates	Free Plan Templates	Flexible	Free	Slides
96	Image Impact Intro	7	Intro	Intro	5 Seconds	Personal	Images
98	Fire Intro VF (beta)	8	Intro	Intro	7 seconds	Personal	TextOnly
102	Live City Intro	7	Intro	Intro	7 seconds	Expert	Images`

const individualLines = copyPasteVal.match(/[^\r\n]+/g);

const tempsWith4k = [85,84,83,79,65,64,51,50];

function getParams (line) {
  return line.match(/[^\t]+/g);
}

function createTemplate (id, name, priceInt, cat1, cat2, duration, plan, type) {
  duration = durString(duration);
  return {
    id: id,
    tags: [cat1, cat2],
    name: name,
    type: type,
    image: 'https://flixpress.com/tempImages/' + id + '.jpg',
    duration: duration,
    plan: plan,
    price: '$' + priceInt,
    features: {
      has4k: has4k(id)
    }
  }
};

function has4k (id) {
  return tempsWith4k.indexOf(parseInt(id,10)) !== -1;
}

function durString (string) {
  if (string.indexOf('econds') !== -1) {
    let numberString = string.split(' ')[0];
    return durToString(parseInt(numberString, 10));
  }
  return string.split(' ')[0];
}

function durToString (int) {
  var minutes = Math.floor(int / 60);
  var seconds = int % 60;
  return `${minutes}:${padLeft(seconds,'0',2)}`
}

function create_list () {
  let finalTemplates = [];
  individualLines.forEach(function(line) {
    let args = getParams(line);
    if (args[args.length -1 ].indexOf('Trial') === -1){
      finalTemplates.push(createTemplate.apply(this, args));
    }
  }, this);
  return finalTemplates;
}

export default create_list();