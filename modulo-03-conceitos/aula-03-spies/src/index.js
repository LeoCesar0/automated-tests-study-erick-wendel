import { Service } from "./Service.js";

const service = new Service({
    fileName: 'users'
})

const user = {
    username: 'NewUser-'+Date.now(),
    password: 'abeautifulPassword@'+Date.now()
}

await service.create(user)

const currentData = await service.read()

console.log(currentData)