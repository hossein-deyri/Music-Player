const sources = [{
    src: 'assets/audio/Shadmehr Aghili - Taghdir.mp3',
    cover: 'assets/img/1.jpg',
    title: 'Taghdir',
    singer: 'Shadmehr Aghili'
},
{
    src: 'assets/audio/AaRON - U Turn (Lili).mp3',
    cover: 'assets/img/2.jpg',
    title: 'Lili',
    singer: 'AaRON'
},
{
    src: 'assets/audio/Asef Aria - Dastan.mp3',
    cover: 'assets/img/3.jpg',
    title: 'Dastan',
    singer: 'Asef Aria'
},
{
    src: 'assets/audio/moby-extremeways.mp3',
    cover: 'assets/img/4.jpg',
    title: 'Extrem Eways',
    singer: 'Moby'
},
]

let player = document.querySelector('audio')
let _play = document.getElementsByClassName('play')[0]
let _played_progres = document.querySelector('.played')
let _seekbar = document.querySelector('.bg-played')

function ply(s) {
    let _status = _play.children[0].getAttribute('data-status')
    if (_status == 'play') {
        player.play();
        _play.children[0].setAttribute('data-status', 'pause')
        _play.children[0].classList.add('dn')
        _play.children[1].classList.add('df')
        _play.children[1].classList.remove('dn')
        _play.setAttribute('style', 'border-color: #E8550C;background-image: linear-gradient(120deg, #E8550C 0%, #f47333 100%)', 'box-shadow: inset 10px 10px 20px rgba(209, 19, 2, 0.5), -3px -3px 20px #5b5b5b, 5px 5px 20px #050606;');
        _startProgress()
    } else {
        player.pause()
        _play.children[0].setAttribute('data-status', 'play')
        _play.children[0].classList.remove('dn')
        _play.children[1].classList.remove('df')
        _play.children[1].classList.add('dn')
        _play.setAttribute('style', 'background-color: #050606;background-image: linear-gradient(120deg, #47494B 0%, #18191D 100%)', 'box-shadow: -3px -3px 20px #5b5b5b, 5px 5px 20px #050606;');
    }
}

//---------------------- play music ------------------------

let set_progress
function _startProgress() {
    set_progress = setInterval(() => {
        _played_progres.style.width = `${(player.currentTime / player.duration) * 100}%`
        document.getElementById('past_time').innerText = Math.floor((player.currentTime) / 60) + ':' + Math.floor((player.currentTime) % 60);
        document.getElementById('total_time').innerText = Math.floor((player.duration) / 60) + ':' + Math.floor((player.duration) % 60);
    }, 10);
}

//---------------------- Start  Progress ------------------------

_seekbar.addEventListener('click', (e) => {
    let _status = _play.children[0].getAttribute('data-status')
    let x_position = (e.pageX) - (e.currentTarget).getBoundingClientRect().left
    player.currentTime = (x_position * player.duration) / (e.currentTarget).offsetWidth
})

//---------------------- SeekBar ------------------------

let src_index = 0
change_src(0)
function change_src(index) {
    src_index = index
    player.src = sources[index].src
}

//---------------------- Change Src ------------------------

function next() {
    let lastindex = sources.length - 1
    change_style_play_to_pause()
    if (src_index + 1 > lastindex) {
        let currentIndex = 0
        change_src(currentIndex)
        player.play()
    } else {
        let currentIndex = src_index + 1
        change_src(currentIndex)
        player.play()
    }
    change_cover()
    player.play();
    _startProgress()
}

//---------------------- Next Music ------------------------

function previous() {
    
    let lastindex = sources.length - 1
    change_style_play_to_pause()
    if (src_index - 1 < 0) {
        let currentIndex = lastindex
        change_src(currentIndex)
        player.play()
    } else {
        let currentIndex = src_index - 1
        change_src(currentIndex)
        player.play()
    }
    change_cover()
    player.play();
    _startProgress()
}

//---------------------- Previuos Music ------------------------

function change_cover() {
    const source = sources[src_index];
    document.getElementById("cover_song").style.backgroundImage = `url(${source.cover})`
    document.getElementById('name_singer').innerText = source.singer
    document.getElementById('name_song').innerText = source.title
}

//---------------------- Change Cover ------------------------

function change_style_play_to_pause() {
    let _status = _play.children[0].getAttribute('data-status')
    if (_status == 'play') {
        player.play();
        _play.children[0].setAttribute('data-status', 'pause')
        _play.children[0].classList.add('dn')
        _play.children[1].classList.add('df')
        _play.children[1].classList.remove('dn')
        _play.setAttribute('style', 'border-color: #E8550C;background-image: linear-gradient(120deg, #E8550C 0%, #f47333 100%)', 'box-shadow: inset 10px 10px 20px rgba(209, 19, 2, 0.5), -3px -3px 20px #5b5b5b, 5px 5px 20px #050606;');
        _startProgress()
    }
}

// --------------------- Change Style Button Play To Pause ---------------------

let _list = document.getElementsByClassName('play_list')[0]
_list.addEventListener('click', () => {
    document.getElementById('list_music').style.height = "55%"
    document.getElementsByClassName('cover')[0].style.height = '20%'
    document.getElementsByClassName('cover')[0].style.width = '50%'
    document.getElementsByClassName('control_song')[0].style.height = '0%'
    document.getElementsByClassName('control_song')[0].style.overflow = 'hidden'
    document.getElementsByClassName('details_songer')[0].style.height = '0%'
    document.getElementsByClassName('details_songer')[0].style.overflow = 'hidden'

})

// --------------------- Button List Music ---------------------

let _back = document.getElementsByClassName('back')[0]
_back.addEventListener('click', () => {
    document.getElementById('list_music').style.height = "0px"
    document.getElementsByClassName('control_song')[0].style.height = '20%'
    document.getElementsByClassName('control_song')[0].style.overflow = 'visible'
    document.getElementsByClassName('cover')[0].style.height = '40%'
    document.getElementsByClassName('cover')[0].style.width = '100%'
    document.getElementsByClassName('progres')[0].style.height = '10%'
    document.getElementsByClassName('details_songer')[0].style.height = '10%'
})

// --------------------- Button Back To Main MusicPlayer ---------------------

let _icon = document.querySelectorAll('#play_icon')
_icon.forEach((item, index, array) => {
    item.addEventListener('click', () => {
        _icon.forEach((val) => {
            val.style.display = "flex"
            val.nextElementSibling.style.display = 'none'
        })
        item.style.display = "none"
        item.nextElementSibling.style.display = 'flex'
        console.log(item.nextElementSibling);
        _play.children[0].setAttribute('data-status', 'play')
        change_src(index)
        ply()
        const source = sources[index];
        document.getElementById("cover_song").style.backgroundImage = `url(${source.cover})`
        document.getElementById('name_singer').innerText = source.singer
        document.getElementById('name_song').innerText = source.title
    })
})

// --------------------- Change Button Play To Read in PlayList Music ---------------------