import readline from 'readline'
import fs from 'fs/promises'
import {v4} from 'uuid'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const books = JSON.parse(await fs.readFile('./books.json'))

function askForAction() {
    rl.question('Please choose action: \n viewAll - to review all books \n ' +
        'findBook - to search for a specific book \n addBook - to add a new Book: \n', action => {

        switch (action) {
            case "viewAll":
                console.table(books)
                break;
            case "findBook":
                rl.question("Please enter ID: ", id => {
                    const findedBook = books.find(book => book.id === id )
                    console.log('finded book: ', findedBook)
                })
                break;
            case "addBook":
                const title = await rl.question("Please enter Title: ")
                const Author = await rl.question("Please enter Author: ")
                books.push({
                    title,
                    author,
                    id: v4()
                })
                fs.writeFile('./books.json', JSON.stringify(books))

                break;
            default:
                console.log('Please enter correct action')
                break;
        }
        askForAction();
    })
}

askForAction();
