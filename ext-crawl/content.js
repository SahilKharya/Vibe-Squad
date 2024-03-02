// content.js
function getProductDetails() {
    const productName = document.getElementById('productTitle')?.innerText.trim();
    const productDescription = document.querySelector('#feature-bullets')?.innerText.trim() || document.querySelector('#bookDescription_feature_div')?.innerText.trim();
    // const productPrice = document.getElementById('priceblock_ourprice')?.innerText.trim() || document.querySelector('.apexPriceToPay')?.innerText.trim();
    const priceDiv = document.getElementById('corePriceDisplay_desktop_feature_div')

    const productPrice = priceDiv?.innerText.trim().split("\n")[0].split(' ')[0]

    const newDiv = document.createElement("div");

    // Create the button element within the new div
    const button = document.createElement("button");
    button.href = 'https://example.com'; // Set the link URL
    button.innerText = 'Save Vibe'; // Set the button text
    button.style.padding = '10px 15px'; // Example styling
    button.style.backgroundColor = '#9dbdf5'; // Example styling
    button.style.color = '#141212'; // Example styling
    button.style.textDecoration = 'none'; // Example styling
    button.style.borderRadius = '10px'; // Example styling
    button.style.margin = '10px 0'; // Example styling

    // Append the button to the new div
    newDiv.appendChild(button);

    // Insert the new div after the existing div
    priceDiv.parentNode.insertBefore(newDiv, priceDiv.nextSibling);



    return {
        productName,
        productDescription,
        productPrice
    };
}



// Listen for the DOMContentLoaded event before running the script
window.onload = () => {
    const productDetails = getProductDetails();

    // Store product details in local storage
    chrome.storage.local.set({ productDetails }, function () {
        console.log("Product details stored locally.");
    });

    // Optionally, send product details to the background script if further processing is required
    // chrome.runtime.sendMessage({
    //     action: "fetchProductDetails",
    //     data: productDetails
    // });
    // chrome.runtime.sendMessage({ action: "fetchProductDetails" }, function (response) {
    //     if (response.productDetails) {
    //         document.getElementById('productName').textContent = response.productDetails.title || 'Product Name Not Available';
    //         document.getElementById('productPrice').textContent = response.productDetails.price || 'Price Not Available';
    //         document.getElementById('productUrl').textContent = response.productDetails.url || 'URL Not Available';
    //         document.getElementById('productImage').style.backgroundImage = `url(${response.productDetails.imageUrl})`;
    //     }
    // });
    // Example of accessing stored product details immediately after setting them might not always work due to asynchronous nature
    // It's shown here for instructional purposes
    chrome.storage.local.get("productDetails", function (data) {
        console.log("Retrieved product details:", data.productDetails);
        document.getElementById('productName').textContent = response.productDetails.title || 'Product Name Not Available';
        document.getElementById('productPrice').textContent = response.productDetails.price || 'Price Not Available';
        document.getElementById('productUrl').textContent = response.productDetails.url || 'URL Not Available';
        document.getElementById('productImage').style.backgroundImage = `url(${response.productDetails.imageUrl})`;
    });

}