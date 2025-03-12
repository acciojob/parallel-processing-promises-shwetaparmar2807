const output = document.getElementById("output");
      const errorDiv = document.getElementById("error");
      const loading = document.getElementById("loading");
      const btn = document.getElementById("download-images-button");

      const images = [
        { url: "https://picsum.photos/id/237/200/300" },
        { url: "https://picsum.photos/id/238/200/300" },
        { url: "https://picsum.photos/id/239/200/300" },
      ];

      function downloadImage(url) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(img);
          img.onerror = () => reject(`Failed to load image from ${url}`);
        });
      }

      function downloadImages() {
        loading.style.display = "block";
        errorDiv.textContent = "";
        output.innerHTML = "";

        const promises = images.map((img) => downloadImage(img.url));

        Promise.all(promises)
          .then((imgs) => {
            imgs.forEach((img) => output.appendChild(img));
          })
          .catch((err) => {
            errorDiv.textContent = err;
          })
          .finally(() => {
            loading.style.display = "none";
          });
      }

      btn.addEventListener("click", downloadImages);
