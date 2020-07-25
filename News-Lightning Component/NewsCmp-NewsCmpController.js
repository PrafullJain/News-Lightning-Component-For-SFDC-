({
    /* Date :- 22/07/2020 */
    /* Name :- News Lightning Component */
    /* Developer Name :- Prafull Jain */
    /*  Developer Email :- prafulljaincp@gmail.com */
    
    /* 
     * This method is called whenever our keyboard key will up means not in pressing mode.
     * This method is used to provide list of records and opens the drop down menu with search icon
     */
	searchHandler : function (component, event, helper)
	{
        const searchString = event.target.value;
        if (searchString.length >= 3) {
            //Ensure that not many function execution happens if user keeps typing
            if (component.get("v.inputSearchFunction")) {
                clearTimeout(component.get("v.inputSearchFunction"));
            }
            let inputTimer = setTimeout($A.getCallback(function () {
                /* Calling the helper class for futher processing that provides list of records.*/
				helper.searchRecords(component, searchString);
            }), 1000);	// 1000milli seconds=1 second  for timeout
            component.set("v.inputSearchFunction", inputTimer);
        } else{
            component.set("v.results", []);
            component.set("v.openDropDown", false);
        }
    },
	/* This method is called after we're selecting any channel name.This method is used to open the website using iframe tag & changing the label */
    optionClickHandler : function (component, event, helper) 
	{
		/* closest() method is comes in JavaScript that is used to traverse in both upper or lower level of triggering element.
		 * In this we're using it to get lower level element values i.e li that will be inside our div tag.
         * Refer - https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
         */
		const selectedId = event.target.closest('li').dataset.id;
        const selectedValue = event.target.closest('li').dataset.value;
        const selectedLink = event.target.closest('li').dataset.link;
        
        component.set("v.inputValue", selectedValue);
        component.set("v.openDropDown", false);
        component.set("v.selectedOption", selectedId);
        component.set("v.elemoper",true);
        component.set("v.label","Entered Channel Name was "+selectedValue);
        
        component.set("v.iframeUrl",selectedLink);
    },
	/* This method is called after we're click on clear icon.
     * This method is used to clear the entered name,list of records,drop down menu,iframe URL,
     * selectedOption & changing the label.
     */
    clearOption : function (component, event, helper)
    {
        component.set("v.results", []);
        component.set("v.openDropDown", false);
        component.set("v.inputValue", "");
        component.set("v.selectedOption", "");
        component.set("v.elemoper",false);
        component.set("v.label","Enter News Channel Name");
        component.set("v.iframeUrl","");
    },
})