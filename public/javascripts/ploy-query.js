import Ploys from "./ploys.js";

class PloyQuery{
    constructor(){
        let queryType = null;
        let queryData = null;
    };

    //queryType should be either "schemeId", "all", "search"
    //queryData will be id, null, search string respectively
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

    getLastQuery(){
        return {queryType, queryData};
    }

    async callLastQuery(){
        let prev = this.getLastQuery();
        return await this.makeNewQuery(prev.queryType, prev.queryData);
    }
}

let queryTracker = new PloyQuery();

export default queryTracker;
