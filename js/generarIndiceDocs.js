let toc = document.querySelector("#TOC");
let headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

headers.forEach((header) => {
  let listItem = document.createElement("li");
  let link = document.createElement("a");

  link.textContent = header.textContent;
  link.href = "#" + header.id;

  listItem.appendChild(link);
  toc.appendChild(listItem);
});
