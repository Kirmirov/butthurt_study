const fs = require("fs/promises");
const mock = require("mock-fs");
const path = require("path");
const createFileOfWordsMatch = require("./main.js");

describe("createFileOfWordsMatch", () => {
  beforeAll(() => {
    const virtualFS = {
      "./output": {
        "testFile.txt": "",
      },
    };

    mock(virtualFS);

    // virtualDirPath = 'test'; // Путь к созданной виртуальной директории
    // virtualFilePath = path.join(virtualDirPath, 'testFile.txt'); // Путь до созданного mock-fs файла
  });
  afterAll(() => {
    mock.restore();
  });

  test("Тестируемая функция должна создавать файл и записывать в него значения", async () => {
    // Ожидаемое содержимое
    const expectedContent = "[2,3,4,1]";
    const contentToWrite =
      "Мама мама мыла,.. мыла./. @@мыла$ ***раму $$334раму раму рмау раму";

    // Записываем данные в созданный файл в виртуальной директории
    await fs.writeFile("./output/testFile.txt", contentToWrite);
    // Вызываем тестируемую функцию, передавая путь к созданному файлу
    await createFileOfWordsMatch("./output/testFile.txt", "./output");
    // Путь к файлу, созданному тестируемой функцией
    const resultFilePath = path.join("./output", "wordsmatches.txt");

    // Читаем содержимое созданного файла
    const fileContent = await fs.readFile("./output/wordsmatches.txt", "utf-8");

    // Проверяем, что содержимое совпадает с ожидаемым
    await expect(fileContent).toBe(expectedContent);
  });
});
