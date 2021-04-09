class PloyQuery{
    constructor(){
        let queryType = null;
        let queryData = null;
    };

    //queryType should be either "schemeId", "all", "search"
    //queryData will be id, null, search string respectively
    makeNewQuery(type, data){
        this.queryType = type;
        this.queryData = data;
    }

    getLastQuery(){
        return {queryType, queryData};
    }
}

export default PloyQuery;
