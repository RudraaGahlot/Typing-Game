const input = document.querySelector('.input-field');
const text = document.querySelector('.typing-test p');
const time = document.querySelector('.time span');
const mistake = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.getElementById('btn');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

function loadParagraph(){
    const typingTest = document.querySelector('.typing-test');
    typingTest.classList.remove('unblurred');
    
    const paragraphs = [
        "A gentle breeze rustled through the trees, carrying the scent of blooming flowers. The rhythmic chirping of crickets blended harmoniously with the distant sound of a flowing river, offering peace.",
        "In the bustling city, people hurried through the streets, their footsteps echoing against tall buildings. The aroma of fresh bread from nearby bakeries mixed with the faint scent of rain.",
        "As the storm raged outside, the old house creaked with every gust of wind. Raindrops splattered against the windows like a steady drumbeat. ",
        "A cat perched on the windowsill, watching the world go by with an air of curiosity. Children played in the park below, their laughter echoing through the neighborhood. ",
        "The library was a haven of quiet amidst the chaos of the city. Rows of books stood like sentinels, each holding a world waiting to be discovered.",
        "The sun dipped below the horizon, painting the sky in hues of pink and orange. The world seemed to hold its breath, waiting for the night to unfold.",
        "The clock ticked steadily on the wall, marking the passage of time. Shadows danced across the room as the fire crackled in the hearth.",
        "The sound of a distant train whistle carried through the night, a haunting melody that spoke of far-off places and forgotten dreams.",
        "The moon cast a silvery glow over the landscape, turning the world into a place of shadows and mystery. The night was alive with the whisper of the wind and the rustle of leaves.",

      ];
   const randomIndex = Math.floor(Math.random() * paragraphs.length);
    text.innerHTML = '';
    for (const char of paragraphs[randomIndex]) {
        text.innerHTML += `<span>${char}</span>`;
}
    text.querySelectorAll('span')[0].classList.add('active');
    input.focus();
    text.addEventListener('click',()=>input.focus());
    
    // Add small delay before unblurring
    setTimeout(() => {
        typingTest.classList.add('unblurred');
    }, 300);
}

function initTyping(){
    const char = text.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    
    // Handle backspace
    if(input.value.length < charIndex) {
        charIndex = input.value.length;
        // Remove classes from current character
        if(charIndex < char.length) {
            char[charIndex].classList.add('correct', 'incorrect', 'active');
            // Add active class to current character
            if(charIndex > 0) {
                char[charIndex-1].classList.remove('correct', 'incorrect');
            }
        }
        return;
    }

    if(charIndex < char.length && timeLeft > 0){
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        
        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct');
            console.log('correct');
        } else{
            mistakes++;
            char[charIndex].classList.add('incorrect');
            console.log('incorrect');
        }
        charIndex++;
        // Check if we've typed all characters
        if (charIndex >= char.length) {
            clearInterval(timer);
            isTyping = false;
        } else {
            char[charIndex].classList.add('active');
        }
        mistake.innerHTML = mistakes;
        wpm.innerHTML = Math.round((charIndex / 5) / ((maxTime - timeLeft) / 60));
        cpm.innerHTML = charIndex;
        time.innerHTML = timeLeft + 's';
    } else{
        clearInterval(timer);
        input.value = '';
        isTyping = false;
        timeLeft = maxTime;
        charIndex = 0;
        mistakes = 0;
        time.innerHTML = maxTime + 's';
        wpm.innerHTML = 0;
        cpm.innerHTML = 0;
    }
}

function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        time.innerHTML = timeLeft + 's';  
        wpm.innerHTML = Math.round((charIndex / 5) / ((maxTime - timeLeft) / 60));
        cpm.innerHTML = Math.round((charIndex / 5) / ((maxTime - timeLeft) / 60));
    } else{
        clearInterval(timer);
    }
}

input.addEventListener('input',initTyping);
btn.addEventListener('click',()=>{
    const typingTest = document.querySelector('.typing-test');
    typingTest.classList.remove('unblurred');
    
    setTimeout(() => {
        loadParagraph();
        input.value = '';
        clearInterval(timer);
        timeLeft = maxTime;
        charIndex = 0;
        mistakes = 0;
        isTyping = false;
        wpm.innerHTML = 0;
        cpm.innerHTML = 0;
        mistake.innerHTML = 0;
    }, 300);
});

loadParagraph();