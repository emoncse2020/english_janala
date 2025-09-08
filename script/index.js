const createElements = (arr = []) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const handleSearch = async (e) => {
  e.preventDefault();
  removeActive();
  const formData = new FormData(e.target);
  const query = formData.get("query").trim().toLowerCase();

  const url = `https://openapi.programming-hero.com/api/words/all`;
  const res = await fetch(url);
  const query_details = await res.json();
  //   console.log(query_details.data);
  const allWords = query_details.data;
  const filterWords = allWords.filter((word) =>
    word.word.toLowerCase().includes(query)
  );
  displayLevelWords(filterWords);
};

const handleSpinner = (status) => {
  if (status == true) {
    document.getElementById("spineer").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spineer").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  handleSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((json) => {
      removeActive(); //remove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      //   console.log(clickBtn);
      clickBtn.classList.add("active");
      displayLevelWords(json.data);
      handleSpinner(false);
    });
};
const loadWordDetail = async (id) => {
  const URL = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(URL);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  const detailsBox = document.getElementById("details-con");

  detailsBox.innerHTML = `
    <div class="">
            <h2 class="text-2xl font-bold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${
    word.pronunciation
  })
            </h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Synonym</h2>
            <div class="">${createElements(word.synonyms)}</div>
            
          </div>
  `;
  document.getElementById("word_modal").showModal();
};

const displayLevelWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
     <div
          class="text-center font-bangla col-span-full rounded-xl py-10 space-y-6"
        >
        <img class="mx-auto" src="./assets/alert-error.png" />
          <p class="text-xl font-medium text-gray-300">
           এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান</h2>
        </div>
    `;
    handleSpinner(false);
    return;
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div
          class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-2"
        >
          <h2 class="font-bold text-xl">${
            word.word ? word.word : "শব্দ পাওয়া যাইনি "
          }</h2>
       
          <p class="font-semibold">meaning / pronunciation</p>
          <p class="font-semibold">${
            word.meaning ? word.meaning : "অর্থ পাওয়া যাইনি"
          } / ${
      word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যাইনি"
    }</p>
          <div class="flex justify-between items-center">
            <button onclick= "loadWordDetail(${
              word.id
            })"class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>
    `;

    wordContainer.append(card);
  });
};

const displayLesson = (lessons) => {
  // Get the container and empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  //  2 get into every lessons
  for (let lesson of lessons) {
    // console.log(lesson);
    // 3 create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onclick='loadLevelWord(${lesson.level_no})' class="btn btn-outline btn-primary lesson-btn"
                  ><i class="fa-solid fa-book-open-reader"></i> Lesson -${lesson.level_no}
                  </button >
  `;
    // 4 append into container
    levelContainer.append(btnDiv);
  }
  handleSpinner(false);
};

loadLessons();
