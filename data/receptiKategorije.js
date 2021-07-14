import Category from '../models/category';
import Meal from '../models/meal';

export const CATEGORIES = [
	new Category('c1', 'Dorucak', '#f5428d'),
	new Category('c2', 'Rucak', '#f54242'),
	new Category('c3', 'Uzina', '#f5a442'),
	new Category('c4', 'Vecera', '#f5d142'),
	new Category('c5', 'Slatkisi', '#368dff'),
	new Category('c6', 'Keto Namazi', '#f5428d')
];

export const MEALS = [
	new Meal(
		'm1',
		['c1'],
		'Jaja s parmezanom',
		'Lako dostupno',
		'jednostavno',
		'http://ketorecepti.com/wp-content/uploads/2019/11/0001-18-1024x576-1024x585.jpg',
		15,
		[
			'2-3 jajeta',
			'parmezan',
			'so i bibier'
		],
		[
			'stavite jaja u posudu sa hladnom vodom i skuvajte ih',
			'kuvajte jaja oko 6 minuta (meko kuvana) ili 10-15 minuta tvrdo kuvana',
			'nakon kuvanja stavite ih u hladnu vodu da se ohlade',
			'skinite koru sa jaja i presecite ih na pola',
			'začinite ih i pospite parmezanom'
		],
		[
			'Enrgetska vrednost: 870kcal',
			'Masti: 59g',
			'Ugljenihidrati: 6.40g - od toga šećeri 0.00g',
			'vrednosti su okvirne i odnose se na jedno jaje'	
		],
		true,
		false,
		true,
		false,
		
	),
	new Meal(
		'm2',
		['c2', 'c4'],
		'Paprike sa sirom i slaninom',
		'Lako dostupno',
		'jednostavno',
		'https://ketoishrana.com/templates/yootheme/cache/Webpnet-resizeimage-7c1aaa2b.webp',
		45,
		[
			'6 manjih paprika - babura',
			'500g krem sira',
			'150g cheddar sira',
			'trakice slanine',
			'so'
		],
		[
			'očistiti paprike i presći ih na pola',
			'kremsir izmešati sa cheddar sirom (izrendan ili isečen na kockice) i malo posoliti',
			'iseći slaninu na trakice',
			'polovine papire puniti sirom koji je prethodno pripremljen',
			'umotati papriku u slaninu i zabosti čačkalicu da drži',
			'peći na 200 stepeni dok papirika ne bude pečena i slanina hrskava'
		],
		[
			'Enrgetska vrednost: 900kcal',
			'Masti: 402.83g',
			'Ugljenihidrati: 46.64g - od toga šećeri 19g',
			'vrednosti su okvirne i uračunavaju svih 6 paprika'			
		],
		true,
		false,
		false,
		false,		
	)
];