function openTopic(file, title) {
  localStorage.setItem("file", file);
  localStorage.setItem("title", title);
  window.location = "lectures.html";
}

async function loadLectures() {
  const file = localStorage.getItem("file");
  const title = localStorage.getItem("title");

  document.getElementById("topicTitle").innerText = title + " Lectures";

  const res = await fetch(file);
  const text = await res.text();

  const links = text.split("\n").filter(l => l.startsWith("http"));
  const container = document.getElementById("lectureList");

  links.forEach((link, i) => {
    const btn = document.createElement("button");
    btn.innerText = "Lecture " + (i + 1);
    btn.onclick = () => {
      localStorage.setItem("video", link);
      localStorage.setItem("lectureTitle", "Lecture " + (i + 1));
      window.location = "player.html";
    };
    container.appendChild(btn);
  });
}

if (document.getElementById("lectureList")) loadLectures();

if (document.getElementById("video")) {
  const video = document.getElementById("video");
  const src = localStorage.getItem("video");
  document.getElementById("lectureTitle").innerText = localStorage.getItem("lectureTitle");

  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(src);
    hls.attachMedia(video);
  } else {
    video.src = src;
  }
}
