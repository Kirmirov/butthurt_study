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

const fs 			= require('fs');
const { Transform } = require('stream');
const path 			= require('path');

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

	const pReadableStream 	= fs.createReadStream(a_strFilePath, 'utf-8');
	const strWriteFilePath  = path.join(path.dirname(a_strFilePath), 'wordsmatches.txt');
	// Создание файла перед открытием потока на запись:
	fs.open(strWriteFilePath, 'w', () => {});
	const pWritableStream 	= fs.createWriteStream(strWriteFilePath);
	const pTransformStream  = new Transform({
		transform(chunk, encoding, callback) 
		{
			let strDataChunk 	= chunk.toString();
			const aWords 		= getWordsArray(strDataChunk);
			const aWordsMatches = getWordsMatchesArray(sortAlphabetically(aWords));
			this.push(`[${aWordsMatches.join(',')}]`);
			callback();
		}
	});

	pReadableStream.pipe(pTransformStream).pipe(pWritableStream);
};



module.exports = createFileOfWordsMatch;

