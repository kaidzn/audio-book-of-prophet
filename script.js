document.querySelectorAll('.p_name').forEach(paragraph => {
    paragraph.addEventListener('click', function() {
      const audioPlayer = this.nextElementSibling.nextElementSibling; // Target the custom audio player
      const audio = this.nextElementSibling; // Target the audio element
      const playPauseBtn = audioPlayer.querySelector('#playPauseBtn');
      const playIcon = audioPlayer.querySelector('#playIcon');
      const pauseIcon = audioPlayer.querySelector('#pauseIcon');
      const seekBar = audioPlayer.querySelector('#seekBar');
      const timeDisplay = audioPlayer.querySelector('#timeDisplay');
      const speedBtn = audioPlayer.querySelector('#speedBtn');
      
      const isVisible = audioPlayer.classList.contains('show');
  
      // Close all other audio players when a new one is clicked
      document.querySelectorAll('.custom-audio-player').forEach(player => {
        if (player !== audioPlayer) {
          player.classList.remove('show');
          player.previousElementSibling.pause();
          player.querySelector('#playIcon').style.display = 'inline';
          player.querySelector('#pauseIcon').style.display = 'none';
        }
      });
  
      // Toggle the class to show/hide the current audio player
      if (!isVisible) {
        audioPlayer.classList.add('show');
        audio.play(); // Automatically play the audio
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
      } else {
        audioPlayer.classList.remove('show');
        audio.pause(); // Pause audio when clicked again
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
      }
      
      // Sync the play/pause button state with audio
      playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
          audio.play();
          playIcon.style.display = 'none';
          pauseIcon.style.display = 'inline';
        } else {
          audio.pause();
          playIcon.style.display = 'inline';
          pauseIcon.style.display = 'none';
        }
      });
  
      // Update seek bar and time display
      audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        seekBar.value = (currentTime / duration) * 100;
        timeDisplay.innerHTML = formatTime(currentTime);
      });
  
      // Seek functionality
      seekBar.addEventListener('input', (e) => {
        const seekTo = audio.duration * (e.target.value / 100);
        audio.currentTime = seekTo;
      });
  
      // Speed control button
      let playbackSpeeds = [1, 1.5, 2];
      let speedIndex = 0;
  
      speedBtn.addEventListener('click', () => {
        speedIndex = (speedIndex + 1) % playbackSpeeds.length;
        audio.playbackRate = playbackSpeeds[speedIndex];
        speedBtn.textContent = playbackSpeeds[speedIndex] + 'x';
      });
  
      // Format time display
      function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
      }
    });
  });
  