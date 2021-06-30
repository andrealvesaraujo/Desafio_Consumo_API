var productsOptionsList = document.getElementById('productsOptionsList');

var apiInfo = ApiCall()

async function ApiCall() {
    const apiResult = await fetch("https://mystique-v2-americanas.juno.b2w.io/autocomplete?content=camiseta&source=nanook")
    return apiResult.json()  
}

async function listAvailableProducts() {

    apiInfo.then((result)=>{
        result.products.forEach(product =>{
            
            var item = document.createElement("li");
            item.innerHTML = product.name
            productsOptionsList.appendChild(item)
            
        })
        
    }).catch((err)=>{
        console.log(`Request Error : ${err}`)
    })    
    
}

listAvailableProducts()

var searchForm = document.querySelector("form");
var nameProduct = document.getElementById('nameProduct');
var resultadoDaPesquisa = document.getElementById('resultadoDaPesquisa');

searchForm.addEventListener('submit', async function(e) {
    
    e.preventDefault()

    apiInfo.then((result)=>{
        let product = result.products.find(product =>{
            if (product.name === nameProduct.value) {
                return product;
            } 
        })
        var item = document.createElement("li");
        product ? item.innerHTML = product.name : item.innerHTML = `Produto ${nameProduct.value} não foi encontrado`
        nameProduct.value = ""
        resultadoDaPesquisa.appendChild(item)

    }).catch((err)=>{
        console.log(`Request Error : ${err}`)
    })    
    
});