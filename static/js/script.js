document.addEventListener("DOMContentLoaded", () => {
    const productList = document.querySelector(".product-list");
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
                newPrice.textContent = `$${product.price - (product.price * 20 / 100)}`;


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
});

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
            iconImg.style.zIndex = "2";
            iconImg.style.width = "38px";
            iconImg.style.height = "38px";
            iconImg.style.cursor = "pointer";

            if(index == 0){
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

document.addEventListener("DOMContentLoaded", () => {
    function handleIconClick(event) {
        const target = event.target;
        const productCount = document.getElementById("product-count");

        // Check if the clicked element is an icon within a product-image div
        if (target.tagName === "IMG" && target.parentNode.classList.contains("product-image")) {
            if (target.classList.contains("first-icon")) {
                // This is the first icon, you can handle it separately
                // Get the current count
                let count = parseInt(productCount.textContent);
                // Increment the count by one
                count += 1;
                // Update the count in the element
                productCount.textContent = count;
            } else {
                // This is the second icon, handle it differently if needed
            }
        }
    }

    // Add a click event listener to the document and delegate the handling
    document.addEventListener("click", handleIconClick);
});