/**
 * Задание:
 * Написать NodeJS скрипт tree для вывода списка файлов и папок файловой системы.
 * Результатом работы должен быть объект с массивами { files, folders }.
 * Вызовы файловой системы должны быть асинхронными. Скрипт принимает входной параметр - путь до папки.
 * Добавить возможность выполнять этот скрипт через команду npm run tree -- path.
 */

const fs 	= require('fs/promises');
const path 	= require('path');

async function getTree(a_strPath) 
{  
	const TREE 				= { files: [], dirs: [] };
	let strMainDirectory 	= '';

	// Проверка переданного аргумента. Иначе выбрасываем ошибку:
	try {
		if ((await fs.stat(a_strPath)).isDirectory())
		{
			strMainDirectory  = path.dirname(a_strPath);

			await walk(a_strPath);
		}
		else
			return new Error('Unable to find a directory at the given path.');
	} catch (err) {
		if (err.code === 'ENOENT')
			return new Error('The given path does not exist.');
		else
			return new Error("The given path is not a string.");
	}

	async function walk(a_strCurentPath)
	{
		// Записываем путь к папке в массив dirs:
		TREE.dirs.push(path.relative(strMainDirectory, a_strCurentPath).replace(/\\/g, '/'));
		// Получим ее содержимое:
		let aDirectoryContent 	= await fs.readdir(a_strCurentPath);
		// Обявляем массив для субдиректорий:
		let aSubdirectories 	= [];
		// Проходимся по содержимому папки:
		for (const strFileName of aDirectoryContent) {
			// Получаем полный путь до субдиректории:
			let strFullPath = path.join(a_strCurentPath, strFileName);
			// Заполняем массив субдиректорий, иначе добавляем путь к файлу в массив files:
			if ((await fs.stat(strFullPath)).isDirectory())
				aSubdirectories.push(strFullPath);
			else 
				TREE.files.push(path.relative(strMainDirectory, strFullPath).replace(/\\/g, '/'));
		}
		// Проходимся по массиву субдиректорий и перевызывем для них функцию walk:
		for (const strSubdirPath of aSubdirectories)
			await walk(strSubdirPath);
	}

	return TREE;
}

if (process.argv[2])
{
	// Получение пути из агрумента переданного после команды tree -- 
	const PATH_END = process.argv[2];
	getTree(PATH_END);
}
else
	process.exit(0);


module.exports = getTree;