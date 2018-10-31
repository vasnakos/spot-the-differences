import React, {Component} from 'react';

class Timer extends Component {
    constructor() {
        super();
        this.state = {
            time: 60000
        };
    }


    componentDidMount() {
        this.tick();
    }

    tick() {
        let time = this.state.time;
        this.interval = setInterval(() => {
            if (time >= 0) {
                time -= 1000;
                this.setState({
                    time
                });
            } else {
                this.stop();
            }

        }, 1000);
    }

    componentWillUnmount() {
        this.stop();
    }

    stop() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="timer">
                {this.state.time/1000}
            </div>
        );
    }
}

export default Timer;
