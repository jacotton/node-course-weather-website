console.log('Client side javascript file loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'bloooo'

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'loading....'
    messageTwo.textContent = ''

    const url = 'weather?address='+location
    //console.log(location)
    
    fetch(url).then((response) => {
        response.json().then( (data) => {
            if (data.error) { return messageOne.textContent = data.error}
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })

})