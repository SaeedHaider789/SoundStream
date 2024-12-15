console.log("lets write javascript")
let currentSong = new Audio;
currentSong.volume = 50/100;
let currFolder;
let folderName;

const albums = [{  // list of info of existing albums
        "name": "Glory",
        "artist": "Honey Singh",
        "Description": "Honey Singh new album.",
        "src": "songs/Glory",
        "folder": "Glory"
    },
    {
        "name": "Hard Drive Vol2",
        "artist": "Raftaar",
        "Description": "Raftaar new album.",
        "src": "songs/Hard_Drive_Vol2",
        "folder": "Hard_Drive_Vol2"
    },
    {
        "name": "Shikwa",
        "artist": "Talha Yunus",
        "Description": "Talha Yunus new album.",
        "src": "songs/Shikwa",
        "folder": "Shikwa"
    },
    {
        "name": "Rebirth",
        "artist": "Young Stunners",
        "Description": "Young Stunners new album.",
        "src": "songs/Rebirth",
        "folder": "Rebirth"
    },
    {
        "name": "My Terrible Mind",
        "artist": "Talha Anjum",
        "Description": "Talha Anjum new album.",
        "src": "songs/My_Terrible_Mind",
        "folder": "My_Terrible_Mind"
    }

];  // list containing info of albums

// the below given arrays are a part of object songList
const songList = {}
songList.Glory = ["Bonita - Honey Singh.mp3", "Lapata - Honey Singh.mp3", "Millionaire - Honey Singh.mp3",
    "Payal - Honey Singh.mp3"];  // contains all songs of Glory

songList.Hard_Drive_Vol2 = ["BAAWE - Raftaar.mp3", "Morni - Raftaar.mp3", "REAL SHIT - Raftaar.mp3", "Woh Raat - Raftaar.mp3"];  // contains all songs of Hard_Drive_Vol2

songList.My_Terrible_Mind = ["BTDT - Talha Anjum.mp3", "Heartbreak Kid - Talha Anjum.mp3", "Plug Shaart - Talha Anjum.mp3", "Shots Fired - Talha Anjum.mp3"]; // contains all songs of myTerribleMind

songList.Rebirth = ["Aazma Le - Young Stunners.mp3", "Afsanay - Young Stunners.mp3", "Dont Mind - Young Stunners.mp3", "WOH BANDA NAI - Young Stunners.mp3"]; // contains all songs of Rebirth 

songList.Shikwa = ["Dekh Le - Talhah Yunus.mp3", "Don't Care - Talhah Yunus.mp3", "Haseen - Talhah Yunus.mp3", "Shikwa - Talhah Yunus.mp3"];// contains all the songs of Shikwa
// songlist finishes here

