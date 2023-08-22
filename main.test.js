const fsp 	= require('fs/promises');
const fs 	= require('fs');
const mock 	= require('mock-fs');
const createFileOfWordsMatch = require('./main.js');

describe('createFileOfWordsMatch', () => {

	beforeAll(() => {
		mock({
			"./output": {
				"testFile.txt": "",
			},
		});
	});

	afterAll(() => {
		mock.restore();
	});

	it('должна создавать файл с именем wordsmatches.txt в директории переданного пути', async () => {

		await createFileOfWordsMatch("./output/testFile.txt");

        // Путь к файлу созданному функцией:
        const strCreatedFilePath = './output/wordsmatches.txt';

        // Проверяем что файл был создан:
        expect(fs.existsSync(strCreatedFilePath)).toBe(true);
    });

	it('должна фильтровать не-текстовые символы и цифры', async () => {
		const strExpectedContent	= '[]';
		const strContentToWrite 	= '1234567890!"№;%::?*(){}[]+_-=.,":;`';

		// Записываем данные в созданный файл в виртуальной директории:
		await fsp.writeFile("./output/testFile.txt", strContentToWrite);

		// Вызываем тестируемую функцию, передавая путь к созданному файлу
		await createFileOfWordsMatch("./output/testFile.txt");

		// Читаем содержимое созданного файла
		const strFileContent = await fsp.readFile("./output/wordsmatches.txt", 'utf-8');

		// Проверяем что содержимое совпадает с ожидаемым
		expect(strFileContent).toBe(strExpectedContent);
	});

	it('должна индексировать текст в вектор - массив чисел', async () => {
		const strExpectedContent	= '[2,2,2]';
		const strContentToWrite 	= 'Мама мама мыла мыла раму раму';

		// Записываем данные в созданный файл в виртуальной директории:
		await fsp.writeFile("./output/testFile.txt", strContentToWrite);

		// Вызываем тестируемую функцию, передавая путь к созданному файлу:
		await createFileOfWordsMatch("./output/testFile.txt");

		// Читаем содержимое созданного файла:
		const strFileContent = await fsp.readFile("./output/wordsmatches.txt", 'utf-8');

		// Проверяем что содержимое совпадает с ожидаемым:
		expect(strFileContent).toBe(strExpectedContent);
	});

	it('должна индексировать текст в вектор - массив чисел. усложненный вариант', async () => {
		const strExpectedContent	= '[2,2,2]';
		const strContentToWrite 	= 'Мама222 ;;мама %%мыла::мыла;№ раму!!раму';

		// Записываем данные в созданный файл в виртуальной директории:
		await fsp.writeFile("./output/testFile.txt", strContentToWrite);

		// Вызываем тестируемую функцию, передавая путь к созданному файлу:
		await createFileOfWordsMatch("./output/testFile.txt");

		// Читаем содержимое созданного файла:
		const strFileContent = await fsp.readFile("./output/wordsmatches.txt", 'utf-8');

		// Проверяем что содержимое совпадает с ожидаемым:
		expect(strFileContent).toBe(strExpectedContent);
	});
	
});

