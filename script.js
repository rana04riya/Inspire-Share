// Store stories in localStorage
let stories = JSON.parse(localStorage.getItem('stories')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const storyForm = document.getElementById('storyForm');
    const storiesContainer = document.getElementById('storiesContainer');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const ctaButton = document.querySelector('.cta-button');

    // Handle CTA button click
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            document.getElementById('share').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Display existing stories
    displayStories();

    // Handle story form submission
    if (storyForm) {
        storyForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const category = document.getElementById('category').value;
            const content = document.getElementById('storyContent').value;

            // Create new story object
            const story = {
                id: Date.now(),
                title,
                author,
                category,
                content,
                date: new Date().toLocaleDateString()
            };

            // Add story to array
            stories.unshift(story);

            // Save to localStorage
            localStorage.setItem('stories', JSON.stringify(stories));

            // Reset form
            storyForm.reset();

            // Display success message
            alert('Your story has been submitted successfully!');

            // Refresh stories display
            displayStories();

            // Scroll to stories section
            document.getElementById('stories').scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Function to display stories
function displayStories() {
    const storiesContainer = document.getElementById('storiesContainer');
    if (!storiesContainer) return;

    storiesContainer.innerHTML = '';

    if (stories.length === 0) {
        storiesContainer.innerHTML = `
            <div class="no-stories">
                <p>No stories have been shared yet. Be the first to share your story!</p>
            </div>
        `;
        return;
    }

    stories.forEach(story => {
        const storyCard = document.createElement('div');
        storyCard.className = 'story-card';
        storyCard.innerHTML = `
            <h3>${story.title}</h3>
            <div class="category">${story.category}</div>
            <div class="content">${story.content.substring(0, 150)}${story.content.length > 150 ? '...' : ''}</div>
            <div class="author">By ${story.author} | ${story.date}</div>
        `;

        // Add click event to view full story
        storyCard.addEventListener('click', () => {
            showFullStory(story);
        });

        storiesContainer.appendChild(storyCard);
    });
}

// Function to show full story in a modal
function showFullStory(story) {
    const modal = document.createElement('div');
    modal.className = 'story-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${story.title}</h2>
            <div class="category">${story.category}</div>
            <div class="content">${story.content}</div>
            <div class="author">By ${story.author} | ${story.date}</div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal when clicking the close button or outside the modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
} 