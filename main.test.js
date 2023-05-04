const getTree 	= require('./main');
const fs 		= require('fs/promises');
const path 		= require('path');

describe('getTree', () => {
	it('should return an object with two arrays: files and dirs', () => {
		const directoryPath = path.join(__dirname, 'test-directory');
		const result = getTree(directoryPath);
	
		expect(result).toEqual({
		  files: expect.any(Array),
		  dirs: expect.any(Array),
		});
	});
});
