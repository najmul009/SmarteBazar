//error function
const error = (error, errorMsg) => {
    const Warning = document.getElementById('Warning')
    const erroeMassege = document.getElementById('erroeMassege')
    erroeMassege.innerText = errorMsg
    Warning.style.display = error
}
const closeError = () => {
    error('none')
}
//spinner
const spinner = (onOff) => {
    const spinner = document.getElementById('spinner')
    spinner.style.display = onOff
}
//fetch btn and get result
const fetchSearch = (totalResult) => {
    spinner('block')
    const searchValue = document.getElementById('search-field').value;
    const searchStr = searchValue.toString()
    const searchText = searchStr.toLowerCase()
    if (totalResult === 'searchPhone') {
        spinner('block')
        const main = document.getElementById('main')
        const detailsContainer = document.getElementById('detailsContainer')
        detailsContainer.style.display = 'none'
        main.innerHTML = ''


        // console.log(searchText)
        if (searchStr == '') {
            error('block', '!please search by your mobile name')
            spinner('none')
        } else {

            const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
            fetch(url)
                .then(res => res.json())
                .then(data => returnData(data.data, totalResult))

                
            error('none')

        }

    } else {
        const main = document.getElementById('main')
        main.innerHTML = ''
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => returnData(data.data, totalResult))
            
    }

}

//condition function for sowAll
const returnData = (result, sowResult) => {

    if (result.length > 20) {
        const seeMoreBtn = document.getElementById('sowMore-btn')
        seeMoreBtn.style.display = 'block'
        if (sowResult === 'searchPhone') {
            displayPhones(result.slice(1, 21))
        } else {
            displayPhones(result)
            seeMoreBtn.style.display = 'none'
        }

    } else {
        document.getElementById('search-field').value = ''
        displayPhones(result)
    }


}

//search btn function
const searchPhone = () => {
    fetchSearch('searchPhone')

}
//sowall btn function
const sowMore = () => {
    fetchSearch('sowMore')
}
//function for fetch result desplay on UI 
const displayPhones = (phones) => {
    // console.log(phones)
    if (phones.length === 0) {
        error('block', 'Result Not Found!')
        document.getElementById('search-field').value = ''
        spinner('none')
    } else {
        phones.forEach(phone => {
            // console.log(phone)
            const main = document.getElementById('main')
            const div = document.createElement('div')
            div.classList.add('col-12', 'col-md-6', 'col-lg-4', 'p-2')
            div.innerHTML = `
            <div class="card  p-4">
                <img src="${phone.image}" class="card-img-top w-100" alt="...">
                <div class="card-body ">
                    <h5 class="card-title ">${phone.phone_name}</h5>
                    <p class="card-text ">Brand: ${phone.brand}</p>
                    <a  href="#search-field"><button  onclick="fetchDetails('${phone.slug}')" type="button" class="btn btn-info">Explore</button></a>
                </div>
            </div>
            `;
            main.appendChild(div)
        });
        error('none')
        spinner('none')
    }

}


//function for sow details on UI
const fetchDetails = (detailsId) => {
    spinner('block')
    // console.log(detailsId)
    const url = `https://openapi.programming-hero.com/api/phone/${detailsId}`
    fetch(url)
        .then(res => res.json())
        .then(data => sowDetails(data.data))
}
const sowDetails = (item) => {
    // console.log(item)

    const detailsContainer = document.getElementById('detailsContainer')
    // console.log(detailsContainer)
    detailsContainer.innerHTML = `
    <div id="detailsUi" class="row gx-5">
                <div class="col-12 col-lg-4">
                    <img src="${item.image}" class="w-100" alt="">
                </div>
                <div class="col-12 col-lg-7 mx-auto">
                    <div class="d-flex flex-column">
                        <div class="detalis-head">
                            <h1 class="my-3">${item.name}</h1>
                            <h4>Brand: ${item.brand}</h4>
                            <h6 class="mb-4"><strong>ReleaseDate:</strong> ${item.releaseDate? item.releaseDate:"release date not found!"}</h6>
                        </div>
                        <div class="detalis-body">
                            <table>
                                <tbody id="table-body" >
                                    
                                        <th class="bg-secondary" colspan="2"><h4 class="text-center text-light ">Core Features</h4></th>
                                    <tr>
                                        <td> <strong>Chip Set</strong></td>
                                        <td>${item.mainFeatures.chipSet}</td>
                                    </tr>
                                    <tr>
                                        <td> <strong>Display Size</strong></td>
                                        <td>${item.mainFeatures.displaySize}</td>
                                    </tr>
                                    <tr>
                                        <td> <strong>Memory</strong></td>
                                        <td>${item.mainFeatures.memory}</td>
                                    </tr>
                                    <tr>
                                        <td> <strong>Storage</strong></td>
                                        <td>${item.mainFeatures.storage}</td>
                                    </tr>
                                    <th  class="bg-secondary" colspan="2"><h4 class="text-center text-light ">Sensors</h4></th>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
    `;
    detailsContainer.style.display = 'block'
    sowSensors(item);
    sowOthers(item)
}

//sow sensore on details
const sowSensors = (item) => {
    const sensors = item.mainFeatures.sensors
    const tableBody = document.getElementById('table-body')
    console.log(tableBody)
    sensors.forEach(sensor => {
        // console.log(sensor)
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td> <strong>${sensor}</strong></td>
            <td>Yes</td>                      
        `;
        tableBody.appendChild(tr)

    });
}

//sow others on details
const sowOthers = (item) => {
    const others = item.others
    const othersEntries = Object.entries(others)
    // console.log(othersEntries)
    const tableBody = document.getElementById('table-body')
    const th = document.createElement('th')
    th.classList.add('bg-secondary')
    th.setAttribute('colspan', '2')
    th.innerHTML = `<h4 class="text-center text-light ">Others</h4>`
    tableBody.appendChild(th)
    othersEntries.forEach(othersArr => {
        // console.log(othersArr[0],othersArr[1])
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td> <strong>${othersArr[0]}</strong></td>
        <td>${othersArr[1]}</td>
        `;
        tableBody.appendChild(tr)
    })

    spinner('none')
}