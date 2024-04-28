let logo = document.querySelector("#logo");
let items = document.querySelectorAll("#list-item span");
let dropIcon = document.querySelectorAll(" aside .drop-icon");
let sideBarArr = document.querySelector(".sidebar-toggle i");
let sideBar = document.querySelector(".sidebar-toggle ");
let bool = false;
let aside = document.querySelector("aside");
let sideIcon = document.querySelectorAll(".list-item  ");
let theme = document.querySelector(".theme");
console.log(sideIcon);

sideIcon.forEach((e) => {
  e.addEventListener("click", (el) => {
    sideIcon.forEach((el) => {
      el.classList.remove("active");
      e.classList.add("active");
    });
  });
});
function sidebar2() {
  if (bool) {
    setTimeout(() => {
      items.forEach((e) => {
        e.style.transition = ".3s";
        e.style.display = "none";
      });
      dropIcon.forEach((e) => {
        e.style.display = "none";
      });
      logo.style.display = "none";
      sideBarArr.style.cssText = "transform:rotate(180deg) translateY(-1px); ";
      // sideBar.style.display = "none";
      bool = !bool;
      aside.style.width = "70px";
    });
  } else {
    setTimeout(() => {
      items.forEach((e) => {
        e.style.transition = ".3s";
        e.style.display = "inline-block";
      });
      dropIcon.forEach((e) => {
        e.style.display = "inline-block";
      });
      logo.style.display = "inline-block";
    }, 400);
    sideBarArr.style.cssText = "transform:rotate(0deg) translateY(0px); ";
    // sideBar.style.display="block"
    bool = !bool;
    aside.style.width = "183.5px";
  }
}
function sidebar() {
  if (document.body.clientWidth < 991) {
    setTimeout(() => {
      items.forEach((e) => {
        e.style.transition = ".3s";
        e.style.display = "none";
      });
      dropIcon.forEach((e) => {
        e.style.display = "none";
      });
      logo.style.display = "none";
      sideBarArr.style.cssText = "transform:rotate(180deg) translateY(-1px); ";
      sideBar.style.display = "none";
    });

    bool = !bool;
    aside.style.width = "70px";
  } else {
    setTimeout(() => {
      items.forEach((e) => {
        e.style.transition = ".3s";
        e.style.display = "inline-block";
      });
      dropIcon.forEach((e) => {
        e.style.display = "inline-block";
      });
      logo.style.display = "inline-block";
      sideBarArr.style.cssText = "transform:rotate(0deg) translateY(0px); ";
      sideBar.style.display = "flex";
    }, 400);
    bool = !bool;
    aside.style.width = "183.5px";
  }
}

sideBarArr.onclick = sidebar2;
sidebar();
window.onresize = sidebar;
// console.log(aside);

let spinner = document.querySelector("#spinner");
var spinnerCheck = true;
spinner.style.display = "none";

// handling the data

