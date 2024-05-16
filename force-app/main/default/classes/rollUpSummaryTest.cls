@isTest
public class rollUpSummaryTest {
    
    @testSetup
    public static void testData(){
        Account acc = new Account (Name = 'TestAccount');
        insert acc;
    
        List <Opportunity> newOp = new List <Opportunity>();
        for(Integer i = 0; i< 5; i++){
            Opportunity op = new Opportunity(AccountId = acc.Id, 
                                             Name = 'Opportunity' + i,
                                             StageName = 'Prospecting',
                                             CloseDate = System.today(),
                                             Amount = 1000,
                                             AmountB__c = 500);
            
            newOp.add(op);
        }
        insert newOp;
    }

    /*
    @isTest    
    public static void testDeleteOpp(){
        Opportunity op = [SELECT Id from Opportunity where Name = 'Opportunity2'];
        
        test.startTest();
        delete op;
        test.stopTest();
        
        List <Account> checkAc = [SELECT Total_Opportunities__c, Total_Revenue__c, Average_Revenue__c from Account where Name = 'TestAccount'];
        System.assertEquals(4, checkAc[0].Total_Opportunities__c);
        System.assertEquals(4000, checkAc[0].Total_Revenue__c);
        System.assertEquals(500, checkAc[0].Average_Revenue__c);
    }
    */
    @isTest
    public static void testUpdateOpp(){
        Account acc = new Account (Name = 'TestAccountUpdate');
        insert acc;
        Opportunity op = [SELECT Id from Opportunity where Name = 'Opportunity2'];
        
        op.AccountId = acc.Id;
        op.Amount = 10000;
        op.AmountB__c = 1000;
        
        test.startTest();
        update op;
        test.stopTest();
        
        List <Account> checkAc = [SELECT Total_Opportunities__c, Total_Revenue__c, Average_Revenue__c from Account where Name = 'TestAccount'];
        System.assertEquals(4, checkAc[0].Total_Opportunities__c);
        System.assertEquals(4000, checkAc[0].Total_Revenue__c);
        System.assertEquals(500, checkAc[0].Average_Revenue__c);
        
        List <Account> checkAcNew = [SELECT Total_Opportunities__c, Total_Revenue__c, Average_Revenue__c from Account where Name = 'TestAccountUpdate'];
        System.assertEquals(1, checkAcNew[0].Total_Opportunities__c);
        System.assertEquals(10000, checkAcNew[0].Total_Revenue__c);
        System.assertEquals(1000, checkAcNew[0].Average_Revenue__c);
    }
}
