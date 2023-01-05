import { Substreams, download } from "substreams";

// User input
const host = "eos.firehose.eosnation.io:9001";
const substream = "https://eos.mypinata.cloud/ipfs/QmPZmoPArzW84yh1tvYfcf1DtFUDGap6CTGcFccUKJr5YB";
const outputModules = ["map_db_ops"];
const startBlockNum = "283000000";
const stopBlockNum = "283001000";

// Initialize Substreams
const substreams = new Substreams(host, {
    startBlockNum,
    stopBlockNum,
    outputModules,
});

(async () => {
    // download Substream from IPFS
    const {modules, registry} = await download(substream);
    
    // Find Protobuf message types
    const DBOps = registry.findMessage("sf.antelope.type.v2.DBOps");
    if ( !DBOps) throw new Error("Could not find DBOps message type");
    
    substreams.on("mapOutput", output => {
        const { dbOps } = DBOps.fromBinary(output.data.mapOutput.value);
        for ( const dbOp of dbOps ) {
            console.log(dbOp);
        }
    });
    
    // start streaming Substream
    await substreams.start(modules);

    // end of Substream
    console.log("done");
    process.exit();
})();