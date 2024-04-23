const loadPhones = async(searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data 
    // console.log(phones)
    displayPhone(phones, isShowAll)
}

const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden')
    }
    else{
      showAllContainer.classList.add('hidden')
    }
    if(!isShowAll){
      phones = phones.slice(0,12)
    }
    phones.forEach(phone => {
        console.log(phone)
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card w-96 bg-base-100 border p-1`
        phoneCard.innerHTML=`
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="text-2xl font-bold text-center">${phone.phone_name}</h2>
                      <p class="text-center">There are many variations of passages of available, but the majority have suffered</p>
                      <div class="card-actions justify-end">
                        <button onclick='handleShowDetails("${phone.slug}")' class="btn mr-auto ml-auto bg-[#0D6EFD] text-white w-32 h-12 text-base hover:bg-[#0d5ed6]">Show Details</button>
                      </div>
                    </div>
        `
        phoneContainer.appendChild(phoneCard)
    });
    toggleLoading(false)
}

const handleShowDetails = async (id) => {
  // console.log('clicked', id)
  const res= await fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  const phone = data.data
  showDetails(phone)
}

const showDetails = (phone) => {
  console.log(phone)
  const phoneName = document.getElementById('show-details-phone-name')
  // phoneName.innerText = phone.name

  const phoneDetailsContainer = document.getElementById('phone-details-container')
  phoneDetailsContainer.innerHTML=`
  <img src="${phone.image}" class="mr-auto ml-auto" alt="loading">
  <h1 class="text-3xl font-bold text-center text-[#403f3f]">${phone.name}</h1>
  <h1 class="text-[#706f6f] font-normal text-xl"><span class="text-[#403f3f] text-xl font-bold">Storage: </span>${phone.mainFeatures.storage}</h1>
  <h1 class="text-[#706f6f] font-normal text-xl"><span class="text-[#403f3f] text-xl font-bold">Display Size: </span>${phone.mainFeatures.displaySize}</h1>
  <h1 class="text-[#706f6f] font-normal text-xl"><span class="text-[#403f3f] text-xl font-bold">Chipset: </span>${phone.mainFeatures.chipSet}</h1>
  <h1 class="text-[#706f6f] font-normal text-xl"><span class="text-[#403f3f] text-xl font-bold">Memory: </span>${phone.mainFeatures.memory}</h1>
  <h1 class="text-[#706f6f] font-normal text-xl"><span class="text-[#403f3f] text-xl font-bold">Slug: </span>${phone.slug}</h1>
  <h1 class="text-[#706f6f] font-normal text-xl"><span class="text-[#403f3f] text-xl font-bold">Release Date: </span>${phone.releaseDate}</h1>
  <h1 class="text-[#706f6f] font-normal text-xl"><span class="text-[#403f3f] text-xl font-bold">Brand: </span>${phone.brand}</h1>

  <h1 class="text-[#706f6f] font-normal text-xl"><span class="text-[#403f3f] text-xl font-bold">GPS: </span>${phone.others?.GPS || 'No GPS available in this device'}</h1>
  `

  show_details_modal.showModal()
}

const handleSearch = (isShowAll) => {
    toggleLoading(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    console.log(searchText)
    loadPhones(searchText, isShowAll)
}

const toggleLoading = (isLoading)=>{
  const loading = document.getElementById('loading')
  if(isLoading){
    loading.classList.remove('hidden')
  }
  else{
    loading.classList.add('hidden')
  }
}

const handleShowAll = () => {
  handleSearch(true)
}

// loadPhones()

// Made by Rafiu
// 


