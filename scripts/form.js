document.addEventListener("DOMContentLoaded", () => {
  const lastmodified = document.querySelector("#last-modified");
  if (lastmodified) {
    lastmodified.textContent = document.lastModified;
  }

  const products = [
    { id: "fc-1888", name: "Notion", averagerating: 4.5 },
    { id: "fc-2050", name: "ClickUp", averagerating: 4.7 },
    { id: "fs-1987", name: "Monday", averagerating: 3.5 },
    { id: "ac-2000", name: "Zapier", averagerating: 3.9 },
    { id: "jj-1969", name: "Asana", averagerating: 5.0 }
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
