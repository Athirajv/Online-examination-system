let mongodb=require('mongodb').MongoClient
let client=new mongodb('mongodb://0.0.0.0:27017')

function dataconnection(){

return client.connect().then((dbs)=>{
    let data=dbs.db('Examination')
    return data
    
})}
module.exports=dataconnection();