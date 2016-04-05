import immutable from 'immutable';

let statusColors = immutable.Map({
    "unassigned": "#D0D0D0",
    "assigned": "#373736",
    "in-progress": "#F49A39",
    "deferred": "#7F1438",
    "topic-approved": "#257979",
    "date-assigned": "#86AB35"
});

let SessionStatusService = {
    getStatusColor(status) {
        var color = statusColors.get(status);
        return color || statusColors.get("unassigned");
    }
}

export default SessionStatusService;
