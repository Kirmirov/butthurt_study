/**
 * Задание :
 * Напишите NodeJS скрипт tree для вывода списка файлов и папок файловой системы.
 * Приложение должно принимать аргумент каталога для анализа и флаг --depth, -d с номером глубины 
 * директорий. Результатом является вывод данных в структурированном виде дерева. 
 * Вызовы файловой системы должны быть асинхронными.
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const yargs = require('yargs');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);


const tree = async () => {

	const createTree = async (strDir, nDepth) => {
		const aFilesNames = await readdir(strDir);
	
		for (const strFileName of aFilesNames) 
		{
			const strFilePath 	= path.join(strDir, strFileName);
			const pFileStat 	= await stat(strFilePath);
	
			if (pFileStat.isDirectory() && nDepth > 0) 
			{
				console.log(`${'  '.repeat(nDepth - 1)}|-- ${strFileName}/`);
				await createTree(strFilePath, nDepth - 1);
			} 
			else
				console.log(`${'  '.repeat(nDepth)}|-- ${strFileName}`);
		}
	}
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
		await createTree(strAbsolutePath, depth);
	} catch (error) {
		console.error('Error:', error.message);
	}
};


module.exports = { tree };