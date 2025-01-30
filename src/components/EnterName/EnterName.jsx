import "./EnterName.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EnterName() {
    const navigate = useNavigate()

    const [teamName1, setTeamName1] = useState('TEAM 1');
    const [teamName2, setTeamName2] = useState('TEAM 2');
    const [enterTeam1Name, setEnterTeam1Name] = useState('');
    const [enterTeam2Name, setEnterTeam2Name] = useState('');

    const [response1, setResponse1] = useState(false);
    const [response2, setResponse2] = useState(false);

    const [buttonChange1, setButtonChange1] = useState(true)
    const [buttonChange2, setButtonChange2] = useState(true)

    const [renderPage2Team1, setRenderPage2Team1] = useState(false);
    const [renderPage2Team2, setRenderPage2Team2] = useState(false);

    const [readyTeamCount, setReadyTeamCount] = useState(0);

    const [isLockedEnter, setIsLockedEnter] = useState(true);
    const [isLockedSpace, setIsLockedSpace] = useState(true);

    const parentStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(2, 45vw)",
        gridGap: "20px",
        justifyContent: "center",
        height: "300px",
    };

    const containerClass = {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "20px",
        text: "bold",
    };

    const inputContainer = {
        height: "30px",
        width: "200px",
        marginTop: "20px",
    };

    const response = {
        marginTop: "20px",
        textAlign: "center",
        fontSize: "1.7rem",
    };

    // Handle global keydown events
    //public/team1_sound.mp3
    const handleKeydown = (event) => {
        if (event.code === "Enter" && !isLockedEnter) {
            const audio = new Audio('/team1_sound.mp3');
            audio.play().catch((error) => {
                console.error("Error playing audio:", error);
            });
            setButtonChange1(false)
            setResponse1(false)
            setReadyTeamCount(readyTeamCount + 1)
        }
        if (event.code === "Space" && !isLockedSpace) {
            const audio = new Audio('/team2_sound.mp3');
            audio.play().catch((error) => {
                console.error("Error playing audio:", error);
            });
            setButtonChange2(false)
            setResponse2(false)
            setReadyTeamCount(readyTeamCount + 1)
        }
    };

    // Set up global event listener in useEffect
    useEffect(() => {
        // Add keydown event listener when the component mounts
        document.addEventListener("keydown", handleKeydown);

        // Clean up event listener when the component unmounts
        return () => {
            document.removeEventListener("keydown", handleKeydown);
        };
    }, [isLockedEnter, isLockedSpace]); // Re-run when these states change

    return (
        <>
            <div className="size" style={parentStyle}>
                <div> {/*CHILD 1*/}
                    {renderPage2Team1 ? (
                        <div style={containerClass}>
                            <p style={{ fontWeight: "bold", fontSize: "1.7rem" }}> Team 1: {teamName1} </p>
                            {response1 ? (
                                <div style={response}>
                                    <p>please press <span style={{ fontWeight: "bold" }}>enter</span><br /> to test buzzer <br />and lock in your team!</p>
                                </div>
                            ) : (<p style={{ fontWeight: "bold", fontSize: "1.7rem", marginTop: "20px"}}> READY </p>)}
                            {buttonChange1 ? (
                                <button
                                    onClick={() => {
                                        setRenderPage2Team1(false);
                                        setTeamName1('TEAM 1');
                                        setResponse1(!response1);
                                        setIsLockedEnter(true);
                                    }}
                                    style={inputContainer}>
                                    {isLockedEnter ? 'Locked' : 'Change Team Name'}
                                </button>
                            ) : ''}
                        </div>
                    ) : (
                        <div style={containerClass}>
                            <p style={{ fontWeight: "bold", fontSize: "1.7rem" }}> {teamName1} </p>
                            <input
                                onChange={(e) => setEnterTeam1Name(e.target.value)}
                                value={enterTeam1Name}
                                style={inputContainer}
                                type="text"
                                placeholder="Enter Team Name"
                            />
                            <button
                                onClick={() => {
                                    if (enterTeam1Name === '') {
                                        alert('Please enter team name');
                                    } else {
                                        setTeamName1(enterTeam1Name);
                                        setEnterTeam1Name('');
                                        setResponse1(!response1);
                                        setRenderPage2Team1(true);
                                        setIsLockedEnter(false); // Unlock after submission
                                    }
                                }}
                                style={inputContainer}>
                                Submit
                            </button>
                        </div>
                    )}
                </div>

                <div> {/*CHILD 2*/}
                    {renderPage2Team2 ? (
                        <div style={containerClass}>
                            <p style={{ fontWeight: "bold", fontSize: "1.7rem" }}> Team 2: {teamName2} </p>
                            {response2 ? (
                                <div style={response}>
                                    <p>please press <span style={{ fontWeight: "bold" }}>spacebar</span><br /> to test buzzer <br />and lock in your team!</p>
                                </div>
                            ) : (<p style={{ fontWeight: "bold", fontSize: "1.7rem", marginTop: "20px" }}> READY </p>)}
                            {buttonChange2 ? (
                                <button
                                    onClick={() => {
                                        setRenderPage2Team2(false);
                                        setTeamName2('TEAM 2');
                                        setResponse2(!response2);
                                        setIsLockedSpace(true);
                                    }}
                                    style={inputContainer}>
                                    {isLockedSpace ? 'Locked' : 'Change Team Name'}
                                </button>
                            ) : ''}
                        </div>
                    ) : (
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
                                        setRenderPage2Team2(true);
                                        setIsLockedSpace(false); // Unlock after submission
                                    }
                                }}
                                style={inputContainer}>
                                Submit
                            </button>
                        </div>
                    )}
                </div>
            </div> {/*END OF PARENT*/}

            <div style={{fontSize: "1.7rem"}}>
                {readyTeamCount} of two (2) teams are ready!
                { readyTeamCount == 2 ? (<button>Let's Start</button>) : "" }
            </div>
        </>
    );
}
