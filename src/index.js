// fetch("http://127.0.0.1:3000/api/v1/users")
// .then(res => res.json())
// .then(res => displayUsers(res))

window.addEventListener("DOMContentLoaded", (e) => {
  const login = document.getElementById("name");
  let arr;
  let user;
  let score = 0;

  fetch("http://127.0.0.1:3000/api/v1/users")
    .then(res => res.json())
    .then(res => {
      arr = res;
    })

  login.addEventListener("submit", (event) => {
    event.preventDefault();
    let nameInput = document.getElementById("name_input").value;
    user = arr.find(user => nameInput == user.name);

    if (user) {
      console.log(user);
    } else {
      fetch(`http://127.0.0.1:3000/api/v1/users`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: nameInput })
      }).then( () =>
        fetch("http://127.0.0.1:3000/api/v1/users")
          .then(res => res.json())
          .then(res => {
            user = res[res.length - 1];
          })
      );
    }
    displayInstructions();
  });

  function displayInstructions() {
    let title = document.getElementById("title");
    let instructions = document.getElementById("instructions");
    let butt = document.createElement("button");
    
    butt.id = "button";
    butt.innerHTML = "Next";
    login.remove();
    title.innerHTML = "Instructions:";
    instructions.innerHTML =
      "You will have 10 seconds of a movie clip played. <br> Your job is to click the answer of the movie title.  <br> Your score will be tallied up at the end.<br><br><br>";
    instructions.appendChild(butt);

    butt.addEventListener("click", (e) => {
      e.preventDefault();
      displayMovies();
      console.log(user);
    });
  }
    let videos;
    fetch("http://127.0.0.1:3000/api/v1/videos")
    .then(res => res.json())
    .then(res => {
        videos = res;
        console.log(videos)
    })

    function displayMovies() {
        let body = document.getElementById("cool")
        let title = document.getElementById("title")
        let instructions = document.getElementById("instructions")
        let div = document.createElement("DIV")
        let div2 = document.createElement("DIV")
        let div3 = document.createElement("DIV")

        body.removeChild(title)
        body.removeChild(instructions)
        body.appendChild(div)
        div.appendChild(div3)
        div.appendChild(div2)


        let vid = videos[Math.floor ( Math.random() * videos.length )]
        let ans = vid.answers
        let correct = ans.find(element => element.correct == 1)
        let v1 = `<iframe id="vid" width="560" height="315" src= '${vid.url}&autoplay=1' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br><br>`
        
        div3.innerHTML = v1

        for (i=0;i<ans.length; i++) {
            let but = document.createElement("BUTTON")
            div2.appendChild(but)
            but.innerHTML = ans[i].answer

            but.addEventListener("click", (e) => {
                e.preventDefault()
                if (but.innerHTML == correct.answer) {
                    score += 1
                }
                console.log(score)
            })
        }
    }
  
})


