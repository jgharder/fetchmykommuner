const out = (str) => console.log(str)

out("jeg er i insertkommune.js")

document.addEventListener("DOMContentLoaded", createFormEventListener);

let kommuneForm;

function createFormEventListener() {
  kommuneForm = document.getElementById("newKommuneForm");
  kommuneForm.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
  // vi intercepter submittet, så ikke dafault send til server
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    const formData = new FormData(form)
    const responseData = await restInsertKommune(url, formData)
    out("ResponseData= ")
    out(responseData)
  } catch (error) {
    alert(error.message);
    out(error)
  }

}

async function restInsertKommune(url, formData) {

  const plainFormData = Object.fromEntries(formData.entries());
  out(plainFormData);
  plainFormData.regionKode = "1081";

  const jsonString = JSON.stringify(plainFormData)

  const fetchOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: jsonString
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    out("Det gik ikke godt med at tilføje ny kommune");
  }

  return response.json();

}
