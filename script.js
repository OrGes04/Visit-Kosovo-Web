const content = document.querySelector(".adventure-content");
const adventureTitle = document.querySelector("#adventureTitle");
const adventurePara = document.querySelector(".adventurePara");
const lines = document.querySelectorAll(".line");
const allCards = document.querySelector("#allCards");
const discoverContent = document.querySelector("#discoverContent");
const mapBtn = document.querySelector("#mapBtn");
const galleryBtn = document.querySelector(".gallery-btn");
const videoBtn = document.querySelector(".video-btn");
const testimonialContent = document.querySelector(".testimonial-content");
const testBtnLeft = document.querySelector("#testBtnLeft");
const testBtnRight = document.querySelector("#testBtnRight");
const questions = document.querySelectorAll(".question-container");
const backtoTopBtn = document.querySelector("#backToTop");

let currentTestimonial = 0;

changeContent(0);
function changeContent(index) {
  content.innerHTML = `
    <div class="adventure-info">
        <div>
            <h1>${adventureData[index].title}</h1>
            <span class="material-icons" id="arrow">arrow_outward</span>
        </div>
        <div>
            <p class="adventurePara">${adventureData[index].paragraph}</p>
        </div>
    </div>
    <img src="img/${adventureData[index].img}" alt="">
    `;

  const arrow = document.querySelector("#arrow");
  if (arrow) {
    arrow.addEventListener("click", () => {
      const adventureInfo = document.querySelector(".adventure-info");
      const adventurePara = document.querySelector(".adventurePara");
      adventureInfo.classList.toggle("activeInfo");
      adventurePara.classList.toggle("activePara");
      arrow.classList.toggle("active-arrow");
    });
  }
}

lines.forEach((line, index) => {
  line.addEventListener("click", () => {
    lines.forEach((l) => {
      l.style.width = "30px";
      l.style.background = "#e0e0e0";
    });

    line.style.width = "60px";
    line.style.background = "#F0801F";

    changeContent(index);
  });
});
//////////////

loadCard(0);
function loadCard(d) {
  currentContent = d;
  let card = destination[d].content;

  for (let i = 0; i < card.length; i++) {
    allCards.innerHTML += `
            <div class="card-content">
                    <div class="card-details">
                        <span class="material-icons" id="detail-arrow">chevron_right</span>
                        <div class="details-right">
                            <div class="divide"></div>
                            <span title="Save" class="material-icons">favorite</span><span title="Show map" class="material-icons map-icon">map</span>
                        </div>
                        <div class="map-container">
                        ${card[i].map}
                            <a target="_blank" href="${card[i].link}"><button>View map</button></a>
                        </div>
                    </div>
                    <div class="card-ft">
                        <img src="img/${card[i].img}" alt="">
                    </div>
                    <div class="card-info">
                        <div>
                            <div class="card-title">
                                <h1>${card[i].title}</h1>
                                <div class="card-rating">
                                    <span class="material-icons">star</span>
                                    <p>${card[i].rate}</p>
                                </div>
                            </div>
                            <div class="card-location">
                                <span class="material-icons">location_on</span>
                                <p>${card[i].location}</p>
                            </div>
                        </div>
                        <div class="card-buttons">
                            <button class="price-btn">${card[i].price}</button class="main-btn">
                            <button class="second-btn">More details <span class="material-icons">chevron_right</span></button>
                        </div>
                    </div>
            </div>
        `;
  }

  showCardDetail();
  showMap();
}

function changeCategory() {
  allCards.innerHTML = "";

  const categoryButtons = document.querySelectorAll(".destination-btn");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) =>
        btn.classList.remove("active-destination-btn"),
      );
      button.classList.add("active-destination-btn");
    });
  });
}

