import React, { Component } from "react";
import Ball from "./Ball";

function getWinNumbers() { // 셔플 함수
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1));
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
    state = { 
        winNumbers: getWinNumbers(), // 미리 데이터를 준비, 당첨 숫자들 6개
        winBalls: [],
        bonus: null, // 보너스 공
        redo: false,
    };

    timeouts = [];

    runNumbers = () => {
        console.log('runNumbers');
        const { winNumbers } = this.state;
        for (let i = 0; i < this.state.winNumbers.length - 1; i++) { // let을 쓰면 클로져 문제가 생기자 않음
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    }
                });
            }, (i + 1) * 1000);
        }
        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true, // <한번 더> 버튼이 안보이다가 보이게 됨
            });
        }, 7000);
    }

    componentDidMount() {
        console.log('DidMount');
        this.runNumbers();
    }

    componentWillUnmount() {
        console.log('WillUnmount');
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('DidUpdate');
        if (this.state.winBalls.length === 0) { // winBalls, bonus, redo 중 하나 골라서 설정 가능
            this.runNumbers();
        }
    }

    onClickRedo = () => {
        console.log('onClickRedo');
        this.setState({
            winNumbers: getWinNumbers(), // 미리 데이터를 준비, 당첨 숫자들 6개
            winBalls: [],
            bonus: null, // 보너스 공
            redo: false,
        });
        this.timeouts = [];
    };

    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한번 더!</button>}
            </>
        );
    }
}

export default Lotto;