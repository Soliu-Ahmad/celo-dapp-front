import {ethers, Contract} from 'ethers';
import stakingAbi from '../ABI/stakingAbi.json'
import stakingTokenAbi from '../ABI/stakeTokenAbi.json'



export const connectWallet = async () => {
 try {
      let [signer, provider, stakingContract, stakeTokenContract,chainId] = [null, null, null, null, null]
      if(window.ethereum === null){
            throw new Error("Metamask is not installed")
      }
      const accounts = await window.ethereum.request({
            method:"eth_requestAccounts"
      })

      let chainIdHex = await window.ethereum.request({
            method:'eth_chainId'
      })

      chainId = parseInt(chainIdHex, 16)

      let selectedAccount = accounts[0];
      if(!selectedAccount){
            throw new Error('no ethereum accounts is available')
      }

      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner()

      const stakingContractAddress="0x52d76B4Eb0De31d83e98A88BBbDD2b43df7baF03"
      const stakeTokenContractAddress = '0x75918AaC33f4807eAE3417A018063d9a2554B2a5'


      stakingContract = new Contract(stakingContractAddress, stakingAbi, signer)

      stakeTokenContract = new Contract(stakeTokenContractAddress, stakingTokenAbi, signer)

      return {provider, selectedAccount, stakeTokenContract, stakingContract,chainId}




      
 } catch (error) {
      console.error(error);
      throw error
      
 }
}




//Reward Token: 0xCe39E4FB5F76cb125d1F73eb32C58d08b72B80ad
//0xCe39E4FB5F76cb125d1F73eb32C58d08b72B80ad