function showCardDetail() {
  const cardArrows = document.querySelectorAll("#detail-arrow");
  cardArrows.forEach((cardArrow) => {
    cardArrow.addEventListener("click", () => {
      cardArrow.classList.toggle("active-detail-arrow");

      const mapContainer = cardArrow
        .closest(".card-content")
        .querySelector(".map-container");

      if (mapContainer.classList.contains("active-map")) {
        mapContainer.classList.remove("active-map");
      }

      const detailsRight = cardArrow
        .closest(".card-content")
        .querySelector(".details-right");
      detailsRight.classList.toggle("active-detail");
    });
  });
}

function showMap() {
  mapIcons = document.querySelectorAll(".map-icon");
  mapIcons.forEach((mapIcon) => {
    mapIcon.addEventListener("click", () => {
      const mapContainer = mapIcon
        .closest(".card-content")
        .querySelector(".map-container");
      mapContainer.classList.toggle("active-map");
    });
  });
}
//////////////

const chooseSection = document.querySelector("#chooseContent");

loadChoose(0);
function loadChoose(choose) {
  let chooseContent = chooseData[choose];

  chooseSection.innerHTML += `
            <div class="choose-img">
                <img src="img/${chooseContent.img}" alt="">
            </div>
            <div class="choose-box chooseBox1">
                <span class="material-icons">${chooseContent.orangeIcon}</span>
                <h1>${chooseContent.orangeText}</h1>
            </div>
            <div class="choose-box chooseBox2">
                <span class="material-icons">${chooseContent.pinkIcon}</span>
                <h1>${chooseContent.pinkText}</h1>
            </div>
            <div class="choose-text">
                <div class="choose-text-title">
                    <div>
                        <span class="material-icons">${chooseContent.icon}</span>
                    </div>
                    <h1>${chooseContent.title}</h1>
                </div>
                <p>${chooseContent.text}</p>
            </div>
        `;
}

function changeChoose() {
  chooseSection.innerHTML = "";

  const chooseButtons = document.querySelectorAll(".choose-category");
  chooseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      chooseButtons.forEach((btn) => btn.classList.remove("active-category"));
      button.classList.add("active-category");
    });
  });
}
////////////////

mapBtn.addEventListener("click", mapContent);

mapContent();
function mapContent() {
  discoverContent.innerHTML = "";
  discoverContent.innerHTML += `
        <div class="map-content">
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d752305.7275420006!2d20.242741413818546!3d42.561784785153236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13537af354bf7df1%3A0xbfffeedfabc31791!2sKosovo!5e0!3m2!1sen!2s!4v1743252586230!5m2!1sen!2s"
            width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    `;

  mapBtn.innerHTML = `<span class="material-icons">map</span> Map`;
  mapBtn.classList.add("discover-btn-active");
  galleryBtn.innerHTML = `<span class="material-icons">photo</span>`;
  galleryBtn.classList.remove("discover-btn-active");
  videoBtn.innerHTML = `<span class="material-icons">smart_display</span>`;
  videoBtn.classList.remove("discover-btn-active");
}

galleryBtn.addEventListener("click", () => galleryContent());

let currentGalleryIndex = 0;
function galleryContent(imageIndex = 0) {
  currentGalleryIndex = imageIndex;
  let gallery = galleryData[imageIndex];

  discoverContent.innerHTML = "";
  discoverContent.innerHTML += `
                <div class="gallery-sec">
                    <div class="gallery-content">
                        <div class="gallery-container gll-1">
                            <img src="img/${gallery.img1}" alt="">
                        </div>
                        <div class="gallery-container gll-2">
                            <img src="img/${gallery.img2}" alt="">
                        </div>
                        <div class="gallery-container gll-3">
                            <img src="img/${gallery.img3}" alt="">
                        </div>
                        <div class="gallery-container gll-4">
                            <img src="img/${gallery.img4}" alt="">
                        </div>
                        <div class="gallery-container gll-5">
                            <img src="img/${gallery.img5}" alt="">
                        </div>
                    </div>
                </div>
                <div class="change-circles">
                    <div class="circle active-circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                </div>
            </div>
    `;
  const circles = document.querySelectorAll(".circle");

  circles.forEach((circle, index) => {
    circle.addEventListener("click", () => {
      circles.forEach((c) => c.classList.remove("active-circle"));
      circle.classList.add("active-circle");
      galleryContent(index);
    });
  });

  galleryBtn.innerHTML = `<span class="material-icons">photo</span> Gallery`;
  galleryBtn.classList.add("discover-btn-active");
  mapBtn.innerHTML = `<span class="material-icons">map</span>`;
  mapBtn.classList.remove("discover-btn-active");
  videoBtn.innerHTML = `<span class="material-icons">smart_display</span>`;
  videoBtn.classList.remove("discover-btn-active");
}

