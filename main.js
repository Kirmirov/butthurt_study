/**
 * Задание:
 * Написать NodeJS скрипт tree для вывода списка файлов и папок файловой системы.
 * Результатом работы должен быть объект с массивами { files, folders }.
 * Вызовы файловой системы должны быть асинхронными. Скрипт принимает входной параметр - путь до папки.
 * Добавить возможность выполнять этот скрипт через команду npm run tree -- path.
 */

const fs = require('fs/promises');
const path = require('path');

// Получение пути из агрумента переданного после команды tree -- 
const PATH_END = process.argv[2];

async function getTree(a_strPath) 
{  
	const TREE 			= { files: [], dirs: [] };
	const DIRECTORY  	= path.dirname(a_strPath);

	async function walk(a_strCurentPath)
	{
		// Проверка является ли файл папкой:
		if ((await fs.stat(a_strCurentPath)).isDirectory())
		{
			// Записываем путь к папке:
			TREE.dirs.push(path.relative(DIRECTORY, a_strCurentPath).replace(/\\/g, '/'));
			// Получим ее содержимое:
			let aDirectoryContent = await fs.readdir(a_strCurentPath);
			// Проходимся по содержимому папки:
			for (const strFileName of aDirectoryContent)
				await walk(path.join(a_strCurentPath, strFileName));
		}
		else
			TREE.files.push(path.relative(DIRECTORY, a_strCurentPath).replace(/\\/g, '/'));
	}

	await walk(a_strPath);
	return TREE;
}

module.exports = getTree;
