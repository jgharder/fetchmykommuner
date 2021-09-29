out("")

const table = document.getElementById("kommune_table");


function addRow(kommune) {
  let rowCount = table.rows.length;
  let row = table.insertRow(rowCount);

  row.id = kommune.kommune;
  out(row.id);

  let cell1 = row.insertCell(0);
  cell1.innerHTML = kommune.kommuneKode

  let cell2 = row.insertCell(1);
  kommuneInput = document.createElement("input");
  kommuneInput.type = "text";
  kommuneInput.setAttribute("value", kommune.kommune);
  cell2.appendChild(kommuneInput);

  let cell3 = row.insertCell(2);
  cell3.innerHTML = kommune.regionKode

  let cell4 = row.insertCell(3);
  cell4.innerHTML = kommune.regionsNavn

  let cell5 = row.insertCell(4);
  let atag = document.createElement("a")
  atag.setAttribute("href", kommune.regionHref)
  atag.innerText = kommune.regionHref;
  cell5.appendChild(atag);

  let cell6 = row.insertCell(5);
  let cbox = document.createElement("input");
  cbox.type = "checkbox";
  cell6.appendChild(cbox);

  let cell7 = row.insertCell(6);
  let pbToggleCBox = document.createElement("input");
  pbToggleCBox.type = "button";
  pbToggleCBox.setAttribute("value", "toggle");
  pbToggleCBox.onclick = function () {
    cbox.checked = !cbox.checked
  }
  cell7.appendChild(pbToggleCBox);

  let cell8 = row.insertCell(7);
  let pbDelete = document.createElement("input");
  pbDelete.type = "button";
  pbDelete.setAttribute("value", "slet Kommune");
  pbDelete.onclick = function () {
    document.getElementById(kommune.kommune).remove()
    deleteKommune(kommune)
  }
  cell8.appendChild(pbDelete);

  let cell9 = row.insertCell(8);
  let pbUpdate = document.createElement("input");
  pbUpdate.type = "button";
  pbUpdate.setAttribute("value", "Update Kommune xxx");
  pbUpdate.onclick = function () {
   // kommune.kommune = kommuneInput.value;
    out("YYYY");
    out(kommune);
    const chg  = kommuneInput.value;
    out(chg);

    out("vi henter input");
    out(kommune.kommune);
    putKommunex(kommune);
  }
  cell9.appendChild(pbUpdate);


}


function createTableFromMap(btn) {
  out("create table");
  for (const komKey of kommuneMap.keys()) {
    const kom1 = kommuneMap.get(komKey);
    addRow(kom1)
  }
}

const pbCreateTable = document.querySelector(".pbCreateTable");
pbCreateTable.addEventListener("click", createTableFromMap);


async function deleteKommune(kommune) {
  try {
    const response = await restDeleteKommune(kommune);
    out("vi har slettet ");
    out(response);

  } catch (error) {
    alert(error.message);
    out(error);
  }
}

async function putKommunex(kommune) {
  try {
    out("XXXX");
    out(kommune);
    const response = await restPutKommune(kommune);
    out("vi har rettet");
    out(response);

  } catch (error) {
    alert(error.message);
    out(error);
  }

}

async function restDeleteKommune(kommune) {
  const url = "http://localhost:8080/kommune/" + kommune.kommuneKode;
  const fetchOptions = {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
    body: ""
  }
  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    out("Det gik ikke godt med at slette kommune");
  }

  return response;

}

async function restPutKommune(kommune) {
  const url = "http://localhost:8080/kommune/" + kommune.kommuneKode;
  const jsonString = JSON.stringify(kommune);
  out(jsonString);

  const fetchOptions = {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: jsonString
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    out("Det gik ikke godt med at opdatere kommune");
  }

  return response;
}
