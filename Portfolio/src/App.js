import React, { useState, useEffect } from 'react';
import './App.css';
import avatar1 from './amulya_avatar.png';
import avatar from './amulya_avatar_5.png';
import project from './idea5.png';

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
      section.classList.add('fade-in');
    });
  }, [currentSection]);

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
    <section id="home" className="section">
      <div className="container">
        <div className="content-block">
          <div className="text-container">
            <h2>Amulya Parashar</h2>
            <p>
              <ul>
                <li>Student at <strong>MIT Manipal</strong>.</li>
                <li>Proficient Coder in:
                  <ul>
                    <li>C/C++</li>
                    <li>Java/JavaFX</li>
                    <li>MySQL/SQLPlus</li>
                    <li>Python</li>
                    <li>HTML, CSS, and JavaScript</li>
                    <li>Rust</li>
                    <li>GO</li> 
                  </ul>
                </li>
              </ul>
              My skill sets extend to <strong>Data Structures and Algorithms (DSA), Object-Oriented Programming (OOP), Power BI, and Data Analytics</strong>.
            </p>
          </div>
          <div className="image-container">
            <img className="avatar" src={avatar1} alt="Avatar" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="content-block">
          <div className="text-container">
            <h2>Projects</h2>
            <ol>
              <li>
                GitHub Account: <a href='https://github.com/KING-258/'>KING-258</a>
              </li>
              <li>
                GitHub JavaScript Projects:
                <ul>
                  <li>2048 Game: <a href='https://github.com/KING-258/JS/tree/main/2048'>🔗</a></li>
                  <li>Music Player: <a href='https://github.com/KING-258/JS/tree/main/Music_Player'>🔗</a></li>
                  <li>Tic Tac Toe: <a href='https://github.com/KING-258/JS/tree/main/TicTacToe'>🔗</a></li>
                  <li>MineSweeper: <a href='https://github.com/KING-258/JS/tree/main/Minesweeper_AI'>🔗</a></li>
                  <li>KnapSack Problem Visualiser: <a href='https://github.com/KING-258/JS/tree/main/KnapSack_FrontEND'>🔗</a></li>
                  <li>Card Guessing Game: <a href='https://github.com/KING-258/JS/tree/main/CardsHi-Lo'>🔗</a></li>
                  <li>Nokia Snake Game: <a href='https://github.com/KING-258/JS/tree/main/Snake_Xenia'>🔗</a></li>
                  <li>Chrome Dino with <strong>3JS</strong>: <a href='https://github.com/KING-258/JS/tree/main/Dino_Chrome'>🔗</a></li>
                  <li>Maths Puzzle: <a href='https://github.com/KING-258/JS/tree/main/Maths_Puzzle'>🔗</a></li>
                  <li>Text Paragraph Animations: <a href='https://github.com/KING-258/JS/tree/main/Animation'>🔗</a></li>
                </ul>
              </li>
              <li>
                GitHub DSA Repository: <a href='https://github.com/KING-258/DSA'>🔗</a>
              </li>
              <li>
                GitHub Python Repository: <a href='https://github.com/KING-258/Py-Repository'>🔗</a>
              </li>
              <li>
                GitHub Java Repository: <a href='https://github.com/KING-258/Java_King'>🔗</a>
              </li>
            </ol>
          </div>
          <div className="image-container">
            <img className="project" src={project} alt="Project" />
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="content-block">
          <div className="text-container">
            <h3>Hey there! 👋</h3>
            <p>I'm <strong>Amulya Parashar</strong>, a tech-savvy individual from Jaipur, Rajasthan.</p>
            <h5>🖥️ Tech Enthusiast</h5>
            <p>I have a passion for technology, from coding to exploring the latest advancements in the tech world.</p>
            <h5>🎶 Music Lover</h5>
            <p>I enjoy all genres of music and love discovering new artists.</p>
            <h5>🎓 Engineering Student</h5>
            <p>I am currently pursuing my BTech from <strong>MIT Manipal</strong>.</p>
            <p>Join me on my journey as I navigate the intersections of technology, music, and life.</p>
          </div>
          <div className="image-container">
            <img className="avatar" src={avatar} alt="Avatar" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="content-block">
          <div className="text-container">
            <h2>Contact Info</h2>
            <ul>
              <li>
                <h3>Email: <a href='mailto:amulyaparashar258@gmail.com'>amulyaparashar258@gmail.com</a></h3>
              </li>
              <li>
                <h3>Phone: +91 8302892110</h3>
              </li>
              <li>
                <h3>Address: 106A/S Krishna Garden Colony, Jagatpura, Jaipur, Rajasthan - 302017</h3>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
