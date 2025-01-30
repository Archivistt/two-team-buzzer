import "./EnterName.css"
import { useState } from "react"

export default function EnterName() {
    const [teamName1, setTeamName1] = useState('TEAM 1')
    const [teamName2, setTeamName2] = useState('TEAM 2')
    const [enterTeam1Name, setEnterTeam1Name] = useState('')
    const [enterTeam2Name, setEnterTeam2Name] = useState('')

    const [response1, setResponse1] = useState(false)
    const [response2, setResponse2] = useState(false)

    const parentStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(2, 45vw)",
        gridGap: "20px",
        justifyContent: "center",
    }

    const containerClass = {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "20px",
        text: "bold",
    }

    const inputContainer = {
        height: "30px",
        width: "200px",
        marginTop: "20px",
    }

    const response = {
        marginTop: "20px",
        textAlign: "center",
        fontSize: "1.7rem"
    }

    return (
        <>
            <div className="size" style={parentStyle}>

                <div style={containerClass}>
                    <p style={{ fontWeight: "bold", fontSize: "1.7rem" }}> {teamName1} </p>
                    <input
                        onChange={(e) => setEnterTeam1Name(e.target.value)}
                        value={enterTeam1Name}
                        style={inputContainer}
                        type="text"
                        placeholder="Enter Team Name" />
                    <button
                        onClick={() => {
                            if (enterTeam1Name === '') {
                                alert('Please enter team name');
                            } else {
                                setTeamName1(enterTeam1Name);
                                setEnterTeam1Name('');
                                setResponse1(!response1);
                            }
                        }}
                        style={inputContainer}>
                        Submit
                    </button>

                    {response1 ? (
                        <div style={response}>
                            <p>please press <span style={{ fontWeight: "bold" }}>enter</span><br /> to test buzzer</p>
                        </div>
                    ) : ''}

                </div>

                <div style={containerClass}>
                    <p style={{ fontWeight: "bold", fontSize: "1.7rem" }}> {teamName2} </p>
                    <input
                        onChange={(e) => setEnterTeam2Name(e.target.value)}
                        value={enterTeam2Name}
                        style={inputContainer}
                        type="text"
                        placeholder="Enter Team Name" />
                    <button
                        onClick={() => {
                            if (enterTeam2Name === '') {
                                alert('Please enter team name');
                            } else {
                                setTeamName2(enterTeam2Name);
                                setEnterTeam2Name('');
                                setResponse2(!response2);
                            }
                        }}
                        style={inputContainer}>
                        Submit
                    </button>

                    {response2 ? (
                        <div style={response}>
                            <p>please press <span style={{ fontWeight: "bold" }}>spacebar</span><br /> to test buzzer</p>
                        </div>
                    ) : ''}

                </div>

            </div>
        </>
    )
}
