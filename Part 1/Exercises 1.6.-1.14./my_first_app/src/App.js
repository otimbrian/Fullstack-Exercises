import React, {useState} from "react"

const Button = ({ action, text}) => <button onClick={action}>{text}</button>
const Message = ({message}) => <h1>{message}</h1>
const Infor = ({title, value}) => {
    if(value === 0){
        return(
        [
           <tr>
                <td>No Feedback Given</td>
           </tr>
        ]
        )
    }
    return(
        [
            <tr>
                <td>{title}:</td>
                <td>{value}</td>
            </tr>
    ]
    )
}


// const Statistic = ({good, neutral, bad}) => {
//     if(good===0 & neutral===0 & bad===0){
//         return(
//             <div>
//                 <h4>No Feedback Given</h4>
//             </div>
//         )
//     }
//     return (
//         <div>
//             <table>
//                 <tr>
//                     <td>Good</td>
//                     <td>{good}</td>
//                 </tr>
//                 <tr>
//                     <td>Neutral</td>
//                     <td>{neutral}</td>
//                 </tr>
//                 <tr>
//                     <td>Bad</td>
//                     <td>{bad}</td>
//                 </tr>
//                 <tr>
//                     <td>All</td>
//                     <td>{bad + neutral + good}</td>
//                 </tr>
//                 <tr>
//                     <td>Average</td>
//                     <td>{((bad * -1) + good)/(bad + neutral + good)}</td>
//                 </tr>
//                 <tr>
//                     <td>Positive</td>
//                     <td>{good /(bad + neutral + good) * 100}</td>
//                 </tr>
//             </table>
//             <h4>Good : {good}</h4>
//             <h4>Neutral : {neutral}</h4>
//             <h4>Bad : {bad}</h4>
//             <h4>All : {bad + neutral + good}</h4>
//             <h4>Average : {((bad * -1) + good)/(bad + neutral + good)}</h4>
//             <h4>Positive : {good /(bad + neutral + good) * 100}</h4>
//         </div>
//     )
// }

const App = (props) => {
    const [feedback, setFeedback] = useState({'good': 0, 'neutral': 0, 'bad': 0})

    const handleGood = () => setFeedback({...feedback, good: feedback.good + 1})
    const handleNeutral = () => setFeedback({...feedback, neutral: feedback.neutral + 1})
    const handleBad = () => setFeedback({...feedback, bad: feedback.bad + 1})
    
    return(
        <div>
            <div>
                <Message message='Give Feedback' />
            </div>
            <div>
                <Button action={handleGood} text='Good' />
                <Button action={handleNeutral} text='Neutral' />
                <Button action={handleBad} text='Bad' />
            </div>
            <div>
                <Message message='Statistics' />
                <div>
                    <table>
                        <tbody>
                            <Infor title='Good' value={feedback.good} />
                            <Infor title ='Neutral' value={feedback.neutral} />
                            <Infor title='Bad' value={feedback.bad} />
                            <Infor title='All' value={feedback.bad + feedback.neutral + feedback.good} />
                            <Infor title ='Average' value={((feedback.bad * -1) + feedback.good)/(feedback.bad + feedback.neutral + feedback.good)} />
                            <Infor title='Positive' value={feedback.good /(feedback.bad + feedback.neutral + feedback.good) * 100} />
                        </tbody>
                    </table>
                </div>
            {    
                // <div>
                //     <Statistic good={feedback.good} neutral={feedback.neutral} bad={feedback.bad} />
                // </div>
            }
            </div>
        </div>
    )
}
export default App;
