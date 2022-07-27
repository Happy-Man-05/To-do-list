let tasks = []

let imgDone, imgEdit, imgTrash;
const output = document.getElementById('output')
const form = document.getElementById('form')

imgDone = ` 
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16"> 
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/> 
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/> 
</svg> 
`

imgEdit = ` 
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"> 
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/> 
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/> 
</svg> 
`

imgTrash = ` 
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> 
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> 
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> 
</svg> 
`

const addToDo = () => {
    const input = document.getElementById('inp')
    if (input.value == '') {
        alert('Запишите слово')
    } else {
        const todo = {
            id: tasks.length + 1,
            name: input.value,
            complited: false,
        }
        tasks.push(todo)
        input.value = ''
    }
    addToLocalStorage()
}

const renderTodos = () => {
    output.innerHTML = ''
    tasks.forEach(element => {
        const div = document.createElement('div')
        div.classList.add('task')
        const title = document.createElement('h3')
        const btns = document.createElement('div')
        const Done = document.createElement('button')
        const Edit = document.createElement('button')
        const Trash = document.createElement('button')

        Done.addEventListener('click', () => {
            element.complited = !element.complited
            addToLocalStorage()
            // console.log(element);
        })

        if (element.complited == true) {
            div.style.background = 'green'
        } else {
            div.style.background = 'white'
        }

        Edit.addEventListener('click', () => {
            let newTask = prompt('NewTask')
            if (newTask == '' || newTask == null) {
                alert('Отменено')
            } else {
                element.name = newTask
                addToLocalStorage()

            }

        })

        Trash.addEventListener('click', () => {
            tasks = tasks.filter(item => item.id != element.id)
            addToLocalStorage()

        })

        title.innerHTML = element.name
        Done.innerHTML = imgDone
        Edit.innerHTML = imgEdit
        Trash.innerHTML = imgTrash


        btns.append(Done, Edit, Trash)
        div.append(title, btns)
        output.append(div)
    })
}

const addToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTodos()

}

const addFromToLocalStorage = () => {
    const data = localStorage.getItem('tasks')
    if (data != null) {
        tasks = JSON.parse(data)
        renderTodos()
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    addToDo()
})

addFromToLocalStorage()

// alert(JSON.stringify({ a: 1, b: 1 }))