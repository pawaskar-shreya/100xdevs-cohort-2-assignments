import './AllCards.css'
import { useState } from 'react'

export function NewCard () {
        const [name, setName] = useState("");
        const [desc, setDesc] = useState("");
        const [int1, setInt1] = useState("");
        const [int2, setInt2] = useState("");
        const [socName1, setSocName1] = useState("");
        const [social1, setSocials1] = useState("");
        const [socName2, setSocName2] = useState("");
        const [social2, setSocials2] = useState("");

    return <div class="main-container create-container">

        {/* onChange catches every change in input, so there will be multiple re-renders due to setName being called multiple times. Not ideal, but okay */}

        <input type="text" class="user-input" placeholder="Your Name" onChange={function(change) {
            const value = change.target.value;
            setName(value);
        }}/> <br />

        <input type="text" class="user-input" placeholder="Description" onChange={function(change) {
            const value = change.target.value;
            setDesc(value);
        }}/> <br />

        <input type="text" class="user-input" placeholder="Interest 1" onChange={function(change) {
            const value = change.target.value;
            setInt1(value);
        }}/> <br />

        <input type="text" class="user-input" placeholder="Interest 2" onChange={function(change) {
            const value = change.target.value;
            setInt2(value);
        }}/> <br />

        <input type="text" class="user-input" placeholder="Social 1 name" onChange={function(change) {
            const value = change.target.value;
            setSocName1(value);
        }}/> <br />

        <input type="text" class="user-input" placeholder="Social 1 link" onChange={function(change) {
            const value = change.target.value;
            setSocials1(value);
        }}/> <br />

        <input type="text" class="user-input" placeholder="Social 2 name" onChange={function(change) {
            const value = change.target.value;
            setSocName2(value);
        }}/> <br />

        <input type="text" class="user-input" placeholder="Social 2 link" onChange={function(change) {
            const value = change.target.value;
            setSocials2(value);
        }}/> <br />


        <button class="user-input" onClick={function() {
            fetch("http://localhost:3000/create", {
                method : "POST", 
                body : JSON.stringify({
                    name : name, 
                    description : desc, 
                    interests : [int1, int2],
                    socials : [
                        {[socName1] : social1}, 
                        {[socName2] : social2}
                    ]
                }),
                headers : {
                    "content-Type" : "application/json"       
                    
                    // these are the headers that we have in postman as well. Here we specify that the type we are sending is json
                }
            }
                ).then(async function(res) {
                    const response = await res.json();
                    alert("New Card Added, yayyy!")
                })
        }}>Create Card</button>
    </div>
}