import { html, fixture, expect } from '@open-wc/testing';
import './my-list';  // Подключаем компоненты для тестирования
import './my-tree';

describe('MyList', () => {
	it('renders correctly', async () => {
		const el = await fixture(html`<my-list id="42"></my-list>`);
		expect(el).to.exist;
		expect(el.id).to.equal(42);
	});
});

describe('MyTree', () => {
	it('renders correctly', async () => {
		const data = {
		id: 1,
		items: [
			{
			id: 11,
			items: [
				{ id: 111 },
				{ id: 112 },
				{ id: 113 },
			],
			},
			{
			id: 12,
			items: [
				{ id: 121 },
			],
			},
		],
		};
		
		const el = await fixture(html`<my-tree .data="${data}"></my-tree>`);
		expect(el).to.exist;
		expect(el.data).to.deep.equal(data);
	});

	it('renders nested components correctly', async () => {
		const data = {
		id: 1,
		items: [
			{
			id: 11,
			items: [
				{ id: 111 },
				{ id: 112 },
				{ id: 113 },
			],
			},
			{
			id: 12,
			items: [
				{ id: 121 },
			],
			},
		],
		};
		
		const el = await fixture(html`<my-tree .data="${data}"></my-tree>`);
		const nestedTree = el.shadowRoot.querySelector('my-tree');
		const nestedList = el.shadowRoot.querySelector('my-list');
		
		expect(nestedTree).to.exist;
		expect(nestedTree.data).to.deep.equal(data.items[0]);
		
		expect(nestedList).to.exist;
		expect(nestedList.id).to.equal(121);
	});
});