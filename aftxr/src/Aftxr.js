import "./Aftxr.scss"
import { Component } from "react";

const style = {
    width: 200,
    height: 200
}


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
                    <div className="logo">
                        <span>A</span>
                        <span>F</span>
                        <span>T</span>
                        <span>X</span>
                        <span>R</span>
                    </div>
                    <div className="playerContainer">
                        <iframe title="The Faithful by aftxr"
                                style={style}
                                src="https://bandcamp.com/EmbeddedPlayer/album=2960334884/size=large/artwork=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/"
                                seamless><a href="https://aftxr.bandcamp.com/album/the-faithful">The Faithful by aftxr</a></iframe>
                        <iframe title="Within Tolerances by aftxr"
                                style={style}
                                src="https://bandcamp.com/EmbeddedPlayer/album=2507150089/size=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/"
                                seamless><a href="https://aftxr.bandcamp.com/album/within-tolerances">Within Tolerances by aftxr</a></iframe>
                        <iframe style={style}
                                src="https://bandcamp.com/EmbeddedPlayer/album=2105057392/size=large/artwork=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/"
                                seamless><a href="https://aftxr.bandcamp.com/album/occido">Occido by aftxr</a></iframe>
                        <iframe style={style}
                                src="https://bandcamp.com/EmbeddedPlayer/album=2087624922/size=large/artwork=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/"
                                seamless><a href="https://aftxr.bandcamp.com/album/absisto">Absisto by aftxr</a></iframe>
                        <iframe style={style}
                                src="https://bandcamp.com/EmbeddedPlayer/album=4136964018/size=large/artwork=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/"
                                seamless><a href="https://aftxr.bandcamp.com/album/adrift">Adrift by aftxr</a></iframe>
                        <iframe style={style}
                                src="https://bandcamp.com/EmbeddedPlayer/track=1977380926/size=large/artwork=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/"
                                seamless><a href="https://aftxr.bandcamp.com/track/vote">Vote by aftxr</a></iframe>
                    </div>
                </div>
            </div>
        );
    }
}

export default Aftxr;
