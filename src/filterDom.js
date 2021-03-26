import image from './images/bitmap.jpg'

export function filterDom(){
    const wrapper = document.querySelector('.cart__wrapper'),
    input = document.querySelector('.filterText')




  const createItem = (data) =>{
    wrapper.innerHTML = ''
    data.forEach(el => {
        let item = document.createElement('a')
        item.classList.add('cart__item');
        item.setAttribute('href', `./details/${el.id}`)
        item.innerHTML = `
     
        <div class="cart__item-img">
                        <img src="${image}" alt="">
                        <div style="${el.type === 'SupportAvailable' ? 'background: #EC6608;' : ''}" class="cart__item-smallText">
                            ${el.type}     
                        </div>
                    </div>
                    <div class="cart__item-wrap">
                        <div class="cart__item-title">
                            ${el.title}
                        </div>
                        <div class="cart__item-adres">
                            ${el.address}
                        </div>
                        <div class="cart__item-price">
                            New Properties for Sale from <span>£${el.price}</span>
                        </div>
                        <div class="cart__item-text">
                            Shared Ownership Available
                        </div>
                    </div>
                    
        `;
        wrapper.append(item)
    });
  }

  const filter = (e, data) => {
      if(e.target.value.length > 2){
       let newData =  data.filter((item)=> {
            let str = item.title.toLowerCase().indexOf(e.target.value.toLowerCase())
           return str >=0 ? true : false
        })
        createItem(newData)
      } else{
        createItem(data)
      }
  }

  fetch('https://603e38c548171b0017b2ecf7.mockapi.io/homes')
  .then(response => response.json())
  .then(data =>{
    createItem(data)
    return data
  })
  .then(data=>{
    input.addEventListener('input', (e)=>{
        filter(e, data)
    })
  })

  
}