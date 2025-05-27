
async function fetchGitHubProjects() {
    try {
        const response = await fetch('https://api.github.com/users/SEU_USERNAME/repos?sort=created');
        const projects = await response.json();
        
        const projectsContainer = document.getElementById('github-projects');
        
        projects.slice(0, 4).forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h3>${project.name.replace(/-/g, ' ')}</h3>
                ${project.description ? `<p>${project.description}</p>` : ''}
                <div class="project-meta">
                    <span>⭐ ${project.stargazers_count}</span>
                    <span>📅 ${new Date(project.created_at).toLocaleDateString()}</span>
                </div>
                <a href="${project.html_url}" target="_blank">🔗 Ver no GitHub</a>
            `;
            projectsContainer.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        projectsContainer.innerHTML = '<p>⚠️ Erro ao carregar projetos do GitHub</p>';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubProjects();
    

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'none';
        });
    });
});