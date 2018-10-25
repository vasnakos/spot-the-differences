import React, {Component} from 'react';
import leftImage from './images/left-image.jpg';
import rightImage from './images/right-image.jpg';
import answersCoords from './data/answers';
import './App.css';

class App extends Component {
    componentDidMount() {
        this.handleCanvas();
        console.log(answersCoords);
    }

    drawImg (tmpImg, context) {
        let base_image = new Image();
        base_image.src = tmpImg;
        base_image.onload = function() {
            console.log('img loaded');
            context.drawImage(base_image, 0, 0);
        }
    }

    handleCanvas() {
        let lcanvas = document.getElementById('left-canvas'),
            rcanvas = document.getElementById('right-canvas'),
            lcontext = lcanvas.getContext('2d'),
            rcontext = rcanvas.getContext('2d');

        this.drawImg(leftImage, lcontext);
        this.drawImg(rightImage, rcontext);
    }

    handleClick (e) {
        const canvas = document.getElementById(e.target.id);
        const mousePos = {
            x: e.clientX - canvas.offsetLeft,
            y: e.clientY - canvas.offsetTop
        };

        if ((answersCoords[0][0] - 15) < mousePos.x && mousePos.x < (answersCoords[0][0] + 15)) {
            if((answersCoords[0][1] - 15) < mousePos.y && mousePos.y < (answersCoords[0][1] + 15)) {
                console.log('Found Difference');
            }
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Spot the Differences</h1>
                </header>

                <div className="">
                    <canvas id="left-canvas" width="350" height="386" onClick={this.handleClick.bind(this)}></canvas>
                    <canvas id="right-canvas" width="350" height="386" onClick={this.handleClick.bind(this)}></canvas>
                </div>
            </div>
        );
    }
}

export default App;
