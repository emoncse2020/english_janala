const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const loadLevelWord = (id) => {
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((json) => displayLevelWords(json.data));
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
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
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
    <button onclick='loadLevelWord(${lesson.level_no})' class="btn btn-outline btn-primary"
                  ><i class="fa-solid fa-book-open-reader"></i> Lesson -${lesson.level_no}
                  </button >
  `;
    // 4 append into container
    levelContainer.append(btnDiv);
  }
};

loadLessons();
