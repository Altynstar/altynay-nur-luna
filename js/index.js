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
    // echo "// Smooth scrolling added for better UX"
document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
});
// End of js/index.js
