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
	});

	test('Функция должна возвращать объект с массивами', async () => {

		const result = {
			files: [
				"foo/f1.txt",
				"foo/f2.txt",
				"foo/bar/bar1.txt",
				"foo/bar/bar2.txt"
			],
			dirs: [
				"foo",
				"foo/bar",
				"foo/bar/baz"
			]
		}
		const tree = await getTree('./foo');
		expect(tree).toEqual(result);
	});

});
