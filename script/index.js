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
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div
          class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-2"
        >
          <h2 class="font-bold text-xl">${word.word}</h2>
          <p class="font-semibold">${word.meaning} / ${word.pronunciation}</p>
          <div class="text-2xl font-medium font-bangla">agrhi be iger</div>
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
