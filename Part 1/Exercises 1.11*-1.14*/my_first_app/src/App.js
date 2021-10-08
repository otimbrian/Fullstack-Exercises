import { useState } from "react"

const Message = ({text})=> <div><h1>{text}</h1></div>
const Button = ({action, text}) => <button onClick={action}>{text}</button>
const Infor = ({text, value}) => {
    if(text === 'Positive'){
        return(
            <tr>
                <td>{text}</td>
                <td>{value}%</td>
            </tr>
        )
    }
    return(
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) =>{
    if(good===0 & neutral===0 & bad===0){
        return(
            <div><h4>No Feedback Given</h4></div>
        )
    }
    return(
        <div>
            <table>
            <tbody>
                <Infor text='Good' value={good} />
                <Infor text='Neutral' value={neutral} />
                <Infor text ='Bad' value ={bad} />
                <Infor text='All' value={bad + neutral + good} />
                <Infor text='Average' value={((bad * -1) + good)/(bad + neutral + good)} />
                <Infor text='Positive' value={good /(bad + neutral + good) * 100} />
            </tbody>
            </table>
        </div>
    )
}


const App = (props) => {

    const [feedback, setFeedback] = useState({'good': 0, 'neutral': 0, 'bad': 0})
    const handleGood = () => setFeedback({...feedback, good: feedback.good + 1})
    const handleNeutral = () => setFeedback({...feedback, neutral: feedback.neutral + 1})
    const handleBad = () => setFeedback({...feedback, bad: feedback.bad + 1})
    
    return(
    <div>
        <div>
            <Message text ='Give Freedback' />
        </div>
        <div>
            <Button action={handleGood} text='Good' />
            <Button action={handleNeutral} text='Neutral' />
            <Button action={handleBad} text='Bad' />
        </div>
        <div>
            <Message text = 'Statistic' />
        </div>
        <Statistics good={feedback.good} neutral={feedback.neutral} bad={feedback.bad} />
        
    </div>
  )
}


export default App;