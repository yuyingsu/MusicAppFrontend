import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide>
          <div className="each-slide" id="share">
            <div>
              <span>Share Music</span>
            </div>
          </div>
          <div className="each-slide" id="meetup">
            <div>
              <span>Host Meetup</span>
            </div>
          </div>
          <div className="each-slide" id="explore">
            <div>
              <span>Explore Music</span>
            </div>
          </div>
        </Slide>
      </div>
    )
}

export default Slideshow;