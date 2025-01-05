
let userscore = 0; 
let compscore = 0;

const choices = document.querySelectorAll(".choice");

// To show message
let msg = document.querySelector("#msg");
let button=document.querySelector(".restart");

let userscorepara = document.querySelector("#user-score");
let compscorepara = document.querySelector("#comp-score");

// For border traversal animation
function game(randidx, callback) {
    let currentIndex = 0;
    
    const interval = setInterval(() => {
        // Remove active class from all
        choices.forEach(choice => choice.classList.remove('active'));
      
        // Add active class to current option
        choices[currentIndex].classList.add('active');
      
        // Move to the next index
        currentIndex = (currentIndex + 1) % choices.length;
    }, 300); // Change border every 300ms

    // Stop at the random index after some time
    setTimeout(() => {
        clearInterval(interval);
        // Ensure final active index matches randomIndex
        choices.forEach(option => option.classList.remove('active'));
        choices[randidx].classList.add('active');
        console.log(`Stopped at: ${choices[randidx].id}`);

        // Execute callback after animation completes
        if (callback) {
            callback();
        }
    }, 3000); // Stop after 3 seconds
}

// Generate computer choice and wait for animation
const genCompChoice = (callback) => { 
    const options = ["rock", "paper", "scissor"];
    const randidx = Math.floor(Math.random() * 3); // Generate computer choice
    
    game(randidx, () => {
        // After animation completes, trigger callback with computer choice
        callback(options[randidx]);
    });
};

// Handle draw game case
const drawGame = () => {                                       
    msg.innerText = "Oops! Game was a draw!";
};

// Show winner based on choices
const showWinner = (userwin, userchoice, CompChoice) => {
    if (userwin) {
        userscore++; // Update user score
        userscorepara.innerText = userscore;
        msg.innerText = `YOU WIN! Your ${userchoice} Beats ${CompChoice}`; // User win message
        msg.style.backgroundColor = "Green";
    } else {
        compscore++; // Update computer score
        compscorepara.innerText = compscore;
        msg.innerText = `YOU LOSE! ${CompChoice} Beats Your ${userchoice}`; // Computer win message
        msg.style.backgroundColor = "RED";
    }
};

// Main game logic
const playGame = (userchoice) => {                       
    genCompChoice((CompChoice) => { // Wait for animation to finish
        if (userchoice === CompChoice) { // Draw case
            drawGame();
        } else {
            let userwin = true;
            if (userchoice === "rock") {
                userwin = CompChoice === "paper" ? false : true;
            } else if (userchoice === "paper") {
                userwin = CompChoice === "scissor" ? false : true;
            } else {
                userwin = CompChoice === "rock" ? false : true;
            }
            showWinner(userwin, userchoice, CompChoice);
        }
    });
};

// Event listeners for user choices
choices.forEach((choice) => {                                        
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id");
        playGame(userchoice);
    });
});

button.addEventListener("click",()=>{

  userscore=0;
  userscorepara.innerText=0;
   compscore=0;
   compscorepara.innerText=0;
   choices.forEach(choice => choice.classList.remove('active'));
   msg.innerText="Let's Play";

});

 