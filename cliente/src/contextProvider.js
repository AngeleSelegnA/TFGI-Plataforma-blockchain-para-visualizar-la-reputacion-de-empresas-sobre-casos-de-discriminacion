import React, { useEffect, useState } from 'react';
import axios from 'axios'
import * as constants from './constantFile.js'
import Web3 from 'web3';
import { ethers } from "ethers";
import {GoogleSpreadsheet} from "google-spreadsheet";

import ReputationControl from './ReputationControl.json';

export const context = React.createContext({});

const ProviderA = (props) => {

    var [user, setUser] = useState(null);
    var [balance, setBalance] = useState(null);
    const pesos = [[0.5, 0], [0.45, 0.1], [0.4, 0.2], [0.325, 0.35]];
    const [hashIPFSdata, setHash] = useState("");
    const [data1, setData1] = useState([]); //para guardar los datos del googlesheet de miembros
    const [data2, setData2] = useState([]); //para guardar los datos del googlesheet de empresas
    //Si todavia no se ha conectado con Metamask entonces aparece un popup para la conexion
    const infuraUrl = constants.INFURA_URL;
    //Crea una instancia para comunicarse con el nodo indicado
    const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
    //Nos conectamos con el contrato
    const contract = new web3.eth.Contract(ReputationControl.abi, constants.CONTRACT_ADDRESS);
    const provider = ethers.getDefaultProvider("rinkeby");
    // Config variables
    /* const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
    const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
    const PRIVATE_KEY =   process.env.PRIVATE_KEY; */
    const SPREADSHEET_ID = "1j8Zpe3QDgl1m0ymMdAeEjwn0526XMDujzzp24Oh5Me8";
    const CLIENT_EMAIL = "tfginfor@tfginfor.iam.gserviceaccount.com";
    const PRIVATE_KEY =  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDP09NIOUQcZIQr\ngmxe8Xjq/cdudcEolHibhcltL8/P9/bl4/B7O+/OboieqP+LLPw7BUrhPh9yu4Ag\n3UNPB4aV+fGZwN9cUkIBzTNwtOemsU3K61E385x74wJGjgguK+9VvPqVKsjXjsCK\n7RudEIEqWH0p2zr/HMOHStcNpQg6LxCMBgfGIaeY+q6upNcQXYlWWoArzlrx8H3N\n5H3YkyeX1ABm7RVhJK1KYmc92pqS5UANV69XXm2LqKwTGVx/whYm1Sv/9Z81rl4F\nDeuChuv1DSDC4IF7PGL209spYQd9X+uuouHnkWi6XR9oBbrfZgIJVr+LJSY2RvfV\n3ejG/6T/AgMBAAECggEAKHwEj/Cr3nYMMyeUcchLPEeUdmWU65FEj1M4Aj+KlWIh\n4/WLro3l8IoirfmQ0i1As0ScKhV+bcytsHk5t+bo5kVKtZ9XQ3Y4qn4tM5rh91xZ\noZpGd4ZKqO13T4QyfsALPuHx1GYBus/xnP6EXwvMhZG4TBOLQg/53NyM2PkZia+w\ngqVwz0QErcNoqmQp65Fr6WUz8Ip/Xd0EtnmmsOduc64oXp4RlNpRu/XlEnjTMKri\nM6hG1pb/mQAgEZPFVckcDrBF3ve9nGvCBFbGA1juZ7OPyx76REJ0l14JnMelciz7\nP2JI6at3E4nbWJiCoMFL/az906uO46LEpZAw5VDXfQKBgQDqQsHb0JZdXq4s1OUz\nY6kKZTmzw1DGhHY3q0psJ1Hz3djpm3z6z8cR0bv9nLSkU+3ZZKjLX60GcLhzg6+u\n2cNVzMUEdxL2RwrO8uBJpwwHNedS6+yd+fPnDtcasaT+ckcIlZ+KK9qEtvtqOZCR\ns6XLqjvA8s87Zmy6zHzH0v+PKwKBgQDjHRoIRYlyPJ+JNC29xK5Ug7gwH8/ESSKD\nQ+lnRnkH8x5ABF4+OQQzmpYW2HHv//Ciy6UlJArVQ3hQ1GWE6SHGs9TZGDfhoJjm\n+Bgb39AAUPCdbeb/SHCfPgKHAD8iSHBwEcDfcHhNTHba+zn4sE8r70sM2/HiXa43\nsi84Cx23fQKBgQDbx9H1Fxdbdi7XJM38jq3TcPDX9JDeDvyScgQawDElKKgPU6/H\n6BQOZcWHxPO9kHiAEu5CD/tXJX4H8i5rTybyYnEdJVIG+NPtIPTIZQ7l3O6wX2PZ\nOt5XkxbAlpYDmteF+Ep76XTUOpBaMrOt3uvXzljNR4ChbBDqmFshZpYZjQKBgHXF\nxJcfgCwGNfDPZxzuXjyjZaNHC9XM2yHY2LNefyrZLwmhekGoDX65HjXQnh0HywCQ\nvB3rd9apuz2nNtHal1JUNP8zKN9PCZtUciQaRuGzF2N793rQVN6vKF5biWG80Nm8\nyxjTWP80tLnP53sH6rZsy61qbR+m1s45D3VvhkR9AoGBAOaAXqqnmRtJkwNa85GS\nzVR4rVoRucLMCeB099AAm+ZKz/wQRq2MrmzDeF2JbJk0+hbuAfmpntXQpHsb0nNV\nrG50kFqJVz/fdek4noRx+oU0+ohmziomyjxVBHbzbrpoIxBFpLNScRUnZi388NBJ\nfdV1Ir2C0PhT+bDHgHyWP2lB\n-----END PRIVATE KEY-----\n";
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    
    useEffect(async () => {
        const readSpreadsheet = async () => {
            try {
                await doc.useServiceAccountAuth({
                client_email: CLIENT_EMAIL,
                private_key:PRIVATE_KEY ,
            });
                // loads document properties and worksheets
                await doc.loadInfo();
                const sheet1 = doc.sheetsByIndex[0];
                const sheet2 = doc.sheetsByIndex[1];
                const rows1 = await sheet1.getRows();
                const rows2 = await sheet2.getRows();
                setData1(rows1);
                setData2(rows2);
        
            } catch (e) {
                console.error('Error: ', e);
            }
            };
            readSpreadsheet();
        axios.get(`${constants.SERVER_URL}/getuser`, { withCredentials :true})
                .then((response) => {setUser(response.data); console.log(user);})
        
    }, []);
    return <context.Provider value={{ "user" : user, "web3" : web3, "contract": contract, "provider": provider, "miembros": data1, "empresas": data2, "pesos": pesos }}>{props.children}</context.Provider>;
}

export default ProviderA;