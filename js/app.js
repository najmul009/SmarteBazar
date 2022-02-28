//Search btn event handelaar function
const searchPhone = () => {
    fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    .then(res => res.json())
    .then(data => displayPhones(data.data))
}
//function for fetch result desplay on UI 
const displayPhones = (phones) =>{
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