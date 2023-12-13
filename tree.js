/**
 * Задание :
 * Напишите NodeJS скрипт tree для вывода списка файлов и папок файловой системы.
 * Приложение должно принимать аргумент каталога для анализа и флаг --depth, -d с номером глубины 
 * директорий. Результатом является вывод данных в структурированном виде дерева. 
 * Вызовы файловой системы должны быть асинхронными.
 */

// Для вызова из кс указать node tree.js --directore /путь/к/файлу --depth (или -d) номер глубины

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const yargs = require('yargs');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const tree = async () => {

	const createTree = async (strDir, nCurrentDepth, nMaxDepth) => {

		if (nCurrentDepth >= nMaxDepth)
			return;

		const aFilesNames = await readdir(strDir);

		for (const strFileName of aFilesNames)
		{
			const strFilePath 	= path.join(strDir, strFileName);
			const pFileStat 	= await stat(strFilePath);

			if (pFileStat.isDirectory()) 
			{
				console.log(`${'  '.repeat(nCurrentDepth)}|-- ${strFileName}/`);
				await createTree(strFilePath, nCurrentDepth + 1, nMaxDepth);
			} 
			else
				console.log(`${'  '.repeat(nCurrentDepth)}|-- ${strFileName}`);
		}
	};
	// аргументы ком. строки
	const { argv } = yargs
		.option('directory', {
			alias: 'd',
			demandOption: true,
			type: 'string',
		})
		.option('depth', {
			alias: 'depth',
			type: 'number',
			default: Infinity,
	});

	const { directory, depth } = argv;

	try {
		const strAbsolutePath = path.resolve(directory);
		console.log(`Listing files and directories in: ${strAbsolutePath}\n`);
		await createTree(strAbsolutePath, 0, depth); // начинаем с глубины 0
	} catch (error) {
		console.error('Error:', error.message);
	}
};
  
tree();

module.exports = { tree };