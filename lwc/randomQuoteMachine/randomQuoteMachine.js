/**
 * Created by vershov on 27.01.2020.
 */

import {LightningElement, track} from 'lwc';

const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

export default class RandomQuoteMachine extends LightningElement {

    @track quotes;
    @track quote;
    @track author;

    userAction = async () => {
        const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
        const quotes = await response.json();
        this.quotes = quotes.quotes;
        this.changeQuotes();
    }

    connectedCallback() {
        this.userAction();
    }

    changeQuotes() {
        let randomNumber = this.getRandomInt(this.quotes.length);
        let quote = this.quotes[randomNumber];
        this.quote = quote.quote;
        this.author = quote.author;

        this.changeColors();
    }

    changeColors() {
        let color = colors[this.getRandomInt(colors.length)];
        let background = `background: ${color};`;
        let fontColor = `color: ${color};`;
        this.changeColor('.template-container', color, background + fontColor);
        this.changeColor('.author-container', color, fontColor);
        this.changeColor('.quote-title', color, fontColor);
        this.changeColor('.changeQuote', color, background);
    }

    changeColor(selector, color, styles) {
        let main = this.template.querySelector(selector);
        main.style.cssText = styles;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

}