console.log("lets write javascript")
let currentSong = new Audio;
currentSong.volume = 50/100;
let songs;
let currFolder;

function formatTime(seconds) {  // convert seconds into minutes
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const minutesString = minutes < 10 ? `0${minutes}` : minutes;
    const secondsString = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${minutesString}:${secondsString}`;
}

let getSongs = async(folder) =>{  // fetching songs from the main url
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
    let response = await a.text();
    // let response = "songs/Glory/"
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for(let index = 0; index < as.length; index++){
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    // console.log(songs)

    let artistName = "";

    // Show all the songs in ul section of library
    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUl.innerHTML = "";
    let songHref = [];  // stores the href of all the songs
    for (const song of songs) {
        songHref.push(song.replaceAll("%20", " "));
        const songNameArt = song.replaceAll("%20", " ").replaceAll("%26", " & ").replaceAll(".mp3","").split("-"); 
        songUl.innerHTML = songUl.innerHTML + `
                        <li>
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${songNameArt[0]}</div>
                                <div class="artist">${songNameArt[1]}</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div>
                        </li>`;
    }

    // Attach an event listner to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        let mainSong;
        e.addEventListener("click", element=>{

            let mainName = e.querySelector(".info").firstElementChild.innerHTML;
            artistName = " - "+ e.querySelector(".artist").innerHTML;
            // console.log(e.querySelector(".info").firstElementChild.innerHTML);
            for (let i of songHref) {
                if(i.includes(mainName)){
                    mainSong = i;
                    mainSong = mainSong.replaceAll(" ", "%20");
                    // console.log("mainSong: ", mainSong);
                    break;
                }
            }
            playMusic(mainSong, mainName, artistName);
        })
    }) 

    

    return songs
}

const playMusic = (mainSong, mainName, artistName) => { // plays the musics
    // let audio = new Audio("/songs/" + mainSong)
    currentSong.src = `/${currFolder}/` + mainSong;  // mainSong is the song's href
    currentSong.play();
    let play = document.getElementById("play");
    play.src = "pause.svg"    

    document.querySelector(".songinfo").innerHTML = mainName + artistName; // mainName is only song's name
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

} 

let displayAlbums = async() =>{
    let a = await fetch(`http://127.0.0.1:5500/songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let cardContainer = document.querySelector(".cardContainer")
    // console.log(div)

    let anchors = div.getElementsByTagName("a")
    // console.log(anchors)
    let array = Array.from(anchors)
        for(let index = 0; index < array.length; index++){
            const e = array[index];

        if(e.href.includes("/songs/")){
            let folder = e.href.split("/").slice(-2)[1];
            // get the metadata of the folder
            let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
            let response = await a.json();
            // console.log(response, cardContainer)
            cardContainer.innerHTML = `<div data-folder="${folder}" class="card">
            <div class="play">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" color="#000000" fill="none">
                    <!-- Define a clipPath for the circle -->
                    <defs>
                        <clipPath id="circleClip">
                            <circle cx="12" cy="12" r="10" />
                        </clipPath>
                    </defs>
                    <!-- Green background rectangle clipped to the circle -->
                    <rect width="24" height="24" fill="#1fdf64" clip-path="url(#circleClip)" />
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z" fill="currentColor" />
                </svg>  
            </div>
            <img src="/songs/${folder}/cover.jpg" style="height: 150px" alt="">
            <h2>${response.title}</h2>
            <p>${response.Description}</p>
        </div>` + cardContainer.innerHTML;
        }
    } // 4:30:50


    // Load the playlist whenever the card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e=>{
        e.addEventListener("click", async item=>{
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
    })
    })

}

