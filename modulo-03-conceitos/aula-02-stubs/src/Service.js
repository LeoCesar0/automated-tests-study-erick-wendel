import crypto from 'node:crypto'
import fs from 'node:fs/promises'

export class Service {
    #fileName
    #filePath
    #fileDir = './static'

    constructor({ fileName, fileDir }) {
        this.#fileName = fileName
        if(fileDir) this.#fileDir = fileDir
        this.#filePath = `${this.#fileDir}/${this.#fileName}.ndjson` 

    }

    #hashPassword(password){
        const hash = crypto.createHash('sha256')
        hash.update(password)
        return hash.digest('hex')
    }

    async create({username, password}){

        const user = {
            username,
            password: this.#hashPassword(password),
            createdAt: new Date().toISOString()
        }
        const data = JSON.stringify(user).concat('\n')

        return fs.appendFile(this.#filePath, data)
    }

    async read(){
        const data = await fs.readFile(this.#filePath, 'utf-8')
        const lines = data.split('\n').filter(Boolean)
        if(!lines.length) return [] 

        return lines
        .map(line => JSON.parse(line))
        .map(({password, ...user}) => ({...user}))
    }
}