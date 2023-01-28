// Write - Your - Code - Here

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

// Initial Links

const links = [];
links.push(new Link("Reddit","boingboing.net","Danny"))
let choice;
// Display until quit
while (choice !== '0'){
    // Choices to display for the user
    let choices = "\n1 : Show links";
    choices += "\n2 : Add a link";
    choices += "\n3 : Remove a link";
    choices += "\n0 : Quit";
    choice = prompt(`Choose an option: ${choices}`);

    // Actions based on choice of the user
    switch(choice){
        // Show the list of links 
        case '1': {
            // If links are not empty display
            if(links.length > 0){
                for(let i=0;i<links.length;i++){
                    alert(`${i+1}: ${links[i].toString()}`);
                }
            } else{
                alert("No Links Available");
            }
            break;
        }
        // Adding a new link
        case '2': {
            let title = prompt("Enter the title");
            let url = prompt("Enter the URL");
            let author = prompt("Enter the author");
            const new_link = new Link(title,url,author);
            // push the new link with data by user into list of links
            links.push(new_link); 
            break;
        }
        // Remove a link based in index
        case '3': {
            // check if the links are not empty
            if(links.length > 0){
            let msg = `Enter the index of the link to be removed (between 1 and ${links.length})`;
            let index = Number(prompt(msg));
            links.splice(index-1,1); // removes the element based on the index provided by user
            } else{
                alert("No Links Available"); // if no links are present
            }
            break;
        }
    }
}

alert("See you later!");







