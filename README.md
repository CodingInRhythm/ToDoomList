# ToDoomList

#### ToDoomList is an application modeled on Remember The Milk that allows villains, supervillains and all other sorts of evil folk to create schemes(lists) and add ploys(tasks) to those lists.  It is written with a frontend using only vanilla Javascript and a backend using express.js. #### 

#### Link: [ToDoomList](http://aa-todoomlist.herokuapp.com/)
#### Documentation: [Github Wiki](https://github.com/CodingInRhythm/ToDoomList/wiki)

**Landing page GIF:**

![Alt Text](https://media.giphy.com/media/X1qxc3e1hjOvyOpsyM/giphy.gif)

**App page view:** 

![Alt Text](https://media.giphy.com/media/Iv0i7t4Xig1Et0DUtc/giphy.gif)

### Features ###

* Sign-up and login with credentials
* Main app page is a single-page application
* Easy to use interface
* Logged in user can create and save lists
* Logged in user can create and save tasks associated with a list
* Logged in user can search for all their tasks
* Logged in user can keep track of tasks in a list with dynamic summary on right-hand side of main page
* Logged in user can edit and delete their lists and tasks


### Technical Details ###
* One challenge we faced was handling how the display of ploys(tasks) would refresh after making an action (ex. deleting, renaming a ploy). The ploys being displayed can either be the result of querying by the Scheme Id or by Search, and in order to refresh the display, we needed a way to track what the last query that was called so we can re-call it. To facilitate that, we added a PloyQuery class that acted as a middleman between a function querying for ploys to display and the actual DB query call. This class would be able to keep a history of what query was last called and replaying it when a refresh is needed.

```
  class PloyQuery{
    constructor(){
        let queryType = null;
        let queryData = null;
    };

    async makeNewQuery(type, data){
        this.queryType = type;
        this.queryData = data;

        if(type === "schemeId"){
            return await Ploys.getPloys(data);
        } else if(type === "search"){
            return await Ploys.searchPloys(data);
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
```
### Todos ###

* Add Calendar to allow for more customizeable due dates
* Improve styling of main app page
* Implement a 'select all' checkbox in app page for ploys to facilitate bulk delete and update. 
### Contributors ###

* [Alex Clough](https://github.com/CodingInRhythm)
* [Nathaniel Cooke](https://github.com/nathanieldcooke)
* [Brian Xue](https://github.com/bxue2)
* [Christian Cozma](https://github.com/Christian-Cozma)
