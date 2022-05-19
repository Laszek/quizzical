import React from "react"
import StartView from "./components/StartView"
import Quiz from "./components/Quiz"
import parseFromString from "./components/ParseFromString";

function App() {
    const [trivia, setTrivia] = React.useState([])
    const [game, setGame] = React.useState({
        isStart: false,
        isFinished: false,
        results: 0
    })
    
    React.useEffect(()=>{
        if(game.isStart && trivia.length === 0){
            fetch("https://opentdb.com/api.php?amount=5&category=12&difficulty=easy&type=multiple")
                .then(res => res.json())
                .then(questions => setTrivia(questions.results.map(el => ({
                    ...el,correct_answer: parseFromString(el.correct_answer), answers: randomizeAnswers([...el.incorrect_answers, el.correct_answer])
                }))));
        }
        document.querySelectorAll("input[type='radio']").forEach(el => game.isFinished ? el.disabled=true : el.disabled=false)
        
    }, [game])

    function randomizeAnswers (answersArr) {
        const newAnswersArr = []
        while(answersArr.length !== 0)
            newAnswersArr.push(parseFromString(answersArr.splice(Math.ceil(Math.random() * answersArr.length-1),1)))
        return newAnswersArr;
    }
    
    function checkAnswers(ans) {
        let points = 0
        ans.forEach((answer, index) =>{
            if(answer === trivia[index].correct_answer)
                points++
        })
        setGame(prevState => ({...prevState, results: points}))
    }
    
    function toggleFinish(){
        setGame(prevState => ({...prevState, isFinished: !prevState.isFinished}))
    }
    function toggleStart(){
        setGame(prevState => ({...prevState, isStart: !game.isStart}))
    }
    
    function playAgain() {
        setTrivia([])
        toggleFinish()
    }
    
  return (
    <main className="main">
        <img className="bg--blob1" src="./images/blob1.png" />
        <img className="bg--blob2" src="./images/blob2.png" />
        {!game.isStart && <StartView onClick={toggleStart} />}
        {game.isStart && <Quiz 
                questions={trivia}
                game={game} 
                sendAnswers={(ans) => checkAnswers(ans)} 
                finish={()=>toggleFinish()} 
        />}
        {game.isFinished && <div className="results--container"><p className="results">You scored {game.results}/5 correct answers</p><button className="submit-btn" onClick={playAgain}>Play Again</button></div>}
    </main>
  )
}

export default App;
