# Substreams Examples

## Quickstart

```bash
$ npm install
$ node index.js

File already exists: QmUc8qGvJ8rVsTQV6L2pvZEEwpfw3K6LxcxX9FMvF4cPB4
ActionTrace {
  blockNum: 283000005,
  trxId: 'ee944bf8bc0591291a93c88cb7113f3196cda021b9c65a62bfe9c0bbf447d674',
  actionOrdinal: 3,
  account: 'prospectorsg',
  receiver: 'prospectorsg',
  name: 'transfer',
  jsonData: '{"from":"prospectorst","memo":"migration from wax/qepcpara1234","quantity":"0.6170 PGL","to":"lisrx13t21po"}',
  timestamp: Timestamp { seconds: 1670679060n, nanos: 0 }
}
ActionTrace {
  blockNum: 283000005,
  trxId: 'ee944bf8bc0591291a93c88cb7113f3196cda021b9c65a62bfe9c0bbf447d674',
  actionOrdinal: 4,
  account: 'prospectorsg',
  receiver: 'prospectorst',
  name: 'transfer',
  jsonData: '{"from":"prospectorst","memo":"migration from wax/qepcpara1234","quantity":"0.6170 PGL","to":"lisrx13t21po"}',
  timestamp: Timestamp { seconds: 1670679060n, nanos: 0 }
}
```