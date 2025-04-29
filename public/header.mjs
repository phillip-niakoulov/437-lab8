import { toHtmlElement } from './toHtmlElement.mjs';

const navList = [
  { text: 'Home', href: 'index.html' },
  { text: 'Hobbies', href: 'hobbies.html' },
];

function createHeader() {
  const navLinks = navList
    .map(item => `<a href="${item.href}">${item.text}</a>`)
    .join('\n');

  const header = `
    <header>
      <h1>Phillip Niakoulov</h1>
      <nav>
        ${navLinks}
      </nav>
      <label>
        <input type="checkbox" autocomplete="off" />
        Light mode
      </label>
      <button id="menu-button">Menu</button>
    </header>`;

  return toHtmlElement(header);
}

const headerElement = createHeader();
const bodyElement = document.querySelector('body');
bodyElement.prepend(headerElement);




const nav = document.querySelector("header > nav");
const header = document.querySelector("header");
const lightModeCheckbox = document.querySelector("input[type='checkbox']")



document.getElementById("menu-button").addEventListener("click", () => {
  nav.style.display = (nav.style.display === "flex") ? "none" : "flex";
});

document.addEventListener("click", (e) => {
  if (!header.contains(e.target)) {
    nav.style.display = "none";
  }
});



lightModeCheckbox.addEventListener("change", (e) => {
  if (e.target.checked) {
    document.body.classList.add('light-mode');
    localStorage.setItem("lightMode", "true");
  } else {
    document.body.classList.remove('light-mode');
    localStorage.setItem("lightMode", "false");
  }
})

const lightModeState = localStorage.getItem("lightMode");
if (lightModeState === "true") {
  lightModeCheckbox.checked = true;
  document.body.classList.add('light-mode');
} else {
  lightModeCheckbox.checked = false;
  document.body.classList.remove('light-mode');
}