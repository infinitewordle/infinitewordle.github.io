// Infinite Wordle App

// DOM Elements
const themeToggle = document.getElementById("themeToggle")
const mobileMenuToggle = document.getElementById("mobileMenuToggle")
const mobileNav = document.getElementById("mobileNav")
const toast = document.getElementById("toast")
const toastMessage = document.getElementById("toastMessage")
const subscribeForm = document.getElementById("subscribeForm")

// Initialize
function init() {
  setupEventListeners()
  initTheme()
}

// Setup event listeners
function setupEventListeners() {
  // Theme toggle
  if(themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }

  // Mobile menu
  if(mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", toggleMobileMenu)
  }

  // Subscribe form
  if(subscribeForm) {
    subscribeForm.addEventListener("submit", handleSubscribe)
  }

  // Close mobile menu on link click
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active")
    })
  })
}

// Toast notification
function showToast(message) {
  if(!toast || !toastMessage) return;
  
  toastMessage.textContent = message
  toast.classList.add("active")

  setTimeout(() => {
    toast.classList.remove("active")
  }, 3000)
}

// Theme handling
function initTheme() {
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme)
  } else if (prefersDark) {
    document.documentElement.setAttribute("data-theme", "dark")
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
}

// Mobile menu
function toggleMobileMenu() {
  mobileNav.classList.toggle("active")
}

// Subscribe form
function handleSubscribe(e) {
  e.preventDefault()
  const emailInput = e.target.querySelector('input[type="email"]')
  if(emailInput) {
      const email = emailInput.value
      showToast(`Thanks for subscribing with ${email}!`)
      e.target.reset()
  }
}

// Initialize app
init()
