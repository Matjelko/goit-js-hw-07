import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector(".gallery");

console.log(galleryItems);

galleryItems.forEach((el) => {
    const link = document.createElement("a");
    link.classList.add("gallery__link");
    link.href = el.original;

    const img = document.createElement("img");
    img.classList.add("gallery__image");
    img.src = el.preview;
    img.alt = el.description;
    img.dataset.source = el.original;

    link.insertAdjacentElement("afterbegin", img);
    gallery.insertAdjacentElement("beforeend", link);
});

gallery.addEventListener("click", max);

function max(event){
    const targetClass = event.target.classList
    if(targetClass.contains("gallery__image")){
        event.preventDefault();

        const source = event.target.dataset.source;

        const instance = basicLightbox.create(
            `<img width="1400" height="900" src="${source}">`,
            {
                onClose: (instance) =>{
                    document.removeEventListener("keydown", closeLightboxOnEscape);
                },
            }
        );

        instance.show();
        document.addEventListener("keydown", closeLightboxOnEscape);

        function closeLightboxOnEscape(event){
            if (event.keyCode === 27){
                instance.close();

                document.removeEventListener("keydown", closeLightboxOnEscape);
            }
        }
    }
}