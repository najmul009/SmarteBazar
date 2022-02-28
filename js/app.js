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
// document.getElementById('closeWarning').addEventListener('click',function(){
//     error('none')
// };
//Search btn event handelaar function
const searchPhone = () => {
    const main = document.getElementById('main')
    main.innerHTML = ''
    const searchValue = document.getElementById('search-field').value;
    const searchStr = searchValue.toString()
    const searchText = searchStr.toLowerCase()
    // console.log(searchText)
    if (searchStr == '') {
        error('block', '!please search by your mobile name')
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhones(data.data))
        
            error('none')
    }
}
//function for fetch result desplay on UI 
const displayPhones = (phones) => {
    // console.log(phones)
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
            </div>
        </div>
        `;
        main.appendChild(div)
    });
}