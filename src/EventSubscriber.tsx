// React Component subscribing to ERC token contracts
import React, {
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { createAlchemyWeb3, AlchemyWeb3 } from '@alch/alchemy-web3';

const WEBSOCKET_ENDPOINT = process.env.REACT_APP_WEBSOCKET_ENDPOINT ?? "";
// 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48

interface TransferEvent {
  from: string;
  to: string;
  amount: string;
  at: Date;
}

interface EventProps {
  address: string;
  eventSignature: string;
}

const EventSubscriber=(props: EventProps)=>{
  const {address} = useParams<{address: string}>();
  const [web3, setWeb3] = useState<AlchemyWeb3>(createAlchemyWeb3(WEBSOCKET_ENDPOINT));
  const [subscriptionId, setSubscriptionId] = useState<String>('');
  const [event, setEvent] = useState<TransferEvent|undefined>();
  const events: TransferEvent[] = [];

  useEffect(() => {
    const topics = [
      web3.eth.abi.encodeEventSignature('Transfer(address,address,uint256)'),
    ]
    web3.eth.subscribe('logs', {
      address,
      topics
    })
    .on("connected", setSubscriptionId)
    .on("data", (log)=>{
      const {from, to, amount} = web3.eth.abi.decodeLog([{
        type: 'address',
        name: 'from',
        indexed: true,
      },{
        type: 'address',
        name: 'to',
        indexed: true,
      },{
        type: 'uint256',
        name: 'amount'
      }], log.data, log.topics.slice(1,log.topics.length));
      events.push({
        from, to, amount, at: new Date()
      });
      console.log(events[events.length-1].at);
    });
  }, [])

  return(
    <h1>{event && event.at}</h1>
  );
}

export default EventSubscriber;