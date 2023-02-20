const photoBox = document.getElementById('photoBox')
const nextBtn = document.getElementById('next')
const prevBtn = document.getElementById('previous')
const starting = document.getElementById('starting')
const startBtn = document.getElementById('startBtn')


const photos = []
const numPhoto = 10
let photoIndex = 0
const request = new XMLHttpRequest()
const url = `https://dog.ceo/api/breeds/image/random/${numPhoto}`
let isPushed = false


request.addEventListener('load', function(){               // 응답이 로드 되었을때
    const responseJson = JSON.parse(request.responseText)
    responseJson.message.forEach(function(element){
        photos.push(element)
    });
    
    photoBox.style.backgroundImage = `url(${photos[photoIndex]})`
})


function callPhotos(){              // 요청 초기화
    request.open("GET", url)
    request.send()
}


startBtn.addEventListener('click', function(){      // start 버튼
    if(isPushed){
        return;
    }

    isPushed = true;
    callPhotos()
    setTimeout(function(){
        starting.classList.remove('starting')
    }, 1500)
})


prevBtn.addEventListener('click', function(){           // 이전 버튼
    if(photoIndex == 0){
        photoIndex = numPhoto - 1
        photoBox.style.backgroundImage = `url(${photos[photoIndex]})`
        return;
    }

    photoIndex -= 1
    photoBox.style.backgroundImage = `url(${photos[photoIndex]})`
})


nextBtn.addEventListener('click', function(){       // 다음 버튼
    if(photoIndex == numPhoto - 1){
        photoIndex = 0
        photoBox.style.backgroundImage = `url(${photos[photoIndex]})`
        return;
    }

    photoIndex += 1
    photoBox.style.backgroundImage = `url(${photos[photoIndex]})`
})

