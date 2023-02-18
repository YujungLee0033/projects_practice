const container = document.createElement('div')             // 큰 틀
container.classList = 'container'
document.body.appendChild(container)

const app = document.createElement('div')                   // 작은 틀
app.classList = 'app'
container.appendChild(app)

const h1 = document.createElement('h1')
h1.textContent = 'TO DO LIST'
app.appendChild(h1)

const listBox = document.createElement('div')               // 리스트 박스
listBox.classList = 'listBox'
app.appendChild(listBox)

const inputBox = document.createElement('div')              // 타이핑 박스
inputBox.classList = 'inputBox'
app.appendChild(inputBox)

const input = document.createElement('input')               // 입력창
input.placeholder = 'to do...'
input.maxLength = '17'
inputBox.appendChild(input)

const addButton = document.createElement('button')          // 추가 버튼
addButton.textContent = '추가'
inputBox.appendChild(addButton)


const listArr = []


addButton.addEventListener('click', function(){     // 추가 버튼 이벤트
    if (input.value !== "") {
        addBtn()
    }
})

const enterkey = function() {
    if (window.event.keyCode == '13' && input.value !== ""){
        addBtn()
    }
}

input.onkeyup = enterkey

function addBtn(){                                       // 추가버튼 함수
    const samllBox = document.createElement('div')
    samllBox.classList = 'smallBox'
    listBox.appendChild(samllBox)

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'x'
    deleteBtn.addEventListener('click', (clickedId) => {
        samllBox.parentNode.removeChild(samllBox)       // 항목 삭제
        listArr = listArr.filter(function(aTodo){
            return aTodo.Date().getTime() !== clickedId
          })
    })
    samllBox.appendChild(deleteBtn)

    listArr.push(input.value)
    localStorage.setItem("ToDoList", listArr)

    const span = document.createElement('span')
    span.textContent = input.value
    input.value = ''
    samllBox.appendChild(span)
    span.addEventListener('click', () => {
        span.classList.toggle('spanClicked')
    })

}
