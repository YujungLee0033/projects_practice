import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Ball from "./Ball";


// 숫자들을 기억하기 위해 Memo를 사용
// useCallback은 함수 자체를 기억

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


const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []); // 기억해둬서 계속 함수가 실행되지 않도록 함
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);


    const runNumbers = () => {
        for (let i = 0; i < winNumbers.length - 1; i++) { // let을 쓰면 클로져 문제가 생기자 않음
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevState) => [...prevState, winNumbers[i]]);
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
    }

    useEffect(() => {
        console.log('useEffect');
        runNumbers();
        return() => {
            console.log('WillUnmount');
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        }
    }, [timeouts.current]); // input이 빈 배열이면 ComponentDidMount와 동일
    // 배열에 요소가 있으면 ComponentDidMount 와 ComponentDidUpdate 역할 수행


    // 함수 생성 자체가 버거울때 useCallback으로 감싸면 함수 자체를 기억하기때문에 부담이 덜함
    // 문제 : 기억을 너무 잘해서 당첨 숫자가 바뀌어도 계속 첫 값을 기억함
    // 자식 컴포넌트에 넘길땐 useCallback으로 감싸주기
    const onClickRedo = useCallback(() => {
        console.log('onClickRedo');
        console.log(winNumbers)
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]); // 잊어버리게 만들때 여기 배열을 사용


    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한번 더!</button>}
        </>
    );
}

export default Lotto;
