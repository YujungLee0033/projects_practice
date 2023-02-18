const numbersDiv = document.querySelector('.numbers')
const drawBtn = document.querySelector('#draw')
const resetBtn = document.querySelector('#reset')
const lottoNumbers = []
const colors = ['red', 'orange', 'blue', 'green', 'purple']


function paintNumber(num){
    const eachNumDiv = document.createElement('div')
    eachNumDiv.classList.add('eachnum')                     // css를 위해
    let colorIndex = Math.floor(num / 10)
    eachNumDiv.style.backgroundColor = colors[colorIndex]
    eachNumDiv.textContent = num
    numbersDiv.appendChild(eachNumDiv)
}


drawBtn.addEventListener('click', function(){
    while(lottoNumbers.length < 6) {                        // 갯수 지정
        let ran = Math.floor(Math.random() * 45) + 1        // 범위 지정
        if(lottoNumbers.indexOf(ran) === -1) {              // 중복 값 확인
            lottoNumbers.push(ran)                          // 추가
            paintNumber(ran)                                // 배경 색
        }
    }
})
    

resetBtn.addEventListener('click', function(){
    lottoNumbers.splice(0, 6)
    numbersDiv.innerHTML = ""
})


