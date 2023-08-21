const fs = require('fs-extra');
const path = require('path');
const createFileOfWordsMatch = require('./main.js');

describe('createFileOfWordsMatch', () => {
	let strTestFilePath;

	beforeAll(() => {
		// Создаем временную директорию для хранения временных файлов
		fs.ensureDirSync('test');
		// Генерируем временное имя файла
		strTestFilePath = path.join(__dirname, 'test', 'testFile.txt');

	});

	afterAll(() => {
		// Удаляем временные файлы и директорию после завершения тестов
		fs.removeSync('test');
	});

	test('Функция должна создавать файл', async () => {
		
		const strTestData 		= 'Мама мама мыла,.. мыла./. @@мыла$ ***раму $$334раму раму рмау раму';
		const strExpected 		= '[2,3,4,1]';
		// записываем данные в тестовый файл
		await fs.outputFile(strTestFilePath, strTestData);
		// читаем данные из тестового файла и создаем новый файл
		await createFileOfWordsMatch(strTestFilePath);

		const resultFilePath = path.join(__dirname, 'test', 'wordsmatches.txt');

		const strFileContent = await fs.readFile(resultFilePath, 'utf-8');

		expect(strExpected).toBe(strFileContent);

	});

	


});

