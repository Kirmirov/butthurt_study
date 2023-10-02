import { LitElement, html, css } from "lit-element";

customElements.define("my-list", class MyList extends LitElement {
	static styles = css`
    p {
		width: 300px;
		color: white;
		background-color: rgb(58 189 73);
    }
  `;


	static get properties() {
		return {
			id: { type: Number },
		};
	}

	render() {
		return html`<p class="" id="${this.id}">MyList id: ${this.id}</p>`;
	}
});

customElements.define("my-tree", class MyTree extends LitElement {
	static styles = css`    
    h3 {
		color: green;
		background-color: rgb(189 147 58);
		width:200px
    }
	ul {
		list-style-type: none;
	}
  `;
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
		<ul id="${this.data.id}">
			<h3>MyTree id: ${this.data.id}</h3>
			${this.renderData(this.data.items)}
	  	</ul>
		`;
	}

	renderData(items) {
		return items
				? items.map(
					(item) =>
					html`${
						item.items && item.items.length
						? html`<my-tree data='${JSON.stringify(item)}'></my-tree>`
						: html`<li><my-list id="${item.id}"></my-list></li>`
					}`
				)
				: html``;
	}
});