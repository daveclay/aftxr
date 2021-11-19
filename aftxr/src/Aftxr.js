import "./Aftxr.scss"
import { Component } from "react";
import noiseImage2 from "./images/web bg - faithful 2.png"
import noiseImage3 from "./images/web bg - faithful 3.png"
import noiseImage4 from "./images/web bg - faithful 4.png"
import noiseImage5 from "./images/web bg - faithful 5.png"
import noiseImage6 from "./images/web bg - faithful 6.png"
import noiseImage7 from "./images/web bg - faithful 7.png"

const noiseImages = [
  noiseImage2,
  noiseImage3,
  noiseImage4,
  noiseImage5,
  noiseImage6,
  noiseImage7
]

class Aftxr extends Component {
  render() {
    return (
      <div className="container">
        <div className="logo">
          <span>A</span>
          <span>F</span>
          <span>T</span>
          <span className="x">X</span>
          <span>R</span>
        </div>
        <div className="playerContainer">
          <iframe title="The Faithful"
                  src="https://bandcamp.com/EmbeddedPlayer/album=2960334884/size=large/artwork=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/"
                  seamless><a href="https://aftxr.bandcamp.com/album/the-faithful">The Faithful</a></iframe>
          <iframe title="Within Tolerances"
                  src="https://bandcamp.com/EmbeddedPlayer/album=2507150089/size=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/"
                  seamless><a href="https://aftxr.bandcamp.com/album/within-tolerances">Within Tolerances</a>
          </iframe>
          <iframe title="Occido"
                  src="https://bandcamp.com/EmbeddedPlayer/album=2105057392/size=large/artwork=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/"
                  seamless><a href="https://aftxr.bandcamp.com/album/occido">Occido</a></iframe>
          <iframe title="Absisto"
                  src="https://bandcamp.com/EmbeddedPlayer/album=2087624922/size=large/artwork=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/"
                  seamless><a href="https://aftxr.bandcamp.com/album/absisto">Absisto</a></iframe>
          <iframe title="Adrift"
                  src="https://bandcamp.com/EmbeddedPlayer/album=4136964018/size=large/artwork=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/"
                  seamless><a href="https://aftxr.bandcamp.com/album/adrift">Adrift</a></iframe>
          <iframe title="Vote"
                  src="https://bandcamp.com/EmbeddedPlayer/track=1977380926/size=large/artwork=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/"
                  seamless><a href="https://aftxr.bandcamp.com/track/vote">Vote</a></iframe>
        </div>

        <div className="textContent">
          <div>
            AFTXR is an industrial/noise/metal audio project by artist <a href="http://daveclay.com">Dave Clay</a>.
            Releases available at <a href="https://aftxr.bandcamp.com">aftxr.bandcamp.com</a>.
          </div>
        </div>
      </div>
    )
  }
}

export default Aftxr;
