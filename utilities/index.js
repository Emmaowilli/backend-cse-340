// utilities/index.js

// === ERROR HANDLER ===
function handleErrors(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

// === CLASSIFICATION GRID ===
function buildClassificationGrid(vehicles) {
  if (!vehicles || vehicles.length === 0) return "<p>No vehicles found.</p>";

  let grid = `<div class="classification-grid">`;
  vehicles.forEach(v => {
    grid += `
      <div class="vehicle-card">
        <a href="/inv/detail/${v.inv_id}">
          <img src="${v.inv_thumbnail}" alt="${v.inv_make} ${v.inv_model}" />
          <h3>${v.inv_make} ${v.inv_model}</h3>
          <p>$${new Intl.NumberFormat("en-US").format(v.inv_price)}</p>
        </a>
      </div>`;
  });
  grid += `</div>`;
  return grid;
}

// === VEHICLE DETAIL HTML ===
function buildVehicleDetailHTML(vehicle) {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(vehicle.inv_price);

  const mileage = new Intl.NumberFormat("en-US").format(vehicle.inv_miles);

  return `
    <div class="vehicle-detail-grid">
      <div class="vehicle-image">
        <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}" />
      </div>
      <div class="vehicle-info">
        <h1>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h1>
        <p class="price"><strong>Price:</strong> ${price}</p>
        <p><strong>Mileage:</strong> ${mileage} miles</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
        <p><strong>Description:</strong><br>${vehicle.inv_description}</p>
      </div>
    </div>
  `;
}

// === EXPORT ALL ===
module.exports = {
  handleErrors,
  buildClassificationGrid,
  buildVehicleDetailHTML,
  // keep any other functions you already have
};