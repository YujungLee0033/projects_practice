const React = require('react');
const { useState, useRef } = React;           // hooks


const WordRelay = () => {
    const [word, setWord] = useState('고양이');
    const [exword, setExword] = useState('');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);


    const onSubmitForm = (e) => {
        e.preventDefault();
        if (word[word.length - 1] === value[0] && word !== value && value.length <= 3) {
            setResult('딩동댕');
            setExword(word);
            setWord(value);
            setValue('');
            inputRef.current.focus();
        }   else {
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    };

    const onChangeInput = (e) => {
        setValue( e.target.value );
    };

    return (
        <>
        <h2>끝말잇기 놀이</h2>
        <div>이전 : {exword}</div>
        <div>현재 : {word}</div>
        <form onSubmit={onSubmitForm}>
            <label htmlFor='wordInput'>다음 단어를 입력하세요 : </label>
            <input 
                id='wordInput' 
                className='wordInput' 
                ref={inputRef} 
                value={value} 
                onChange={onChangeInput} 
            />
            <button className='클래스'>입력</button>
        </form>
        <div>{result}</div>
        <p>** 3글자 이하의 단어이면서 이전 단어와 중복되지 않게 입력해주세요.</p>
        </>
    );

}

module.exports = WordRelay;