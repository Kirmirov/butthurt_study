import { LitElement, html, css } from "lit-element";

customElements.define("my-list", class MyList extends LitElement {
	static styles = css`
	h4 {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80px;
		width: 200px;
		color: rgb(249 216 144);
		background-color: rgb(58 189 73);
		margin-left: 25px;
		border-bottom-right-radius: 80%;
		border-top-right-radius: 80%;
		border-top-left-radius: 60%;
		border-bottom-left-radius: 60%;
	}
  `;


	static get properties() {
		return {
			id: { type: Number },
		};
	}

	render() {
		return html`<h4 id="${this.id}">List id: ${this.id}</h4>`;
	}
});

customElements.define("my-tree", class MyTree extends LitElement {
	static styles = css`    
    h3 {
		color: green;
		background-color: rgb(189 147 58);
		width: 150px;
		padding-left: 25px;
		border-bottom-right-radius: 40%;
		border-top-right-radius: 40%;
		border-top-left-radius: 5px;
    }
	div {
		margin-left: 25px;
		position: relative;
	}
	div:before {
		content: "";
		position: absolute;
		top: 0;
		height: 100%;
		width: 20px;
		background-color: rgb(189 147 58);
		border-top-left-radius: 5px;
		border-bottom-right-radius: 5px;
		border-bottom-left-radius: 5px;
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
		<div id="${this.data.id}">
			<h3>Branch id: ${this.data.id}</h3>
			${this.renderData(this.data.items)}
	  	</div>
		`;
	}

	renderData(items) {
		return items
				? items.map(
					(item) =>
					html`${
						item.items && item.items.length
						? html`<my-tree data='${JSON.stringify(item)}'></my-tree>`
						: html`<my-list id="${item.id}"></my-list>`
					}`
				)
				: html``;
	}
});