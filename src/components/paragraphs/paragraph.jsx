import './paragraph_styles.scss'
import chin_chin1 from '../../public/images/chin_chin1.jpeg'
import paragraphs from '../../text/landing_page_paragraphs.json'
import chin_chin2 from '../../public/images/chin_chin2.jpeg'
import chin_chin3 from '../../public/images/chin_chin3.png'
import React from 'react';

let images = [
  chin_chin1,
  chin_chin3,
  chin_chin2,
]


function Paragraph(props) {
  return (  
    paragraphs.map((paragraph, index) => {
    return(
      <section className="paragraph" id = "home">
        <div className="paragraph__text">
          <h2 className="paragraph__text-header">{paragraph.title}</h2>
          <p className="paragraph__text-paragraph">{paragraph.text}</p>
        </div>
        <img className='paragraph__image' src ={images[index]} />
      </section>
  )})
  );
}

export default Paragraph;