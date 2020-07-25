/* Date :- 22/07/2020 */
/* Name :- News Lightning Component */
/* Developer Name :- Prafull Jain */
/*  Developer Email :- prafulljaincp@gmail.com */
//This class is used to return list of sObject into News Lightning component with the help of specified search text/string.
public class NewsCmpCls
{
   	//AuraEnabled is necessary for fetching results into Lightning/Lightning Web Component from Apex class methods.
   	//Cacheable is optional but it's used to increase performance. 
    @AuraEnabled(cacheable=true)
    public static List<SObject> getRecords(String searchString)
    {
        //Refer below link for String.escapeSingleQuotes() method,but it is used to prevent from SOQL Injection attack.
        //https://trailhead.salesforce.com/en/content/learn/modules/secdev_injection_vulnerabilities/secdev_inject_prevent_soql_injection
        searchString = String.escapeSingleQuotes(searchString);
        //'%'  is used to find the record that have one or more character.
        //So in this we're find our record as the specified string in between of Name Field(Both in First & Last).
        String query = 'SELECT Id,prafullnamespac__URL_Link__c,prafullnamespac__Name__c FROM prafullnamespac__News_Website_Details__c WHERE prafullnamespac__Name__c LIKE \'%'+searchString+'%\' LIMIT 10';
        //We're using Dynamic SOQL because we need to retrieve every record with the specified string using LIKE operator. 
        return Database.query(query);
    }  
}