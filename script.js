const input = document.querySelector('.input-field');
const text = document.querySelector('.typing-test p');
const time = document.querySelector('.time ');
const mistake = document.querySelector('.mistake ');
const wpm = document.querySelector('.wpm ');
const cpm = document.querySelector('.cpm ');
const btn = document.getElementById('btn');

// set values

let timeLeft = 60;
let timer;
let charCount = 0;
let mistakeCount = 0;
let isTyping = false;

function loadParagraph(){
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
    text.querySelectorAll('span')[0].classList.add('current');
}

loadParagraph();

// Handle user input

input.addEventListener('input', () => {
    const char = text.querySelector('span.current');

})