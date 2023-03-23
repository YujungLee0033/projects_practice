import React, { Component } from "react";

class Speedcheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: [],
    };

    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const { state, message, result } = this.state; // 이 안에서 그냥 사용
        if (state === 'waiting') { 
            this.setState({ // 파랑 -> 빨강
                state: 'ready',
                message: '초록색이 되면 클릭하세요.',
            });
            this.timeout = setTimeout(() => {
               this.setState({ // 빨강 -> 초록
                state: 'now',
                message: '지금 클릭'
               });
               this.startTime = new Date()
            }, Math.floor(Math.random() * 1000) + 2000); // 2 ~ 3초 랜덤
        } else if (state === 'ready') { // 성급하게 클릭 / 파랑
            clearTimeout(this.timeout);
            this.setState({ // 빨강 -> 파랑
                state: 'waiting',
                message: '성급하게 클릭하셨군요. 초록색이 된 후 클릭하세요.'
            });
        } else if (state === 'now') { // 반응속도 체크
            this.endTime = new Date();
            this.setState((prevState) => { // 초록 -> 파랑
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요.',
                    result: [...prevState.result, this.endTime - this.startTime]
                };
            });
        }

    };

    onReset = () => {
        this.setState({
            result: [],
        });
    }
    

    renderAverage = () => {
        const { result } = this.state;
        return result.length === 0 ? null : 
        <> 
            <div>평균시간: {result.reduce((a, c) => a + c) / result.length} ms</div>
            <button onClick={this.onReset}>리셋</button>
        </>
    };

    render() {
        const { state, message } = this.state;
        return (
            <>
                <div
                    id="screen"
                    className={state}
                    onClick={this.onClickScreen}
                >
                    {message}
                </div>
                {this.renderAverage()}
            </>
        );
    }
};

export default Speedcheck;