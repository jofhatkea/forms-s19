get();
function post(newAlbum) {
  fetch("https://music-2ccc.restdb.io/rest/albums", {
    method: "post",
    body: JSON.stringify(newAlbum),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7ce841cac6621685acbaa8",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      form.elements.submit.disabled = false;
      showAlbum(data);
    });
}

function get() {
  fetch("https://music-2ccc.restdb.io/rest/albums?metafields=true", {
    method: "get",

    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7ce841cac6621685acbaa8",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      data.forEach(showAlbum);
    });
}
function showAlbum(album) {
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);
  clone.querySelector("h1").textContent = album.artist;
  clone.querySelector("h2").textContent = album.album;
  clone.querySelector("article").dataset.id = album._id;
  clone.querySelector("button").addEventListener("click", e => {
    e.target.parentElement.remove();
    deleteAlbum(album._id);
  });

  document.querySelector("main").appendChild(clone);
}

function deleteAlbum(id) {
  fetch("https://music-2ccc.restdb.io/rest/albums/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7ce841cac6621685acbaa8",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
}

const form = document.querySelector("form");
form.addEventListener("submit", e => {
  form.elements.submit.disabled = true;
  e.preventDefault();
  console.log("submitted");
  const payload = {
    artist: form.elements.artist.value,
    title: form.elements.title.value
  };

  post(payload);
});
