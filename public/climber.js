import { Grade } from "./grade";


export class Climber {
    constructor(userName){
        this.userName = userName;
        this.routeList = [];
        this.hardestGrade = new Grade(6, "a");
        this.numRoutesClimbed = 0;
        this.latestRouteClimbed = new Date();
    }

    addRoute(route){
        this.routeList.push(route);
        this.numRoutesClimbed += 1;
        if (this.hardestGrade.lessThan(route.grade)){
            this.hardestGrade = route.grade;
        }
        this.latestRouteClimbed = route.date;
    }

}