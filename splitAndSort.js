import fs from 'fs';
import path from 'path';

const splitAndSort = async (a_strDirName, a_nChunkSize) => {
	const RSTREAM 	= fs.createReadStream(a_strDirName, { encoding: 'utf8', highWaterMark: a_nChunkSize });
	let nChunkIndex = 0;

	for await (const strChunk of RSTREAM)
	{
		let aNumbers = strChunk.trim().split('\n').map(Number);
		aNumbers.sort((a, b) => a - b);

		let strOutputPath = path.join(path.dirname(a_strDirName), `chunk${nChunkIndex}.txt`);
		await fs.promises.writeFile(strOutputPath, aNumbers.join('\n'));

		nChunkIndex++;
	}
}

export default splitAndSort;