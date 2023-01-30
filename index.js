class Link{
    constructor(title,url,author){
        let absoluteUrl = url;

        // Check if the url starts with http://
        if(
        !absoluteUrl.startsWith("http://") && 
        !absoluteUrl.startsWith("https://")){
            // if not then add http at the beginning
            absoluteUrl = `http://${absoluteUrl}`;
        }
        // Data
        this.title = title;
        this.url = absoluteUrl;
        this.author = author;
    }

    // Describe the string
    toString(){
        return `${this.title} (${this.url}). Author: ${this.author}`;
    }    
}


const contentElement = document.getElementById("content");

// Create and return a DOM element showing a link
const createLinkElement = link => {
    // Creating a title Element
    const titleElement = document.createElement("a");
    titleElement.href = link.url;
    titleElement.classList.add("linkTitle");
    titleElement.appendChild(document.createTextNode(link.title));
    
    // Creating a URL element
    const urlElement = document.createElement("span");
    urlElement.classList.add("linkUrl");
    urlElement.appendChild(document.createTextNode(link.url));
    
    // Creating a headline element that consists title and url
    const headlineElement = document.createElement("h4");
    headlineElement.classList.add("linkHeadline");
    headlineElement.appendChild(titleElement);
    headlineElement.appendChild(urlElement);
  
    // Creating an Author Element
    const authorElement = document.createElement("span");
    authorElement.classList.add("linkAuthor");
    authorElement.appendChild(
        document.createTextNode(`Submitted by ${link.author}`)
        )

    // Creating a Link Element that displays headline and url
    const linkElement = document.createElement("div");
    linkElement.classList.add("link");
    linkElement.appendChild(headlineElement);
    linkElement.appendChild(authorElement);

    return linkElement;

}

// Create and return an input element;

// Parameters: name, placeholder, input size

const createInputElement = (name,placeholder,size) => {
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.setAttribute("name",name);
    inputElement.setAttribute("placeholder",placeholder);
    inputElement.setAttribute("size",size);
    inputElement.setAttribute("required","true");
    inputElement.classList.add("form-control");
    return inputElement;
}

// Create and return a form for submitting a new link
const createLinkForm = () => {
    // input field properties
    const authorElement = createInputElement("author","Enter name of the author", 20);
    const titleElement = createInputElement("title","Enter link title", 40);
    const urlElement = createInputElement("url","Enter link URL", 40);

    // Create a Submit button (Add Link)
    const submitElement = document.createElement("input");
    submitElement.type = "submit";
    submitElement.value = "Add Link";
    submitElement.classList.add("btn");
    submitElement.classList.add("btn-primary");

    // Create a link submission form
    const linkFormElement = document.createElement("form");
    linkFormElement.classList.add("linkForm");
    linkFormElement.classList.add("form-inline");
    linkFormElement.appendChild(authorElement);
    linkFormElement.appendChild(titleElement);
    linkFormElement.appendChild(urlElement);
    linkFormElement.appendChild(submitElement);

    // Handling form submission
    linkFormElement.addEventListener("submit", e => {
        // Cancel default behaviour 
        e.preventDefault();

        // Create new link object from field values
        const newLink = new Link(
            titleElement.value,
            urlElement.value,
            authorElement.value
        );

        // Add new link to page
        const newLinkElement = createLinkElement(newLink);
        contentElement.replaceChild(newLinkElement,e.target);

        // Create info message indicating success
        const infoElement = document.createElement("div");
        infoElement.classList.add("alert");
        infoElement.classList.add("alert-success");
        infoElement.textContent = `The link ${newLink.title} has been successfully added!!`;
        contentElement.insertBefore(infoElement,newLinkElement);
    
        // Remove info msg after 2 seconds
        setTimeout(() => {
            contentElement.removeChild(infoElement);
        }, 2000);
   });

   return linkFormElement;
}

// Initial links array
const links = [];
links.push(new Link("Hacker News", "https://news.ycombinator.com", "Baptiste"));
links.push(new Link("Reddit", "https://reddit.com", "Thomas"));
links.push(new Link("Boing Boing", "boingboing.net", "Daniel"));

// Add each link to page
links.forEach(link => {
    const linkElement = createLinkElement(link);
    contentElement.appendChild(linkElement);
})

// Handle click on link submit button 
document.getElementById("submitButton").addEventListener("click", () => {
    // Create link submission form
    const formElement = createLinkForm();
    // Add form on page before first link
    contentElement.insertBefore(formElement,document.querySelector(".link"));
});

