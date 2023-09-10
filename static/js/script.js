document.addEventListener("DOMContentLoaded", () => {
    const productList = document.querySelector(".product-list");
    const productCount = document.getElementById("product-count");
    const cartIcon = document.getElementById('cart-icon');
    const cartPanel = document.createElement('div');
    cartPanel.classList.add('cart-panel');

    // Create a close button (X icon)
    const closeButton = document.createElement('div');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = 'X';

    // Append the close button to the cart panel
    cartPanel.appendChild(closeButton);

    const OffCanvasDiv = document.createElement("div");
    OffCanvasDiv.classList.add("OffCanvas-body");


    // Create the TitleOffcanvas
    const TitleOffcanvas = document.createElement("h3");
    TitleOffcanvas.textContent = `Products:`;
    TitleOffcanvas.style.textAlign = "center";
    TitleOffcanvas.style.marginBottom = "0";

    // Create a container for the final price
    const finalPriceContainer = document.createElement("div");
    finalPriceContainer.classList.add("final-price");
    finalPriceContainer.innerHTML = `
        <div class="d-flex position-absolute justify-content-center align-items-center" style="bottom: 10px;">
            <h2 class="final-price-text">Final Price: $0</h2>
        </div>
    `;
    
    cartPanel.appendChild(TitleOffcanvas);
    cartPanel.appendChild(OffCanvasDiv);
    cartPanel.appendChild(finalPriceContainer);

    // Initialize the total price variable
    let totalPrice = 0;

    // Append the cart panel to the body
    document.body.appendChild(cartPanel);

    fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
            const latestItems = data.slice(1, 7);

            latestItems.forEach((product) => {
                const productItem = document.createElement("div");
                productItem.classList.add("product-item");
                productItem.classList.add("col-md-4");
                productItem.classList.add("col-12");

                // Create a separate div for the image
                const imageDiv = document.createElement("div");
                imageDiv.classList.add("product-image");
                const img = document.createElement("img");
                img.src = product.image;
                img.alt = product.title;
                imageDiv.appendChild(img);
                productItem.appendChild(imageDiv);

                // Create title of the item
                const title = document.createElement("h2");
                title.classList.add("product-title");
                title.textContent = product.title;

                productItem.appendChild(title);

                // create separate div for the old and new prices
                const spanDiv = document.createElement("div");
                spanDiv.classList.add("prices");
                spanDiv.style.display = "flex";
                spanDiv.style.gap = "20px";
                spanDiv.style.alignItems = "center";
                spanDiv.style.justifyContent = "center";

                // create old price and add style
                const price = document.createElement("span");
                price.textContent = `$${product.price}`;
                price.style.textDecoration = "line-through";

                // calculate new price
                const newPrice = document.createElement("strong");
                newPrice.classList.add("product-price");
                newPrice.textContent = `$${(product.price - (product.price * 20 / 100)).toFixed(2)}`;

                // Add a click event listener to the product item
                productItem.addEventListener("click", (event) => {
                    const target = event.target;

                    if (target.classList.contains("first-icon")) {
                        // This is the first icon, you can handle it separately
                        // Get the current count
                        let count = parseInt(productCount.textContent);
                        // Increment the count by one
                        count += 1;
                        // Update the count in the element
                        productCount.textContent = count;

                        // Add the product information to the cart
                        const cartItem = document.createElement("div");
                        cartItem.classList.add("cart-item");
                        cartItem.innerHTML = `
                            <div class="mt-4 d-flex align-items-center justify-content-between">
                                <h3 class="cart-product-title">${product.title}</h3>
                                <strong class="cart-product-price">$${(product.price - (product.price * 20 / 100)).toFixed(2)}</strong>
                            </div>
                        `;

                        OffCanvasDiv.appendChild(cartItem);
                        
                        totalPrice += (product.price - (product.price * 20 / 100));
                        finalPriceContainer.querySelector(".final-price-text").textContent = `Final Price: $${totalPrice.toFixed(2)}`;
                    }
                });

                //add old price and new price into spanDiv
                spanDiv.appendChild(price);
                spanDiv.appendChild(newPrice);
                productItem.appendChild(spanDiv);

                productList.appendChild(productItem);
            });

            // Call the function to add images to .product-image divs
            addImagesToProductImages();
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
        });

    // Function to add images to .product-image divs
    function addImagesToProductImages() {
        const productImageDivs = document.querySelectorAll(".product-image");

        // Define the URLs for your icons
        const iconUrls = [
            "static/images/Add-To-Cart.svg",
            "static/images/Wish-List.svg",
        ];

        productImageDivs.forEach((imageDiv) => {
            iconUrls.forEach((iconUrl, index) => {
                // Create an image element for each icon
                const iconImg = document.createElement("img");
                iconImg.src = iconUrl;
                iconImg.alt = "icon to add item in your cart"; // Set an appropriate alt text

                // Apply styles to the icons
                iconImg.style.position = "absolute";
                iconImg.style.top = "10px";
                iconImg.style.right = "20px";
                iconImg.style.width = "38px";
                iconImg.style.height = "38px";
                iconImg.style.cursor = "pointer";

                if (index == 0) {
                    iconImg.classList.add("first-icon");
                }

                if (index === 1) {
                    iconImg.style.top = "56px";
                }

                // Append the icon image to the .product-image div
                imageDiv.appendChild(iconImg);
            });
        });
    }

    // Function to create and open the cart panel
    function createAndOpenCartPanel() {
        cartPanel.classList.add('open');
    }

    // Add event listener to close the cart panel when the X button is clicked
    closeButton.addEventListener('click', () => {
        cartPanel.classList.remove('open');
    });

    // Add event listener to open the cart panel when the cart icon is clicked
    cartIcon.addEventListener('click', createAndOpenCartPanel);
});