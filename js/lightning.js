/**import { LightningAddress } from "@getalby/lightning-tools";

const ln = new LightningAddress("binaural_sub303@getalby.com");

// fetch the LNURL data
await ln.fetch();

// get the LNURL-pay data:
console.log(`ln.lnurlpData: ${ln.lnurlpdata}`); // returns a [LNURLPayResponse](https://github.com/getAlby/js-lightning-tools/blob/master/src/types.ts#L1-L15)
// get the keysend data:
console.log(`ln.keysendData: ${ln.keysendData}`);

const invoice = await ln.requestInvoice({ satoshi: 1000 });
**/
console.log(`invoice.paymentRequest: ${invoice.paymentRequest}`); // print the payment request
console.log(`invoice.paymentHash: ${invoice.paymentHash}`); // print the payment hash