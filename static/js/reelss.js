document.querySelectorAll('.question-card').forEach(question => {
  question.querySelectorAll('.optBtn').forEach(option => {
    option.addEventListener('click', function () {
      question.querySelectorAll('.optBtn').forEach(btn => btn.disabled = true);

      if (option.classList.contains("correct")) {
        option.classList.add("right");
      }
      else {
        option.classList.add("wrong");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll('.video');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      const video = entry.target;

      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.5 });
  videos.forEach(video => {
    observer.observe(video);
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll('.video');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.5 });


  videos.forEach(video => {
    observer.observe(video);
  });

  window.toggleMute = function (button) {
    const video = button.closest('.videoContainer').querySelector('.video');
    if (video.muted) {
      video.muted = false;
      button.innerHTML = '<i class="bx bx-volume"></i>'; // 
    } else {
      video.muted = true;
      button.innerHTML = '<i class="bx bx-volume-mute"></i>';
    }
  };


  window.togglePlayPause = function (button) {
    const video = button.closest('.videoContainer').querySelector('.video');
    if (video.paused) {
      video.play();
      button.innerHTML = '<i class="bx bx-pause"></i>';
    } else {
      video.pause();
      button.innerHTML = '<i class="bx bx-play"></i>';
    }
  };
});
