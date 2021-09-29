out("jeg er i createatags.js")

const komtag = document.getElementById("komtags")

function createATags(){
  out("create a tags")
  for (const komKey of kommuneMap.keys()){
    const kom1 = kommuneMap.get(komKey)
    const atag = document.createElement("a")
    atag.setAttribute("href", kom1.regionHref)
    atag.innerText = kom1.kommune
    komtag.appendChild(atag)
    const brtag = document.createElement("br")
    komtag.appendChild(brtag)
    
  }
}

const pbCreateATags = document.querySelector(".pbCreateATag")

pbCreateATags.addEventListener("click",createATags)
