import fs from 'fs-extra';
import path from 'path';
import {describe, test, beforeAll, afterAll, expect} from '@jest/globals';
import { createFileOfWordsMatch } from './main.js';

describe('createFileOfWordsMatch', () => {
	let strTestFilePath;

	beforeAll(() => {
		// Создаем временную директорию для хранения временных файлов
		fs.ensureDirSync('./test');
		// Генерируем временное имя файла
		strTestFilePath = path.join(__dirname, 'test', 'testFile.txt');

	});

	afterAll(() => {
		// Удаляем временные файлы и директорию после завершения тестов
		fs.removeSync(strTestFilePath);
		fs.removeSync('./test');
	});

	test('Функция должна возвращать массив чисел', async () => {
		const testData = 'Мама мама мама мыла раму раму';
		const strExpected = '3 1 2';
		
		fs.writeFileSync(strTestFilePath, testData, 'utf-8');

		await createFileOfWordsMatch(strTestFilePath);

		let strFileContent = fs.readFileSync(tempFilePath, 'utf-8');

		expect(strFileContent).toEqual(strExpected);
	});
});

