// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fetchProductDetails") {
        // Retrieve stored product details
        chrome.storage.local.get("productDetails", function(data) {
            console.log('data : ' + data )

            // const backendUrl = "https://yourbackend.com/api/discount-calculation"; // Update with your backend URL
            // fetch(backendUrl, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(data.productDetails),
            // })
            // .then(response => response.json())
            // .then(data => console.log("Discounted data received:", data))
            // .catch(error => console.error("Error sending data to backend:", error));
        });
    }
});
