import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `
  <li class="gallery__item  js_gallery_item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li> `
    )
    .join("");
}

let instance;
const list = document.querySelector(".gallery");

list.insertAdjacentHTML("beforeend", createMarkup(galleryItems));
list.addEventListener("click", handleClick);

function handleClick(event) {
  event.preventDefault();

  if (event.target === event.currentTarget) {
    return;
  }

  const largeImage = event.target.dataset.source;

  instance = basicLightbox.create(
    `
  <div class="modal">
    <img src ="${largeImage}" width="800" height="600"/>
  </div>
  `,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEscKeyPress);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onEscKeyPress);
      },
    }
  );

  instance.show();
}

function onEscKeyPress(event) {
  if (event.code !== "Escape") return;
  instance.close();
}
