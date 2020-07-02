const { addresses } = await getMyWallet("ltc", msg.author.username);

var microtx = {
  from_private: addresses[0], //PRIVATE!!! not public
  to_address: "",
  value_satoshis: 10000,
};

//https://www.blockcypher.com/dev/bitcoin/#microtransaction-endpoint

//micro transactions still not quite worked out
