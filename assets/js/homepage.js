var getUserRepos = (user) => {
  // format the github api url
  let apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response) { 
        response.json().then(function(data) {
            console.log(data);
        });
    });
};
getUserRepos("google");