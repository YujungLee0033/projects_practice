import React, { useRef, useState, useEffect } from "react";

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};


const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.가위);
    const [score, setScore] = useState(0);
    const interval = useRef();


    const changeHand = () => {
        if (imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위)
        } else if (imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보)
        } else if (imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위)
        }
    }

    /*--
    componentDidMount() {
        this.interval = setInterval(this.changeHand, 100);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    --*/

    // useEffect 를 여러번 쓰는 경우도 있음
    useEffect(() => { // componentDidMount, componentDidUpdate 역할 (1대1 대응은 아님)
        interval.current = setInterval(changeHand, 100);
        return() => { // componentWillUnmount 역할
            clearInterval(interval.current);
        }
    }, [imgCoord]) // imgCoord가 바뀔때마다 다시 실행 / 값이 없을땐 처음 한번만 실행되고 다음부턴 실행되지않음

    const onClickBtn = (choice) => {
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult('비겼습니다.');
        } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다!');
            setScore((prevState) => prevState + 1);
        } else {
            setResult('졌습니다.');
            setScore((prevState) => prevState - 1);
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
        }, 1000);
    };


    return (
        <>
            <div id="computer" style={{backgroundImage: `url(https://imagescdn.gettyimagesbank.com/500/21/639/441/0/1325340620.jpg) ${imgCoord} 0`}} />
            <div>
                <button id="rock" className="btn" onClick={() => onClickBtn('바위')}>바위</button>    
                <button id="scissor" className="btn" onClick={() => onClickBtn('가위')}>가위</button>    
                <button id="paper" className="btn" onClick={() => onClickBtn('보')}>보</button>                        
            </div>
            <div>{result}</div>  
            <div>현재 {score}점</div>
        </>
    );
}


export default RSP;