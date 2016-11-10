const copyPasteVal = `1	Lots of Text	0	Free Plan Templates	Intros	26 seconds	Free	Images
2	World Intro	0	Free Plan Templates	Intros	10 seconds	Free	Images
3	Tech Puzzle	2	Slideshow	Slideshow	52 seconds	Personal	Images
4	Envelope Photos	1	Slideshow	Slideshow	66 seconds	Personal	Images
5	Clean Impact	3	Animated Promo	Animated Promo	41 seconds	Personal	Images
7	Christmas Tree	2	Slideshow	Slideshow	60 seconds	Personal	Images
8	Art Gallery	2	Slideshow	Slideshow	66 seconds	Expert	Images
10	Chain Reaction	0	Intros	Intros	19 seconds	Personal	Images
12	Space Grid	2	Slideshow	Slideshow	70 seconds	Personal	Images
13	Box Shuffle	0	Intros	Intros	15 seconds	Personal	Images
19	Special Words	1	Special Occasions	Special Occasions	20 seconds	Personal	Images
20	Robotic X-form	0	Intros	Intros	17 seconds	Personal	Images
23	Teams Vs Team	0	Intros	Intros	10 seconds	Personal	Images
31	Cinema Intro	0	Free Plan Templates	Intros	10 seconds	Free	TextOnly
32	Gaming Intro 1	1	Intros	Intros	11 seconds	Personal	TextOnly
33	Cinema Intro 2	1	Intros	Intros	12 seconds	Personal	TextOnly
35	Pro Intro 1	2	Intros	Intros	8 seconds	Personal	Images
36	Game Intro 2	1	Intros	Intros	10 seconds	Personal	TextOnly
37	Falling Words	1	Intros	Intros	15 seconds	Personal	TextOnly
38	Exploding Block	1	Intros	Intros	10 seconds	Personal	TextOnly
39	Mining Word	2	Intros	Intros	10 seconds	Personal	TextOnly
40	Pro Presenter	4	Multi-Layout	Multi-Layout	variable	Expert	Slides
42	Music Intro	0	Free Plan Templates	Intros	13 seconds	Free	TextOnly
43	Love Show	1	Special Occasions	Special Occasions	30 seconds	Expert	Images
44	Game Intro 3	3	Intros	Intros	12 seconds	Personal	TextOnly
45	TV Shatter 	3	Intros	Intros	10 seconds	Expert	Images
47	Digits Intro	2	Intros	Intros	10 seconds	Personal	TextOnly
49	Gaming Intro 4	3	Intros	Intros	11 seconds	Personal	TextOnly
50	Hands Intro	2	Intros	Intros	8 seconds	Expert	TextOnly
51	Cubism Intro	2	Intros	Intros	8 seconds	Expert	Images
53	Digimpact Pro	5	Multi-Layout	Multi-Layout	Variable Timing	Expert	Slides
54	Sci-Fi Intro	3	Intros	Intros	10 seconds	Personal	Images
55	Spooky Fest	5	Pranks/Gags	Pranks/Gags	60 seconds	Personal	Images
56	Gaming XL	5	Intros	Intros	15 Seconds	Personal	Images
59	Christmas Card	4	Special Occasions	Special Occasions	15 seconds	Personal	Images
60	Gaming XL2	5	Intros	Intros	15 seconds	Personal	Images
61	Multi-Person Ad	70	Ads	Ads	30 Seconds	Business	TextOnly
62	Simplicity	3	Intros	Intros	10 seconds	Personal	TextOnly
63	Fire Forge Intro	4	Intros	Intros	10 seconds	Expert	TextOnly
64	Epic Intro	5	Intros	Intros	12 seconds	Expert	Images
65	Neon Intro	4	Intros	Intros	10 seconds	Expert	TextOnly
66	Gaming XL3	5	Intros	Intros	10 seconds	Personal	Images
67	White Angle	3	Intros	Intros	10 seconds	Personal	Images
68	Pro Solutions Ad	25	Ads	Ads	30 seconds	Expert	Images
69	BigCity Intro	4	Intros	Intros	10 seconds	Personal	Images
70	CubePop Intro	3	Intros	Intros	11 seconds	Personal	Images
71	Explainer ProA	25	Multi-Layout	Multi-Layout	Variable Timing	Business	Slides
73	Explainer ProB	25	Multi-Layout	Multi-Layout	Variable timing	Business	Slides
74	Text Customization Demo	0	Intros	Intros	10 seconds	Personal	TrialTextOnly
75	Image Customization Demo	0	Intros	Intros	10 seconds	Personal	TrialImages
76	City HQ Intro	8	Intros	Intros	10 seconds	Expert	Images
77	Glamour Intro	8	Intros	Intros	10 seconds	Personal	Images
78	Cat Ad Pro	30	Ads	Ads	30 seconds	Expert	TextOnly
79	Flex Intro	5	Intros	Intros	10 seconds	Expert	TextOnly
81	CityHQ Pro	35	Multi-Layout	Multi-Layout	Variable Timing	Expert	Slides
82	Problem Ad	40	Ads	Ads	30 seconds	Business	Images
83	Stellar Intro	6	Intros	Intros	13 seconds	Expert	TextOnly
84	Xform Intro	7	Intros	Intros	10 seconds	Expert	TextOnly
85	Compete Intro	5	Intros	Intros	10 seconds	Expert	Images`

const individualLines = copyPasteVal.match(/[^\r\n]+/g);

function getParams (line) {
  return line.match(/[^\t]+/g);
}

let idCounter = 1;
function createTemplate (id, name, priceInt, cat1, cat2, duration, plan, type) {
  id = id ? id : idCounter + 1;
  idCounter = id;
  duration = typeof duration === 'string' ? duration : durToSring(duration);
  return {
    id: id,
    tags: [cat1, cat2],
    name: name,
    type: type || 'TextOnly',
    image: 'https://flixpress.com/tempImages/' + id + '.jpg',
    duration: duration,
    plan: plan || 'Free',
    price: '$' + priceInt,
    features: {
      has4k: false
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