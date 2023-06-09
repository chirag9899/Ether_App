import React, {useContext, useEffect,useState}from 'react'
import {ethers} from 'ethers'
import {contractAbi,contractAddress} from '../utils/constants';
export const TransactionContext =React.createContext();

const {ethereum}= window;

const getEthereumContract = ()=>{
 
    const provider =new ethers.providers.Web3Provider(ethereum);

    const signer=provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractAbi,signer);

    return transactionContract;
}


export const TransactionProvider=({children})=>{
    const[currentAccount,setCurrentAccount] = useState("");
    const[formData,setFormdata] = useState({addressTo:'',amount:'',keyword:'',currency:'',message:''});
    const [isLoading,setIsLoading] = useState(false);
    const[transactionCount,setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions,setTransactions] = useState([]);

    const handleChange=(e,name)=>{
        setFormdata((prevState)=>({...prevState,[name]:e.target.value}))
    }

    const getAllTransactions=async()=>{
        try{
            if(!ethereum) return alert("please install metamask");
            const transactionContract= getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();
           
            const structuredTransactions = availableTransactions.map(
                (transaction) => ({
                  addressTo: transaction.receiver,
                  addressFrom: transaction.sender,
                  timestamp: new Date(
                    transaction.timestamp.toNumber() * 1000).toLocaleString(),
                  message: transaction.message,
                  keyword: transaction.keyword,
                  amount: parseInt(transaction.amount._hex) / (10 ** 18)
                })
              );
            //    console.log(availableTransactions)
        
              setTransactions(structuredTransactions);
              console.log(structuredTransactions);
         
            
            
            
        }
        catch(error){
            console.log(error)
        }
    }


    const checkIfWalletIsConnected =async ()=>{
        try{    
            if(!ethereum) return alert("please install metamask");
            
            const accounts =await ethereum.request({method:'eth_accounts'});
            
            if(accounts.length){
                
                setCurrentAccount(accounts[0]);
                //getall transactions
                getAllTransactions();
             }
             else{
                 console.log("account not found")

             }
         
        }
        catch{
            console.log(error);

            // throw new Error("No ethereum object")

        }
    }

    const checkIfTransactionExists =async ()=>{
        try{
            if (ethereum) {
                const transactionContract=getEthereumContract();
                const transactionCount = await transactionContract.getTransactionCount();
                window.localStorage.setItem("transactionCount",transactionCount);
              }
        }
        catch(error){
            console.log(error);

            throw new Error("No ethereum object")
        }
    }
    
    const connectWallet=async ()=>{
        try{
        
            if(!ethereum) return alert("please install metamask");
            const accounts =await ethereum.request({method:'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);
        }
        catch(error){
            console.log(error);

            throw new Error("No ethereum object")
        }
    }

    const sendTransaction=async ()=>{
        try{
            if(!ethereum) return alert("please install metamask");
            const{addressTo,amount,keyword,message}=formData;
            const transactionContract=getEthereumContract();
            const parsedAmount=ethers.utils.parseEther(amount);
            
            //get the data from form

            await ethereum.request({
                method: 'eth_sendTransaction',
                params:[{
                    from: currentAccount,
                    to:addressTo,
                    gas:'0x5209' ,//21000 gwei
                    value: parsedAmount._hex, //0.00001
                }]
            })
           const transactionHash=  transactionContract.addToBlockchain(addressTo,parsedAmount,message,keyword);

           setIsLoading(true);
           console.log(`Loading - ${transactionHash.hash}`);
           await transactionHash.wait();
           console.log(`Success- ${transactionHash.hash}`)
           setIsLoading(false);

           const transactionCount = await transactionContract.getTransactionCount();

           setTransactionCount(transactionCount.toNumber());
           window.location.reload();

        }
        catch(error){
            console.log(error);

            throw new Error("No ethereum object");

        }
    }

    useEffect(()=>{
        checkIfWalletIsConnected(); 
        checkIfTransactionExists();
       
    },[transactionCount]);
    return(
        <TransactionContext.Provider value={{connectWallet ,currentAccount,formData,setFormdata,handleChange,sendTransaction,transactions,isLoading}}>
            {children}
        </TransactionContext.Provider>
    )
}

export default TransactionProvider;