let main = document.querySelector("#response-section");
let applyReq = document.querySelector("#request");
let k = true;
let status;
let warn = document.createElement("div");
warn.style.cssText = "justify-self:center";
// if(document.location.pathname.split("/").slice(-1).join("").split("?").slice(0,1).join("")=="")
async function apiRequest() {
  warn.style.display = "none";

  spinnerChecker();
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    response.status;
    let data = await response.json();
    // console.log(data);
    let table = document.createElement("table");
    main.appendChild(table);
    let keys = Object.keys(data[0]);
    let tr = document.createElement("tr");
    table.appendChild(tr);
    for (let i = 0; i < keys.length - 4; i++) {
      let th = document.createElement("th");

      let thContent = document.createTextNode(keys[i]);
      th.appendChild(thContent);
      tr.appendChild(th);
    }

    for (let j = 0; j < keys.length + 2; j++) {
      let tr = document.createElement("tr");
      for (let i = 0; i < keys.length - 4; i++) {
        let td = document.createElement("td");
        let content = document.createTextNode(data[j][keys[i]]);
        td.appendChild(content);
        tr.appendChild(td);
        table.appendChild(tr);
      }
    }
    // handling search input
    let inputSearch = document.querySelector("#searchInput");
    inputSearch.addEventListener("input", function () {
      let searchValue = inputSearch.value;
      let rows = document.querySelectorAll("table tr");
      let bodyRows = Array.from(rows).slice(1);

      bodyRows.forEach(function (row) {
        let cells = row.querySelectorAll("td");
        let id = cells[0].textContent;
        if (id == searchValue || searchValue === "") {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  } catch (err) {
    warn.style.display = "flex";
    warn.innerHTML = "";
    main.appendChild(warn);
    warn.className = "warn";
    let warnh1 = document.createElement("h1");
    let h1Content = document.createTextNode("error");
    warnh1.classList.add("warnings-h1");
    warnh1.appendChild(h1Content);

    let warnp = document.createElement("p");
    let pContent = document.createTextNode(err);
    warnp.classList.add("warnings-p");

    warnp.appendChild(pContent);
    warn.appendChild(warnh1);
    warn.appendChild(warnp);
    main.appendChild(warn);
    let refresh = document.createElement("button");
    refresh.classList.add("refresh");
    refresh.innerHTML = "refresh";
    warn.appendChild(refresh);

    refresh.onclick = apiRequest;
  } finally {
    spinner.style.display = "none";
  }
}
async function ajaxRequest() {
  warn.style.display = "none";
  spinnerChecker();
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/comments",
    context: document.body,
    success: (data) => {
      warn.innerHTML = "";
      let table = document.createElement("table");
      main.appendChild(table);
      let keys = Object.keys(data[0]);
      let tr = document.createElement("tr");
      table.appendChild(tr);
      for (let i = 0; i < keys.length; i++) {
        let th = document.createElement("th");

        let thContent = document.createTextNode(keys[i]);
        th.appendChild(thContent);
        tr.appendChild(th);
      }

      for (let j = 0; j < data.length; j++) {
        let tr = document.createElement("tr");
        for (let i = 0; i < keys.length; i++) {
          let td = document.createElement("td");
          let content = document.createTextNode(data[j][keys[i]]);
          td.appendChild(content);
          tr.appendChild(td);
          table.appendChild(tr);
        }
      }
      // handling search input
      let inputSearch = document.querySelector("#searchInput");
      inputSearch.addEventListener("input", function () {
        let searchValue = inputSearch.value;
        let rows = document.querySelectorAll("table tr");
        let bodyRows = Array.from(rows).slice(1);

        bodyRows.forEach(function (row) {
          let cells = row.querySelectorAll("td");
          let id = cells[0].textContent;
          if (id == searchValue || searchValue === "") {
            row.style.display = "";
          } else {
            row.style.display = "none";
          }
        });
      });
      spinner.style.display = "none";
    },
    error: (xhr, status, err) => {
      warn.style.display = "flex";
      // let warn = document.createElement("div");
      main.appendChild(warn);
      warn.className = "warn";
      // let warnh1 = document.createElement("h1");
      // let h1Content = document.createTextNode("error");
      // warnh1.classList.add("warnings-h1");
      // warnh1.appendChild(h1Content);

      let warnp = document.createElement("p");
      let pContent = document.createTextNode(`${status} ${xhr.status}`);
      warnp.classList.add("warnings-p");

      warnp.appendChild(pContent);
      // warn.appendChild(warnh1);
      warn.appendChild(warnp);
      main.appendChild(warn);
      let refresh = document.createElement("button");
      refresh.classList.add("refresh");
      refresh.innerHTML = "refresh";
      warn.appendChild(refresh);

      refresh.onclick = ajaxRequest;
      spinner.style.display = "none";
    },
  });
}

function spinnerChecker() {
  spinner.style.display = "inline-block";
  warn.innerHTML = "";
}
spinnerChecker();

// ajaxRequest();

// handling page request
window.onload = () => {
  let pathName = document.location.pathname
    .split("/")
    .slice(-1)
    .join("")
    .split("?")[0];
  if (pathName == "index.html") {
    apiRequest();
  } else {
    ajaxRequest();
  }
};
// handling theme
const themes = document.querySelector("#theme");
const DARK_MODE_KEY = "darkModeActive";

function applyTheme() {
  const darkModeIsActive = localStorage.getItem(DARK_MODE_KEY) === "true";
  document.body.classList.toggle("active", darkModeIsActive);
}

theme.addEventListener("click", () => {
  const isDarkModeCurrentlyEnabled = document.body.classList.contains("active");

  // We toggle the current state: if dark mode is enabled, disable it, and vice versa
  if (isDarkModeCurrentlyEnabled) {
    localStorage.setItem(DARK_MODE_KEY, "false");
  } else {
    localStorage.setItem(DARK_MODE_KEY, "true");
  }

  // Apply the theme after each click
  applyTheme();
});

// Apply the theme when the page loads
applyTheme();
