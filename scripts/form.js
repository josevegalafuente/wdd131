document.addEventListener("DOMContentLoaded", () => {
  const lastmodified = document.querySelector("#last-modified");
  if (lastmodified) {
    lastmodified.textContent = document.lastModified;
  }

  const products = [
    { id: "fc-1888", name: "Samsung Galaxy S24 Ultra", averagerating: 4.5 },
    { id: "fc-2050", name: "Dell XPS 14", averagerating: 4.7 },
    { id: "fs-1987", name: "iPhone 16 Pro Max", averagerating: 3.5 },
    { id: "ac-2000", name: "Alienware m16", averagerating: 3.9 },
    { id: "jj-1969", name: "Lenovo Legion 7i", averagerating: 5.0 }
  ];

  const productSelect = document.getElementById("product-name");

  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });

  let reviewCount = parseInt(localStorage.getItem("reviewCount") || "0", 10);
  localStorage.setItem("reviewCount", reviewCount);

  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {

    event.preventDefault();

    reviewCount++;
    localStorage.setItem("reviewCount", reviewCount);

    alert(`Review submitted! Total reviews: ${reviewCount}`);

    window.location.href = "review.html";
  });
});