videoBtn.addEventListener("click", videoContent);

function videoContent() {
  videoBtn.innerHTML = `<span class="material-icons">smart_display</span> Video`;
  videoBtn.classList.add("discover-btn-active");

  discoverContent.innerHTML = "";
  discoverContent.innerHTML += `
        <div class="video-content">
            <iframe width="560" height="315"src="https://www.youtube.com/embed/oqYk7m87fEw?si=1KOEDcTRWzjnMgjI" title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>
        </div>
    `;

  mapBtn.innerHTML = `<span class="material-icons">map</span>`;
  mapBtn.classList.remove("discover-btn-active");
  galleryBtn.innerHTML = `<span class="material-icons">photo</span>`;
  galleryBtn.classList.remove("discover-btn-active");
}
//////////////

loadTestimonial(0);
function loadTestimonial(t) {
  let testimonial = testimonialsData[t].content;

  for (let i = 0; i < testimonial.length; i++) {
    testimonialContent.innerHTML += `
                        <div class="testimonial-card">
                    <div class="testimonial-main">
                        <div class="testimonial-info">
                            <div class="testimonial-pfp">
                                <img src="img/${testimonial[i].profile}" alt="">
                            </div>
                            <div>
                                <h1>${testimonial[i].name}</h1>
                                <div class="testimonial-country">
                                    <img class="flag" src="img/${testimonial[i].flag}" alt="">
                                    <p>${testimonial[i].country}</p>
                                </div>
                            </div>
                        </div>
                        <div class="testimonial-stars">
                            ${testimonial[i].rating}
                        </div>
                    </div>
                    <p class="testimonial-text">
                        ${testimonial[i].text}
                    </p>
                </div>
        `;
  }
}

function updateButtons() {
  if (currentTestimonial > 0) {
    testBtnLeft.classList.add("test-btn-active");
  } else {
    testBtnLeft.classList.remove("test-btn-active");
  }

  if (currentTestimonial >= testimonialsData.length - 1) {
    testBtnRight.classList.remove("test-btn-active");
  } else {
    testBtnRight.classList.add("test-btn-active");
  }
}

testBtnLeft.addEventListener("click", () => {
  testimonialContent.innerHTML = "";
  if (currentTestimonial > 0) {
    currentTestimonial--;
  }
  loadTestimonial(currentTestimonial);
  updateButtons();
});

testBtnRight.addEventListener("click", () => {
  testimonialContent.innerHTML = "";
  if (currentTestimonial < testimonialsData.length - 1) {
    currentTestimonial++;
  }
  loadTestimonial(currentTestimonial);
  updateButtons();
});
//////////////

questions.forEach((question) => {
  const extendBtn = question.querySelector(".extend-btn");
  const answer = question.querySelector(".answer");
  const icon = extendBtn.querySelector("span");

  extendBtn.addEventListener("click", () => {
    answer.classList.toggle("active-answer");

    if (answer.classList.contains("active-answer")) {
      icon.textContent = "remove";
    } else {
      icon.textContent = "add";
    }

    if (answer.classList.contains("active-answer")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = 0;
    }
  });
});
//////////////

backtoTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
