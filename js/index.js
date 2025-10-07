// js/index.js
document.addEventListener('DOMContentLoaded', function() {
    // Create date variables
    const today = new Date();
    const thisYear = today.getFullYear();
    
    // Create and append footer with copyright
    const footer = document.createElement('footer');
    const copyright = document.createElement('p');
    copyright.innerHTML = `&copy; ${thisYear} Altynay Nurmagambetova. All rights reserved.`;
    footer.appendChild(copyright);
    
    const container = document.querySelector('.container');
    if (container) {
        container.appendChild(footer);
    }

    // Skills Section
    const skillsSection = document.getElementById('skills');
    
    if (skillsSection) {
        const skillsList = skillsSection.querySelector('ul');
        
        if (skillsList) {
            const skills = ["JavaScript", "HTML", "CSS", "Git and GitHub", "VS Code", 
                           "Responsive Design", "Command Line", "Problem Solving"];
            
            for (let i = 0; i < skills.length; i++) {
                const skill = document.createElement('li');
                skill.innerText = skills[i];
                skillsList.appendChild(skill);
            }
        }
    }

    // DOM Selection for Projects Section
    const projectSection = document.getElementById('projects');
    const projectList = projectSection ? projectSection.querySelector('ul') : null;

    // Fetch GitHub Repositories using XMLHttpRequest with error handling
    const githubUsername = "AltynayNurmagambetova"; // Replace with your actual GitHub username
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', `https://api.github.com/users/${githubUsername}/repos`);
    xhr.send();
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                // Parse the response and store in repositories variable
                const repositories = JSON.parse(xhr.response);
                
                // Console.log the repositories to see the data
                console.log('GitHub Repositories:', repositories);
                
                // You can now work with the repositories data
                displayRepositories(repositories);
            } catch (parseError) {
                // Handle JSON parsing errors
                console.error('Error parsing JSON:', parseError);
                displayErrorMessage('Failed to load projects data. Please try again later.');
            }
        } else {
            // Handle HTTP errors (404, 500, etc.)
            console.error('Error fetching repositories. Status:', xhr.status);
            
            if (xhr.status === 404) {
                displayErrorMessage('GitHub user not found. Please check the username.');
            } else if (xhr.status === 403) {
                displayErrorMessage('API rate limit exceeded. Please try again later.');
            } else {
                displayErrorMessage('Failed to load projects. Server error: ' + xhr.status);
            }
        }
    };
    
    xhr.onerror = function() {
        // Handle network errors
        console.error('Network request failed');
        displayErrorMessage('Network error: Unable to connect to GitHub. Check your internet connection.');
    };
    
    xhr.ontimeout = function() {
        // Handle timeout errors
        console.error('Request timeout');
        displayErrorMessage('Request timeout: Please try again later.');
    };

    // Function to display repositories with for loop
    function displayRepositories(repos) {
        // Use the projectSection and projectList variables we created above
        if (projectSection && projectList) {
            // Clear existing content
            projectList.innerHTML = '';
            
            if (repos.length === 0) {
                projectList.innerHTML = '<li>No repositories found for this user.</li>';
                return;
            }
            
            // Create a for loop to iterate over repositories Array, starting at index 0
            for (let i = 0; i < repos.length; i++) {
                // Inside the loop, create a variable named project to make a new list item (li) element
                const project = document.createElement('li');
                
                // On the next line, set the inner text of your project variable to the current Array element's name property
                project.innerText = repos[i].name;
                
                // On the next line, append the project element to the projectList element
                projectList.appendChild(project);
            }
        } else {
            console.error('Projects section or list not found in the DOM');
        }
    }

    // Function to display error messages to the user
    function displayErrorMessage(message) {
        // Use the projectSection and projectList variables we created above
        if (projectSection && projectList) {
            projectList.innerHTML = `<li class="error-message">${message}</li>`;
        } else if (projectSection) {
            // If no list exists, create one with the error message
            const errorList = document.createElement('ul');
            errorList.innerHTML = `<li class="error-message">${message}</li>`;
            projectSection.appendChild(errorList);
        } else {
            console.error('Projects section not found in the DOM');
        }
        
        // Also log to console for debugging
        console.error('Projects section error:', message);
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form event listener
    const messageForm = document.querySelector('form[name="leave_message"]');
    
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const usersName = e.target.usersName.value;
            const usersEmail = e.target.usersEmail.value;
            const usersMessage = e.target.usersMessage.value;
            
            // Log the values to console
            console.log('Name:', usersName);
            console.log('Email:', usersEmail);
            console.log('Message:', usersMessage);
            
            // Display message in list
            const messageSection = document.getElementById('messages');
            const messageList = messageSection.querySelector('ul');
            
            // new message element
            const newMessage = document.createElement('li');
            newMessage.innerHTML = `
                <a href="mailto:${usersEmail}">${usersName}</a>
                <span>${usersMessage}</span>
            `;
            
            // remove button
            const removeButton = document.createElement('button');
            removeButton.innerText = "remove";
            removeButton.type = "button";
            
            // event listener to remove button
            removeButton.addEventListener('click', function() {
                const entry = this.parentNode;
                entry.remove();
            });
            
            // Append remove button to message
            newMessage.appendChild(removeButton);
            
            // Append message to list
            messageList.appendChild(newMessage);
            
            // Reset the form after submission
            e.target.reset();
        });
    }
});
// End of js/index.js
