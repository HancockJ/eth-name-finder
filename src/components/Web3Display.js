import {useState} from "react";
import {connectProvider} from "../redux/blockchain/blockchainActions";
import {useDispatch, useSelector} from "react-redux";
const genex = require('genex');
function Web3Display() {
    const [name, setName] = useState("")
    const [output, setOutput] = useState("")
    const [matches,setMatches] = useState([])
    const blockchain = useSelector((state) => state.blockchain)
    const dispatch = useDispatch();

    const get_matches = (string) => {
        try {
            const pattern = genex(string);
            let matches = pattern.generate();
            let legalMatches = matches.filter(word => /^[A-Za-z\d]*$/.test(word));
            setMatches(legalMatches)
        } catch (error) {
            setMatches([string])   
        }
    }
    const connectToProvider = () => {
        return (
                <button
                        onClick={ async (e) => {
                            e.preventDefault();
                            dispatch(connectProvider());
                        }}
                >
                    Connect To Provider
                </button>
        )
    }

    const checkName = async () => {
            blockchain.ethers.resolveName(name + ".eth").then(address => {
                if(address == null){
                    console.log("ENS Name \"" + name + ".eth\" available!")
                    setOutput("ENS Name \"" + name + ".eth\" available!")
                }else {
                    console.log("ENS Name \"" + name + ".eth\" is not available. taken by: " + address);
                    setOutput("ENS Name \"" + name + ".eth\" is not available. taken by: " + address)
                }
            })
    }

    return (blockchain.ethers) ?
        (
            <div>
                <h3>Ethereum Name Finding Service</h3>
                {blockchain.ethers.network ? <h5>You are connected to the {blockchain.ethers.network.name} network.</h5> : null}
                <input type="text" onChange={event => {setName(event.target.value)
                get_matches(event.target.value)}}/>
                <button onClick={checkName}>Check Name</button>
                <p>{output}</p>
                {matches[0] !== '' && matches.length > 0 ? <p>This string yields {matches.length} combinations.</p> : null}
                <ul>Combinations:{matches.map(match =>{
                    return <li key={match}>{match}</li>
                })}</ul>
            </div>
        ) : (
            <div>
                <h3>Ethereum Name Finding Service</h3>
                {connectToProvider()}
            </div>
        )
}

export default Web3Display;