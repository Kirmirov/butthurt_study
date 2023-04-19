var fn1 = () => {
	console.log('fn1');
	return Promise.resolve(1);
};
var fn2 = () => new Promise(resolve => {
	console.log('fn2');
	setTimeout(() => resolve(2), 1000);
});

function promiseReduce(asyncFunctions, reduce, initialValue)
{
	let pChain = Promise.resolve(); // создаем новый пустой промис

	for (const pFunc of asyncFunctions) // проходимся циклом по массиву функций
	{
		pChain = pChain
					.then(() => { return pFunc(); }) 
					// результатом вызова pFunc будет промис с значением которое мы возвращаем
					.then((nFuncResult) => { return reduce(nFuncResult, initialValue); });
					// возвращенное значение передаем в reduce в качестве аргумента и возвращаем полученный результат

		// поскольку pChain перезаписывается каждый раз то последним переданным результатом будет 2
	}

	return pChain;
}

promiseReduce(
	[fn1, fn2],
	function (memo, value) {
		console.log('reduce');
		return memo * value;
	},
	1
	)
	.then(console.log); // promiseReduce вернула последний промис с результатом 2