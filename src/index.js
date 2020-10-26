import './style.css';
import afro from '../assets/afro.jpg';

const content = document.getElementById('content');

const afroImg = document.createElement('img');
afroImg.src = afro;

content.appendChild(afroImg);
console.log('image displaying');