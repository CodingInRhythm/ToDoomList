import Ploys from "./ploys.js";

//This class tracks what queries for Ploys have been called, can replay the last query used
class PloyQuery{
    constructor(){
        let queryType = null;
        let queryData = null;
    };

    //queryType should be either "schemeId", "all" (if we want to implement?), "search"
    //queryData will be id, null, search string respectively
    //Use this instead of calling Ploys queries directly
    async makeNewQuery(type, data){
        this.queryType = type;
        this.queryData = data;

        if(type === "schemeId"){
            return await Ploys.getPloys(data);
        } else if(type === "search"){
            return await Ploys.searchPloys(data);
        } else if(type === "all"){

        }
    }

    //Returns data from last call of makeNewQuery();
    getLastQuery(){
        return {queryType: this.queryType, queryData: this.queryData};
    }

    //Replays the last call of makeNewQuery
    async callLastQuery(){
        let prev = this.getLastQuery();
        return await this.makeNewQuery(prev.queryType, prev.queryData);
    }
}

let queryTracker = new PloyQuery();

export default queryTracker;
