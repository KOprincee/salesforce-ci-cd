/*Adding Comment*/
trigger updateTotalOpp on Opportunity (after insert, after delete, after update) {
    if(Trigger.isInsert && Trigger.isAfter){
        rollUpHelper.insertDeleteOperation(Trigger.new);
    }
     
    if(Trigger.isDelete && Trigger.isAfter){
        rollUpHelper.insertDeleteOperation(Trigger.old);
    }
    
    if(Trigger.isUpdate){
        rollUpHelper.updateOperation(Trigger.New, Trigger.OldMap);
        rollUpHelper.test1('ABC','XYZ');
    }
}
