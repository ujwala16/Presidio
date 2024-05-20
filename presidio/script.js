document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (email.includes('seller') && !email.endsWith('_seller@gmail.com')) {
        alert('Sellers must use an email in the format: yourname_seller@gmail.com');
        return;
    }

    if (email.includes('seller')) {
        window.location.href = 'seller-dashboard.html';
    } else {
        window.location.href = 'buyer-dashboard.html';
    }
});

document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (email.includes('seller') && !email.endsWith('_seller@gmail.com')) {
        alert('Sellers must use an email in the format: yourname_seller@gmail.com');
        return;
    }

    alert('Registration Successful!');
});

function toggleForm() {
    var form = document.getElementById("post-property-form");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

function editProperty(propertyId) {
    var propertyDiv = document.getElementById(propertyId);
    var locationSpan = propertyDiv.querySelector(".location span");
    var priceSpan = propertyDiv.querySelector(".price span");

    var locationInput = document.createElement("input");
    locationInput.type = "text";
    locationInput.value = locationSpan.textContent;
    var priceInput = document.createElement("input");
    priceInput.type = "text";
    priceInput.value = priceSpan.textContent;

    locationSpan.parentNode.replaceChild(locationInput, locationSpan);
    priceSpan.parentNode.replaceChild(priceInput, priceSpan);

    var saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.onclick = function() {
        locationSpan.textContent = locationInput.value;
        priceSpan.textContent = priceInput.value;

        locationInput.parentNode.replaceChild(locationSpan, locationInput);
        priceInput.parentNode.replaceChild(priceSpan, priceInput);
        propertyDiv.removeChild(saveButton);
    };

    propertyDiv.appendChild(saveButton);
}


function deleteProperty(propertyId) {
    var propertyDiv = document.getElementById(propertyId);
    if (confirm("Are you sure you want to delete this property?")) {
        propertyDiv.parentNode.removeChild(propertyDiv);
        alert("Property deleted: " + propertyId);
    }
}


var properties = [
    {
        id: 'villa1',
        name: 'Villa 1',
        location: '123 Main St, Cityville',
        price: '$500,000',
        area: '4000 sqft',
        bedrooms: 5,
        bathrooms: 3,
        image: 'img/villa1.jpg'
    },
    {
        id: 'villa2',
        name: 'Villa 2',
        location: '456 Elm St, Townsville',
        price: '$600,000',
        area: '4500 sqft',
        bedrooms: 4,
        bathrooms: 2,
        image: 'img/villa2.jpg'
    },
    {
        id: 'villa3',
        name: 'Villa 3',
        location: '789 Oak St, Villagetown',
        price: '$750,000',
        area: '5000 sqft',
        bedrooms: 6,
        bathrooms: 4,
        image: 'img/villa3.jpg'
    }
];


function displayProperties(filters) {
    var propertyList = document.getElementById('property-list').querySelector('ul');
    propertyList.innerHTML = ''; 

    properties.forEach(function(property) {
        if (
            property.location.toLowerCase().includes(filters.location.toLowerCase()) &&
            parseFloat(property.price.replace(/\D/g, '')) >= parseFloat(filters.minPrice) &&
            parseFloat(property.price.replace(/\D/g, '')) <= parseFloat(filters.maxPrice) &&
            parseFloat(property.area.replace(/\D/g, '')) >= parseFloat(filters.minArea) &&
            parseFloat(property.area.replace(/\D/g, '')) <= parseFloat(filters.maxArea) &&
            property.bedrooms >= parseInt(filters.minBedrooms) &&
            property.bedrooms <= parseInt(filters.maxBedrooms) &&
            property.bathrooms >= parseInt(filters.minBathrooms) &&
            property.bathrooms <= parseInt(filters.maxBathrooms)
        ) {
            var listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="property-item square-carousel">
                    <img src="${property.image}" class="d-block w-100" alt="${property.name}">
                    <div class="property-details">
                        <h4>${property.name}</h4>
                        <p class="location">Location: <span>${property.location}</span></p>
                        <p class="price">Price: <span>${property.price}</span></p>
                        <p>Area: <span>${property.area}</span></p>
                        <p>Bedrooms: <span>${property.bedrooms}</span></p>
                        <p>Bathrooms: <span>${property.bathrooms}</span></p>
                    </div>
                    <div class="buttons">
                        <button onclick="editProperty('${property.id}')" class="edit">Edit</button>
                        <button onclick="deleteProperty('${property.id}')" class="delete">Delete</button>
                    </div>
                </div>
            `;
            propertyList.appendChild(listItem);
        }
    });
}


document.getElementById('search-filters').addEventListener('submit', function(e) {
    e.preventDefault();
    var filters = {
        location: e.target.querySelector('input[name="location"]').value.toLowerCase(),
        minPrice: e.target.querySelector('input[name="minPrice"]').value,
        maxPrice: e.target.querySelector('input[name="maxPrice"]').value,
        minArea: e.target.querySelector('input[name="minArea"]').value,
        maxArea: e.target.querySelector('input[name="maxArea"]').value,
        minBedrooms: e.target.querySelector('input[name="minBedrooms"]').value,
        maxBedrooms: e.target.querySelector('input[name="maxBedrooms"]').value,
        minBathrooms: e.target.querySelector('input[name="minBathrooms"]').value,
        maxBathrooms: e.target.querySelector('input[name="maxBathrooms"]').value
    };
    displayProperties(filters);
});


document.getElementById('property-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    alert('Property posted successfully!'); 
});

function initializeSellerDashboard() {
    var propertiesPostedDiv = document.getElementById('properties-posted');
    propertiesPostedDiv.innerHTML = ''; 

    properties.forEach(function(property) {
        var propertyItem = document.createElement('div');
        propertyItem.classList.add('col-md-4'); 
        propertyItem.innerHTML = `
            <div class="property-item square-carousel">
                <img src="${property.image}" class="d-block w-100" alt="${property.name}">
                <div class="property-details">
                    <h4>${property.name}</h4>
                    <p class="location">Location: <span>${property.location}</span></p>
                    <p class="price">Price: <span>${property.price}</span></p>
                    <p>Area: <span>${property.area}</span></p>
                    <p>Bedrooms: <span>${property.bedrooms}</span></p>
                    <p>Bathrooms: <span>${property.bathrooms}</span></p>
                </div>
                <div class="buttons">
                    <button onclick="editProperty('${property.id}')" class="edit">Edit</button>
                    <button onclick="deleteProperty('${property.id}')" class="delete">Delete</button>
                </div>
            </div>
        `;
        propertiesPostedDiv.appendChild(propertyItem);
    });
}
