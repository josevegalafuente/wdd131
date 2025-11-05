const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

const lastModifiedParagraph = document.getElementById('lastModified');
if (lastModifiedParagraph) {
  lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
}
