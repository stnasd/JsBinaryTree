const data = {
  services: [
    {
      id: 1,
      head: null,
      name: "Проф.осмотр",
      node: 0,
      price: 100.0,
      sorthead: 20,
    },
    {
      id: 2,
      head: null,
      name: "Хирургия",
      node: 1,
      price: 0.0,
      sorthead: 10,
    },
    {
      id: 3,
      head: 2,
      name: "Удаление зубов",
      node: 1,
      price: 0.0,
      sorthead: 10,
    },
    {
      id: 4,
      head: 3,
      name: "Удаление зуба",
      node: 0,
      price: 800.0,
      sorthead: 10,
    },
    {
      id: 5,
      head: 3,
      name: "Удаление 8ого зуба",
      node: 0,
      price: 1000.0,
      sorthead: 30,
    },
    {
      id: 6,
      head: 3,
      name: "Удаление осколка зуба",
      node: 0,
      price: 2000.0,
      sorthead: 20,
    },
    {
      id: 7,
      head: 2,
      name: "Хирургические вмешательство",
      node: 0,
      price: 200.0,
      sorthead: 10,
    },
    {
      id: 8,
      head: 2,
      name: "Имплантация зубов",
      node: 1,
      price: 0.0,
      sorthead: 20,
    },
    {
      id: 9,
      head: 8,
      name: "Коронка",
      node: 0,
      price: 3000.0,
      sorthead: 10,
    },
    {
      id: 10,
      head: 8,
      name: "Слепок челюсти",
      node: 0,
      price: 500.0,
      sorthead: 20,
    },
  ],
};

function buildTree(data, parentId) {
  const nodes = data.services.filter((service) => service.head === parentId);

  nodes.sort((a, b) => a.sorthead - b.sorthead);

  nodes.forEach((node) => {
    if (node.node === 1) {
      const parentElement = document.createElement("ul");
      parentElement.classList.add("node-show");
      parentElement.setAttribute("data-id", node.id);
      parentElement.innerText = `>${node.name}`;
      treeContainer.appendChild(parentElement);

      buildTree(data, node.id);
    } else {
      const listItem = document.createElement("li");
      listItem.classList.add("hide");
      listItem.innerText = `- ${node.name}(${node.price})`;
      if (node.head === null) {
        treeContainer.appendChild(listItem);
      } else {
        const parentElement = treeContainer.querySelector(
          `ul[data-id="${node.head}"]`
        );
        parentElement.appendChild(listItem);
      }
    }
  });
}

const treeContainer = document.getElementById("tree");

buildTree(data, null);

treeContainer.onclick = (e) => {
  if (e.target.tagName !== "UL") {
    return;
  }

  const parentElement = e.target;

  const childElements = parentElement.querySelectorAll("li");
  for (let child of childElements) {
    child.hidden = !child.hidden;
  }

  if (parentElement.querySelectorAll("li:not([hidden])").length > 0) {
    childElements.forEach((item) => {
      item.classList.add("show");
      item.classList.remove("hide");
    });
  } else {
    childElements.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show");
    });
  }
};
