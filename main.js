/**
 * Задание:
 * Написать алгоритм и функцию getPath(), находяющую уникальный css-селектор для элемента в документе.
 * Уникальный селектор может быть использован document.querySelector() и возвращать исходный элемент.
 * Так чтобы document.querySelectorAll(), вызванный с этим селектором, 
 * не должен находить никаких элементов, кроме исходного.
 */

let pHTMLElement = document.querySelector('#radio1');

function getPath(a_pHTMLElement)
{
	if (a_pHTMLElement === null || a_pHTMLElement.tagName === 'HTML')
		return '';

	const MAIN_PARENT_TAG 			= 'body';
	let strCurrentElementTagName 	= a_pHTMLElement.tagName.toLowerCase();

	if (strCurrentElementTagName !== MAIN_PARENT_TAG)
	{
		// Получаем родительский элемент текущего элемента:
		let pCurrentElementParent 		= a_pHTMLElement.parentNode;
		// Получаем массив дочерних элементов у родительского элемента:
		let aCurrentParentsChildrens 	= Array.from(pCurrentElementParent.children);
		// Находим индекс текущего элемента в массиве дочерних элементов у родительского элемента:
		let nCurrentElementIndex 	= aCurrentParentsChildrens.indexOf(a_pHTMLElement);
		// Перевызываем функцию и передаем в нее родительский элемент текущего элемента:
		return getPath(pCurrentElementParent) + 
			` ${strCurrentElementTagName}:nth-child(${nCurrentElementIndex + 1})`;
	}
	else
		return 'body';
}

console.log(getPath(pHTMLElement));

module.exports = getPath;