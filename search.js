document.addEventListener("DOMContentLoaded", async function () {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const profileName = urlParams.get('profile_name');
        if (!profileName) return;

        const userResponse = await fetch(`https://api.github.com/users/${profileName}`);
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();

        document.getElementById("name").innerHTML = userData.name || "N/A";
        document.getElementById("username").innerHTML = userData.login || "N/A";
        document.getElementById("repos").innerHTML = userData.public_repos || "N/A";
        document.getElementById("followers").innerHTML = userData.followers || "N/A";

        const image_url = userData.avatar_url;
        const image = document.createElement("img");
        image.src = image_url;
        document.querySelector(".image").appendChild(image);

        const reposResponse = await fetch(userData.repos_url);
        if (!reposResponse.ok) throw new Error("Failed to fetch repositories");
        const reposData = await reposResponse.json();

        const languageCount = reposData.reduce((acc, repo) => {
            if (repo.language) {
                acc[repo.language] = (acc[repo.language] || 0) + 1;
            }
            return acc;
        }, {});

        const mostUsedLanguage = Object.entries(languageCount).reduce((max, entry) => 
            entry[1] > max[1] ? entry : max
        , ["No data", 0]); 

        const languagesElement = document.getElementById("languages");
        if (mostUsedLanguage[1] > 0) {
            languagesElement.innerHTML = ` ${mostUsedLanguage[0]} : ${mostUsedLanguage[1]}`;
        } else {
            languagesElement.innerHTML = "No language data available.";
        }

    } catch (error) {
        console.log("Error fetching data:", error);
        document.getElementById("languages").innerHTML = "Error fetching language data.";
    }
});
