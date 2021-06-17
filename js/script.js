//This is selecting the overveiw div
const overview = document.querySelector(".overview");
const username = "dru-o";

//created function to fetch info from git hub profile using Github API 
const profileInfo = async function () {
//targeted the "users" endpoint and use a template literal added the global username variable to end point: users/${username}(add ticks to template literal) 
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
//In next await statment, resolved the JSON response
    const data = await userInfo.json();
//Called function displaying user info and passed json data as argument
    displayUserInfo(data);
};
//Logged out response to the console and called function
profileInfo();

const displayUserInfo = function (data) {
 //created new div 
    const div = document.createElement("div");
//gave div class name of "user-info"
    div.classList.add("user-info");
//using innerHTML to populate the div with elements figure, image, and paragraphs
//Inside the 5 placeholders used the JSON data to get relevant properties to display on page    
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
//Appended the overveiw element 
    overview.append(div);
};