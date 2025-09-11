// Blog Management System
class BlogManager {
    constructor() {
        this.storageKey = 'raviThotaBlogs';
        this.blogs = this.loadBlogs();
    }

    // Load blogs from localStorage
    loadBlogs() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : [];
    }

    // Save blogs to localStorage
    saveBlogs() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.blogs));
    }

    // Add new blog post
    addBlog(title, content, imageUrl = null) {
        const blog = {
            id: Date.now().toString(),
            title: title,
            content: content,
            imageUrl: imageUrl,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            timestamp: Date.now()
        };
        
        this.blogs.unshift(blog); // Add to beginning for latest first
        this.saveBlogs();
        return blog;
    }

    // Get all blogs (latest first)
    getAllBlogs() {
        return this.blogs.sort((a, b) => b.timestamp - a.timestamp);
    }

    // Get latest blog
    getLatestBlog() {
        return this.blogs.length > 0 ? this.blogs[0] : null;
    }

    // Get blog by ID
    getBlogById(id) {
        return this.blogs.find(blog => blog.id === id);
    }

    // Delete blog
    deleteBlog(id) {
        this.blogs = this.blogs.filter(blog => blog.id !== id);
        this.saveBlogs();
    }

    // Update blog
    updateBlog(id, title, content, imageUrl = null) {
        const blogIndex = this.blogs.findIndex(blog => blog.id === id);
        if (blogIndex !== -1) {
            this.blogs[blogIndex].title = title;
            this.blogs[blogIndex].content = content;
            this.blogs[blogIndex].imageUrl = imageUrl;
            this.blogs[blogIndex].date = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            this.blogs[blogIndex].timestamp = Date.now();
            this.saveBlogs();
            return this.blogs[blogIndex];
        }
        return null;
    }
}

// Initialize blog manager
const blogManager = new BlogManager();

// Authentication system
class AuthManager {
    constructor() {
        this.username = 'jkthota';
        this.password = 'Jagan@100va';
        this.sessionKey = 'raviThotaAuth';
    }

    login(username, password) {
        if (username === this.username && password === this.password) {
            sessionStorage.setItem(this.sessionKey, 'true');
            return true;
        }
        return false;
    }

    logout() {
        sessionStorage.removeItem(this.sessionKey);
    }

    isAuthenticated() {
        return sessionStorage.getItem(this.sessionKey) === 'true';
    }
}

// Initialize auth manager
const authManager = new AuthManager();

// Utility functions
function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function truncateText(text, maxLength = 200) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Image upload handler
function handleImageUpload(file, callback) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            callback(e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        callback(null);
    }
}

// Initialize sample blogs if none exist
function initializeSampleBlogs() {
    if (blogManager.getAllBlogs().length === 0) {
        blogManager.addBlog(
            "Mastering Tableau: From Data to Insights",
            "In today's data-driven world, Tableau has become an essential tool for transforming raw data into meaningful insights. As a Tableau Coach with over 20 years of experience, I've seen how proper visualization techniques can revolutionize business decision-making. The key to success lies not just in knowing the software, but in understanding the story your data wants to tell. From basic charts to complex dashboards, every visualization should serve a purpose and guide your audience toward actionable insights. Remember, the best Tableau dashboards are those that make complex data simple to understand.",
            "img/800x400/01.jpg"
        );
        
        blogManager.addBlog(
            "The Art of Project Management in Digital Age",
            "Project management has evolved significantly with the digital transformation. As someone who has managed projects across various industries, I've learned that successful project management isn't just about timelines and budgets—it's about people, processes, and adaptability. The digital age demands a new approach to project management, one that embraces agile methodologies, remote collaboration, and data-driven decision making. The most successful projects are those that balance structure with flexibility, ensuring that teams can adapt to changing requirements while maintaining focus on the end goal.",
            "img/800x400/01a.jpg"
        );
        
        blogManager.addBlog(
            "Building a Culture of Continuous Learning",
            "In my journey as both a coach and entrepreneur, I've realized that the most successful organizations are those that foster a culture of continuous learning. Learning isn't just about acquiring new skills—it's about developing a mindset that embraces change, seeks feedback, and constantly looks for ways to improve. Whether you're learning Tableau, mastering project management, or building a business, the key is to approach every challenge as an opportunity to grow. The best learners are those who ask the right questions and aren't afraid to make mistakes along the way.",
            null
        );
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSampleBlogs();
});
