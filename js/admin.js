var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    Breed = document.getElementById("Breed"),
    Price = document.getElementById("Price"),
    submitBtn = document.querySelector(".submit"),
    dogInfo = document.getElementById("data"),
    modal = document.getElementById("DogForm"),
    modalTitle = document.querySelector("#DogForm .modal-title"),
    newDogBtn = document.querySelector(".newDog")
// Classes
var products=[];

class Products 
{
  async getProducts() 
  {
    console.log("1");
    if(localStorage.getItem("products")=== null)//zbon gdid malo4 7aga
    {
        console.log("2");

      try 
      {
        console.log("3");

        // Fetch data from the JSON file
        let result = await fetch(`json/dog-breeds-data.json?v=${new Date().getTime()}`);
        var data = await result.json();
        console.log(data);
        // Extract products from the data
         products = data.dogBreeds.map((item) => {
          var {
            id,
            breed,
            breedType,
            origin,
            popularity,
            price,
            temperament,
            hypoallergenic,
            intelligence,
            photo,
            stockQuantity,
          } = item;
          return {
            id,
            breed,
            breedType,
            origin,
            popularity,
            price,
            temperament,
            hypoallergenic,
            intelligence,
            photo,
            stockQuantity,
          };
        });
        return products;
      } 
      catch (err) {
        console.error(err);
      }
    }
    else
    {
      products=JSON.parse( localStorage.getItem("products"));
      console.log("tmam");
      return products;
          //USersList malyaan bel7aga bta3 embar7
    }
  }
}
products=JSON.parse( localStorage.getItem("products"));
/*var pro=new Products();
pro.getProducts();*/
let isEdit = false, editId
showInfo()

newDogBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Submit';
    modalTitle.innerText = "Fill the Form";
    isEdit = false;
    imgInput.src = "./img/logodog.png";
    form.reset();
});


file.onchange = function(){
    if(file.files[0].size < 1000000){  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This file is too large!")
    }
}


function showInfo(){
    document.querySelectorAll('.DogDetails').forEach(info => info.remove())
    products.forEach((element, index) => {
        let createElement = `<tr class="DogDetails">
            <td>${index+1}</td>
            <td><img src="${element.photo}" alt="" width="200" height="100"></td>
            <td>${element.breed}</td>
            <td>${element.price}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo('${element.photo}', '${element.breed}', '${element.price}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.photo}', '${element.breed}', '${element.price}')" data-bs-toggle="modal" data-bs-target="#DogForm"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`
        dogInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(pic, Breed, Price){
    document.querySelector('.showImg').src = pic,
    document.querySelector('#showBreed').value = Breed,
    document.querySelector("#showPrice").value = Price
}


function editInfo(index, pic, breed, price){
    isEdit = true
    editId = index
    imgInput.src = pic
    Breed.value = breed
    Price.value = price

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        products.splice(index, 1)
        localStorage.setItem("products", JSON.stringify(products))
        showInfo()
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        photo: imgInput.src == undefined ? "./img/logodog.png" : imgInput.src,
        breed: Breed.value,
        price: Price.value
    }

    if(!isEdit){
        products.push(information)
    }
    else{
        isEdit = false
        products[editId] = information
    }

    localStorage.setItem('products', JSON.stringify(products))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    showInfo()

    form.reset()

    imgInput.src = "./img/logodog.png"  

    // modal.style.display = "none"
    // document.querySelector(".modal-backdrop").remove()
})
/* display product or manipulate products using this class by adding bulk of methods */


// welcome function

let showname = document.getElementById("showname");
let welcomeName = document.querySelector("#showname span");

if (localStorage.getItem("adminName")) {
  showname.style.display = "block";
  welcomeName.innerHTML = "welcome " + localStorage.getItem("adminName");
}



