import React from "react"
import parseFromString from "./ParseFromString";

function Quiz (props) {
    
    function handleSubmit(event){
        event.preventDefault()
        
        const formElements = document.querySelectorAll("[name*='question']")
        const answers = Array.from(formElements).filter(el => el.checked ).map(el => el.value)
        
        if(answers.length < 5){
            console.log("Every question have to be answered")
        }
        else {
            props.sendAnswers(answers)
            props.finish()
        }
    }
    
    const questionElements = props.questions.map((question, questIndex) => {
        const answers = question.answers
        console.log(question.correct_answer)
        const answerElements = answers.map((answer,ansIndex) => {
            return (
                <div className="answer">
                    <input
                        type="radio"
                        id={`question${questIndex}_${ansIndex}`}
                        name={`question${questIndex}`}
                        value={`${answer}`}
                        className={
                            props.game.isFinished 
                                ? answer === question.correct_answer ? "correct" : "wrong" 
                                : "radio"
                        }
                    />
                    <label htmlFor={`question${questIndex}_${ansIndex}`}>
                        {answer}
                    </label>
                </div>
            )})
        return (
            <fieldset className="question">
                <legend className="question--title">{parseFromString(question.question)}</legend>
                <div className="answers">
                    {answerElements}
                </div>
            </fieldset>
        )
    })
    
    return (
        <form className="quiz--container" onSubmit={handleSubmit}>
            {questionElements}
            {!props.game.isFinished && <button className="submit-btn">Check Answers</button>}
        </form>
    )
}

export default Quiz;