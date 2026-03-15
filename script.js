document.addEventListener("DOMContentLoaded", () => {

const cards = document.querySelectorAll(".tilt-card");

cards.forEach((card) => {

card.addEventListener("mousemove", (e) => {

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const centerX = rect.width / 2;
const centerY = rect.height / 2;

const rotateX = (y - centerY) / 12;
const rotateY = (centerX - x) / 12;

card.style.transform =
`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;

});

card.addEventListener("mouseleave", () => {

card.style.transform =
"perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";

});

});

});
const toggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav-links");

toggle.addEventListener("click",()=>{

nav.classList.toggle("active");

});