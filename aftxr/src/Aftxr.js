import { Component } from "react";

class Aftxr extends Component {
    componentDidMount() {
        const glitch = new window.Glitch(this.canvas)
        glitch.run()
    }
    render() {
        return (
            <div className="Aftxr">
                Hello.
                <canvas ref={el => (this.canvas = el)} />
            </div>
        );
    }
}

export default Aftxr;
