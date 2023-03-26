const selectCategory = document.querySelector("#category");
const notesDataTags = document.querySelector("section.table.Notes div.data");
const eventsDataTags = document.querySelector("section.table.Events div.data");
const announcementsDataTags = document.querySelector("section.table.Announcements div.data");
const schedulesDataTags = document.querySelector("section.table.Schedules div.data");

const eventsData = getDataFromTable("Events");
const notesData = getDataFromTable("Notes");
const backDrop = document.querySelector(".backdrop");

let currPopup;

function getDataFromTable(category) {
  const table = document.querySelector(`section.${category}.table`);
  let data = [];
  let fields = document.querySelectorAll(
    `section.${category}.table div.data div.col`
  );
  let fieldsName = [];
  for (let i = 0; i < fields.length; i++) {
    fieldsName.push(fields[i].classList[0]);
  }
  for(let i = 0; i < fields[0].children.length; i++)
  {
    let dict = {};
    for(let j = 0; j < fields.length; j++)
    {
      dict[fieldsName[j]] = fields[j].children[i].innerHTML;
    }
    data.push(dict);
  }
  return data;
}

function makeDataInteractive(category)
{
  for(let i = 0; i < category.children.length; i++)
  {
    for(let j = 0; j < category.children[i].children.length; j++)
    {
      category.children[i].children[j].addEventListener('mouseenter', () => {
        for(let k = 0; k < category.children.length; k++)
        {
          category.children[k].children[j].classList.add("hoverClass");
        }
      })
      category.children[i].children[j].addEventListener('mouseleave', () => {
        for(let k = 0; k < category.children.length; k++)
        {
          category.children[k].children[j].classList.remove("hoverClass");
        }
      })
      category.children[i].children[j].addEventListener('click', () => {
        let dict = {};
        for(let k = 0; k < category.children.length; k++)
        {
          dict[category.children[k].classList[0]] = category.children[k].children[j].innerHTML;
        }
        console.log(category);
        createPopup(dict, category.parentElement.classList[0]);
      })
    }
  }
}

function handleSearch(e)
{
  let currentActiveSpans;
  
}

makeDataInteractive(notesDataTags)
makeDataInteractive(eventsDataTags)

selectCategory.addEventListener("change", refreshCategoryVisibility);

function refreshCategoryVisibility() {
  const categories = document.querySelectorAll("section.table");
  for (let i = 0; i < categories.length; i++) {
    if(selectCategory.value === "All")
    {
      categories[i].classList.remove("invisible");
      continue;
    }
    if (categories[i].classList.contains(selectCategory.value)) {
      categories[i].classList.remove("invisible");
      continue;
    }
    categories[i].classList.add("invisible");
  }
}

refreshCategoryVisibility();

backDrop.addEventListener("click", () => {
  backDrop.classList.add("hidden");
  document.body.removeChild(currPopup);
})

function createPopup(data, type)
{
  backDrop.classList.remove("hidden");
  const popup = document.createElement("div");
  popup.classList.add("popup");
  if(type == "Notes")
  {
    const h1 = document.createElement("h1");
    h1.innerHTML = data["name"];
    popup.appendChild(h1);
    const h3 = document.createElement("h3");
    h3.innerHTML = data["sem"];
    popup.appendChild(h3);
    const p = document.createElement("p");
    p.innerHTML = data["desc"];
    popup.appendChild(p);
    const pre = document.createElement("pre");
    pre.innerHTML = data["by"];
    popup.appendChild(pre);
  }
  else if(type == "Events")
  {
    const h1 = document.createElement("h1");
    h1.innerHTML = data["name"];
    popup.appendChild(h1);
    const h3 = document.createElement("h3");
    h3.innerHTML = data["date"];
    popup.appendChild(h3);
    const p = document.createElement("p");
    p.innerHTML = data["desc"];
    popup.appendChild(p);
  }
  document.body.appendChild(popup);
  currPopup = popup;
}