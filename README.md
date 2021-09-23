# Ethereum Transfer Event Listener
## React Component that Listens to Transfer Events
### client-side web3.eth_subscribe implementation

Run the react-app like normal. 
The path "/event/:address", where address is the token contract address, will log new transfer events for each new block.

## Thoughts
In general it's unwise to use ethereum rpcs unless you have some mechanism on top of the node that handles, that is add restrictions to, incoming requets. For instance, Alchemy allows you to whitelist specific contract addresses and request origins, while restricting other transactions and requests.

Still though, I suspect moost applications would like to access an arbitrary number of smart contracts, instead of a fixed few. In that case, it's definitely safer to subscribe to an rpc endpoint from a secure backend which in turn sends relevant data to the client.
