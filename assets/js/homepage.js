const userFormEl = document.querySelector("#user-form");
const nameInputEl = document.querySelector("#username");
const repoContainerEl = document.querySelector("#repos-container");
const repoSearchTerm = document.querySelector("#repo-search-term");

let formSubmitHandler = (event) => {
    event.preventDefault();
    let username = nameInputEl.value.trim();

    if(username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a Github username");
    }

    console.log(event);
}

const displayRepos = (repos, searchTerm) => {
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    console.log(repos);
    console.log(searchTerm);
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    // loop over repos
    for (let i = 0; i < repos.length; i++) {
        //format repo name
        let repoName = repos[i].owner.login + "/" + repos[i].name

        // create a container for each repo
        let repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // create a span element to hold repository name
        let titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // create a status element
        let statusEl = document.createElement("span");
        statusEl.classList = "flex-row align center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + "issue(s)";
        } else {
            statusEl.innerHTML = "<i class ='fas fa-check-square status-icon icon-success'></i>";
        }
        //append to container
        repoEl.appendChild(statusEl);

        //append to container
        repoEl.appendChild(titleEl)

        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};

var getUserRepos = (user) => {
  // format the github api url
  let apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response) { 
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        // notice this '.catch() getting chained onto the end of the .then method
        alert("Unable to connect to Github")
    });
}

userFormEl.addEventListener("submit", formSubmitHandler);

