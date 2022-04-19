let page = 1;
let formContainer = document.getElementById("create-monster");

let form = document.createElement("form");
let inputName = document.createElement("input");
inputName.setAttribute("type", "text");
let inputAge = document.createElement("input");
inputAge.setAttribute("type", "number");
let inputDescription = document.createElement("input");
inputDescription.setAttribute("type", "text");
let button = document.createElement("button");

button.textContent = "Create Monster";
button.setAttribute("type", "submit");
form.appendChild(inputName);
form.appendChild(inputAge);
form.appendChild(inputDescription);
form.appendChild(button);

formContainer.appendChild(form);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = inputName.value;
  let age = parseInt(inputAge.value);
  let description = inputDescription.value;
  createMonster(name, age, description);
});

let backButton = document.getElementById("back")
let forwardButton = document.getElementById("forward");

backButton.addEventListener("click", () => {
    previousPage()
})

forwardButton.addEventListener("click", () => {
  nextPage();
});

//Function to get next page monsters

function nextPage() {
    page += 1;
    monsterContainer.textContent = "";
    getMonsters(page)
}

function previousPage() {
    if (1 < page) {
        page -= 1;
        monsterContainer.textContent=""
        getMonsters(page)
        return
    }
    return alert("No more pages to load");
}



//Funtion to get monsters
const monsterContainer = document.getElementById("monster-container");
function getMonsters(pageNum=page) {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then((res) => res.json())
      .then((monsters) => {
        console.log(monsters)
      for (const monster of monsters) {
          let itemContainer = document.createElement("div");
          itemContainer.style.border = "1px solid brown"
          itemContainer.style.margin = "5px";
          itemContainer.style.borderRadius = "5px";
          itemContainer.style.padding = "10px";
          let h3 = document.createElement("h3");
          h3.textContent = `Name: ${monster.name}`
          let h4 = document.createElement("h4");
          h4.textContent=`Age: ${monster.age}`
          let p = document.createElement("p");
          p.textContent=`Description: ${monster.description}`
        itemContainer.appendChild(h3);
        itemContainer.appendChild(h4);
        itemContainer.appendChild(p);
        monsterContainer.appendChild(itemContainer);
      }
    });
}

getMonsters()

//Function to create monster

function createMonster(name, age, description) {
  fetch(`http://localhost:3000/monsters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name, age, description }),
  });
}
