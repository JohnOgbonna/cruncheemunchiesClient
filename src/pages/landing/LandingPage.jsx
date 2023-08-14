import React from 'react';
import Paragraph from "../../components/paragraphs/paragraph";
import "./Landing_page_styles.scss";
import { constants } from '../../public/exports/constants';
import { hompageSections } from '../../public/exports/hompageSections';
function LandingPage() {

  return (
    <div className="Page" id="Landing">
      <section className='LandingPage__header'>
        <h1 className='LandingPage__header-title'>The Best African Snacks!!</h1>
        <ul className='LandingPage__header-list'>
          {
            constants.snacks.map(snack=>{
              return(
                <li className='LandingPage__header-list--item'>
                  {snack.name}
                </li>
              )
            })
          }
        </ul>
      </section>
      {/* <Paragraph /> */}
    </div>
  );
}

export default LandingPage;
