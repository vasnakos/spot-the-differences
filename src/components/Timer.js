import React, {Component} from 'react';

function Timer(props){
    return (
        <div className="timer">
            {props.time/1000}
        </div>
    );
}

export default Timer;
