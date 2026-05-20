const menuToggle=document.querySelector('.menu-toggle');
const navLinks=document.querySelector('.nav-links');
const skillLevels=document.querySelectorAll('.skill-level');
const circularProgressBars = document.querySelectorAll('.circular-progress');
const contactForm = document.getElementById('contactForm');
const typingText = document.querySelector('.typing-text');

menuToggle.addEventListener('click',()=>{
    navLinks.classList.toggle('active');

    const incon=menuToggle.querySelector('i');
    if(navLinks.classList.contains('active')){
        incon.classList.remove('fa-bars');
        incon.classList.add('fa-times');
    }else{
        incon.classList.remove('fa-times');
        incon.classList.add('fa-bars');
    }
});

document.querySelectorAll('.nav-links a').forEach(link=>{
    link.addEventListener('click',()=>{
        navLinks.classList.remove('active');    
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
    });
});

function animateSkillsBars(){
    skillLevels.forEach(skill=>{
        const level=skill.getAttribute('data-level');
        skill.style.width=`${level}%`;
    });
}




function isElementInViewport(el){
    const rect=el.getBoundingClientRect();
    return(
        rect.top<=(window.innerHeight||document.documentElement.clientHeight)*0.8&&rect.bottom>=0
    );
}

function handleScrollAnimations(){
    const skillsSection=document.querySelector('.skills-section');
    if(isElementInViewport(skillsSection)){
        animateSkillsBars();
        
    }
}
const typingWords = ['Full Stack Developer', 'Web Designer', 'Frontend Developer', 'UI/UX Designer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = typingWords[wordIndex];
    
    if (isDeleting) {
        // Deleting characters
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Typing characters
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    // Determine typing speed
    let typeSpeed = isDeleting ? 50 : 100;
    
    // If word is complete
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 1500; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        typeSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeEffect, typeSpeed);
}



function setActiveNavLink(){
    const sections=document.querySelectorAll('section');
    const navLinks=document.querySelectorAll('.nav-links a');

    let currentSection='';
    sections.forEach(section=>{
        const sectionTop=section.offsetTop-250;
        const sectionHeight=section.clientHeight;
        if(scrollY>=sectionTop&&scrollY<sectionTop+sectionHeight){
            currentSection=section.getAttribute('id');
        }
    });

    navLinks.forEach(link=>{
        link.classList.remove('active');
        if(link.getAttribute('href').includes(currentSection)){
            link.classList.add('active');
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // Start typing effect
    setTimeout(typeEffect, 1000);
    
    // Set up scroll event listener
    window.addEventListener('scroll', () => {
        handleScrollAnimations();
        setActiveNavLink();
    });
    
    // Trigger initial check for animations
    handleScrollAnimations();
    setActiveNavLink();
});

 emailjs.init("Yn9stdxGrVglDhEzU");

const form = document.getElementById("contactForm");
const result = document.getElementById("result");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    result.innerHTML = "Sending...";

    emailjs.sendForm(
        "service_rlt24p7",
        "template_b0v3vla",
        this
    )
    .then(function() {
        result.innerHTML = "Message sent successfully!";
        form.reset();
    })
    .catch((error) => {
    console.log("EMAILJS ERROR:", error);

    result.innerHTML =
        "Failed: " +
        (error.text || error.message);
});
});