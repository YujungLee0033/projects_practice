const textBox = document.querySelector('textarea')
const memoBox = document.querySelector('.memoBox')
const memoBtn = document.querySelector('button')


textBox.maxLength = '50'
textBox.placeholder = '메모를 적어주세요..(50자 이내)'


memoBtn.addEventListener('click', () => {
    if (textBox.value !== '') {
        memoBtnPress()
    }
})

function memoBtnPress() {
    const smallBox = document.createElement('div')       // 작은 메모 상자
    memoBox.appendChild(smallBox)
    smallBox.classList = 'smallBox'            // memobox > smallbox

    
    const memo = document.createElement('div')          // 메모 상자
    memo.classList = 'memo'
    smallBox.appendChild(memo)
    memo.textContent = textBox.value
    textBox.value = ''

    const date = document.createElement('p')

    const now = new Date()
    const year = now.getFullYear()
    const mont = now.getMonth()
    const dates = now.getDate()

    date.textContent = `⇪ ${year}년 ${mont + 1}월 ${dates}일`
    smallBox.appendChild(date)


    const deleteBtn = document.createElement('button')  // 삭제 버튼
    deleteBtn.textContent = 'X'
    smallBox.appendChild(deleteBtn)

    deleteBtn.addEventListener('click', () => {
        smallBox.parentNode.removeChild(smallBox)       // 항목 삭제
        })

    
    }
