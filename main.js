/**
 *  Задача: Напишите функцию tree(), которая принимает в качестве аргумента иерархический объект со 
 * 	свойствами name, items и выводит структурированный вывод дерева в консоль.
 */

const pMokeObject = {
	"name": 1,
	"items": 
	[
		{
			"name": 2,
			"items": 
			[
				{ "name": 3 }, 
				{ "name": 4 }
			]
		}, 
		{
			"name": 5,
			"items": [{ "name": 6 }]
		}
	]
};

const tree = (a_pObject, a_nLevel = 0, a_fIsLast = true, strIndent = "") => {

	const strSplitter = a_nLevel > 0 ? (a_fIsLast ? "└── " : "├── ") : "";

	console.log(`${strIndent}${strSplitter}${a_pObject.name}`);

	if (a_pObject.hasOwnProperty('items') && Array.isArray(a_pObject.items)) 
	{
		for (let nInt = 0; nInt < a_pObject.items.length; nInt++) 
		{
			const fIsLastItem = nInt === a_pObject.items.length - 1;
			const strNewIndent = a_nLevel > 0 ? (strIndent + (a_fIsLast ? "    " : "│   ")) : "";
			tree(a_pObject.items[nInt], a_nLevel + 1, fIsLastItem, strNewIndent);
		}
	}
};

tree(pMokeObject);
  
  

