public class TestClassDeploy{
  public static void testMethods(){
    String test = '10';
    if(test == '1000'){
        //Do something
    }
    String varNotDeclared = 'Tsetsing';
    List<Account> acc = [Select ID from Account where Id = :varNotDeclared];
}
    public void test1(String t1) {
       Database.query('SELECT Id FROM Account' + t1);
    }
}
