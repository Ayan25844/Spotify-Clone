// VARIABLE INITIALIZATION //

var songIndex=0;
var gif=document.getElementById('gif');
var audioElement=new Audio("songs/1.mp3");
var masterPlay=document.getElementById("masterPlay");
var myProgressBar=document.getElementById("myProgressBar");
var masterSongName = document.getElementById('masterSongName');
var songItems=Array.from(document.getElementsByClassName("songList"));

var songs=[
    {songName:"Warriyo - Mortals",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"Cielo - Huma-Huma",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"DEAF KEV - Invincible - 320k",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"Different Heaven & EH!DE - My Heart",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"Janji-Heroes-Tonight-feat-Johnningf",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"Rabba - Salam-e-Ishq",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
    {songName:"Sakhiyaan - Salam-e-Ishq",filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
    {songName:"Bhula Dena - Salam-e-Ishq",filePath:"songs/8.mp3",coverPath:"covers/8.jpg"},
    {songName:"Tumhari Kasam - Salam-e-Ishq",filePath:"songs/9.mp3",coverPath:"covers/9.jpg"},
    {songName:"Na Jaana - Salam-e-Ishq",filePath:"songs/10.mp3",coverPath:"covers/10.jpg"},
]

// HANDLE PLAY/PAUSE CLICK //

masterPlay.addEventListener('click',function(){
    if(audioElement.paused || audioElement.currentTime<0){
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        gif.style.opacity=0;
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
})

// LISTEN TO EVENTS //

audioElement.addEventListener('timeupdate',function(){

    // UPDATE SEEKBAR //

    var progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;

    }
)

myProgressBar.addEventListener('change',function(){
    audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
})

songItems.forEach(function(element,i){
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

const makeAllPlays=function(){
    Array.from(document.getElementsByClassName("songItemPlay")).forEach(function(element){
            element.classList.remove("fa-pause-circle");
            element.classList.add("fa-play-circle");
        })
    }

Array.from(document.getElementsByClassName("songItemPlay")).forEach(function(element){
    element.addEventListener("click",function(e){
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    })
})

document.getElementById('next').addEventListener('click',function(){
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})

document.getElementById('previous').addEventListener('click',function(){
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})


