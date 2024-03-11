export class Tasks{
    #tasks = new Set()

    add({name, fn, timeOut}){
        this.#tasks.add({name, fn, timeOut: Date.now() + timeOut})
        console.log(`Task ${name} added`)
    }

    run(runEvery = 100){
        const t1 = Date.now()

      const interval = setInterval(() => {
        if(this.#tasks.size === 0) {
            const t2 = Date.now()
            console.log(`Finished all tasks in ${t2 - t1}ms!`)
            clearInterval(interval)
            return
        }

        for(const task of this.#tasks){
            if(task.timeOut <= Date.now()){
                task.fn()
                console.log(`Task ${task.name} finished!`)
                this.#tasks.delete(task)
            }
        }
      }, runEvery)
    }
    
}