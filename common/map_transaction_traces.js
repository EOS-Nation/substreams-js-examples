import { Substreams, download } from "substreams";
import { HOST, SUBSTREAM } from "./config";

// User input
const outputModules = ["map_transaction_traces"];
const startBlockNum = "283000000";
const stopBlockNum = "283001000";

// Initialize Substreams
const substreams = new Substreams(HOST, {
    startBlockNum,
    stopBlockNum,
    outputModules,
});

(async () => {
    // download Substream from IPFS
    const {modules, registry} = await download(SUBSTREAM);

    // Find Protobuf message types from registry
    const TransactionTraces = registry.findMessage("sf.antelope.type.v1.TransactionTraces");
    if ( !TransactionTraces) throw new Error("Could not find TransactionTraces message type");

    substreams.on("mapOutput", output => {
        const { transactionTraces } = TransactionTraces.fromBinary(output.data.mapOutput.value);
        for ( const transactionTrace of transactionTraces ) {
            console.log(transactionTrace);
        }
    });

    // start streaming Substream
    await substreams.start(modules);

    // end of Substream
    console.log("done");
    process.exit();
})();