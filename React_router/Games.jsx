import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import GameMatcher from "./GameMatcher";


const Games = () => {
    return (
        <BrowserRouter>
            <div>
                <Link to="/game/rock-scissors-paper">가위바위보</Link>
                &nbsp;
                <Link to="/game/lotto-generator">로또생성기</Link>
                &nbsp;
                <Link to="/game/speed-check">스피드체크</Link>
                &nbsp;
                <Link to="/game/index">게임 매쳐</Link>
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<GameMatcher />} />
                    <Route path="/game/*" element={<GameMatcher />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Games;