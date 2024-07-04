//Test deploy
public class rollUpHelper{ 

    public void test3(String t1) {
        Database.query('SELECT Id FROM Account' + t1);
    } 

    public void test4(String t1) {
        Database.query('SELECT Id FROM Account' + t1);
    } 

    public void test1(String t1) {
        Database.query('SELECT Id FROM Account' + t1);
    }
    public void test2(String t1) {
        Database.query('SELECT Id FROM Account' + t1);
    }

    public static void insertDeleteOperation(List <Opportunity> newOpp){
        Set <Id> accId = new Set <Id>();
        for(Opportunity op : newOpp){
            accId.add(op.AccountId);
        } 
        updateRollupFields(accId);
    }
    
    public static void updateOperation(List <Opportunity> updatedOpp, Map<Id, Opportunity> oldOpp){
        
        Set <Id> accId = new Set <Id>();
        
        //Comparng the updated opportunities; 
        //And if both are not same adding them to the Set so the count can be updated
        for(Opportunity op : updatedOpp){
            System.debug('test');
            //Checking if the accountId is changed on the Opportunity
            if(oldOpp.get(op.Id).AccountId != op.AccountId ){
                accId.add(op.AccountId);
                accId.add(oldOpp.get(op.Id).AccountId);
            }
            //Checking if the AmountA is changed on the Opportunity
            if(oldOpp.get(op.Id).Amount != op.Amount || oldOpp.get(op.Id).AmountB__c != op.AmountB__c){
                accId.add(op.AccountId);
            }
        }
        updateRollupFields(accId);
    }
    
    public static void updateRollupFields(Set <Id> parentId){
        
        Map <Id, Integer> parentIdtoCount = new Map<Id, Integer>();
        Map <Id, Decimal> parentIdtoAmt = new Map<Id, Decimal>();
        Map <Id, Decimal> parentIdtoAvg = new Map<Id, Decimal>();
        List <Opportunity> childRec = [SELECT Id, Amount, AmountB__c, AccountId from Opportunity where accountId IN :parentId];
        
        for(Opportunity child : childRec){
            Id acc = child.AccountId;
            if(acc != null){
                Integer totalCount = parentIdtoCount.get(acc);
                if(totalCount == null){
                    totalCount = 1;
                }else{
                    totalCount++;
                }
                
                Decimal totalSum = parentIdtoAmt.get(acc);
                if(totalSum == null){
                    totalSum = child.Amount == null ? 0 : child.Amount;
                }else{
                    totalSum += child.Amount == null ? 0 : child.Amount;
                }
                
                Decimal totalAvg = parentIdtoAvg.get(acc);
                Decimal avg = child.AmountB__c == null ? 0 : child.AmountB__c;
                if(totalAvg == null){
                    totalAvg = avg;
                }else{
                    totalAvg = ((totalAvg * (totalCount - 1)) + avg) / totalCount;
                }
                
                parentIdtoCount.put(acc, totalCount);
                parentIdtoAmt.put(acc,totalSum);
                parentIdtoAvg.put(acc,totalAvg);
            }
        }
        
        List <Account> accountToUpd = new List <Account>();
        for(Id acc : parentId){
            if(acc != null){               
                Account updDetails = new Account (Id = acc, 
                                                  Total_Opportunities__c = parentIdtoCount.get(acc) == null ? 0 : parentIdtoCount.get(acc), 
                                                  Total_Revenue__c = parentIdtoAmt.get(acc) == null ? 0 : parentIdtoAmt.get(acc),
                                                  Average_Revenue__c = parentIdtoAvg.get(acc) == null ? 0 : parentIdtoAvg.get(acc));
                
                accountToUpd.add(updDetails);   
            }
        }
        
        if(!accountToUpd.isEmpty()){
            update accountToUpd;
        }   
    }
}
