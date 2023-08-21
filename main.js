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

import fs from 'fs';

export const createFileOfWordsMatch = (a_strFilePath) => {

	const getWordsArray = (a_strDataChunk) => {
		const wordRegex = /[a-zA-Zа-яА-Я]+/g;
		return a_strDataChunk.match(wordRegex);
	};

	const sortAlphabetically = (a_aWords) => {
		return a_aWords
						.map(strWord => strWord.toLowerCase())
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

	const readableStream 	= fs.createReadStream(a_strFilePath, 'utf-8');
	const writableStream 	= fs.createWriteStream('wordsmatch.txt');
	let aWords 				= [];
	
	readableStream.on('data', (chunk) => {
		aWords = [...aWords, ...getWordsArray(chunk)];
	});

	readableStream.on('end', () => {
		let aWordsMatches;
		aWordsMatches = getWordsMatchesArray(sortAlphabetically(aWords));
		writableStream.write(aWordsMatches.join(' '));
		writableStream.end();
	});

	writableStream.on('finish', () => {
		console.log('Запись данных завершена.');
	});
}
 

createFileOfWordsMatch('files/test.txt');

