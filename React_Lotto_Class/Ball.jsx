// import React, { PureComponent } from "react";
import React, { memo } from "react";


// memo가 없을 경우엔 함수 컴포넌트
// memo가 감싸줘서 PureComponent 역할을 함 -> 하이오더 컴포넌트 hoc
const Ball = memo(({ number }) => {
    let background;
    if (number <= 10) {
        background = 'red';
    } else if (number <= 20) {
        background = 'orange';
    } else if (number <= 30) {
        background = 'yellow';
    } else if (number <= 40) {
        background = 'blue';
    } else {
        background = 'green';
    }
    return (
        <div className="ball" style={{ background }}>{number}</div>
    );
});

export default Ball;


/*

class Ball extends PureComponent {
    render() {
        const { number } = this.props;
        let background;
        if (number <= 10) {
            background = 'red';
        } else if (number <= 20) {
            background = 'orange';
        } else if (number <= 30) {
            background = 'yellow';
        } else if (number <= 40) {
            background = 'blue';
        } else {
            background = 'green';
        }
        return (
            <div className="ball" style={{ background }}>{number}</div>
        );
    }
}

*/
