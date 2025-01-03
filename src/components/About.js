import React from 'react';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-container">
      <h1>Hakkında</h1>
      <p>Bu proje, React ile geliştirilen modern ve kullanıcı dostu bir web uygulamasıdır. </p>
      <p>Tasarımcı ve geliştirici: Furkan KAN </p>
      <p>Web geliştirme alanındaki deneyimimi yansıtarak, güçlü ve verimli bir kullanıcı deneyimi sunmayı amaçlıyorum.</p>
      <div className="links">
        <p>Benimle iletişim kurabileceğiniz bağlantılar:</p>
        <div className="icon-links">
          <a href="https://www.linkedin.com/in/furkankan" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={40} />
          </a>
          <a href="https://github.com/furkankan06" target="_blank" rel="noopener noreferrer">
            <FaGithub size={40} />
          </a>
          <a href="http://yunus.hacettepe.edu.tr/~furkankan/" target="_blank" rel="noopener noreferrer">
            <FaGlobe size={40} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
