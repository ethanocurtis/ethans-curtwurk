// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQTgv0I4vFpSG7oiyF7Rr9Kjcedp7TOME",
    authDomain: "curtwurk-6ce0a.firebaseapp.com",
    projectId: "curtwurk-6ce0a",
    storageBucket: "curtwurk-6ce0a.appspot.com",
    messagingSenderId: "355372154017",
    appId: "1:355372154017:web:f747099bc46fe6537c44e0",
    measurementId: "G-VN734V3P38",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
let db;

try {
    db = firebase.firestore();
    console.log("Firestore initialized successfully:", db);
} catch (error) {
    console.error("Error initializing Firestore:", error.message);
    alert("Firestore initialization failed. Please check your Firebase configuration.");
}

// Login Function
const login = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        console.log("User logged in:", userCredential.user);
        alert("Login successful!");
        window.location.href = "homepage.html";
    } catch (error) {
        console.error("Login error:", error.message);
        alert("Login failed: " + error.message);
    }
};

// Logout Function
const logout = async () => {
    try {
        await auth.signOut();
        alert("You have been logged out.");
        window.location.href = "login.html";
    } catch (error) {
        console.error("Logout error:", error.message);
        alert("An error occurred while logging out: " + error.message);
    }
};

// Save Notepad Content
const saveNotepad = async () => {
    if (!db) {
        console.error("Firestore not initialized.");
        return;
    }

    const notepadContent = document.getElementById("shared-notepad").value;
    try {
        await db.collection("shared").doc("notepad").set({ content: notepadContent });
        document.getElementById("notepad-status").innerText = "Notepad saved successfully!";
    } catch (error) {
        console.error("Error saving to Firestore:", error.message);
        document.getElementById("notepad-status").innerText = "Error saving notepad.";
    }
};

// Load Notepad Content
const loadNotepad = async () => {
    if (!db) {
        console.error("Firestore not initialized.");
        return;
    }

    try {
        const docSnap = await db.collection("shared").doc("notepad").get();
        if (docSnap.exists) {
            document.getElementById("shared-notepad").value = docSnap.data().content;
        } else {
            console.log("No notepad content found.");
        }
    } catch (error) {
        console.error("Error loading from Firestore:", error.message);
    }
};

// Open Email Function
const openEmail = () => {
    window.open("https://mail.curtwurk.com", "_blank"); // Opens the email in a new tab
};

// Attach Event Listeners
window.onload = () => {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            login();
        });
    }

    const logoutButton = document.querySelector(".logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }

    const saveButton = document.querySelector("#save-notepad");
    if (saveButton) {
        saveButton.addEventListener("click", saveNotepad);
    }

    const emailButton = document.querySelector(".email-button");
    if (emailButton) {
        emailButton.addEventListener("click", openEmail);
    }

    const notepad = document.querySelector("#shared-notepad");
    if (notepad) {
        loadNotepad();
    }
};
