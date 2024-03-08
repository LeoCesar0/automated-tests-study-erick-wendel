import {describe, it, expect, jest} from '@jest/globals'
import { Person } from '../src/Person'
import { PERSON_EXCEPTIONS } from '../src/expections'


describe('#Person Suite', () => {

    describe('#validate', () => {
        it('should throw if name is not defined', () => {

            // Arrange
            const person = {
                name: '',
                cpf: '123.123.123-12'
            }
            // Act

            // Assert
            expect(() => Person.validate(person)).toThrow(new Error(PERSON_EXCEPTIONS.NAME_NOT_PROVIDED))
        })
        it('should throw if cpf is not defined', () => {
                // Arrange
                const person = {
                    name: 'Fulano de Tal',
                    cpf: ''
                }
                // Act
    
                // Assert
                expect(() => Person.validate(person)).toThrow(new Error(PERSON_EXCEPTIONS.CPF_NOT_PROVIDED))
        })
        it('should correctly validate person', () => {
            // Arrange
            const person = {
                name: 'Fulano de Tal',
                cpf: '123.123.123-13'
            }
            // Act

            // Assert
            expect(() => Person.validate(person)).not.toThrow()
            expect(Person.validate(person)).toBe(true)
    })
    })
    describe('#format',() => {
        it('should format a person', () => {
            // Arrange
            const person = {
                name: 'Fulano de Tal',
                cpf: '123.123.123-12'
            }
            // Act
            const result = Person.format(person)
            // Assert
            const expected = {name: 'Fulano', cpf: '12312312312', lastName: 'de Tal'}
            expect(result).toStrictEqual(expected)
        })
    })
    describe('#save',() => {
        it('should fail to save', () => {
            // Arrange
            const person = {
                name: 'Fulano de Tal',
                cpf: '123.123.123-12'
            }
            // Act
            // Assert
            const expectedError = PERSON_EXCEPTIONS.VALUE_NOT_DEFINED('lastName')
            expect(() => Person.save(person)).toThrow(new Error(expectedError))
        })
        it('should save a person', () => {
            // Arrange
            const person = {
                name: 'Fulano',
                cpf: '123.123.123-12',
                lastName: 'de Tal'
            }
            // Act
            const result = Person.save(person)
            // Assert
            expect(result).toBe(true)
        })
    })
    describe('#process',() => {
        it('should correctly process a person', () => {

            // Arrange
            jest.spyOn(Person, 'validate').mockReturnValue(true)

            const formattedPerson = {
                name: 'Fulano',
                cpf: '12312312312',
                lastName: 'de Tal'
            }

            jest.spyOn(Person, 'format').mockReturnValue(formattedPerson)

            // Act
            
            const processResult = Person.process({name: 'Fulano de Tal', cpf: '123.123.123-12'})

            // Assert
            const expected = true
            expect(processResult).toBe(expected)

        })
    })
})
