import fs from 'fs';

const createFile = (a_strDirName, a_nFileSize) => {
	const WSTREAM 	= fs.createWriteStream(a_strDirName, { encoding: 'utf8' });
	const INTERVAL 	= setInterval(() => {
		if (WSTREAM.bytesWritten < a_nFileSize)
		{
			let nRandomNumber 			= Math.floor(Math.random() * 100000);
			let strStringifiedNumber 	= nRandomNumber + '\n';
			WSTREAM.write(strStringifiedNumber);
		}
		else
		{
			clearInterval(INTERVAL);
			WSTREAM.end();
		}
	}, 10);
};

export default createFile;