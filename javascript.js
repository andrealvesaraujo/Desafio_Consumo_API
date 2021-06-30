async function ApiProducts() {
    
    const apiResult = await fetch("https://mystique-v2-americanas.juno.b2w.io/autocomplete?content=camiseta&source=nanook")

    return new Promise( (resolve, reject)=>{

        const apiInfo = apiResult.json()  

        apiInfo.then((result)=>{
            resolve(result.products)            
        }).catch((err)=>{            
            reject(`Request Error : ${err}`)
        })  

    })

}

var productsOptionsList = document.getElementById('productsOptionsList');

(async function listAvailableProducts(){

    ApiProducts().then((result)=>{
        result.forEach(product =>{
            
            var item = document.createElement("li");
            item.innerHTML = product.name
            productsOptionsList.appendChild(item)
            
        })
        
    }).catch((err)=>{
        alert(err)
    })    
    
}())


var searchForm = document.querySelector("form");
var nameProduct = document.getElementById('nameProduct');
var resultadoDaPesquisa = document.getElementById('resultadoDaPesquisa');

searchForm.addEventListener('submit', async function(e) {
    
    e.preventDefault()

    ApiProducts().then((result)=>{
        let product = result.find(product =>{
            if (product.name === nameProduct.value) {
                return product;
            } 
        })
        var item = document.createElement("li");
        product ? item.innerHTML = `Quero comprar ${product.name}`: item.innerHTML = `Produto ${nameProduct.value} não foi encontrado`
        nameProduct.value = ""
        resultadoDaPesquisa.appendChild(item)

    }).catch((err)=>{
        alert(err)
    })    
    
});