/**
 *  Задача: Напишите функцию tree(), которая принимает в качестве аргумента иерархический объект со 
 * 	свойствами name, items и выводит структурированный вывод дерева в консоль.
 */

const pObject = {
	"name": 1,
	"items": [
		{
			"name": 2,
			"items": [
				{ "name": 3 }, 
				{ "name": 4 }
			]
		}, 
		{
			"name": 5,
			"items": [
				{ "name": 6 }
			]
		}
	]
}

const tree = (a_pObject, a_nLevel = 0) => {

	console.log(" ".repeat(a_nLevel * 4) + a_pObject.name);

	if (Array.isArray(a_pObject.items)) {
		for (const pItem of a_pObject.items) {
			tree(pItem, a_nLevel + 1);
		}
	}

}

tree(pObject);