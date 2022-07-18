const {ethers} = require("ethers");

const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/d163401424514af5bd48d03741865114');

async function checkNameList(names) {
    for(let i in names){
        provider.resolveName(names[i] + ".eth").then(ens => {
            if(ens === null){
                console.log(names[i] + ".eth is available!");
            }else{
                console.log(names[i] + ".eth is owned by " + ens);
            }
        })
    }
}

function create999ClubList() {
    let names = []
    for(let a = 0; a < 10; a++){
        for(let b = 0; b < 10; b++){
            for(let c = 0; c < 10; c++){
                names.push(String(a) + String(b) + String(c));
            }
        }
    }
    return names;
}

async function checkSingleName(name) {
        provider.resolveName(name + ".eth").then(ens => {
            if(ens === null){
                console.log(name + ".eth is available!");
            }else{
                console.log(name + ".eth is owned by " + ens);
            }
        })
}

function createTestNames() {
    let names = [];
    // Loop through A-Z
    for(let char = 65; char <= 90; char++){
        // Loop through 0-9
        for(let digit = 0; digit < 10; digit++){
            // console.log("test" + String.fromCharCode(char) + String(digit));
            names.push("a" + String.fromCharCode(char) + String(digit));
        }
    }
    return names;
}

// let names = createTestNames();
let names = create999ClubList();
// console.log(names)

// Input an array of string names. Do not include .eth
// checkSingleName("vitalik");
checkNameList(names);