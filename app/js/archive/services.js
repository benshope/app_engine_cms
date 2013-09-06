'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var myApp = angular.module('myApp.services');


myApp.service("friendService", function( $resource, applyCacheToResource ) {

        // Define our AngularJS resource (which makes the
        // HTTP requests to our server for us).
        var resource = $resource( "./api.cfm" );

        // Imagine that we have some locally cached data that
        // we've stored from a previous request.
        var cachedResponse = [
            {
                id: 3,
                name: "Joanna"
            }
        ];


        // Provide an API for the controllers.
        this.query = function() {

            // Get the resource reference (at this point,
            // it is an empty array or object reference).
            var results = resource.query();

            // Before we return the resource, let's inject
            // our own cache. Since the Resource *always*
            // updates on the next "tick", we know that we
            // are not going to corrupt the true response
            // from the server.
            return(
                applyCacheToResource( results, cachedResponse )
            );

        };

    }
);



myApp.value(
            "applyCacheToResource",
            function( resource, cache ) {
 
                // Check to see what type of value we're dealing with.
                // If it's an array, we want to splice-in the cache;
                // if it's an object, we want to extend the keys.
                if ( angular.isArray( resource ) ) {
 
                    resource.splice.apply(
                        resource,
                        [ 0, 0 ].concat( cache )
                    );
 
                } else {
 
                    angular.extend( resource, cache );
 
                }
 
                // Return the updated resource (for easy of use).
                return( resource );
 
            }
        );