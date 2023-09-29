import { LitElement, html, property } from "lit-element";

customElements.define("my-list", class MyList extends LitElement {
	static get properties() {
		return {
			id: { type: Number },
		};
	}

	render() {
		return html`<li id="${this.id}">MyList id: ${this.id}</li>`;
	}
});

customElements.define("my-tree", class MyTree extends LitElement {
	static get properties() {
		return {
			data: { type: Object },
		};
	}

	attributeChangedCallback(name, oldVal, newVal) {
		super.attributeChangedCallback(name, oldVal, newVal);
	
		if (name === 'data' && newVal !== null) {
			this.data = JSON.parse(newVal);
		}
	}

	constructor() {
		super();
		this.data = {};
	}

	render() {
		return html`
			<ul id="${this.data.id}">MyTree id: ${this.data.id}
				${this.data.items && this.data.items.length
				? html`${this.renderData(this.data.items)}`
				: html`<my-list id="${this.data.id}"></my-list>`}
			</ul>
		`;
	}

	renderData(items) {
		return items.map(
			(item) =>
			  html`
				<my-tree data='${JSON.stringify(item)}'></my-tree>
			  `
		  );
	}
});