import React, { useState } from 'react';
import './App.css';
import avatar from './amulya_avatar_5.png';
import project from './idea.png';
function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const handleNavClick = (section) => {
    setCurrentSection(section);
  };
  return (
    <div className="App">
      <Navbar handleNavClick={handleNavClick} />
      <div className="content">
        {currentSection === 'home' && <Home />}
        {currentSection === 'projects' && <Projects />}
        {currentSection === 'about' && <About />}
        {currentSection === 'contact' && <Contact />}
      </div>
    </div>
  );
}
function Navbar({ handleNavClick }) {
  return (
    <nav className="navbar">
      <ul>
        <li><button onClick={() => handleNavClick('home')}>Overview</button></li>
        <li><button onClick={() => handleNavClick('projects')}>Projects</button></li>
        <li><button onClick={() => handleNavClick('about')}>About</button></li>
        <li><button onClick={() => handleNavClick('contact')}>Contact Info</button></li>
      </ul>
    </nav>
  );
}
function Home() {
  return (
    <div className="container">
      <div className="avatar-container">
        <img className="avatar" src={avatar} alt="Avatar" />
      </div>
      <section id="home" className="section">
        <div className="text-container">
          <h2><strong> &emsp; Amulya Parashar</strong></h2>
          <p>
            <ul>
              <li> Student in <strong>MIT Manipal</strong>.</li>
              <li> Proffecient Coder in<strong> 
                <ul>
                  <li> C/C++ </li>
                  <li> Java/JavaFX</li>
                  <li> MySQL/SQLPlus</li>
                  <li> Python</li>
                  <li> HTML CSS and Javascript</li>
                </ul>
                </strong>
              </li>
            </ul>
            &emsp; My SkillSets extends to <strong>Data Structures and Algorithms(DSA), Object Oriented Programming(OOPs), Power Bi and Data Analytics</strong> 
          </p>
        </div>
      </section>
    </div>
  );
}
function Projects() {
  return (
    <div className="container">
      <section id="projects" className="section">
        <div className="text-container">
          <h1>&emsp;&emsp;&emsp;&emsp; Projects</h1>
          <p>&emsp; 
            <ol>
              <li>
                GitHub Account : <a href='https://github.com/KING-258/'>KING-258</a> &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; 
              </li>
              <li>
                GitHub JavaScript Projects : 
                <ul>
                  <li> 2048 Game : <a href='https://github.com/KING-258/JS/tree/main/2048'>🔗</a></li>
                  <li> Tic Tac Toe : <a href='https://github.com/KING-258/JS/tree/main/TicTacToe'>🔗</a></li>
                  <li> MineSweeper : <a href='https://github.com/KING-258/JS/tree/main/Minesweeper_AI'>🔗</a></li>
                  <li> KnapSack Problem Visualiser : <a href='https://github.com/KING-258/JS/tree/main/KnapSack_FrontEND'>🔗</a></li>
                  <li> Card Guessing Game : <a href='https://github.com/KING-258/JS/tree/main/CardsHi-Lo'>🔗</a></li>
                  <li> Nokia Snake Game : <a href='https://github.com/KING-258/JS/tree/main/Snake_Xenia'>🔗</a></li>
                  <li> Chrome Dino with <strong>3JS</strong> : <a href='https://github.com/KING-258/JS/tree/main/Dino_Chrome'>🔗</a></li>
                </ul>
              </li>
              <li>
                GitHub DSA Repository : <a href='https://github.com/KING-258/DSA'>🔗</a>
              </li>
              <li>
                GitHub Python Repository : <a href='https://github.com/KING-258/Py-Repository'>🔗</a>
              </li>
              <li>
                GitHub Java Repository : <a href='https://github.com/KING-258/Java_King'>🔗</a>
              </li>
            </ol>
          </p>
        </div>
      </section>
      <div className="project-container">
        <img className="project" src={project} alt="Project" />
      </div>
    </div>
  );
}
function About() {
  return (
    <section id="about" className="section">
      <h3>👋 Hey there!</h3>
        <p>I'm <strong>Amulya Parashar</strong>, a tech-savvy Indian boy hailing from the vibrant city of Jaipur, nestled in the royal state of Rajasthan.</p>
        <h5>🖥️ Tech Enthusiast</h5>
        <p>From coding to tinkering with gadgets, technology has always been my passion. I love exploring the latest advancements in the tech world, from AI to blockchain, and everything in between. Whether it's building apps or diving into the intricacies of software development, I'm always up for a challenge.</p>
        <h5>🎶 Music Enthusiast</h5>
        <p>And what's life without a good soundtrack, right? Music is my constant companion, whether I'm studying, travelling, or simply unwinding after a long day. From Rap Music to Lo-Fi Beats, I appreciate all genres and love discovering new artists.</p> 
        <h5>🎓 Engineering Student</h5>
        <p>I am Currently Pursuing my BTech from <strong>MIT Manipal</strong>. </p>    
        <p><strong>Join me on this exciting adventure as I navigate the intersections of technology, travel, music, and everything in between. Let's connect and share our experiences along the way! 🚀</strong></p>
    </section>
  );
}
function Contact() {
  return (
    <section id="contact" className="section">
      <h2>Contact Info</h2>
      <p>
        <ul>
          <li>
            <h3> Mail ID : <a href='mailto:amulyaparashar258@gmail.com'>amulyaparashar258@gmail.com</a></h3>
          </li>
          <li>
            <h3> Phone Number : +91 8302892110</h3>
          </li>
          <li>
            <h3> Address : 106A/S Krishna Garden Colony Jagatpura Jaipur Rajasthan - 302017</h3>
          </li>
        </ul>
      </p>
    </section>
  );
}
export default App;