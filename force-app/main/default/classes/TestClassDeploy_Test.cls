@isTest
public class TestClassDeply_Test{
    @isTest
    public void test1(){
          TestClassDeploy t = new TestClassDeploy();
          test.startTest();          
          t.testMethods();
          test.stopTest();
    } 
    @isTest
    public void test2(){
          TestClassDeploy t = new TestClassDeploy();
          test.startTest();          
          t.test1('Edge');
          test.stopTest();
    }
}
