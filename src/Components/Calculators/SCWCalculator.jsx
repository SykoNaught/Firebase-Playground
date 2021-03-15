import React, { useState, useEffect } from 'react';
import firebase from '../../firebase/firebase'
import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import Header from '../Layout/Header'
import Sidebar from '../Layout/Sidebar'

      

const SCWCalculator = (props) => {
    
    const [coinList, setCoinList] = useState([])
    const [what, setWhat] = useState()
    const [when, setWhen] = useState()
    const [amount, setAmount] = useState()
    const exclusionList = ['-aud', '-aug', '-basic', '-bit', '-btc', '-cash', '-chain', '-dao', '-eth', '01', '0cash', '0chain', '0xcert', '1000x', '100x', '10x', '13', '1ai', '1ir', '2-2', '2a', '2x', '300', '360', '3x', '5x', '7', '8', 'aaa', 'aave-', 'abc', 'add', 'alliance', 'alpha', 'alt', 'animal', 'anime', 'anon', 'ape', 'apo', 'aqua', 'asia', 'atl', 'aud-', 'aus', 'ball', 'bank', 'base', 'basis', 'battle', 'bear', 'bee', 'bell', 'berry', 'beth', 'bett', 'bever', 'beyond', 'bf', 'bg', 'big', 'bill', 'binance-', 'bio', 'bir', 'bit-', 'bit_', 'bita', 'bitb', 'bitca', 'bitce', 'bitch', 'bitci', 'bitcl', 'bitcn', 'bitcoe', 'bitcof', 'bitcoii', 'bitcoin-', 'bitcoinb', 'bitcoing', 'bitcoinh', 'bitcoinm', 'bitcoino', 'bitcoinr', 'bitcoins', 'bitcoinu', 'bitcoinv', 'bitcoinx', 'bitcoinz', 'bitcoiv', 'bitcom', 'bitcon', 'bitcor', 'bitcr', 'bitcu', 'bitd', 'bite', 'bitf', 'bitg', 'bith', 'biti', 'bitj', 'bitk', 'bitl', 'bitm', 'bitn', 'bito', 'bitp', 'bitq', 'bitr', 'bits', 'bitt', 'bitu', 'bitv', 'bitw', 'bitx', 'bity', 'bitz', 'bix', 'biz', 'bla', 'black', 'bli', 'bliq', 'block', 'bloo', 'blue', 'bol', 'bonus', 'boo', 'bra', 'brap', 'bro', 'bs', 'btecoin', 'btc-', 'bull', 'business', 'buy', 'buz', 'candy', 'canna', 'capital', 'cash', 'cash-', 'chain-', 'chains', 'chari', 'chee', 'chic', 'chip', 'click', 'coin-', 'coins', 'compound', 'compound-0x', 'corn', 'cov', 'cow', 'cp', 'crossover', 'crypt', 'crypto', 'cryst', 'cyb', 'dai', 'dao', 'dapp', 'dark', 'darw', 'dash-', 'dav', 'deb', 'decentralized', 'deutsche', 'dex', 'diam', 'digi', 'digital', 'dm', 'dollar', 'dragon', 'dream', 'elastic', 'electr', 'emark', 'emoji', 'eth-', 'eth2', 'ethar', 'ethb', 'ethea', 'ether-', 'etherem', 'etheretherb', 'ethereum-', 'ethereumai', 'ethereumsc', 'ethereumx', 'etherinc', 'etherisc', 'ethero', 'etherp', 'ethers', 'etherz', 'ethi', 'ethl', 'etho', 'ethp', 'ethv', 'euro', 'ever', 'evi', 'exo', 'expir', 'fair', 'faith', 'fam', 'fi', 'finance', 'finit', 'future', 'gbp', 'gem', 'global', 'hodl', 'hold', 'inch', 'index', 'jackpot', 'japan', 'jit', 'jpa', 'jpy', 'long', 'market', 'mill', 'mine', 'mining', 'monero', 'money', 'moon', 'pop', 'pump', 'ratio', 'sai', 'sell', 'ships', 'short', 'swap', 'uni', 'usd', 'v1', 'venus', 'weed', 'whale', 'wrapped', 'yearn-classic', 'yearn-ecosystem', 'yearn-ethereum', 'yearn-finance-', 'yearn4', 'yf', 'yield', 'zet', 'zeu', 'zg', 'zh', 'zi', 'zj', 'zl', 'zo', 'zp', 'zr', 'zt', 'zu', 'zy', 'half'];

    function getCoinList() {
        let fullCoinList = []
        
        fetch('https://api.coingecko.com/api/v3/coins/list?include_platform=false')
        .then(response => {
            return response.json()
        }).then(data => {
            
            data.map((coins) => {
                let excluded = false;
                var id = coins.id
                for (var i = 0, ln = exclusionList.length; i < ln; i++) {
                    if (id.indexOf(exclusionList[i]) !== -1) {
                        excluded = true;
                        break;
                    }
                }
                if(excluded !== true){
                    fullCoinList.push(coins);
                } 
            });
            
            setCoinList(fullCoinList)
            console.log(fullCoinList)
        })

        

        const addOrEditHandler = e => {
            e.preventDefault() 
        }
    }

    
    
    useEffect(() => {
        getCoinList()
    }, [])

    let optionItems = coinList;
    return (
        
        <div className="flex-contain">       
            <Sidebar collapseToggle={props.collapseToggle} />
            <div className="body-section">
                <Header PageName="Should'a Could'a Would'a"  />
                
                <div className="body-content">
                <form className="section" >
                    <Grid container spacing={2} justify="space-between">
                        <Grid container item xs={4}>
                            <Autocomplete
                                id="amount"
                                options={optionItems}
                                getOptionLabel={(coin) => coin.name}
                                style={{ width: 300 }}
                                inputValue={what}
                                renderInput={(params) => <TextField {...params} label="What" value={what} onChange={e => setWhat(e.currentTarget.value)} />}
                            />
                        </Grid>
                        <Grid container item xs={4}>
                            <TextField
                                id="when"
                                label="When"
                                type="date"
                                InputLabelProps={{
                                shrink: true,
                                }}
                                value={when}
                                onChange={e => setWhen(e.currentTarget.value)}
                            />
                        </Grid>
                        <Grid container item xs={4}>
                            <CurrencyTextField
                                label="How Much"
                                currencySymbol="$"
                                outputFormat="number"
                                onChange={e => setAmount(e.currentTarget.value)}
                                value={amount}
                            />
                        </Grid>
                        <Grid container item xs={12}>
                            The price of {what} on {when} was: 

                        </Grid>
                        <Grid container item xs={12}>
                            The price of {what} today is: 
                        </Grid>
                        <Grid container item xs={12}>
                            Your investment of ${amount} Could'a been worth 

                        </Grid>
                    </Grid>
                </form>
                </div>
            </div>
        </div>
    )
}

export default SCWCalculator