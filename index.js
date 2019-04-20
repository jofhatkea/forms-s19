get();
let state = "add";
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
function put(id, newAlbum) {
  fetch("https://music-2ccc.restdb.io/rest/albums/" + id, {
    method: "put",
    body: JSON.stringify(newAlbum),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7ce841cac6621685acbaa8",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      state = "add";
      form.elements.submit.disabled = false;
      //console.log(data);
      const article = document.querySelector(`article[data-id="${data._id}"]`);
      article.querySelector("h1").textContent = data.artist;
      article.querySelector("h2").textContent = data.title;
    });
}
window.put = put;
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
  clone.querySelector("h2").textContent = album.title;
  clone.querySelector("article").dataset.id = album._id;
  clone.querySelector("button.delete").addEventListener("click", e => {
    e.target.parentElement.remove();
    deleteAlbum(album._id);
  });
  clone.querySelector("button.edit").addEventListener("click", e => {
    fetch("https://music-2ccc.restdb.io/rest/albums/" + album._id, {
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "5c7ce841cac6621685acbaa8",
        "cache-control": "no-cache"
      }
    })
      .then(res => res.json())
      .then(data => {
        state = "edit";
        form.elements.artist.value = data.artist;
        form.elements.title.value = data.title;
        form.elements.id.value = data._id;
      });
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
  if (state === "add") {
    post(payload);
  } else if (state === "edit") {
    put(form.elements.id.value, payload);
  }
});
