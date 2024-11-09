import {Route} from "./route"
import { Grade } from "./grade";
import { Style } from "./style";

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
        this.latestRouteClimbed = route.Date;
    }

}