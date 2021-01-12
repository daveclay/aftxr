import "./Aftxr.scss"
import { Component } from "react";


class Aftxr extends Component {
    componentDidMount() {
        const glitch = new window.Glitch(this.canvas, "./hands.jpg")
        glitch.run()
    }
    render() {
        return (
            <div>
                <canvas ref={el => (this.canvas = el)} />
                <div className="container">
                    <div className="logo">AFTXR</div>
                    <div className="playerContainer">
                        <iframe title="The Faithful by aftxr"
                                src="https://bandcamp.com/EmbeddedPlayer/album=2960334884/size=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/"
                                seamless><a href="https://aftxr.bandcamp.com/album/the-faithful">The Faithful by aftxr</a></iframe>
                        <iframe title="Within Tolerances by aftxr"
                                src="https://bandcamp.com/EmbeddedPlayer/album=2507150089/size=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/"
                                seamless><a href="https://aftxr.bandcamp.com/album/within-tolerances">Within Tolerances by aftxr</a></iframe>
                        <iframe src="https://bandcamp.com/EmbeddedPlayer/album=2105057392/size=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/"
                                seamless><a href="https://aftxr.bandcamp.com/album/occido">Occido by aftxr</a></iframe>
                        <iframe src="https://bandcamp.com/EmbeddedPlayer/album=2087624922/size=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/"
                                seamless><a href="https://aftxr.bandcamp.com/album/absisto">Absisto by aftxr</a></iframe>
                        <iframe src="https://bandcamp.com/EmbeddedPlayer/album=4136964018/size=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/"
                                seamless><a href="https://aftxr.bandcamp.com/album/adrift">Adrift by aftxr</a></iframe>
                        <iframe src="https://bandcamp.com/EmbeddedPlayer/track=1977380926/size=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/"
                                seamless><a href="https://aftxr.bandcamp.com/track/vote">Vote by aftxr</a></iframe>
                    </div>
                </div>
            </div>
        );
    }
}

export default Aftxr;
