let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/toys').then(function(response) {
    return response.json()
  }) .then(function(json) {
    return createToys(json)
  })
  
  function createToys(toys){
    const toyCollection = document.getElementById('toy-collection')
    toys.forEach(toy => {
      createToy(toy)
    })
  }

  function createToy(toy) {
    const toyCollection = document.getElementById('toy-collection')
    const card = document.createElement('div')
    const toyName = document.createElement('h2')
    const image = document.createElement('img')
    const p = document.createElement('p')
    const button = document.createElement('button')
    image.src = toy.image
    toyName.innerText = toy.name
    image.classList.add('toy-avatar')
    p.innerText = toy.likes
    button.classList.add('like-btn')
    button.innerText = "Like"
    card.setAttribute('id', toy.id)
    card.classList.add('card')
    card.appendChild(toyName)
    card.appendChild(image)
    card.appendChild(p)
    card.appendChild(button)
    toyCollection.appendChild(card)

    button.addEventListener("click", () => {
      
      p.innerText = ((parseInt(p.innerText))+1).toString()
      patchToy(parseInt(p.innerText))
      function patchToy(likes) {
        
        let configObj = {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify({likes: likes})
        };

        return fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
      }
    })
  }
  
  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', (event) => {
    event.preventDefault()
    fName = toyForm.elements[0].value
    fUrl = toyForm.elements[1].value
    fetchToy(fName, fUrl)
    function fetchToy(name, url) {
      
      let formData = {
        name: name,
        image: url,
        likes: 0
      }

      let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      };

      return fetch('http://localhost:3000/toys', configObj)
        .then(function(response) {
            return response.json()
        })
        .then(function(object) {
          createToy(object)
        })
    }
  })
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
