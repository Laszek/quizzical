function StartView(props){
    
    return (
        <section className="start-view">
            <h1 className="title">Quizzical</h1>
            <p className="description" >Test yourself in music quiz!</p>
            <button className="start--btn" onClick={props.onClick}>Start quiz</button>
        </section>
    )
}

export default StartView