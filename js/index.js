addEventListener('DOMContentLoaded', () => {
    createForm()
    let page = 1
    renderMonsters()
    
    document.getElementById('forward').addEventListener('click', () => {
        page++
        document.getElementById('monster-container').innerHTML = ''
        renderMonsters(page)
    })

    document.getElementById('back').addEventListener('click', () => {
        if (page > 1){
            page --
            document.getElementById('monster-container').innerHTML = ''
            renderMonsters(page)
        }
    })
})

function createForm(){
    const form = document.createElement('form')
    const name = document.createElement('input')
    const age = document.createElement('input')
    const desc = document.createElement('input')
    const button = document.createElement('button')

    name.placeholder = 'Name...'
    age.placeholder = 'Age...'
    desc.placeholder = 'Description...'
    button.innerText = 'Submit'
    form.id = 'monster-form'
    name.id = 'name'
    age.id = 'age'
    desc.id = 'description'
    form.addEventListener('submit', handleNewMonster)

    form.append(name, age, desc, button)
    document.getElementById('create-monster').appendChild(form)
}

function handleNewMonster(e){
    e.preventDefault()

    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            name: e.target[0].value, 
            age: e.target[1].value,
            description: e.target[2].value
            })
    })
    .then(res => res.json())
    .then(document.getElementById('monster-form').reset())
}

function renderMonsters(page){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('monster-container')
        data.forEach(element => {
            const h3 = document.createElement('h3')
            const p1 = document.createElement('p')
            const p2 = document.createElement('p')

            h3.innerText = element.name
            p1.innerText = `Age: ${element.age}`
            p2.innerText = `Description: ${element.description}`

            container.appendChild(h3)
            container.appendChild(p1)
            container.appendChild(p2)
        });
    })
}