/**
 * Задание:
 * Используйте модуль streams для программы простой индексации текста. Она должна:
 * 1. Читать текстовый файл переданный в аргументах к скрипту
 * 2. Разделять входные данные на отдельные слова, разделенные разделителем (пробел, символ новой строки)
 * 3. Фильтровать не-текстовые символы (например, ',')
 * 4. Индексировать текст в вектор - массив чисел. Позиция в массиве представляет порядок всех входных слов, 
 * 		отсортированных в алфавитном порядке. Значение - это количество появлений определенного слова в тексте.
 * 5. Вывести результирующий вектор в файл.
 */

const fs 			= require('node:fs');
const { Transform } = require('node:stream');
const path 			= require('node:path');
const { log } = require('node:console');

const createFileOfWordsMatch = (a_strFilePath) => {

	const getWordsArray = (a_strDataChunk) => {
		const wordRegex = /[a-zA-Zа-яА-Я]+/g;
		return a_strDataChunk.match(wordRegex);
	};

	const sortAlphabetically = (a_aWords) => {
		if (a_aWords === null)
			return [];
		else
			return a_aWords.map(strWord => strWord.toLowerCase())
						.sort((a, b) => a.localeCompare(b));
	};

	const getWordsMatchesArray = (a_aWords) => {
		return a_aWords.reduce((aAcc, strWord, nInd, aArray) => {
			if (nInd === 0 || strWord !== aArray[nInd - 1])
				aAcc.push(1);
			else
				aAcc[aAcc.length - 1]++;

			return aAcc;
		}, []);
	};
	
	const pTransformPartOne = new Transform({
		transform(chunk, encoding, callback)
		{
			let strDataChunk 	= chunk.toString();
			const aWords 		= getWordsArray(strDataChunk);
			this.push(aWords.join(','));
			callback();
		}
	})

	const pTransformPartTwo = new Transform({
		transform(chunk, encoding, callback)
		{
			let strDataChunk 	= chunk.toString();
			const aWordsMatches = getWordsMatchesArray(sortAlphabetically(strDataChunk.split(",")));
			this.push(`[${aWordsMatches.join(',')}]`);
			callback();
		}
	})

	const pReadableStream 	= fs.createReadStream(a_strFilePath, 'utf-8');
	const strWriteFilePath  = path.join(path.dirname(a_strFilePath), 'wordsmatches.txt');
	// Создание файла перед открытием потока на запись:
	fs.open(strWriteFilePath, 'w', () => {});
	const pWritableStream 	= fs.createWriteStream(strWriteFilePath);

	pReadableStream
		.pipe(pTransformPartOne)
		.pipe(pTransformPartTwo)
		.pipe(pWritableStream);
};

module.exports = createFileOfWordsMatch;