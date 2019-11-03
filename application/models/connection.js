const mongoose = require('mongoose');

module.exports = function(){

    const path ='mongodb+srv://cluster0-6qtxk.mongodb.net/DOE'

    const options = {
        'auth': { 'authSource': 'admin' },
        'user': 'HACC',
        'pass': 'bed-bath-beyonce',
        useNewUrlParser: true
    };

    var connectWithRetry = function(){
        return mongoose.connect(path, options, function(err){
            if(err){
                console.log(`MongoDB >> Failed, reconnecting in 5 seconds\n${err}`);
                setTimeout(connectWithRetry, 5000);
            }
            console.log('MongoDB >> Connected');
        });
    };

    connectWithRetry();
}