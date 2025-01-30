import "../EnterName/EnterName.css";
import "../../App.css";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MainGame() {
    const navigate = useNavigate()
    const { team1Name, team2Name } = useParams();

    const [team1Press, setTeam1Press] = useState(false);
    const [team2Press, setTeam2Press] = useState(false);
    const [teamThatPressed, setTeamThatPressed] = useState(null);  // Track which team pressed
    const [isLocked, setIsLocked] = useState(false);  // Lock state for the keys
    const empty = '';

    const parentDiv = {
        justifyContent: "center",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
    };

    const containerClass = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "20px",
        fontWeight: "bold",  // Corrected 'text' to 'fontWeight'
        textAlign: "center",
    };

    const inputContainer = {
        height: "30px",
        width: "200px",
        marginTop: "20px",
    };


    const teamName = {
        marginTop: "200px",
        color: "white",
        textAlign: "center",
        fontSize: "2.5rem",
    };

    // Handle keydown events
    const handleKeydown = (event) => {
        if (isLocked) {
            return; // Prevent key press if the keys are locked
        }

        if (event.code === "Enter") {
            const audio = new Audio('/team1_sound.mp3');
            audio.play().catch((error) => {
                console.error("Error playing audio:", error);
            });
            setTeamThatPressed(team1Name);  // Set team1 as the team that pressed
            setIsLocked(true);  // Lock the keys
            setTimeout(() => {
                setIsLocked(false);  // Unlock the keys after 5 seconds
                setTeamThatPressed(null);  // Reset the team that pressed the buzzer
            }, 5000);
        }

        if (event.code === "Space") {
            const audio = new Audio('/team2_sound.mp3');
            audio.play().catch((error) => {
                console.error("Error playing audio:", error);
            });
            setTeamThatPressed(team2Name);  // Set team2 as the team that pressed
            setIsLocked(true);  // Lock the keys
            setTimeout(() => {
                setIsLocked(false);  // Unlock the keys after 5 seconds
                setTeamThatPressed(null);  // Reset the team that pressed the buzzer
            }, 5000);
        }
    };

    // Add event listener on mount and cleanup on unmount
    useEffect(() => {
        document.addEventListener("keydown", handleKeydown);
        return () => {
            document.removeEventListener("keydown", handleKeydown);
        };
    }, [isLocked]);  // Only re-run the effect when `isLocked` changes

    return (
        <>
            <div className="title">
                <div style={parentDiv}>
                    <div style={containerClass}>
                        <p style={{ fontSize: "2rem", color: "orange"}}>
                            {team1Name} vs {team2Name}
                        </p>
                        the first team to press the buzzer wins!
                        the buzzer unlocks after 5 seconds! <br /><br />


                        <br />
                        <button
                            onClick={() => { navigate('/') }}
                            style={inputContainer}
                        >Go back to team naming page</button>
                    </div>

                    {/* Display which team pressed the buzzer */}
                    {teamThatPressed && (
                        <div style={teamName}>
                            {teamThatPressed} pressed the buzzer!
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
