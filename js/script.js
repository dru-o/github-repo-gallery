//This is selecting the overveiw div.
const overview = document.querySelector(".overview");
const username = "dru-o";
const repoList = document.querySelector(".repo-list");
const classRepos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const viewRepo = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos")

//created function to fetch info from git hub profile using Github API.
const profileInfo = async function () {
//targeted the "users" endpoint and use a template literal added the global username variable to end point: users/${username}(add ticks to template literal). 
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
//In next await statment, resolved the JSON response.
    const data = await userInfo.json();
//Called function displaying user info and passed json data as argument.
    displayUserInfo(data);
};
//Logged out response to the console and called function.
profileInfo();

const displayUserInfo = function (data) {
 //created new div 
    const div = document.createElement("div");
//gave div class name of "user-info".
    div.classList.add("user-info");
//using innerHTML to populate the div with elements figure, image, and paragraphs.
//Inside the 5 placeholders used the JSON data to get relevant properties to display on page .   
div.innerHTML = ` 
<figure>
    <img alt="user avatar" src=${data.avatar_url} />
</figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
`;
//Appended the overveiw element.
    overview.append(div);
    gitRepos();
};

//New async function to fetch repos.
const gitRepos = async function () {
//Added parameters to API call (sort repos by most recently updated and show up to 100 repos per page).
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
//Second await staement returns the JSON resonse
    const repoData = await fetchRepos.json();
    displayRepo(repoData);
};

//New function to display info about each repo. Used repo as parameter so function accepts data returned from last API call.
const displayRepo = function (repos) {
    filterInput.classList.remove("hide");
//Created list item for each repo and gave them each a class of "repo" and an <h3> element with repo name.
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
//Appended the list item to the global variable that selects unordered repos list.
        repoList.append(repoItem);
    }
};

//Created event listener called repoList for click event on unordered list with the class of "repo-list" also passed the event (e) in callback function.
repoList.addEventListener("click", function (e) {
//Added conditional statement to check if the event target matches the <h3> element.
    if (e.target.matches("h3")) {
// In the body of conditional statment added variable "repoName" to target innerText where event happens.
       const repoName = e.target.innerText;
//Log out variable
       getRepoInfo(repoName);
    }
});

//Created async function to get specific repo info thats accepts "repoName" as a parameter.
const getRepoInfo = async function (repoName) {
//Made a fetch request to grab info about specific repo.
    const fetchInfo = await fetch (`http://api.github.com/repos/${username}/${repoName}`);
//Declared variable "repoInfo" to resolve and save the JSON response.
    const repoInfo = await fetchInfo.json();

    console.log(repoInfo);
//Variable to fetch data from language_url property of your repoInfo.
const fetchLanguages = await fetch(repoInfo.languages_url);
//Created variable to save JSON response
const languageData = await fetchLanguages.json();
//Added empty array.
const languages = [];
//Added languages to end of array.
for (const language in languageData){
    languages.push(language);
}
    displayRepoInfo(repoInfo, languages);
};
//Created new function to display specific repo info.
const displayRepoInfo = function (repoInfo, languages) {
    viewRepo.classList.remove("hide");
  repoData.innerHTML = "";  
  repoData.classList.remove("hide");
  classRepos.classList.add("hide"); 
//Created new div element and added repo name, description, default branch, and link to its code on GitHub.
const div = document.createElement("div");
div.innerHTML = `
  <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
`;
//Appended the new div element to the section with a class of "repo-data".
repoData.append(div);
};

viewRepo.addEventListener("click", function () {
classRepos.classList.remove("hide");
repoData.classList.add("hide");
viewRepo.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase();

    for (const repo of repos) {
        const repoLowerText=repo.innerText.toLowerCase();
        if (repoLowerText.includes(searchLowerText)) {
            repo.classList.remove("hide");
        }else{
            repo.classList.add("hide");
        }
    }
});