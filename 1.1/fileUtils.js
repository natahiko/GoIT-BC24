import {readFile, readFileSync, writeFileSync} from 'fs'

export async function getTextFromFile(fileName) {
    await readFile(fileName, 'utf-8', (err, dataBuffer) => {
        console.log('started',err, dataBuffer)
        if(err) {
            console.log(ERROR_MESSAGE)
        } else {
            let result = dataBuffer.toString()
            result = result.replaceAll('lorem', "cat")
            writeFileSync(fileName, result)
            console.log('done!')
        }
    })
}
