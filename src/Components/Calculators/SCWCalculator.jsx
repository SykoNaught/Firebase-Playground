import React, { useState, useEffect } from 'react';
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
    const [todayPrice, setTodayPrice] = useState()
    const exclusionList = ['-aud', '-aug', '-basic', '-bit', '-btc', '-cash', '-chain', '-dao', '-eth', '01', '0cash', '0chain', '0xcert', '1000x', '100x', '10x', '13', '1ai', '1ir', '2-2', '2a', '2x', '300', '360', '3x', '5x', '7', '8', 'aaa', 'aave-', 'abc', 'add', 'alliance', 'alpha', 'alt', 'animal', 'anime', 'anon', 'ape', 'apo', 'aqua', 'asia', 'atl', 'aud-', 'aus', 'ball', 'bank', 'base', 'basis', 'battle', 'bear', 'bee', 'bell', 'berry', 'beth', 'bett', 'bever', 'beyond', 'bf', 'bg', 'big', 'bill', 'binance-', 'bio', 'bir', 'bit-', 'bit_', 'bita', 'bitb', 'bitca', 'bitce', 'bitch', 'bitci', 'bitcl', 'bitcn', 'bitcoe', 'bitcof', 'bitcoii', 'bitcoin-', 'bitcoinb', 'bitcoing', 'bitcoinh', 'bitcoinm', 'bitcoino', 'bitcoinr', 'bitcoins', 'bitcoinu', 'bitcoinv', 'bitcoinx', 'bitcoinz', 'bitcoiv', 'bitcom', 'bitcon', 'bitcor', 'bitcr', 'bitcu', 'bitd', 'bite', 'bitf', 'bitg', 'bith', 'biti', 'bitj', 'bitk', 'bitl', 'bitm', 'bitn', 'bito', 'bitp', 'bitq', 'bitr', 'bits', 'bitt', 'bitu', 'bitv', 'bitw', 'bitx', 'bity', 'bitz', 'bix', 'biz', 'bla', 'black', 'bli', 'bliq', 'block', 'bloo', 'blue', 'bol', 'bonus', 'boo', 'bra', 'brap', 'bro', 'bs', 'btecoin', 'btc-', 'bull', 'business', 'buy', 'buz', 'candy', 'canna', 'capital', 'cash', 'cash-', 'chain-', 'chains', 'chari', 'chee', 'chic', 'chip', 'click', 'coin-', 'coins', 'compound', 'compound-0x', 'corn', 'cov', 'cow', 'cp', 'crossover', 'crypt', 'crypto', 'cryst', 'cyb', 'dai', 'dao', 'dapp', 'dark', 'darw', 'dash-', 'dav', 'deb', 'decentralized', 'deutsche', 'dex', 'diam', 'digi', 'digital', 'dm', 'dollar', 'dragon', 'dream', 'elastic', 'electr', 'emark', 'emoji', 'eth-', 'eth2', 'ethar', 'ethb', 'ethea', 'ether-', 'etherem', 'etheretherb', 'ethereum-', 'ethereumai', 'ethereumsc', 'ethereumx', 'etherinc', 'etherisc', 'ethero', 'etherp', 'ethers', 'etherz', 'ethi', 'ethl', 'etho', 'ethp', 'ethv', 'euro', 'ever', 'evi', 'exo', 'expir', 'fair', 'faith', 'fam', 'fi', 'finance', 'finit', 'future', 'gbp', 'gem', 'global', 'hodl', 'hold', 'inch', 'index', 'jackpot', 'japan', 'jit', 'jpa', 'jpy', 'long', 'market', 'mill', 'mine', 'mining', 'monero', 'money', 'moon', 'pop', 'pump', 'ratio', 'sai', 'sell', 'ships', 'short', 'swap', 'uni', 'usd', 'v1', 'venus', 'weed', 'whale', 'wrapped', 'yearn-classic', 'yearn-ecosystem', 'yearn-ethereum', 'yearn-finance-', 'yearn4', 'yf', 'yield', 'zet', 'zeu', 'zg', 'zh', 'zi', 'zj', 'zl', 'zo', 'zp', 'zr', 'zt', 'zu', 'zy', 'half'];

    function getCurrentDate(separator=''){
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }

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
                if(excluded !== true && coins.id !== ''){
                    fullCoinList.push(coins);
                } 
                return coins
            });
            
            setCoinList(fullCoinList)
        })
    }
    const onWhatChange = (e, value) => {
        setWhat(value.name)
        getTodayPrice(value.id)
    }
    const onWhenChange = (e, value) => {
        e.persist()
        setWhen(e.target.value)
    }
    const onAmountChange = (e, value) => {
        setAmount(value)
    }
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
  
    function getTodayPrice(id) {
        let url = 'https://api.coingecko.com/api/v3/simple/price?ids=' + id +'&vs_currencies=usd'
        try {
            fetch(url)
            .then(response => {
                return response.json()
            }).then(data => {
                let price = data[id].usd
                
                setTodayPrice(price)
            })
        } catch (e) {
            console.log('------------------')
            console.log(e)
            return
        }
    }
    useEffect(() => {
        getCoinList()
        setWhat(coinList[0])
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
                                id="what"
                                options={optionItems}
                                getOptionLabel={(coin) => coin.name}
                                style={{ width: 300 }}
                                onChange={onWhatChange}
                                renderInput={(params) => <TextField {...params} label="What"  />}
                            />
                        </Grid>
                        <Grid container item xs={4}>
                            <TextField
                                label="When"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                defaultValue={getCurrentDate('-')}
                                onChange={onWhenChange}
                            />
                        </Grid>
                        <Grid container item xs={4}>
                            <CurrencyTextField
                                label="How Much"
                                currencySymbol="$"
                                outputFormat="number"
                                value={amount}
                                decimalPlaces={0}
                                onChange={onAmountChange}
                                
                            />
                        </Grid>
                        <Grid container item xs={12}>
                                {what ?
                                    <div>
                                        The price of {what} today is: 
                                        {todayPrice ?
                                            <span>
                                                &nbsp; ${todayPrice}
                                            </span>
                                            :
                                            null
                                        }
                                    </div>
                                    :
                                    null
                                } 
                        </Grid>
                        <Grid container item xs={12}>
                            {what && when ?
                                <div>
                                    The price of {what} on {when} was: 
                                </div>
                                :
                                null
                            }
                        </Grid>
                        
                        <Grid container item xs={12}>
                            {amount ?
                                <div>
                                    Your investment of ${amount} Could'a been worth 
                                </div>
                                :
                                null
                            }
                        </Grid>
                    </Grid>
                </form>
                </div>
            </div>
        </div>
    )
}

export default SCWCalculator