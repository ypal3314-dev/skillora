// =========================
// JOB SEARCH
// =========================

function searchJobs() {
    const input = document.querySelector(".search-box input");
    const cards = document.querySelectorAll(".job-card");

    const searchText = input.value.toLowerCase().trim();

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();

        if (text.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}


// =========================
// VIEW JOB DETAILS
// =========================

function openJob(jobName) {

    const details = {
        "Frontend Developer": {
            company: "Skillora",
            salary: "₹15,000 - ₹30,000 / month",
            location: "Remote",
            skills: "HTML, CSS, JavaScript",
            description: "Build and maintain modern websites and web applications."
        },

        "C++ Developer": {
            company: "Skillora",
            salary: "₹20,000 - ₹40,000 / month",
            location: "Remote",
            skills: "C++, DSA, Problem Solving",
            description: "Develop C++ applications and solve programming problems."
        },

        "Data Science Intern": {
            company: "Skillora",
            salary: "₹10,000 - ₹20,000 / month",
            location: "Hybrid",
            skills: "Python, Data Analysis, Machine Learning",
            description: "Work with data and build basic machine-learning solutions."
        }
    };

    const job = details[jobName];

    if (!job) {
        alert("Job details not found.");
        return;
    }

    const popup = document.createElement("div");

    popup.id = "jobPopup";

    popup.style.cssText = `
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.7);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:9999;
    `;

    popup.innerHTML = `
        <div style="
            background:white;
            padding:30px;
            border-radius:15px;
            width:90%;
            max-width:500px;
            color:#222;
        ">

            <h2>${jobName}</h2>

            <p><b>🏢 Company:</b> ${job.company}</p>
            <p><b>💰 Salary:</b> ${job.salary}</p>
            <p><b>📍 Location:</b> ${job.location}</p>
            <p><b>🛠 Skills:</b> ${job.skills}</p>

            <h3>Job Description</h3>
            <p>${job.description}</p>

            <button onclick="applyJob('${jobName}')"
                style="
                background:#6c4ce8;
                color:white;
                border:none;
                padding:12px 25px;
                border-radius:8px;
                cursor:pointer;
                margin-right:10px;
                ">
                Apply Now
            </button>

            <button onclick="document.getElementById('jobPopup').remove()"
                style="
                padding:12px 25px;
                border:1px solid #aaa;
                border-radius:8px;
                cursor:pointer;
                ">
                Close
            </button>

        </div>
    `;

    document.body.appendChild(popup);
}


// =========================
// APPLY FORM
// =========================

function applyJob(jobName) {

    const oldPopup = document.getElementById("jobPopup");

    if (oldPopup) {
        oldPopup.remove();
    }

    const form = document.createElement("div");

    form.id = "applicationPopup";

    form.style.cssText = `
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.6);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:9999;
    `;

    form.innerHTML = `
        <div style="
            background:white;
            padding:30px;
            border-radius:15px;
            width:350px;
            max-width:90%;
        ">

            <h2>Apply for ${jobName}</h2>

            <input id="appName"
                type="text"
                placeholder="Your Name"
                style="width:100%;padding:12px;margin:8px 0;box-sizing:border-box;">

            <input id="appEmail"
                type="email"
                placeholder="Your Email"
                style="width:100%;padding:12px;margin:8px 0;box-sizing:border-box;">

            <input id="appPhone"
                type="tel"
                placeholder="Phone Number"
                style="width:100%;padding:12px;margin:8px 0;box-sizing:border-box;">

            <textarea id="appSkills"
                placeholder="Your Skills"
                style="width:100%;padding:12px;margin:8px 0;box-sizing:border-box;"></textarea>

            <button onclick="submitApplication('${jobName}')"
                style="
                padding:12px 20px;
                background:#6c5ce7;
                color:white;
                border:none;
                border-radius:8px;
                cursor:pointer;
                ">
                Submit Application
            </button>

            <button onclick="document.getElementById('applicationPopup').remove()"
                style="
                padding:12px 20px;
                margin-left:10px;
                border-radius:8px;
                cursor:pointer;
                ">
                Cancel
            </button>

        </div>
    `;

    document.body.appendChild(form);
}


// =========================
// SUBMIT APPLICATION
// =========================

function submitApplication(jobName) {

    const name = document.getElementById("appName").value.trim();
    const email = document.getElementById("appEmail").value.trim();
    const phone = document.getElementById("appPhone").value.trim();
    const skills = document.getElementById("appSkills").value.trim();

    if (!name || !email || !phone) {
        alert("Please fill all required details.");
        return;
    }

    const application = {
        job: jobName,
        name: name,
        email: email,
        phone: phone,
        skills: skills
    };

    let applications =
        JSON.parse(localStorage.getItem("skilloraApplications")) || [];

    applications.push(application);

    localStorage.setItem(
        "skilloraApplications",
        JSON.stringify(applications)
    );

    alert(
        "Application submitted successfully! 🚀\n\n" +
        "Job: " + jobName + "\n" +
        "Name: " + name +
        "\nEmail: " + email
    );

    const popup = document.getElementById("applicationPopup");

    if (popup) {
        popup.remove();
    }
}


// =========================
// LOGIN
// =========================

const loginForm = document.querySelector("#loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const loginEmail =
            document.querySelector("#loginEmail").value.trim();

        const loginPassword =
            document.querySelector("#loginPassword").value;

        const savedUser =
            JSON.parse(localStorage.getItem("careerXUser"));

        if (!savedUser) {
            alert("No account found. Please create an account first.");
            return;
        }

        if (
            (loginEmail === savedUser.email ||
             loginEmail === savedUser.phone) &&
            loginPassword === savedUser.password
        ) {

            alert("Login successful! 🎉");

            localStorage.setItem(
                "careerXLoggedIn",
                "true"
            );

            window.location.href = "profile.html";

        } else {

            alert("Invalid email/phone or password.");

        }
    });
}


