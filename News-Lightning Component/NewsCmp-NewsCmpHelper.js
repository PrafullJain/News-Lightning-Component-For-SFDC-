({
    /* Date :- 22/07/2020 */
    /* Name :- News Lightning Component */
    /* Developer Name :- Prafull Jain */
    /*  Developer Email :- prafulljaincp@gmail.com */
    searchRecords : function(component, searchString) {
        let action = component.get("c.getRecords");
        action.setParams({
            "searchString" : searchString,
        });
        action.setCallback(this,function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                const serverResult = response.getReturnValue();
                const results = [];
                /*Below for-each loop is used to put the details into another object with more
                 * specified manner & use push() method to set this object into component-view 
                 * object type attribute.
                 */
                serverResult.forEach(element => {
                    const result = {Id : element.Id, Name :element.prafullnamespac__Name__c
                    ,Link:element.prafullnamespac__URL_Link__c};
                                     results.push(result);
            });
            component.set("v.results", results);
            	if(serverResult.length>0)
            	{
              	  component.set("v.openDropDown", true);
            	}
                //Toast Event is standard event of SFDC to display error,warn,success messages
              	//Below if is used to show warning when the enetered channel name was not exist into our records.
            	if(serverResult.length==0)
            	{
                    let toastEvent = $A.get("e.force:showToast");
                    if(toastEvent){
                        toastEvent.setParams({
                            "title": "WARNING",
                            "type": "warning",
                            "message":"No News Channel Name Found from the entered name" 
                            +" Please Try to enter Correct Name or Create it on News_Website_Detail sObjet."
                        });
                        toastEvent.fire();
                    }
            	}
        	}else{
                        let toastEvent = $A.get("e.force:showToast");
        				if(toastEvent){
                            toastEvent.setParams({
                                "title": "ERROR",
                                "type": "error",
                                "message": "Something went wrong!! Check server logs!!"
                            });
                            toastEvent.fire();
        				}
        		}
		});
		$A.enqueueAction(action);
	}
})