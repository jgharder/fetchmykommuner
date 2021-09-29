const out = (str) => console.log(str)

const komUrl = "http://localhost:8080/kommuner"

function fetchAllKommuner() {
  return fetch(komUrl).then(response => response.json())
}

function callFetchAllKommuner(btn) {
  const prom = fetchAllKommuner();
  prom.then(createKommuneMap)
}

let kommuneMap = new Map();

function createKommuneMap(data) {
  data.forEach(kom => {
    kommuneMap.set(kom.kommune, kom)
  })
  out(data)

}

function showKommuneMap(){
  for (const komKey of kommuneMap.keys()){
    out(kommuneMap.get(komKey))
  }
}

callFetchAllKommuner();

//const pbGetkommuner = document.querySelector(".pbGet")
const pbShowMap = document.querySelector(".pbShowKomMap")

//pbGetkommuner.addEventListener("click", callFetchAllKommuner)
pbShowMap.addEventListener("click", showKommuneMap)
