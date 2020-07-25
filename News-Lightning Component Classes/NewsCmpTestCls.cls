/* Date :- 22/07/2020 */
/* Name :- News Lightning Component */
/* Developer Name :- Prafull Jain */
/*  Developer Email :- prafulljaincp@gmail.com */
//This is test class that is used to check the News Lightning Component
@isTest
public with sharing class NewsCmpTestCls
{
    //All the data inside this test setup method is visible to all test class method and it's not committed to original SFDC Data.
    //It is initialize whenever unit test will performed and remove automatically until all test method finish their execution.
	@TestSetup
    static void makeData(){
        prafullnamespac__News_Website_Details__c  nwdobj = new prafullnamespac__News_Website_Details__c 
            								(prafullnamespac__Name__c='NDTV',prafullnamespac__URL_Link__c='https://www.ndtv.com/');
        insert nwdobj;
    }
	//This is method is used to check position & negative behaviour using testSetup method Data.
    @isTest
    public static void testGetRecords(){
        List<SObject> obj = NewsCmpCls.getRecords('NDTV');
        System.assertEquals(1, obj.size());
        obj = NewsCmpCls.getRecords('abc');
        System.assertEquals(0, obj.size());
    }

}