import React, { Component } from "react";
import MatchCard from "./components/Card";
import Wrapper from "./components/Wrapper";
import Title from "./components/Header";
import matches from "./matchcards.json";
import "./App.css";

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on a different tarot card each time to gain points! If you click on the same card twice, you lose!";

class App extends Component {
    
    // Setting this.state.matches to the matches json array
    state = {
        matches,
        correctGuesses,
        bestScore,
        clickMessage
    };

    setClicked = id => {

        // copy the state matches array to work with
        const matches = this.state.matches;

        // Filter for a match
        const clickedMatch = matches.filter(match => match.id === id);

        // If the matched image's clicked value is already true, 
        // game over msg
        if (clickedMatch[0].clicked){

            console.log ("Correct Guesses: " + correctGuesses);
            console.log ("Best Score: " + bestScore);

            correctGuesses = 0;
            clickMessage = "Sorry, this card was already clicked"

            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            this.setState({clickMessage});
            this.setState({ correctGuesses });
            this.setState({matches});

        // if clicked = false, and the user hasn't finished
        } else if (correctGuesses < 11) {

            // Setmvalue to true
            clickedMatch[0].clicked = true;

            // increment counter
            correctGuesses++;
            
            clickMessage = "Keep going, nice job!";

            if (correctGuesses > bestScore){
                bestScore = correctGuesses;
                this.setState({ bestScore });
            }

            // Shuffle array to rendered random order
            matches.sort(function(a, b){return 0.5 - Math.random()});

            // Set this.state.matches equal to the new matches array
            this.setState({ matches });
            this.setState({correctGuesses});
            this.setState({clickMessage});
        } else {

            // Set its value to true
            clickedMatch[0].clicked = true;

            // restart counter
            correctGuesses = 0;

            //winner msg
            clickMessage = "Winner!!";
            bestScore = 12;
            this.setState({ bestScore });
            
            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            // Shuffle array to render random order
            matches.sort(function(a, b){return 0.5 - Math.random()});

            // Set this.state.matches equal to the new matches array
            this.setState({ matches });
            this.setState({correctGuesses});
            this.setState({clickMessage});

        }
    };

    render() {
        return (
            <Wrapper>
                <Title>Clickity Clack Movie Game</Title>
        
                <h3 className="scoreSummary">
                    {this.state.clickMessage}
                </h3>
                
                <h3 className="scoreSummary card-header">
                    Correct Guesses: {this.state.correctGuesses} 
                    <br />
                    Best Score: {this.state.bestScore} 
                </h3>
                <div className="container">
                <div className="row">
                {this.state.matches.map(match => (
                    <MatchCard
                        setClicked={this.setClicked}
                        id={match.id}
                        key={match.id}
                        image={match.image}
                    />
                ))}
                </div>
                </div>

            </Wrapper>
        );
    }
}

export default App;
