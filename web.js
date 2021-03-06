var connect = require( 'connect' );
var mongo = require( 'mongoskin' );

var port = process.env.PORT || 3000;
var mongoUri = process.env.MONGOLAB_URI;
var db = mongo.db( mongoUri );

var contacts = {
    add: function( firstName, lastName, requestCallback )
    {
        db.collection( "contacts" ).insert( { "firstName": firstName, "lastName": lastName }, function(error, result)
        {
            requestCallback( null, "success" );
        });
    }
};

connect.createServer(

    require( 'connect-jsonrpc' )( contacts )
).listen( port );