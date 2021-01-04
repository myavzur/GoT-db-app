export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';

        this.getData = this.getData.bind(this);
        this.getAllCharacters = this.getAllCharacters.bind(this);
        this.getCharacter = this.getCharacter.bind(this);

        this.getAllHouses = this.getAllHouses.bind(this);
        this.getHouse = this.getHouse.bind(this);

        this.getAllBooks = this.getAllBooks.bind(this);
        this.getBook = this.getBook.bind(this);
    }

    getData = async(url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Oh-oh, something goes wrong on ${url} with status: ${res.status}`)
        }

        return await res.json();
    }


    // Characters
    getAllCharacters() {
        return this.getData('/characters?page=17&pageSize=10');
    }

    validateId(id) {
        if (/\/api\/\w+\/\d+/.test(id) ) {
            id = id.match(/\/api\/\w+\/\d+/);
            return id = id[0].match(/\d+/);
        }

        return id;
    }

    async getCharacter(id) {
        // '/api/characters/34' - true        
        const newId = this.validateId(id);

        const character = await this.getData(`/characters/${newId}`);
        
        return this._transformChar(character);
    }

    _transformChar(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }


    // Houses 
    getAllHouses() {
        return this.getData('/houses');
    }

    async getHouse(id) {
        const newId = this.validateId(id);

        const house = await this.getData(`/houses/${newId}`);

        return this._transformHouse(house);
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            ancestralWeapons: house.ancestralWeapons
        }
    }


    // Books
    getAllBooks() {
        return this.getData('/books');
    }

    async getBook(id) {
        const newId = this.validateId(id);

        const book = await this.getData(`/books/${newId}`);

        return this._transformBook(book);
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released,
            authors: book.authors
        }
    }
}