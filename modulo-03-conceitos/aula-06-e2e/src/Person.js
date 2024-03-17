import { PERSON_EXCEPTIONS } from "./expections.js"

export class Person {

    static validate({name, cpf}){
        if(!name) throw new Error(PERSON_EXCEPTIONS.NAME_NOT_PROVIDED)
        if(!cpf) throw new Error(PERSON_EXCEPTIONS.CPF_NOT_PROVIDED)
        return true
    }

    static format({name, cpf}){

        const [firstName, ...lastNameArray] = name.split(' ')

        return {
            name: firstName,
            cpf: cpf.replace(/\D/g, ''),
            lastName: lastNameArray.join(' ').trim()
        }
    }

    static save(person){
        const personKeys = ['name', 'cpf', 'lastName']

       personKeys.forEach(key => {
        
            if(!person[key]){
                throw new Error(PERSON_EXCEPTIONS.VALUE_NOT_DEFINED(key))
            }
        })
        return true
    }

    static process(person){
        this.validate(person)
        const formattedPerson = this.format(person)
        const saved = this.save(formattedPerson)
        
        if(saved) return formattedPerson
    }

}