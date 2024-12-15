

let main = async()=>{
    let a = await fetch(`https://raw.githubusercontent.com/SaeedHaider789/SoundStream/main/songs/`);
    song = await a.text()
    console.log(song)
}

main()