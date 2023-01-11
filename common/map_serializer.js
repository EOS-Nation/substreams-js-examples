import { Substreams, download } from "substreams";
import { decodeAccount, decodeCurrencyStats } from "../eosio.token/abi/eosio.token.js";
import { HOST, SUBSTREAM } from "./config";

// User input
const outputModules = ["map_db_ops"];
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
    
    // Find Protobuf message types
    const DBOps = registry.findMessage("sf.antelope.type.v1.DBOps");
    if ( !DBOps) throw new Error("Could not find DBOps message type");
    
    substreams.on("mapOutput", output => {
        const { dbOps } = DBOps.fromBinary(output.data.mapOutput.value);
        for ( const dbOp of dbOps ) {
            if ( dbOp.code != "eosio.token") continue;
            if ( dbOp.tableName === "accounts") {
                const account = decodeAccount(dbOp.newData);
                if ( !account ) continue;
                console.log({owner: dbOp.scope, account});
            }
            if ( dbOp.tableName === "stat") {
                const stat = decodeCurrencyStats(dbOp.newData);
                if ( !stat ) continue; 
                console.log({contract: dbOp.code, stat});
            }
        }
    });

    // start streaming Substream
    await substreams.start(modules);

    // end of Substream
    console.log("done");
    process.exit();
})();