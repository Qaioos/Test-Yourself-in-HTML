// Select Eleent
let countSpan = document.querySelector(".quiz-info .count");
let spansBullets = document.querySelector(".bullets .spans");
let answers_area = document.querySelector(".answers-area");
let quiz_area = document.querySelector(".quiz-area");
let submit = document.querySelector(".submit");
let results = document.querySelector(".result");
let restart = document.querySelector(".restart");
let seconds = document.querySelector(".seconds");

restart.style.display = "none";
let coutindex = 0;
let rightAswer = 0;

async function getQuestions() {
  try {
    const response = await fetch("./josen/HtmlQustion.json");
    if (!response.ok) {
      throw new Error(`Faild in respone ${response.status}`);
    }
    const Data = await response.json();
    let Qslength = Data.length;
    // Set The Number Qs
    createBullets(Qslength);
    // Add Qs Data
    addQsData(Data[coutindex], Qslength);

    /* contdwon(Qslength) */
    contdwon(Qslength)
    // Click On Submit
    submit.addEventListener("click", function () {


      setTimeout(() => {
        quiz_area.innerHTML = "";
        answers_area.innerHTML = "";
      }, 10);
      let theRightAs = Data[coutindex].right_answer;
      coutindex++;

      CheackAs(theRightAs, Qslength);

      setTimeout(() => {
        addQsData(Data[coutindex], Qslength);
      }, 10);

      handelBullits();

      showresult(Qslength);
      seconds.textContent = 10;
    });


    
  } catch (error) {
    console.log(error);
  }
}

getQuestions();

function createBullets(num) {
  countSpan.firstElementChild.textContent = num;

  // Creat the Spans Bullets
  for (let i = 0; i < num; i++) {
    let theBullets = document.createElement("span");
    // Check first span
    if (i === 0) {
      theBullets.className = "on";
    }
    spansBullets.appendChild(theBullets);
  }
}

function addQsData(obj, count) {
  if (coutindex < count) {
    //creat the answres
    let quizTitle = document.createElement("h2");
    quizTitle.textContent = obj.title;
    quiz_area.appendChild(quizTitle);

    for (let i = 1; i <= 4; i++) {
      let answers = document.createElement("div");
      answers.className = "answer";

      //Creat the Radio
      let input = document.createElement("input");
      input.name = "qs";
      input.type = "radio";
      input.id = `answer_${i}`;
      input.dataset.answers = obj[`answer_${i}`];

      if (input.id === `answer_${1}`) {
        input.checked = true;
      }

      // Creat the Label
      let label = document.createElement("label");

      label.htmlFor = `answer_${i}`;
      label.textContent = obj[`answer_${i}`];

      // Append
      answers.appendChild(input);
      answers.appendChild(label);
      answers_area.appendChild(answers);
    }
  }
}

function CheackAs(rAnswer, num) {
  let input = document.querySelectorAll("input");
  let label = document.querySelectorAll("label");

  input.forEach((e) => {
    if (e.checked) {
      label.forEach((el) => {
        let ans = el.htmlFor == e.id ? el.textContent : "no";
        if (ans == rAnswer) {
          console.log(rAnswer);
          rightAswer++;
          console.log(rightAswer);
        }
      });
    }
  });
}

function handelBullits() {
  let buttils = document.querySelectorAll(".spans span");
  let arryspans = Array.from(buttils);
  arryspans.forEach((span, index) => {
    if (coutindex === index) {
      span.className = "on";
    }
  });
}

function showresult(count) {
  let theresult;
  if (coutindex === count) {
    quiz_area.remove();
    answers_area.remove();
    submit.remove();
    spansBullets.parentElement.remove();

    if (rightAswer > count / 2 && rightAswer < count) {
      theresult = `<span class="good ">good</span> ,${rightAswer} From ${count}`;
    } else if (rightAswer === count) {
      theresult = `<span class="perfect ">perfect</span> ,${rightAswer} From ${count} All answrs is Good`;
    } else {
      theresult = `<span class="bad ">bad</span> ,${rightAswer} From ${count}`;
    }
    restart.style.display = "block";
    results.innerHTML = theresult;
    restart.addEventListener("click", function () {
      window.location.reload();
    });
  }
}


function contdwon(Qslength) {
    if (coutindex < Qslength) {
        let one = setInterval(() => {
            seconds.textContent--
            if(+seconds.textContent  === 0){
                clearInterval(one)
                submit.click()
                contdwon(Qslength)
            }
        }, 1000);
    }

}