// =========================
// PROFILE
// =========================

const profileForm = document.querySelector("#profileForm");

if (profileForm) {

    profileForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const about =
            document.querySelector("#about").value.trim();

        const skills =
            document.querySelector("#skills").value.trim();

        const projects =
            document.querySelector("#projects").value.trim();

        const education =
            document.querySelector("#education").value.trim();

        const experience =
            document.querySelector("#experience").value;

        if (
            about === "" ||
            skills === "" ||
            projects === "" ||
            education === "" ||
            experience === "Select experience"
        ) {

            alert("Please complete all profile details.");

            return;
        }

        const profile = {
            about,
            skills,
            projects,
            education,
            experience
        };

        localStorage.setItem(
            "careerXProfile",
            JSON.stringify(profile)
        );

        alert("Profile completed successfully! 🎉");

        window.location.href = "index.html";
    });
}
// =========================
// SIGNUP
// =========================

const signupForm = document.querySelector("#signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.querySelector("#fullName").value.trim();

        const email =
            document.querySelector("#signupEmail").value.trim();

        const phone =
            document.querySelector("#phone").value.trim();

        const password =
            document.querySelector("#signupPassword").value;

        const accountType =
            document.querySelector("#accountType").value;

        if (!name || !email || !phone || !password || !accountType) {

            alert("Please fill all details.");

            return;
        }

        const user = {
            name: name,
            email: email,
            phone: phone,
            password: password,
            accountType: accountType
        };

        localStorage.setItem(
            "careerXUser",
            JSON.stringify(user)
        );

        alert("Account created successfully! 🎉");

        window.location.href = "login.html";

    });

}
// =========================
// USER NAVIGATION
// =========================

const navButtons = document.querySelector("#navButtons");

if (navButtons) {

    const loggedIn =
        localStorage.getItem("careerXLoggedIn");

    const savedUser =
        JSON.parse(localStorage.getItem("careerXUser"));

    if (loggedIn === "true" && savedUser) {

        navButtons.innerHTML = `
            <a href="profile.html" class="login-btn">
                👤 ${savedUser.name}
            </a>

            <button
                class="signup-btn"
                onclick="logoutUser()">
                Logout
            </button>
        `;

    }
}


// =========================
// LOGOUT
// =========================

function logoutUser() {

    localStorage.removeItem("careerXLoggedIn");

    alert("Logged out successfully! 👋");

    window.location.href = "index.html";
}
// =========================
// SHOW PROFILE ON HOMEPAGE
// =========================

const savedProfile =
    JSON.parse(localStorage.getItem("careerXProfile"));

const savedUser =
    JSON.parse(localStorage.getItem("careerXUser"));

const profileName =
    document.querySelector("#profileName");

const profileEducation =
    document.querySelector("#profileEducation");

const profileInitial =
    document.querySelector("#profileInitial");

if (savedUser && profileName) {

    profileName.textContent = savedUser.name;

    if (profileInitial) {
        profileInitial.textContent =
            savedUser.name.charAt(0).toUpperCase();
    }
}

if (savedProfile && profileEducation) {

    profileEducation.textContent =
        savedProfile.education;
}
// =========================
// SHOW USER SKILLS
// =========================

const skillsContainer =
    document.querySelector("#profileSkills");

if (savedProfile && skillsContainer && savedProfile.skills) {

    const userSkills =
        savedProfile.skills
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill !== "");

    skillsContainer.innerHTML = "";

    userSkills.slice(0, 3).forEach((skill, index) => {

        const cppScore =
    Number(localStorage.getItem("cppChallengeScore")) || 0;

const percentages = [
    cppScore,
    80,
    70
];

        skillsContainer.innerHTML += `
            <div class="skill">
                <span>${skill}</span>

                <div class="bar">
                    <div style="width:${percentages[index]}%;"></div>
                </div>
            </div>
        `;
    });
}
// =========================
// C++ CHALLENGE
// =========================

