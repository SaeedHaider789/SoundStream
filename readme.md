SoundStream
🎵 SoundStream is a frontend music library project that allows users to browse and play songs through an intuitive web interface.

🧰 Features
🎧 Play, pause, skip, and navigate through a playlist of songs

🔍 Search functionality to find songs quickly

🎚️ Volume control and mute/unmute options

📱 Responsive design suitable for desktop and mobile devices

🎨 Clean and modern UI built with HTML, CSS, and JavaScript

📁 Project Structure
graphql
Copy
Edit
SoundStream/
├── index.html             # Main HTML file
├── style.css              # Core styling
├── utility.css            # Utility classes for layout and spacing
├── script.js              # Main JavaScript logic
├── new.js                 # Additional JS functionality
├── nextOrPrev.js          # Handles next/previous song navigation
├── oldScript.js           # Legacy script (for reference)
├── songs/                 # Directory containing audio files
├── icons/                 # SVG and PNG assets (play, pause, volume, etc.)
│   ├── play.svg
│   ├── pause.svg
│   ├── nextsong.svg
│   ├── prevsong.svg
│   ├── volume.svg
│   ├── mute.svg
│   ├── download.png
│   ├── favicon.png
│   └── logo.svg
🚀 Getting Started
Clone the repository:

bash
Copy
Edit
git clone https://github.com/SaeedHaider789/SoundStream.git
Navigate to the project directory:

bash
Copy
Edit
cd SoundStream
Open index.html in your preferred web browser:

You can double-click the index.html file or use a local development server.

bash
Copy
Edit
# Using Python's simple HTTP server
python -m http.server
Then, navigate to http://localhost:8000 in your browser.

🛠️ Technologies Used
HTML5 – Structure of the web pages

CSS3 – Styling and layout

JavaScript (ES6) – Interactivity and dynamic content

📌 Notes
Ensure that the songs/ directory contains audio files in supported formats (e.g., .mp3, .wav) for playback.

The icons/ directory should contain all necessary SVG and PNG assets for the UI controls.

📄 License
This project is licensed under the MIT License.