let main = async() =>{

    // code picked up from stackoverflow to avoid the bottom bar covering the screen
var x = document.getElementsByClassName("fixed-bottom-bar")[0];

document.getElementById("forged-fixed-bottom-bar").style.height = "" + x.offsetHeight - 10 + "px";

// end of code picked up from stackoverflow//

    let folderName = "Glory";
    //get the list of all songs
    songs = await getSongs(`songs/${folderName}`);
    currentSong.src = `/songs/${folderName}/` + songs[0];  // displays the name and artist of first song automatically
    document.querySelector(".songinfo").innerHTML = songs[0].replaceAll("%20", " ").replaceAll("%26", " & ").replaceAll(".mp3","").split("-")[0] + " - " + songs[0].replaceAll("%20", " ").replaceAll("%26", " & ").replaceAll(".mp3","").split("-")[1];
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

    //Display all the albums on the page
    displayAlbums();

    // Attach an event listner to play, next and previous
    let play = document.getElementById("play");
    play.addEventListener("click", ()=>{
        if(currentSong.src != ""){
            if(currentSong.paused){
                currentSong.play();
                play.src = "pause.svg"; // changes the image to pause after playing
            }
            else{
                currentSong.pause();
                play.src = "play.svg"; // changes the image to play after pausing 
            }
        }
    });

    //Listen for time update event
    currentSong.addEventListener("timeupdate", ()=>{
        // console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)} 
        / ${formatTime(currentSong.duration)}`;

        // moves the circle according to the time
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
        // console.log(document.querySelector(".circle").style.left);

        if(currentSong.currentTime == currentSong.duration){
            currentSong.currentTime = 0;
            currentSong.play();
        }
    })

    //  add an eventlistner to seekbar
    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent=((e.offsetX/e.target.getBoundingClientRect().width)*100);
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;

    })

    // Add an event listner to hamburger
    document.querySelector(".hamburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "0"
    })

    // Add an event listner to close button
    document.querySelector(".close").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "-150%"
    })
    
    // Add an event listner to previous button
    let prev = document.getElementById("previous")
    prev.addEventListener("click", ()=>{
        // let crtAlbum = songs[0].split("/").slice(-1)[0];
        // console.log(crtAlbum)
        // console.log(currentSong)
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        // console.log(currentSong.src.split("/").slice(-1)[0])
        // console.log(index)
        // console.log(songs)
        if(index == 0){
            index = songs.length - 1;
            const songNameArt = songs[index].replaceAll("%20", " ").replaceAll("%26", " & ").replaceAll(".mp3","").split("-");
            playMusic(songs[index], songNameArt[0], songNameArt[1], );
        }
        else{
            const songNameArt = songs[index-1].replaceAll("%20", " ").replaceAll("%26", " & ").replaceAll(".mp3","").split("-");
            playMusic(songs[index-1], songNameArt[0], songNameArt[1]);
        }
    })

    // Add an event listner to next button
    let next = document.getElementById("next")
    next.addEventListener("click", ()=>{
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        
        if(index + 1 == songs.length){
            const songNameArt = songs[0].replaceAll("%20", " ").replaceAll("%26", " & ").replaceAll(".mp3","").split("-");
            playMusic(songs[0], songNameArt[0], songNameArt[1]);
        }
        else{
            // console.log(songs[index])
            const songNameArt = songs[index+1].replaceAll("%20", " ").replaceAll("%26", " & ").replaceAll(".mp3","").split("-");
            playMusic(songs[index+1], songNameArt[0], songNameArt[1]);
        }
    })

    //adding an event listner to volume btn
    // document.querySelector(".volBtn").addEventListener("click", e=>{
    //     let rng = document.querySelector(".range")
    //     rng.classList.toggle("d-none")
    // })

    // adding an event listner to volume range 
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("input", (e)=>{
        // console.log(e.target.value)
        // console.log(currentSong.volume)

        // console.log("Setting volume to ", e.target.value, " out of 100")
        currentSong.volume = parseInt(e.target.value) / 100
    });

    

}
// playMusic = (mainSong, mainName, artistName)
main();


// console.log(x.offsetHeight)


// just a try section

// function fazool(){
//     let container = document.getElementsByClassName("cardContainer")[0];
//     for(let i = 0; i < 100; i++){
//         container.innerHTML += `<div class="card"><!--second card-->
//                         <img src="https://i.scdn.co/image/ab67706f00000002dec17246891b5b4eb97bdb0d" alt="">
//                         <h2>Chillout Lounge</h2>
//                         <p>Just lean back and enjoy relaxed beats.</p>
//                     </div>"`
//     }
// }

// fazool();