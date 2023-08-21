const fs 	= require('fs-extra');
const mock 	= require('mock-fs');
const path 	= require('path');
const createFileOfWordsMatch = require('./main.js');

describe('createFileOfWordsMatch', () => {
    let virtualDirPath;
    let virtualFilePath;

    beforeAll(() => {
        const virtualFS = {
            test: {
                'testFile.txt': 'initial content'
            }
        };

        mock(virtualFS);

        virtualDirPath = 'test'; // Путь к созданной виртуальной директории
        virtualFilePath = path.join(virtualDirPath, 'testFile.txt'); // Путь до созданного mock-fs файла
    });

    test('Тестируемая функция должна создавать файл и записывать в него значения', async () => {
		// Ожидаемое содержимое
		const expectedContent 	= '[2,3,4,1]';
        const contentToWrite 	= 'Мама мама мыла,.. мыла./. @@мыла$ ***раму $$334раму раму рмау раму';

        // Записываем данные в созданный файл в виртуальной директории
        await fs.writeFileSync(virtualFilePath, contentToWrite);

        // Вызываем тестируемую функцию, передавая путь к созданному файлу
        await createFileOfWordsMatch(virtualDirPath);

        // Путь к файлу, созданному тестируемой функцией
        const resultFilePath = path.join(virtualDirPath, 'wordsmatches.txt');

        // Читаем содержимое созданного файла
        const fileContent = await fs.readFileSync(resultFilePath, 'utf-8');

        // Проверяем, что содержимое совпадает с ожидаемым
        await expect(fileContent).toBe(expectedContent);
    });

	afterAll(() => {
        mock.restore();
    });
});

