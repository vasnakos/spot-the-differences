import React, {Component} from 'react';
import leftImage from './images/left-image.jpg';
import rightImage from './images/right-image.jpg';
import answersCoords from './data/answers';
import './App.css';

class App extends Component {
    componentDidMount() {
        this.handleCanvas();

        this.state = {
            answersCoords
        };
    }

    /** Function to draw an image on a canvas element
     *  @param {String} tmpImg, the path to the appropriate image to be loaded
     *  @param {Object} context the Canvas element on which we want an image to be loaded
     *
     *  @return {undefined}
     * */
    loadImg (tmpImg, context) {
        let base_image = new Image();
        base_image.src = tmpImg;
        base_image.onload = function() {
            console.log('img loaded');
            context.drawImage(base_image, 0, 0);
        }
    }

    /** Function get the canvas elements and make the appropriate calls to drawImg function
     *
     *  @return {undefined}
     * */
    handleCanvas() {
        let lcanvas = document.getElementById('left-canvas'),
            rcanvas = document.getElementById('right-canvas'),
            lcontext = lcanvas.getContext('2d'),
            rcontext = rcanvas.getContext('2d');

        this.loadImg(leftImage, lcontext);
        this.loadImg(rightImage, rcontext);
    }


    // Draws oval shape on <canvas> elements
    // (modified from: http://bit.ly/2bBPWHm)
    drawEllipse (id, centerX, centerY, width, height) {
        var canv = document.getElementById(id);
        var ctx = canv.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(centerX, centerY - height / 2); // startpoint top

        ctx.bezierCurveTo( // half an oval
            centerX + width / 2, centerY - height / 2, // CP top right
            centerX + width / 2, centerY + height / 2, // CP bottom right
            centerX, centerY + height / 2); // endpoint bottom

        ctx.bezierCurveTo( // 2nd half
            centerX - width / 2, centerY + height / 2, // CP bottom left
            centerX - width / 2, centerY - height / 2, // CP top left
            centerX, centerY - height / 2); // startpoint top

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#c3414f';
        ctx.stroke();
    }

    /** Event handled for click events on images to spot differences
     *  @param {Object} click event
     *
     *  @return {undefined}
     * */
    handleClick (e) {
        const canvas = document.getElementById(e.target.id);
        const mousePos = {
            x: e.clientX - canvas.offsetLeft,
            y: e.clientY - canvas.offsetTop
        };
        let answers = this.state.answersCoords;

        for (let i = 0; i < answers.length; i ++) {
            if (!answers[i].found) {
                if ((answers[i].coords[0] - 15) < mousePos.x && mousePos.x < (answers[i].coords[0] + 15)) {
                    if ((answers[i].coords[1] - 15) < mousePos.y && mousePos.y < (answers[i].coords[1] + 15)) {
                        answers[i].found = true;
                        this.setState({
                            answersCoords: answers
                        });
                        this.drawEllipse('left-canvas', answers[i].coords[0], answers[i].coords[1], 60, 60);
                        this.drawEllipse('right-canvas', answers[i].coords[0], answers[i].coords[1], 60, 60);
                        break;
                    }
                }
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
