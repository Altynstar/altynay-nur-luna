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

    // Smooth scrolling for navigation
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form event listener
    const messageForm = document.querySelector('form[name="leave_message"]');
    
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
});
// End of js/index.js
