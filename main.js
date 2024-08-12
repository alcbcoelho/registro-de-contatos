const form = document.querySelector("#contact-form form");
const [contactName, contactPhone] = form.querySelectorAll("input");
const btnClear = form.querySelector("#button-clear");
const table = document.querySelector("#contact-list table");

const registeredPhoneValues = [];

btnClear.addEventListener("click", () => {
  clearTable();

  function clearTable() {
    const tbody = table.querySelector("tbody");
    if (tbody.innerHTML !== "") {
      tbody.innerHTML = "";
      registeredPhoneValues.splice(0, registeredPhoneValues.length);
    } else alert("Não há contatos catalogados!");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!isPhoneNumberRegistered()) {
    addNewContact();
    clearFormField(contactName, contactPhone);
  } else clearFormField(contactPhone);

  function formatPhoneValue(value) {
    let arr = value.split("");

    arr = arr.map((i) => parseInt(i));
    arr.forEach((i, index) => Number.isNaN(i) && arr.splice(index, 1));
    arr = arr.map((i) => i.toString());

    const str = arr.join("");

    return arr.length === 12
      ? `+${str.substring(0, 2)} (${str.substring(2, 4)}) ${str.substring(
          4,
          8
        )}-${str.substring(8)}`
      : `+${str.substring(0, 2)} (${str.substring(2, 4)}) ${str.substring(
          4,
          9
        )}-${str.substring(9)}`;
  }

  function isPhoneNumberRegistered() {
    const formattedValue = formatPhoneValue(contactPhone.value);
    if (registeredPhoneValues.includes(formattedValue)) {
      alert(`O número de telefone ${formattedValue} já está catalogado!`);
      return true;
    }
    return false;
  }

  function addNewContact() {
    const numOfCols = table.querySelectorAll("th").length;
    const tr = document.createElement("tr");
    const tds = [];

    for (let i = 0; i < numOfCols; i++) tds.push(document.createElement("td"));
    tds[0].innerText = contactName.value;
    tds[1].innerText = formatPhoneValue(contactPhone.value);
    tds.forEach((td) => tr.append(td));

    table.querySelector("tbody").append(tr);
    registeredPhoneValues.push(tds[1].innerText);
  }

  function clearFormField(...field) {
    field.forEach((f) => (f["value"] = ""));
  }
});
