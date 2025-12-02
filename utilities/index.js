// utilities/index.js

// ------------------ FORMATTERS ------------------

function formatUSD(amount) {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
}

function formatNumber(value) {
  const num = Number(value) || 0;
  return new Intl.NumberFormat("en-US").format(num);
}

// ------------------ NAVIGATION ------------------

/**
 * Build navigation bar HTML
 */
function getNav(classData) {
  let nav = `<ul class="navigation">`;

  // Home link
  nav += `<li><a href="/" title="Home page">Home</a></li>`;

  // Add classifications  
  if (classData && classData.length) {
    classData.forEach((row) => {
      nav += `
        <li>
          <a href="/inv/type/${row.classification_id}"
             title="See our inventory of ${row.classification_name}">
            ${row.classification_name}
          </a>
        </li>`;
    });
  }

  nav += `</ul>`;
  return nav;
}

// ------------------ CLASSIFICATION GRID ------------------

function buildClassificationGrid(data) {
  if (!data || data.length === 0) {
    return `<p class="notice">Sorry, no matching vehicles could be found.</p>`;
  }

  let grid = `<ul class="inv-display">`;

  data.forEach((vehicle) => {
    grid += `
      <li>
        <a href="/inv/detail/${vehicle.inv_id}">
          <img src="${vehicle.inv_thumbnail}"
               alt="${vehicle.inv_make} ${vehicle.inv_model}">
        </a>

        <div class="namePrice">
          <h2>
            <a href="/inv/detail/${vehicle.inv_id}">
              ${vehicle.inv_make} ${vehicle.inv_model}
            </a>
          </h2>
          <span>${formatUSD(vehicle.inv_price)}</span>
        </div>
      </li>`;
  });

  grid += `</ul>`;
  return grid;
}

// ------------------ VEHICLE DETAIL PAGE ------------------

function buildVehicleDetailHTML(vehicle) {
  if (!vehicle) return "<p>Vehicle data not available.</p>";

  const make = vehicle.inv_make || "";
  const model = vehicle.inv_model || "";
  const year = vehicle.inv_year || "";
  const image = vehicle.inv_image || "/images/vehicles/no-image.png";
  const price = formatUSD(vehicle.inv_price);
  const miles = formatNumber(vehicle.inv_miles);
  const color = vehicle.inv_color || "N/A";
  const description = vehicle.inv_description || "No description available.";

  return `
    <div class="vehicle-detail-container">
      <div class="vehicle-image">
        <img src="${image}" alt="${make} ${model} ${year}" />
      </div>

      <div class="vehicle-info">
        <h1 class="vehicle-title">${make} ${model} ${year}</h1>

        <div class="vehicle-price-mile">
          <span class="price">${price}</span>
          <span class="mileage">| ${miles} miles</span>
        </div>

        <p class="vehicle-meta"><strong>Color:</strong> ${color}</p>

        <section class="vehicle-description">
          <h2>Description</h2>
          <p>${description}</p>
        </section>

        <section class="vehicle-specs">
          <h2>Details</h2>
          <ul>
            <li><strong>Make:</strong> ${make}</li>
            <li><strong>Model:</strong> ${model}</li>
            <li><strong>Year:</strong> ${year}</li>
            <li><strong>Price:</strong> ${price}</li>
            <li><strong>Mileage:</strong> ${miles}</li>
          </ul>
        </section>
      </div>
    </div>
  `;
}

// ------------------ ERROR WRAPPER ------------------

function handleErrors(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = {
  formatUSD,
  formatNumber,
  getNav,
  buildClassificationGrid,
  buildVehicleDetailHTML,
  handleErrors,
};



