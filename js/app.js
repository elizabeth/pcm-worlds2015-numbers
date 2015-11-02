Parse.initialize('eKRYapkjFAO9WJQgbrWTAxycmijkQujwXv6SuaSA', 'XZPU2LM3Unsdgs9UQOiV0TIcpR5mIZSoPp1abHvx');

angular.module('Tickets', [])
    .controller('ticketsController', function($scope) {
        var WorldsTickets = Parse.Object.extend("WorldsTickets");
        var queryTickets = new Parse.Query(WorldsTickets);
        queryTickets.ascending("ticketNumber");
        queryTickets.limit(500);
        $scope.tickets = [];
        $scope.total = 0;
        $scope.people = 0;

        queryTickets.find({
            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    var object = data[i];
                    var each = {"count": i+1, "id": object.id,
                        "number": object.get('ticketNumber'),
                        "checked": object.get('checkedIn')};
                    $scope.tickets.push(each);
                    $scope.total += 1;
                }

            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        }).then(function() {
            $scope.$apply();
        });
    });