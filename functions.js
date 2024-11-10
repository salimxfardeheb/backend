//functions.js
function showdata (data, res) {
    if (data && data.length > 0) {
        res.send(data)
    } else if( data.length === 0) {
        res.send({message : "collection is empty"})
    } else {
        res.status(500).json({ error: "error geting users" });
      }
}




module.exports = {showdata}