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

    // ✅ FIXED: Use correct GitHub username and fetch()
    // Your GitHub username from your portfolio URL is "Altynstar"
    const githubUsername = "Altynstar";
    
    fetch(`https://api.github.com/users/${githubUsername}/repos`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(repositories => {
            console.log('GitHub Repositories:', repositories);
            displayRepositories(repositories);
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            // Display fallback projects if API fails
            displayFallbackProjects();
        });

    // Function to display repositories
    function displayRepositories(repos) {
        if (projectSection && projectList) {
            // Clear any existing hard-coded content
            projectList.innerHTML = '';
            
            if (repos.length === 0) {
                projectList.innerHTML = '<li>No repositories found.</li>';
                return;
            }
            
            // Display only non-portfolio repositories (filter out portfolio itself)
            const filteredRepos = repos.filter(repo => 
                repo.name !== 'altynay-nur-luna' && 
                !repo.name.includes('portfolio')
            );
            
            if (filteredRepos.length === 0) {
                displayFallbackProjects();
                return;
            }
            
            for (let i = 0; i < filteredRepos.length; i++) {
                const project = document.createElement('li');
                
                // Create a link to the GitHub repository
                const projectLink = document.createElement('a');
                projectLink.href = filteredRepos[i].html_url;
                projectLink.target = '_blank';
                projectLink.textContent = filteredRepos[i].name;
                
                // Add description if available
                const projectDescription = document.createElement('p');
                projectDescription.textContent = filteredRepos[i].description || 'No description available';
                projectDescription.style.fontSize = '0.9rem';
                projectDescription.style.color = '#666';
                
                project.appendChild(projectLink);
                project.appendChild(projectDescription);
                projectList.appendChild(project);
            }
        }
    }

    // Fallback projects if GitHub API fails
    function displayFallbackProjects() {
        if (projectSection && projectList) {
            projectList.innerHTML = '';
            
            const fallbackProjects = [
                { name: 'Personal Portfolio Website', description: 'Responsive portfolio built with HTML, CSS, and JavaScript' },
                { name: 'Recipe Blog Template', description: 'Blog template using CSS Grid and Flexbox' },
                { name: 'JavaScript To-Do App', description: 'Interactive to-do application' }
            ];
            
            for (let i = 0; i < fallbackProjects.length; i++) {
                const project = document.createElement('li');
                project.innerHTML = `
                    <strong>${fallbackProjects[i].name}</strong>
                    <p style="font-size: 0.9rem; color: #666; margin: 0.5rem 0 0 0;">
                        ${fallbackProjects[i].description}
                    </p>
                `;
                projectList.appendChild(project);
            }
        }
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
            
            console.log('Name:', usersName);
            console.log('Email:', usersEmail);
            console.log('Message:', usersMessage);
            
            // API call with fetch()
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: usersName,
                    email: usersEmail, 
                    message: usersMessage
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('API Success:', data);
            })
            .catch(error => {
                console.error('API Error:', error);
            });
            
            // Display message locally
            const messageSection = document.getElementById('messages');
            const messageList = messageSection.querySelector('ul');
            
            const newMessage = document.createElement('li');
            newMessage.innerHTML = `
                <a href="mailto:${usersEmail}">${usersName}</a>
                <span>${usersMessage}</span>
            `;
            
            const removeButton = document.createElement('button');
            removeButton.innerText = "remove";
            removeButton.type = "button";
            
            removeButton.addEventListener('click', function() {
                const entry = this.parentNode;
                entry.remove();
            });
            
            newMessage.appendChild(removeButton);
            messageList.appendChild(newMessage);
            
            e.target.reset();
        });
    }
});