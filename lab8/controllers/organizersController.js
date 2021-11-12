var organizersController = {
    organizers: [],
    getOrganizers: function() {
        return this.organizers;
    },
    addOrganizer: function(newOrganizer) {
        this.organizers.push(newOrganizer);
    }
};

module.exports=organizersController;