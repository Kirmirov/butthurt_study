const getPath = require('./main.js');

describe('getPath', () => {
	let pContainer;
	
	beforeEach(() => {
		pContainer = document.createElement('html');
		document.documentElement.appendChild(pContainer);
	});
	
	afterEach(() => {
		document.documentElement.removeChild(pContainer);
		pContainer = null;
	});
	
	test('Функция должена возвращать пустую строку для элемента html', () => {
		const strPath = getPath(pContainer);
		expect(strPath).toBe('');
	});

	test('Функция должена возвращать body для элемента body', () => {
		pContainer.innerHTML = `
		<body>
			<div>
				<p>Текст</p>
			</div>
		</body>
		`;
		const pElement 	= pContainer.querySelector('body');
		const strPath 		= getPath(pElement);
		expect(strPath).toBe('body');
	});
	
	test('Функция должена возвращать правильный путь для элемента без сиблингов с тем же тегом', () => {
		pContainer.innerHTML = `
		<body>
			<div>
				<p>Текст</p>
			</div>
		</body>
		`;
		const pElement 	= pContainer.querySelector('p');
		const strPath 		= getPath(pElement);
		expect(strPath).toBe('body div p');
	});
	
	test('Функция должена возвращать правильный путь для элемента с сиблингами с тем же тегом', () => {
		pContainer.innerHTML = `
		<body>
			<div>
				<p>Текст 1</p>
				<p>Текст 2</p>
				<p>Текст 3</p>
			</div>
		</body>
		`;
		const pElement 	= pContainer.querySelector('p:nth-child(2)');
		const strPath 		= getPath(pElement);
		expect(strPath).toBe('body div p:nth-child(2)');
	});
	
	test('Функция должена возвращать правильный путь для элемента внутри вложенных элементов', () => {
		pContainer.innerHTML = `
		<body>	
			<div>
				<section>
					<article>
						<h1>Заголовок</h1>
					</article>
				</section>
			</div>
		</body>
		`;
		const pElement = pContainer.querySelector('h1');
		const strPath 		= getPath(pElement);
		expect(strPath).toBe('body div section article h1');
	});

	test('Функция должена возвращать правильный путь для элемента по id', () => {
		pContainer.innerHTML = `
		<body>	
			<section>
					<div>
						<h3>Заголовок</h3>
						<h3 id="title">Заголовок</h3>
						<h3>Заголовок</h3>
					</div>
			</section>
		</body>
		`;
		const pElement = pContainer.querySelector('#title');
		const strPath 		= getPath(pElement);
		expect(strPath).toBe('body section div h3:nth-child(2)');
	});

	test('Функция должена возвращать правильный путь для элемента по class', () => {
		pContainer.innerHTML = `
		<body>	
			<section>
					<div>
						<h3>Заголовок</h3>
						<h3 class="title">Заголовок</h3>
						<h3>Заголовок</h3>
					</div>
			</section>
		</body>
		`;
		const pElement = pContainer.querySelector('.title');
		const strPath 		= getPath(pElement);
		expect(strPath).toBe('body section div h3:nth-child(2)');
	});

	test('Селектор, возвращаемый функцией, должен быть уникальным для элемента', () => {
		pContainer.innerHTML = `
			<div>
				<div>
					<p>Текст 1</p>
					<p>Текст 2</p>
				</div>
				<div>
					<p>Текст 3</p>
					<p>Текст 4</p>
				</div>
			</div>
		`;
		
		const pElement 			= pContainer.querySelector('div:nth-child(2) p:nth-child(2)');
		const strPath 			= getPath(pElement);
		const aElementsByPath 	= pContainer.querySelectorAll(strPath);
		
		expect(aElementsByPath.length).toBe(1);
		expect(aElementsByPath[0]).toBe(pElement);
	});

	test('Функция должена возвращать правильный путь для разных типов элементов', () => {
		pContainer.innerHTML = `
			<header>
				<nav>
					<ul>
						<li><a href="#">Link 1</a></li>
					</ul>
				</nav>
			</header>
		`;
		const aElement = pContainer.querySelector('a');
		const strPath = getPath(aElement);
		expect(strPath).toBe('body header nav ul li a');
	});

	test('Функция должена возвращать пустую строку для несуществующего элемента', () => {
		const strPath = getPath(null);
		expect(strPath).toBe('');
	});

	test('Функция должена возвращать правильный путь для элементов с одинаковыми тегами и разными атрибутами', () => {
		pContainer.innerHTML = `
			<div>
				<button id="button-1">Кнопка 1</button>
				<button id="button-2">Кнопка 2</button>
				<button id="button-3">Кнопка 3</button>
			</div>
		`;
		const pButtonElement = pContainer.querySelector('#button-2');
		const strPath = getPath(pButtonElement);
		expect(strPath).toBe('body div button:nth-child(2)');
	});
});