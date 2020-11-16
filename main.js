const input = document.querySelector(".input-js");
const USER_PER_PAGE = 5;
const URL = "https://api.github.com/";
const reposList = document.querySelector(".repositories-js");
const mainContainer = document.querySelector(".main-js");
async function loadRepos() {
  if (input.value) {
    return await fetch(
      `${URL}search/repositories?q=${input.value}&per_page=${USER_PER_PAGE}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        const resArr = res["items"];
        console.log(...resArr);
        clearUsers();
        resArr.forEach((el) => {
          const elementReposList = createElement("li", "list-group-item");
          elementReposList.textContent = el.name;
          reposList.append(elementReposList);

          function clickHandler() {
            const container = createElement("div", "container");
            reposList.innerHTML = "";
            document.querySelector(".form-group").append(container);
            const spanName = createElement("div");
            spanName.textContent = `Name: ${el.name} `;
            const spanOwner = createElement("div");
            spanOwner.textContent = `Owner : ${el.owner.login}`;
            const spanStars = createElement("div");
            spanStars.textContent = `Stars: ${el.stargazers_count} `;
            const icon = createElement("button", "icon");
            icon.classList.add("btn");

            const elemCLose = createElement("span", "close");

            const commonElForInfo = createElement("div", "common");
            icon.append(elemCLose);
            container.append(commonElForInfo);
            container.append(icon);
            commonElForInfo.append(spanName);
            commonElForInfo.append(spanOwner);
            commonElForInfo.append(spanStars);
            function clearContainer() {
              container.style.display = "none";
            }
            container.querySelector(".icon").addEventListener("click", (e) => {
              e.preventDefault();
              reposList.style.display = "none";
              container.style.top = "-500px";
              input.value = "";
              setTimeout(clearContainer, 2000);
            });
          }
          elementReposList.addEventListener("click", clickHandler);
        });
        reposList.style.display = "block";
      });
  } else {
    clearUsers();
  }
}
elementReposList.onclick = function () {
  input.value = "";
};
loadRepos = debounce(loadRepos, 500);
input.addEventListener("input", loadRepos);
// input.addEventListener('input', () => {
//     if (!input.value) {
//         document.querySelector('.container').innerHTML = '';
//     }
// })
function createElement(elementName, className) {
  const element = document.createElement(elementName);
  if (className) {
    element.classList.add(className);
  }
  return element;
}

function debounce(fn, ms) {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
}

function clearUsers() {
  reposList.innerHTML = "";
}
