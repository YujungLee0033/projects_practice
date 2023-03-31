import React, { Component } from "react";
import Lotto from '../React_Lotto_Class/Lotto';
import RSP from '../React_RSP_Class/RSP';
import SpeedCheck from '../React_Speedcheck_Class/Speedcheck';
import { useLocation, useNavigate, Routes, Route } from "react-router";


const GameMatcher = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let urlSearchParams = new URLSearchParams(location.search.slice(1));
    console.log(urlSearchParams.get('hello'));
    console.log(urlSearchParams.get('page'));
    return (
        <Routes>
            <Route path="lotto-generator" element={<Lotto />} />
            <Route path="rock-scissors-paper" element={<RSP />} />
            <Route path="speed-check" element={<SpeedCheck />} />
            <Route
                path="*"
                element={<div>
                    일치하는 게임이 없습니다.
                </div>}
            />
        </Routes>
    );
}

export default GameMatcher;