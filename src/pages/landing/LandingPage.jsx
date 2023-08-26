import React from 'react';
import "./Landing_page_styles.scss";
import { useNavigate } from 'react-router-dom';
import { constants } from '../../public/exports/constants';
import { hompageSections, imageLoop } from '../../public/exports/hompageSections';
function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className="Page" id="Landing">
      <section className='LandingPage__header'>
        <h1 className='LandingPage__header-title'>The Best African Snacks!!</h1>
        <ul className='LandingPage__header-list'>
          {
            constants.snacks.map(snack => {
              return (
                <li className='LandingPage__header-list--item'
                >
                  <a className='homepageLink' href={`#${snack.id}`}>
                  {snack.name}
                  </a>
                </li>
              )
            })
          }
        </ul>
      </section>
      {
        Object.keys(hompageSections).map(section => {
          const sectionObj = hompageSections[section]
          return (
            <section id={sectionObj.id} className='LandingPage__section'>
              <div className='LandingPage__section-text'>
                <h2 className='LandingPage__section-header'>{sectionObj.name}</h2>
                <p className='LandingPage__section-description'>{sectionObj.description}</p>
              </div>
              <div className='LandingPage__section-imagesMarquee'>
                <div className='LandingPage__section-images'>
                  {
                    sectionObj.images ?
                      imageLoop.map(() => {
                        return (
                          Object.keys(sectionObj.images).map(image => {
                            const imageObj = sectionObj.images[image]
                            return (
                              <div className='LandingPage__section-imageWrapper'
                              >
                                <img className='LandingPage__section-image'
                                  src={imageObj.image}
                                  id={imageObj.name}
                                  loading='lazy'
                                  alt = {`${imageObj.name}`}
                                />
                                <label htmlFor={imageObj.name}>{imageObj.description}</label>
                              </div>
                            )
                          }))
                      })

                      : null
                  }
                </div>
                <div className='LandingPage__section-imagesLarge'>
                  {
                    sectionObj.images ?
                      Object.keys(sectionObj.images).map(image => {
                        const imageObj = sectionObj.images[image]
                        return (
                          <div className='LandingPage__section-imageWrapperLarge'>
                            <img className='LandingPage__section-imageLarge'
                              src={imageObj.image}
                              id={imageObj.name}
                              loading='lazy'
                              alt={`${imageObj.name}`}
                            />
                            <label htmlFor={imageObj.name}>{imageObj.description}</label>
                          </div>
                        )
                      })
                      : null
                  }
                </div>
              </div>
              <button className='LandingPage__section-button'
              onClick={()=>{
                if(sectionObj.link) navigate(`${sectionObj.link}`)
              }}
              >{sectionObj.link ? 'Order Now' : 'Order Coming Soon!'}</button>
            </section>
          )
        })
      }
    </div>
  );
}

export default LandingPage;