let playMusic = (path, mainName, artistName)=>{// plays the music
    console.log(path)
    currentSong.src = path;
    currentSong.play();
    let play = document.getElementById("play");
    play.src = "pause.svg"    

    document.querySelector(".songinfo").innerHTML = mainName + artistName; // mainName is only song's name
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

function formatTime(seconds) {  // convert seconds into minutes
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const minutesString = minutes < 10 ? `0${minutes}` : minutes;
    const secondsString = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${minutesString}:${secondsString}`;
}

let getSongs = () => {  // it will get all the songs of the current album
    // Show all the songs in ul section of library
    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUl.innerHTML = "";
    // console.log(songUl)
    
    for(i of currFolder){  // iterates over the songs of current folder
        // console.log(i)
        let songNameArt = i.split("-");
        songUl.innerHTML = songUl.innerHTML + `
                        <li data-folder="songs/${folderName}/${i}">
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${songNameArt[0]}</div>
                                <div class="artist">${songNameArt[1].replaceAll(".mp3", "")}</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div>
                        </li>`;
    }

    // Attach an event listner to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element=>{
            let mainName = e.querySelector(".info").firstElementChild.innerHTML;
            let artistName = " - "+ e.querySelector(".artist").innerHTML;
            // console.log(artistName)
            
            // console.log(element.currentTarget.dataset.folder)
            playMusic(element.currentTarget.dataset.folder, mainName, artistName);
        })
    })
}

let displayAlbums = () =>{ // display all the current albums
    let cardContainer = document.querySelector(".cardContainer")
    // console.log(cardContainer)
    // currentSong.src = `${albums[0].src}/Lapata - Honey Singh.mp3`
    // console.log(currentSong)
    for(i of albums){
        // console.log(i.name)
        cardContainer.innerHTML = `<div data-folder="${i.folder}" class="card">
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
            <img src="songs/${i.folder}/cover.jpg" style="height: 150px" alt="">
            <h2>${i.name}</h2>
            <p>${i.Description}</p>
        </div>` + cardContainer.innerHTML;
    }  // creates the card of every album

    Array.from(document.getElementsByClassName("card")).forEach(e=>{//it will add functionality to the cards
        e.addEventListener("click", ev=>{  // in production
            // console.log(ev.currentTarget)
            folderName = ev.currentTarget.dataset.folder;
            console.log(folderName)
            currFolder = songList[folderName]
            console.log(currFolder)
            getSongs();
        })
    })

}

let main = () =>{

    // code picked up from stackoverflow to avoid the bottom bar covering the screen
    var x = document.getElementsByClassName("fixed-bottom-bar")[0];
    document.getElementById("forged-fixed-bottom-bar").style.height = "" + x.offsetHeight - 10 + "px";
    // code from stack overflow finishes here

    // main code for songs starts from here
    currentSong.src = ""
    currFolder = songList.Glory;  // it keeps the current selected folder
    folderName = "Glory";
    currentSong.src = `songs/${folderName}/Bonita - Honey Singh.mp3`

    // displays first song in the seekbar
    let songArt = songList.Glory[0].replaceAll(".mp3", "").split("-");
    document.querySelector(".songinfo").innerHTML = songArt[0] + " - " + songArt[1]
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
    // console.log(songArt[0], songArt[1])

    displayAlbums();  // it display all the albums
    getSongs(); // displays all the songs in the library

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
        // console.log("Hello")
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
        
        let index = currFolder.indexOf(currentSong.src.replaceAll("%20", " ").split("/").slice(-1)[0])
        
        if(index == 0){
            index = currFolder.length - 1;
            const songNameArt = currFolder[index].replaceAll(".mp3", "").split("-");
            playMusic(`songs/${folderName}/${currFolder[index]}`, songNameArt[0], songNameArt[1]);
            // console.log(currFolder[index])
        }
        else{
            const songNameArt = currFolder[index-1].replaceAll(".mp3", "").split("-");
            playMusic(`songs/${folderName}/${currFolder[index-1]}`, songNameArt[0], songNameArt[1]);
            // console.log(currFolder[index])
        }
    })

    //Add an event listner to next button
    let next = document.getElementById("next")  // still in production
    next.addEventListener("click", ()=>{
        let index = currFolder.indexOf(currentSong.src.replaceAll("%20", " ").split("/").slice(-1)[0])
        
        if(index + 1 == currFolder.length){
            const songNameArt = currFolder[0].replaceAll(".mp3", "").split("-");
            playMusic(`songs/${folderName}/${currFolder[0]}`, songNameArt[0], songNameArt[1]);
        }
        else{
            // console.log(songs[index])
            const songNameArt = currFolder[index+1].replaceAll(".mp3", "").split("-");
            playMusic(`songs/${folderName}/${currFolder[index+1]}`, songNameArt[0], songNameArt[1]);
        }
    })

    // adding an event listner to volume range 
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("input", (e)=>{
        // console.log(e.target.value)
        // console.log(currentSong.volume)

        // console.log("Setting volume to ", e.target.value, " out of 100")
        currentSong.volume = parseInt(e.target.value) / 100
    });
    
}

main();