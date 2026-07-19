/**
 * Apex Software Consulting - Portfolio Showcase Logic
 * Milton Chino | WDD 131-A2
 */

// 1. Mock Portfolio Project Data Dataset
const projects = [
    {
        id: "fitquest-mobile",
        title: "FitQuest Mobile App",
        category: "mobile",
        categoryLabel: "Mobile App",
        image: "images/fitquest.svg",
        description: "A cross-platform native workout companion providing offline caching, real-time heart rate monitoring integrations, and automatic cloud synchronization.",
        techStack: ["React Native", "Node.js", "MongoDB", "Redux Store"],
        testimonial: {
            text: "Apex delivered our MVP three weeks ahead of schedule. The offline tracking sync is absolutely flawless.",
            author: "Sarah Jenkins",
            role: "Founder, FitQuest"
        }
    },
    {
        id: "ecoshop-ecommerce",
        title: "EcoShop Headless Storefront",
        category: "ecommerce",
        categoryLabel: "E-commerce",
        image: "images/ecoshop.svg",
        description: "A modern, high-converting headless retail experience featuring sub-second page loads, incremental static regeneration, and integrated Stripe subscriptions.",
        techStack: ["Next.js", "Stripe API", "PostgreSQL", "Tailwind CSS"],
        testimonial: {
            text: "Our page load times decreased by 40% after Apex rebuilt our storefront, which directly drove a 15% increase in conversions.",
            author: "David Chen",
            role: "Operations Director, EcoShop"
        }
    },
    {
        id: "analytics-dashboard",
        title: "Apex Analytics Console",
        category: "web",
        categoryLabel: "Web App",
        image: "images/dashboard.svg",
        description: "A highly interactive SaaS telemetry dashboard processing real-time WebSocket streams to monitor and map over 5,000 active IoT devices.",
        techStack: ["Vue.js", "Go Backend", "InfluxDB", "WebSockets"],
        testimonial: {
            text: "The real-time data streaming works seamlessly. Our operations team can now monitor field assets with sub-second latency.",
            author: "Elena Rostova",
            role: "CTO, InduTech Industries"
        }
    },
    {
        id: "edustream-lms",
        title: "EduStream Learning Hub",
        category: "web",
        categoryLabel: "Web App",
        image: "images/edustream.svg",
        description: "An educational platform designed for interactive classrooms, featuring low-latency live video streaming, virtual whiteboards, and automatic quiz scoring.",
        techStack: ["React", "Express.js", "WebRTC", "PostgreSQL"],
        testimonial: {
            text: "Apex transformed our online courses. The interactive whiteboards and quiz engines have doubled student engagement.",
            author: "Marcus Vance",
            role: "Head of Product, EduStream"
        }
    }
];

// 2. Function to Render Project Cards to the DOM Grid
function displayProjects(projectList) {
    const gridContainer = document.getElementById("project-grid");
    
    // Clear spinner or loading indicator
    gridContainer.innerHTML = "";
    
    // Safety check if list is empty
    if (!projectList || projectList.length === 0) {
        gridContainer.innerHTML = `
            <div class="loading-state">
                <p>No projects match your criteria.</p>
            </div>
        `;
        return;
    }
    
    // Map over projects and build card elements
    projectList.forEach(project => {
        // Create card article container
        const card = document.createElement("article");
        card.className = "project-card";
        card.setAttribute("data-id", project.id);
        
        // Generate Tech Stack tags markup
        const techTagsMarkup = project.techStack
            .map(tech => `<span class="tech-tag">${tech}</span>`)
            .join("");
            
        // Build card inner HTML structure
        card.innerHTML = `
            <div class="project-image-container">
                <img src="${project.image}" alt="${project.title} Interface Mockup" class="project-img" loading="lazy">
                <span class="project-badge">${project.categoryLabel}</span>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p class="project-description">${project.description}</p>
                
                <div class="project-tech">
                    ${techTagsMarkup}
                </div>
                
                <div class="project-testimonial">
                    <p class="testimonial-quote">${project.testimonial.text}</p>
                    <span class="testimonial-author">${project.testimonial.author}</span>
                    <span class="testimonial-role">${project.testimonial.role}</span>
                </div>
            </div>
        `;
        
        // Append card to grid
        gridContainer.appendChild(card);
    });
}

// 3. Initialize dynamic render when DOM finishes loading
document.addEventListener("DOMContentLoaded", () => {
    // Initial display of all portfolio projects
    displayProjects(projects);
});
