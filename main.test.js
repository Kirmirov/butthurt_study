const getTree = require('./main');
const fs = require('fs/promises');

describe('getTree', () => {
	beforeEach(() => {
		const mockFileSystem = {
			'foo': {
				'bar': {
					'bar1.txt': 'bar1 content',
					'bar2.txt': 'bar2 content',
					'baz': {},
				},
				'f1.txt': 'f1 content',
				'f2.txt': 'f2 content',
			},
		};

		jest.mock('fs', () => {
			return {
				promises: {
					readdir: jest.fn(),
					stat: jest.fn(),
				},
			};
		});

		fs.readdir.mockImplementation((path) => {
			const result = Object.keys(mockFileSystem[path]);
			return Promise.resolve(result);
		});

		fs.stat.mockImplementation((path) => {
			const isFile = typeof mockFileSystem[path] === 'string';
			return Promise.resolve({
				isFile: () => isFile,
				isDirectory: () => !isFile,
			});
		});
	});

	test('Функция должна возвращать объект с массивами', )

});
