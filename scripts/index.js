
//SUBMIT COMMENTS, REPLY TO COMMENTS, LIKE COMMENTS
//COPY ASSET TO FORM 
//SEARCH FEATURE

//ASPIRATIONAL: VIMEO API TO ADD A VIDEO IN 
//TWITTER API FOR HASHTAG DISCUSSIONS


document.addEventListener('DOMContentLoaded', () => {
    // document.querySelector('#heading').innerText = "Welcome to decentra"
    getPrices()
    // listLength()
})

let dataUrl = 'https://api.coinranking.com/v2/coins'
let proxyUrl = 'https://cors-anywhere.herokuapp.com/' //cors-anywhere.herokuapp.com go to link to acess temprorary
let apiKey = 'coinranking615adec0ec00e778d51e658660169246fe2a24f5ab0bce77'
function getPrices(userName) {
    fetch(`${proxyUrl}${dataUrl}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${apiKey}`,
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(resp => resp.json())
        .then(json => renderTableData(json))
        .catch(error => console.log(error))
}

function renderTableData(json) {
    let coinData = (json.data.coins)
    let n = 5
    let parent = document.getElementById('table-content')
    document.querySelector('#b1').addEventListener('click', () => {
        console.log('5')
        console.log(coinData)
        clearDOM(parent)
        let dataList = coinData.slice(0, 5)
        dataList.forEach(asset => renderRow(asset))

    })

    document.querySelector('#b2').addEventListener('click', () => {
        console.log('10')
        console.log(coinData)
        clearDOM(parent)
        let dataList = coinData.slice(0, 10)
        dataList.forEach(asset => renderRow(asset))
    })

    document.querySelector('#b3').addEventListener('click', () => {
        console.log('25')
        console.log(coinData)
        clearDOM(parent)
        let dataList = coinData.slice(0, 25)
        dataList.forEach(asset => renderRow(asset))
    })

    document.querySelector('#b4').addEventListener('click', () => {
        console.log('50')
        console.log(coinData)
        clearDOM(parent)
        let dataList = coinData.slice(0, 50)
        dataList.forEach(asset => renderRow(asset))
    })


    let dataList = coinData.slice(0, n)
    console.log(coinData)
    console.log(dataList)
    dataList.forEach(asset => renderRow(asset))
}

function clearDOM(element) {
    let searchElement = element.lastElementChild;
    while (searchElement) {
        element.removeChild(searchElement);
        searchElement = element.lastElementChild;
    }
}

function renderRow(asset) {

    //console.log(asset)
    let dataContainer = document.querySelector('#table-content')
    let tableRow = document.createElement('tr')
    let form = document.querySelector('#comment-form');
    let messageBoard = document.querySelector('#messages')



    let td1 = document.createElement('td')
    td1.innerText = `${asset.rank}`
    td1.classList.add('data-align')
    td1.classList.add('hover-color')

    let td2 = document.createElement('td')
    td2.innerText = `${asset.symbol}`
    td2.classList.add('data-align')
    td2.classList.add('hover-color')

    let td3 = document.createElement('td')
    // let imageIcon = document.createElement('img')
    // //imageIcon.setAttribute('class', 'icon')
    // imageIcon.setAttribute('source', asset.iconUrl)
    // td3.append(imageIcon)
    td3.innerHTML = `
    <img src="${asset.iconUrl}" alt=""  height=50 width=50>
    `
    td3.classList.add('data-align')
    td3.classList.add('hover-color')

    let td4 = document.createElement('td')
    td4.innerText = `${asset.name}`
    td4.classList.add('data-align')
    td4.classList.add('hover-color')

    let td5 = document.createElement('td')
    td5.innerText = `$ ${(Math.round(asset.price* 100)/ 100)}`
    td5.classList.add('data-align')
    td5.classList.add('hover-color')


    // let roundNumber = `$ ${(asset.change)}`
    // let rounded = Math.round((roundNumber + Number.EPSILON) * 100) / 100;

    let td6 = document.createElement('td')
    td6.innerText = `${(Math.round(asset.change * 100) / 100)}%`
    td6.classList.add('data-align')
    td6.classList.add('hover-color')


    // var numb= 212421434.533423131231;
    // var rounded = Math.round((numb + Number.EPSILON) * 100) / 100;
    // console.log(rounded);

    let td7 = document.createElement('td')
    td7.innerText = `$ ${Math.round((asset.marketCap) / 1000000000)} Billion`
    td7.classList.add('data-align')
    td7.classList.add('hover-color')
    

    let td8 = document.createElement('button')
    td8.innerText = 'Discuss Now'
    td8.classList.add('discuss')
    td8.addEventListener('click', (e) => {
        console.log(asset)
        let input1 = form.name
        input1.value = asset.symbol
        let input2 = form.price
        input2.value = `$ ${Math.round(asset.price)}`

        form.addEventListener('submit', (e) => {
            e.preventDefault()
            console.log('submitted')
            let newMessage = document.createElement('li')
            // newMessage.classList.add('newComment')
            // newMessage.innerHTML = `
            // <p class = "message-heading">${form.comment.value}</p>
            // <p class = "message-context">${input1.value}</p>
            // <p class = "message-context">${input2.value}</p>
            // `
            newMessage.innerHTML = `
            <div class="comments-box">
                <div class="left-panel">
                    <h4>${input1.value}</h4>
                    <p>${input2.value}</p>
                </div>
                <div class="right-panel">
                    <p>
                    "${form.comment.value}"
                    </p>
                </div>
                <div class="clear"></div>
            </div>
            <div class="white-space"></div>
            `

            messageBoard.appendChild(newMessage)
            input1.value = ''
            input2.value = ''
            form.comment.value = ''
        })
    })

    //Name, date, comment, asset

    tableRow.append(td1, td2, td3, td4, td5, td6, td7, td8)
    dataContainer.append(tableRow)


    //console.log(json.data.coins)
}

