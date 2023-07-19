const getTree 	= require('./main');
const mock 		= require('mock-fs');

describe('Тестирование функции getTree', () => {
	beforeAll(() => {
		mock({
			'path/to/dir/foo': {
				'bar': {
					'baz': {},
					'bar1.txt': 'file bar1 content',
					'bar2.txt': 'file bar2 content',
				},
				'f1.txt': 'file f1 content',
				'f2.txt': 'file f2 content'
			}
		});
	});

	test('Функция должна вернуть ошибку, если переданный путь не существует', async () => {
		const error = await getTree('path/to/nonexistent');
		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe('The given path does not exist.');
	});
	
	test('Функция должна вернуть ошибку, если передан некорректный тип данных', async () => {
		const error = await getTree(12345);
		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe('The given path is not a string.');
	});

	test('Функция должна вернуть ошибку если передан путь до файла', async () => {
		const result = await getTree('path/to/dir/foo/f1.txt');
		expect(result).toBeInstanceOf(Error);
		expect(result.message).toBe('Unable to find a directory at the given path.');
	});

	test('Функция должна вернуть ожидаемый результат', async () => {
		const pResult = {
			files: [
				'foo/f1.txt',
				'foo/f2.txt',
				'foo/bar/bar1.txt',
				'foo/bar/bar2.txt',
			],
			dirs: ['foo', 'foo/bar', 'foo/bar/baz'],
		};
		expect(await getTree('path/to/dir/foo')).toStrictEqual(pResult);
	});

	afterAll(() => {
		mock.restore();
	});
});
