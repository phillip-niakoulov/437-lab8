const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];

/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.src = product.imageSrc;
    img.alt = product.name;

    article.appendChild(img);

    const detailsDiv = document.createElement("div");
    detailsDiv.className = "product-details";

    const title = document.createElement("h3");
    title.textContent = product.name;
    detailsDiv.appendChild(title);

    const description = document.createElement("p");
    description.textContent = product.description;
    detailsDiv.appendChild(description);

    const priceP = document.createElement("p");
    priceP.className = "price";
    priceP.textContent = `$${product.price}`;
    detailsDiv.appendChild(priceP);

    const buttonWrapper = document.createElement("div");

    const button = document.createElement("button");
    button.className = "buy-button";
    button.textContent = "Add to cart";
    buttonWrapper.appendChild(button);

    const cartCount = document.createElement("span");
    cartCount.textContent = product.numInCart > 0 ? `${product.numInCart} in cart` : "";
    cartCount.className = "num-in-cart";
    buttonWrapper.appendChild(cartCount);

    detailsDiv.appendChild(buttonWrapper);
    article.appendChild(detailsDiv);

    return article;
}

document.body.appendChild(renderProductCard(PRODUCTS[0]));

/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
    /*
    1. remove all <article>s
    2. recreate them using the data in PRODUCTS
    3. modify the re-creation so it uses shouldProductBeVisible() (details are near the bottom of the lab directions)

    You can remove and recreate the heading element if it makes things easier.
     */

    for (let child of document.querySelectorAll("article")) {
        child.remove();
    }
    // technically rendered backwards from list structure

    PRODUCTS
    .filter(product => shouldProductBeVisible(product))
    .forEach(product => {
        let child = renderProductCard(product);

        child.querySelector("button").addEventListener('click', () => {
            product.numInCart++;
            rerenderCart();
            rerenderAllProducts();
        });

        document.querySelector("section.product-list").appendChild(child);
    });
}

rerenderAllProducts();

/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
    /*
    1. remove all card items
    2. recreate them and the remove buttons based off the data in PRODUCTS
     */

    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';

    const cartItemsContainer = document.querySelector('.cart-items');
    
    for (let product of PRODUCTS) {
        if (product.numInCart > 0) {
            const productInfo = document.createElement('p');
            productInfo.textContent = `${product.name} x${product.numInCart}`;

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-button';
            removeButton.textContent = 'Remove';

            removeButton.addEventListener('click', () => {
                product.numInCart = 0;
                rerenderCart();
                rerenderAllProducts();
            });

            cartItemsContainer.appendChild(productInfo);
            cartItemsContainer.appendChild(removeButton);
        }
    }
}

rerenderCart()

/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {
    return product.price >= Number.parseFloat(document.querySelector("#minPrice").value) && product.price <= Number.parseFloat(document.querySelector("#maxPrice").value)
}

document.querySelector("#minPrice").addEventListener("change", () => {
    rerenderAllProducts()
})

document.querySelector("#maxPrice").addEventListener("change", () => {
    rerenderAllProducts()
})