const cppQuestions = [

    {
        question: "Which symbol is used to end a statement in C++?",
        options: [":", ";", ",", "."],
        answer: 1
    },

    {
        question: "Which keyword is used to declare an integer variable?",
        options: ["string", "float", "int", "char"],
        answer: 2
    },

    {
        question: "Which function is the starting point of a C++ program?",
        options: ["start()", "main()", "run()", "begin()"],
        answer: 1
    },

    {
        question: "Which operator is used for addition?",
        options: ["-", "+", "*", "/"],
        answer: 1
    },

    {
        question: "Which header file is commonly used for cout and cin?",
        options: ["iostream", "stdio", "math", "string"],
        answer: 0
    }

];

let currentQuestion = 0;
let challengeScore = 0;


// =========================
// START CHALLENGE
// =========================

function startChallenge() {

    currentQuestion = 0;
    challengeScore = 0;

    showQuestion();
}


// =========================
// SHOW QUESTION
// =========================

function showQuestion() {

    const oldPopup =
        document.getElementById("challengePopup");

    if (oldPopup) {
        oldPopup.remove();
    }

    const q = cppQuestions[currentQuestion];

    const challenge = document.createElement("div");

    challenge.id = "challengePopup";

    challenge.style.cssText = `
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.7);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:9999;
    `;

    let optionsHTML = "";

    q.options.forEach((option, index) => {

        optionsHTML += `
            <label style="
                display:block;
                padding:12px;
                margin:8px 0;
                border:1px solid #ddd;
                border-radius:8px;
                cursor:pointer;
            ">

                <input
                    type="radio"
                    name="cppAnswer"
                    value="${index}"
                >

                ${String.fromCharCode(65 + index)}) ${option}

            </label>
        `;
    });


    challenge.innerHTML = `
        <div style="
            background:white;
            padding:30px;
            border-radius:15px;
            width:90%;
            max-width:600px;
        ">

            <h2>C++ Basics Challenge 🏆</h2>

            <p>
                <b>Question ${currentQuestion + 1}
                of ${cppQuestions.length}</b>
            </p>

            <h3>
                ${q.question}
            </h3>

            ${optionsHTML}

            <br>

            <button
                onclick="nextQuestion()"
                style="
                    padding:12px 25px;
                    background:#6c4ce8;
                    color:white;
                    border:none;
                    border-radius:8px;
                    cursor:pointer;
                ">

                ${currentQuestion === cppQuestions.length - 1
                    ? "Finish Challenge 🏆"
                    : "Next Question →"}

            </button>

            <button
                onclick="document.getElementById('challengePopup').remove()"
                style="
                    padding:12px 25px;
                    margin-left:10px;
                    border-radius:8px;
                    cursor:pointer;
                ">

                Cancel

            </button>

        </div>
    `;

    document.body.appendChild(challenge);
}


// =========================
// NEXT QUESTION
// =========================

function nextQuestion() {

    const selected =
        document.querySelector(
            'input[name="cppAnswer"]:checked'
        );

    if (!selected) {

        alert("Please select an answer.");

        return;
    }


    const selectedAnswer =
        Number(selected.value);


    if (
        selectedAnswer ===
        cppQuestions[currentQuestion].answer
    ) {

        challengeScore++;

    }


    currentQuestion++;


    if (
        currentQuestion <
        cppQuestions.length
    ) {

        showQuestion();

    } else {

        finishChallenge();

    }
}


// =========================
// FINISH CHALLENGE
// =========================

function finishChallenge() {

    const total = cppQuestions.length;

    const percentage =
        Math.round(
            (challengeScore / total) * 100
        );


    localStorage.setItem(
        "cppChallengeScore",
        percentage
    );


    const popup =
        document.getElementById("challengePopup");

    if (popup) {
        popup.remove();
    }


    const result = document.createElement("div");

    result.id = "challengeResult";

    result.style.cssText = `
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.7);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:9999;
    `;


    result.innerHTML = `
        <div style="
            background:white;
            padding:35px;
            border-radius:15px;
            width:90%;
            max-width:450px;
            text-align:center;
        ">

            <h2>Challenge Completed! 🎉</h2>

            <p>Your C++ score:</p>

            <h1 style="
                color:#6c4ce8;
                font-size:45px;
            ">
                ${challengeScore}/${total}
            </h1>

            <h2>
                ${percentage}%
            </h2>

            <p>
                Your score has been saved to your profile.
            </p>

            <button
                onclick="document.getElementById('challengeResult').remove()"
                style="
                    padding:12px 25px;
                    background:#6c4ce8;
                    color:white;
                    border:none;
                    border-radius:8px;
                    cursor:pointer;
                ">

                Done ✓

            </button>

        </div>
    `;

    document.body.appendChild(result);
}
